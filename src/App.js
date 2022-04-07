import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import app from './firebase.init';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import React, { useState } from 'react'

const auth = getAuth(app);


function App() {
  const [validated, setValidated] = useState(false);
  const [registered, setRegistered] = useState(false)
  const [error, setError] = useState('')
  const [name,setName]=useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')

  const handleNameBlur = (event) => {
    setName(event.target.value);
  }
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

    if (registered) {
      signInWithEmailAndPassword(auth, email, password)
        .then(result => {
          const user = result.user;
          console.log(user);
          
        })
        .catch(error => {
          setError(error.message)
        })
    }

    else {
      createUserWithEmailAndPassword(auth, email, password)
        .then((result) => {
          const user = result.user;
          setEmail('');
          setPassword('');
          verifyEmail();
          setUserName();
          console.log(user);
        })
        .catch(error => {
          setError(error.message)
        })
    }
    event.preventDefault()
  }

  const setUserName=()=>{
    updateProfile(auth.currentUser, {
      displayName: name
    })
    .then(()=>{
      console.log('update name');
    })
    .catch(error=>{
      setError(error.message)
    })
  }

  const verifyEmail = () => {
    sendEmailVerification(auth.currentUser)
      .then(() => {
        console.log("Email verification sent");
      })
  }

  const handlePasswordReset = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        console.log('email send');
      })
  }

  return (
    <div>
      <h2 className='text-center'>Email and Password Authentication</h2>

      <div className='registration w-50 mx-auto mt-3 border p-3 rounded'>
        <h4 className='text-primary text-center'>Please {registered ? 'Login' : 'Register'}</h4>
        <Form noValidate validated={validated} onSubmit={handleFormSubmit}>

          {!registered && <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Name</Form.Label>
            <Form.Control onBlur={handleNameBlur} type="text" placeholder="Your Full Name" required />
            <Form.Control.Feedback type="invalid" />
            {/* Please provide your name */}
            <Form.Control.Feedback />
          </Form.Group>}

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control onBlur={handleEmailBlur} type="email" placeholder="Enter email" required />
            <Form.Text className="text-muted">
            </Form.Text>
            <Form.Control.Feedback type="invalid" />
            {/* Please provide a valid email */}
            <Form.Control.Feedback />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control onBlur={handlePasswordBlur} type="password" placeholder="Password" required />
            <Form.Control.Feedback type="invalid" />
            {/* Please provide a valid password */}
            <Form.Control.Feedback />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check onChange={handleRegisteredChange} type="checkbox" label="Already Registered" />
          </Form.Group>
          <Button onclick={handlePasswordReset} variant="link">Forget Password</Button>
          <p className='text-success'>{'Success'}</p>
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
