
import React, { useState, useEffect, Fragment } from 'react';
import { ListGroup, Card, Button, Form } from "react-bootstrap";
import API from "./API";
import MyMessages from './MyMessages';

function Dashboard() {
  // Users auth
  const [userEmail, setUserEmail] = useState('');
  const [loading, setLoading] = useState(true);
  
  // Frontend 
  const [message_id, setMessageId] = useState(null);
  const [sender_email, setSenderEmail] = useState("");
  const [recipient_email, setRecipientEmail] = useState("");
  const [title, setTitle] = useState("");
  const [message_body, setMessageBody] = useState("");
  const [mymessages, setMyMessages] = useState([]);

  useEffect(() => {
    if (localStorage.getItem('token') === null) {
      window.location.replace('http://localhost:3000/login');
    } else {
      fetch('http://127.0.0.1:8000/api/v1/users/auth/user/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${localStorage.getItem('token')}`
        }
      })
        .then(res => res.json())
        .then(data => {
          setUserEmail(data.email);
          setLoading(false);
        });
    }
  }, []);

  return (
    
    <div id='dash'>
      {loading === false && (
        <Fragment>
          <h1>Dashboard</h1>
          <h2>Hello {userEmail}!</h2>
          <MyMessages/>
        </Fragment>
      )}
    </div>
    
  );
};

export default Dashboard;


