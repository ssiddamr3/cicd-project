import APIServices from './APIServices';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

function UserLogin() {
  let navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isValid, setIsValid] = useState(false);

  const loginBtnHandler = async (event) => {
    event.preventDefault();
    let userDetails = await APIServices.loginUser(username);
    console.log(userDetails);
    console.log(username, password);
    if (password === userDetails['password']) {
      navigate('/user-home',{
        state:{username:username}
      });
    }
  }

  const usernameHandler = async (event) => {
    await setUsername(event.target.value);
  }

  const passwordHandler = (event) => {
    setPassword(event.target.value);
  }

  return (
    <div>
      <p className='CommonText'>Login Page</p>
      <label className='usr'>
        Username:
        <input onChange={usernameHandler} id='username' type='text' />
      </label>
      <br />
      <label className='pwd'>
        Password:
        <input onChange={passwordHandler} id='password' type='password' />
      </label>
      <br />
      <button onClick={loginBtnHandler}>
        Login
      </button>
      {isValid ?
        <p>Valid</p> :
        <p>Enter valid credentials</p>}
    </div>
  );
}

export default UserLogin;
