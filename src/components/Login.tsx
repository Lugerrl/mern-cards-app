import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [message, setMessage] = useState('');
  const [loginName, setLoginName] = useState('');
  const [loginPassword, setPassword] = useState('');
  const navigate = useNavigate();

  function handleSetLoginName(e: React.ChangeEvent<HTMLInputElement>): void {
    setLoginName(e.target.value);
  }

  function handleSetPassword(e: React.ChangeEvent<HTMLInputElement>): void {
    setPassword(e.target.value);
  }

  async function doLogin(event: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLInputElement>): Promise<void> {
    event.preventDefault();

    const obj = { login: loginName, password: loginPassword };
    const js = JSON.stringify(obj);

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        body: js,
        headers: { 'Content-Type': 'application/json' }
      });

      const res = await response.json();

      if (res.id <= 0) {
        setMessage('User/Password combination incorrect');
      } else {
        const user = {
          firstName: res.firstName,
          lastName: res.lastName,
          id: res.id
        };
        localStorage.setItem('user_data', JSON.stringify(user));
        setMessage('');
        navigate('/cards');
      }
    } catch (error: any) {
      alert(error.toString());
    }
  }

  return (
    <form id="loginForm" onSubmit={doLogin}>
      <div id="loginDiv">
        <span id="inner-title">PLEASE LOG IN</span><br />
        <input
          type="text"
          id="loginName"
          placeholder="Username"
          value={loginName}
          onChange={handleSetLoginName}
        /><br />
        <input
          type="password"
          id="loginPassword"
          placeholder="Password"
          value={loginPassword}
          onChange={handleSetPassword}
        /><br />
        <input
          type="submit"
          id="loginButton"
          className="buttons"
          value="Do It"
        />
        <span id="loginResult">{message}</span>
      </div>
    </form>
  );
}

export default Login;
