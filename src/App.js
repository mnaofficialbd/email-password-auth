import './App.css';
import { getAuth } from "firebase/auth";
import app from './firebase.init';

const auth = getAuth(app);

function App() {

  const handleEmailBlur = (event) => {
    console.log(event.target.value);
  }

  const handlePasswordBlur = (event) => {
    console.log(event.target.value);
  }

  const handleSubmit=(event)=>{
    console.log('form submitted')
    event.preventDefault()
  }
  return (
    <div className="App">
      <h2>Email Password Authentication</h2>
      <form onSubmit={handleSubmit}>
        <input onBlur={handleEmailBlur} type="email" placeholder='email' />
        <br />
        <input onBlur={handlePasswordBlur} type="password" name="" id="" placeholder='password' />
      <br />
      <input type="submit" value="Login" />
      </form>
    </div>
  );
}

export default App;
