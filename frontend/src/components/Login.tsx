import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [loginName, setLoginName] = useState('');
  const [loginPassword, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  async function doLogin(e: React.FormEvent) {
    e.preventDefault();
    const obj = { login: loginName, password: loginPassword };
    const js = JSON.stringify(obj);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/login`, {
        method: 'POST',
        body: js,
        headers: { 'Content-Type': 'application/json' },
      });

      const res = await response.json();

      if (res.id <= 0) {
        setMessage('User/Password combination incorrect');
      } else {
        localStorage.setItem('user_data', JSON.stringify(res));
        setMessage('');
        navigate('/cards');
      }
    } catch (err: any) {
      alert(err.toString());
    }
  }

  return (
    <form onSubmit={doLogin}>
      <div id="loginDiv">
        <span>PLEASE LOG IN</span><br />
        <input type="text" placeholder="Username" onChange={e => setLoginName(e.target.value)} /><br />
        <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} /><br />
        <input type="submit" value="Do It" />
        <span>{message}</span>
      </div>
    </form>
  );
}

export default Login;
