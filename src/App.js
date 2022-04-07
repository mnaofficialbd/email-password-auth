import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import app from './firebase.init';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import React, { useState } from 'react'

const auth = getAuth(app);


function App() {
  const [validated, setValidated] = useState(false);
  const [registered, setRegistered] = useState(false)
  const [error, setError] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')

  const handleEmailBlur = (event) => {
    setEmail(event.target.value);
  }

  const handlePasswordBlur = (event) => {
    setPassword(event.target.value);
  }

  const handleRegisteredChange = (event) => {
    setRegistered(event.target.checked)
  }

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      return;
    }
    if (!/(?=.*?[#?!@$%^&*-])/.test(password)) {
      setError('password should contain at least one special character')
      return;
    }
    setValidated(true);
    setError('')

    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const user = result.user;
        setEmail('');
        setPassword('');
        console.log(user);
      })
      .catch(error => {
        setError(error.message)
        console.error(error)
      })
    event.preventDefault()
  }
  return (
    <div>
      <h2 className='text-center'>Email and Password Authentication</h2>

      <div className='registration w-50 mx-auto mt-3 border p-3 rounded'>
        <h4 className='text-primary text-center'>Please {registered ? 'Login' : 'Register'}</h4>
        <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control onBlur={handleEmailBlur} type="email" placeholder="Enter email" required />
            {/* <Form.Control.Feedback type="invalid" />
            Please provide a valid email
            <Form.Control.Feedback/> */}
            <Form.Text className="text-muted">

            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control onBlur={handlePasswordBlur} type="password" placeholder="Password" required />
            {/* <Form.Control.Feedback type="invalid" />
            Please provide a valid password
            <Form.Control.Feedback/> */}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check onChange={handleRegisteredChange} type="checkbox" label="Already Registered" />
          </Form.Group>
          <p className='text-danger'>{error}</p>
          <Button variant="primary" type="submit">
            {registered ? "Login" : 'Register'}
          </Button>
        </Form>
      </div>

    </div>
  );
}

export default App;
