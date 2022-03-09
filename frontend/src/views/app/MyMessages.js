import { useState, useEffect } from "react";
import { ListGroup, Card, Button, Form } from "react-bootstrap";
import API from "./API";

const MyMessages = ({ onAdd }) => {
  const [message_id, setMessageId] = useState(null);
  const [sender_email, setSenderEmail] = useState("");
  const [recipient_email, setRecipientEmail] = useState("");
  const [title, setTitle] = useState("");
  const [message_body, setMessageBody] = useState("");
  const [mymessages, setMyMessages] = useState([]);

 
  
  useEffect(() => {
    refreshMessages();
  }, []);

  

  const refreshMessages = () => {
    API.get("/api/message/")
      .then((res) => {
        setMyMessages(res.data);
      })
      .catch(console.error);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    let item = { sender_email, recipient_email, title, message_body};
    API.post("/api/message/", item).then(() => refreshMessages());
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
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-4">
          <h3 className="float-left">Send a new message</h3>
          <Form onSubmit={onSubmit} className="mt-4">
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>{message_id}SenderEmail</Form.Label>
              <Form.Control
                type="text"
                placeholder="Sender email:"
                value={sender_email}
                onChange={(e) => setSenderEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicRecipientEmail">
              <Form.Label>RecipientEmail</Form.Label>
              <Form.Control
                type="text"
                placeholder="Recipient email:"
                value={recipient_email}
                onChange={(e) => setRecipientEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Title:"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
        

            <Form.Group className="mb-3" controlId="formBasicMessageBody">
              <Form.Label>Message Body</Form.Label>
              <Form.Control
                type="text"
                placeholder="Message body:"
                value={message_body}
                onChange={(e) => setMessageBody(e.target.value)}
              />
            </Form.Group>

            <div className="float-right">
              <Button
                variant="primary"
                type="submit"
                onClick={onSubmit}
                className="mx-2"
              >
                Send
              </Button>
              {/* <Button
                variant="primary"
                type="button"
                onClick={() => onUpdate(message_id)}
                className="mx-2"
              >
                Update
              </Button> */}
            </div>
          </Form>
        </div>
        <div className="col-md-8 m">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Sender Email</th>
                <th scope="col">Receiver Email</th>
                <th scope="col">Title</th>
                <th scope="col">Message Body</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {mymessages.map((message, index) => {
                return (
                  <tr key={message.id}>
                    <th scope="row">{message.id}</th>
                    <td> {message.sender_email}</td>
                    <td>{message.recipient_email}</td>
                    <td>{message.title}</td>
                    <td>{message.message_body}</td>
                    <td>
                      <i
                        className="fa fa-pencil-square text-primary d-inline"
                        aria-hidden="true"
                        onClick={() => selectMessage(message.id)}
                      ></i>
                      <i
                        className="fa fa-trash-o text-danger d-inline mx-3"
                        aria-hidden="true"
                        onClick={() => onDelete(message.id)}
                      ></i>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyMessages;