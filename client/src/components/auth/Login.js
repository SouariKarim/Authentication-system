import { useState } from 'react';
import axios from 'axios';

import { Link, Navigate } from 'react-router-dom';

const Login = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const { username, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    console.log('form submitted !!!');
    const options = {
      url: 'http://localhost:5000/login',
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
      },
      data: formData,
    };

    axios(options)
      .then((response) => {
        // this is the token
        console.log(response.data.token);
        localStorage.setItem('token', response.data.token);
        setIsAuthenticated(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (isAuthenticated) {
    return <Navigate to='/validationPage' />;
  }

  if (localStorage.getItem('token')) {
    <Navigate to='/validationPage' />;
  }

  return (
    <>
      <h1>Sign In to your account</h1>
      <form className='form' onSubmit={onSubmit}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Username'
            name='username'
            value={username}
            onChange={onChange}
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Password'
            name='password'
            value={password}
            onChange={onChange}
            minLength='2'
          />
        </div>
        <input type='submit' className='btn btn-primary' value='Login' />
      </form>
    </>
  );
};

export default Login;
