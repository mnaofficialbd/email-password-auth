import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import app from './firebase.init';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import React, { useState } from 'react'

const auth = getAuth(app);


function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')

  const handleEmailBlur = (event) => {
    setEmail(event.target.value);
  }

  const handlePasswordBlur = (event) => {
    setPassword(event.target.value);
  }

  const handleSubmit = (event) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
      })
      .catch(error => {
        console.error(error)
      })
    event.preventDefault()
  }
  return (
    <div>
      <h2 className='text-center'>Email and Password Authentication</h2>

      {/* <form onSubmit={handleSubmit}>
        <input onBlur={handleEmailBlur} type="email" placeholder='email' />
        <br />
        <input onBlur={handlePasswordBlur} type="password" name="" id="" placeholder='password' />
      <br />
      <input type="submit" value="Login" />
      </form> */}

      <div className='registration w-50 mx-auto mt-3 border p-3 rounded'>
        <h4 className='text-primary text-center'>Please Register</h4>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control onBlur={handleEmailBlur} type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">

            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control onBlur={handlePasswordBlur} type="password" placeholder="Password" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>

    </div>
  );
}

export default App;
