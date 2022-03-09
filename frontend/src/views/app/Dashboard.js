
import React, { useState, useEffect, Fragment } from 'react';
import { ListGroup, Card, Button, Form } from "react-bootstrap";
import API from "./API";
import MyMessages from './MyMessages';

function Dashboard() {
  // Users auth
  const [userEmail, setUserEmail] = useState('');
  const [loading, setLoading] = useState(true);

  // Attempt to send user email back to Axios
  // const postUserEmail = () => {
  //   var user_email =  sessionStorage.getItem("user_email");
  //   let item = { user_email  };
  //   API.post("/api/user_email", item)  
  //   .then(function (res) {
  //     console.log("result: " + res);
  //     return res;
  // })
  // };

  useEffect(() => {
    if (localStorage.getItem('token') === null) {
      window.location.replace('http://localhost:3000/login');
      sessionStorage.clear();
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
          // Unable to use this session variable in backend 
          sessionStorage.setItem("user_email", data.email);
          //postUserEmail();
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


