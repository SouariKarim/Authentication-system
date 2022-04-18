import React from 'react';
import axios from 'axios';

function TokenBotton({ name }) {
  const tokenHandler = () => {
    const options = {
      url: `http://localhost:5000/generateToken/${name}`,
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
        Authorization: localStorage.getItem('token'),
      },
    };

    axios(options)
      .then((response) => {
        // this is the token
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return <button onClick={tokenHandler}>generate token</button>;
}

export default TokenBotton;
