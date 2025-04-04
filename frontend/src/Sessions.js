// src/components/Sessions.js
import React, {useState} from 'react';
import './Sessions.css';
import Card from 'react-bootstrap/Card';
import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Link} from 'react-router-dom';
import { FaRocketchat } from "react-icons/fa";
import { CiMail } from "react-icons/ci";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useNavigate } from 'react-router-dom';
import { SearchBar } from './components/SearchBar';
import { CgProfile } from "react-icons/cg";
import { CiCirclePlus } from "react-icons/ci";
import { FaPlus } from "react-icons/fa";

function Sessions() {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const toggleChat = () => {
        setIsOpen(prevState => !prevState);
    };

    const getSessions = () => {
        return {
          recommended: [
            {
              id: "rec1",
              title: "React Basics",
              description: "Learn the basics of React.",
              owner: "Mic",
            },
            {
              id: "rec2",
              title: "Advanced React",
              description: "Dive deeper into React hooks and patterns.",
              owner: "Fruja",
            },
            {
                id: "s4",
                title: "UI/UX Design Essentials",
                description: "Master the basics of user experience and interface design using Figma.",
                owner: "Larisa"
              } 
          ],
          sessions: [
            {
              id: "s1",
              title: "Vue Intro",
              description: "Introduction to Vue.js framework.",
              owner: "Ana",
            },
            {
              id: "s2",
              title: "Angular Workshop",
              description: "Build scalable web apps with Angular.",
              owner: "Tuspi",
            },
            {
                id: "s3",
                title: "Fullstack Fundamentals",
                description: "Learn how to build complete web apps using Node.js, Express, and MongoDB.",
                owner: "David"
            }      
          ],
        };
      };
      

  return (
    <div>

        <div className="top">
        <div className="searchbar" placeholder='Search Session'>
            <input className="searchin" placeholder='Search for session'/>
        </div>
        <button className="pfp">
            <FaPlus size={20}/>
        </button>
        <button className="pfp">
            <CgProfile size={30}/>
        </button>
    </div>
      <div className='card'>
      <Row>
      <Col>
      <h1>Recommended</h1>
      {getSessions().recommended.map((item) => (
        <Card key={item.id} className='hover-card' style={{ width: '100%', height:'300px', marginBottom: '1rem' }}>
          <Card.Body>
            <Card.Title>{item.title}</Card.Title>
            <Card.Text>{item.description}</Card.Text>
            <p><strong>Author:</strong> {item.owner}</p>
            <Button variant="dark" onClick={()=>{navigate("/session?id="+item.id)}}>Access Session</Button>
          </Card.Body>
        </Card>
      ))}
    </Col>
    <Col>
      <h1>Your Sessions</h1>
      {getSessions().sessions.map((item) => (
        <Card key={item.id} className='hover-card' style={{ width: '100%', height:'300px', marginBottom: '1rem' }}>
          <Card.Body>
            <Card.Title>{item.title}</Card.Title>
            <Card.Text>{item.description}</Card.Text>
            <p><strong>Author:</strong> {item.owner}</p>
            <Button variant="dark" onClick={()=>{navigate("/session?id="+item.id)}}>Access Session</Button>
          </Card.Body>
        </Card>
      ))}
    </Col>
    </Row>
    </div>
    
    </div>
  );
}

export default Sessions;
