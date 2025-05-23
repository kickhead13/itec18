mod api;
mod security;
mod db;
mod env;
use actix_web::{middleware::Logger};

#[actix_web::main]
async fn main() -> Result<(), Box<dyn std::error::Error + Send + Sync>> {
    
    env_logger::init_from_env(env_logger::Env::new().default_filter_or("info"));

    // obtaining the TLS certificate configuration
    let tls_config = security::obtain_tls_config();
    
    // connection to scylla-server
    let session = actix_web::web::Data::new(security::structures::ScyllaSession {
        lock: std::sync::Mutex::new(db::new_scylla_session("127.0.0.1:9042").await.expect(""))
    });

    // setting up the API server
    let _ = actix_web::HttpServer::new(move || {
        actix_web::App::new()
            .app_data(session.clone())
            .wrap(Logger::new("%a %{User-Agent}i %U"))
            .service(api::users::try_login)
            .service(api::users::new_user_login)
            .service(api::sessions::fetch_session_data)
            .service(api::sessions::send_session_message)
            .service(api::sessions::fetch_session_messages)
            .service(api::sessions::fetch_session_notes)
            .service(api::sessions::new_session_note)
    })
    .bind(("127.0.0.1", 1313))?
    .workers(8)
    .run()
    .await;
    Ok(())
}
