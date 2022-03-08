
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
    refreshMessages();
  }, []);
  
  

  const refreshMessages = () => {
    API.get("/api/message")
      .then((res) => {
        setMyMessages(res.data);
        // setSenderEmail(res[0].sender_email)
        // setRecipientEmail(res[0].recipient_email)
        // setTitle(res[0].title)
        // setMessageId(res[0].id)
      })
      .catch(console.error);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    let item = { sender_email, recipient_email, title, message_body};
    API.post("/messages", item).then(() => refreshMessages());
  };

  const onUpdate = (id) => {
    let item =  { sender_email, recipient_email, title, message_body};
    API.patch(`/${id}/`, item).then((res) => refreshMessages());
  };

  const onDelete = (id) => {
    API.delete(`/${id}/`).then((res) => refreshMessages());
  };

  function selectMessage(id) {
    let item = mymessages.filter((message) => message.id === id)[0];
    setSenderEmail(item.sender_email);
    setRecipientEmail(item.recipient_email);
    setTitle(item.title);
    setMessageBody(item.message_body)
    setMessageId(item.id);
  }
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


