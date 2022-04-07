import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getAuth } from "firebase/auth";
import app from './firebase.init';
import { Form } from 'react-bootstrap';
import { Button } from 'bootstrap';

const auth = getAuth(app);

function App() {

  /* const handleEmailBlur = (event) => {
    console.log(event.target.value);
  }

  const handlePasswordBlur = (event) => {
    console.log(event.target.value);
  }

  const handleSubmit = (event) => {
    console.log('form submitted')
    event.preventDefault()
  } */
  return (
    <div className="App">
      <h2>Email Password Authentication</h2>

      {/* <form onSubmit={handleSubmit}>
        <input onBlur={handleEmailBlur} type="email" placeholder='email' />
        <br />
        <input onBlur={handlePasswordBlur} type="password" name="" id="" placeholder='password' />
      <br />
      <input type="submit" value="Login" />
      </form> */}

      <div className='registration w-50 mx-auto'>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
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
