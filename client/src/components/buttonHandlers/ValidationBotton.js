import React, { useState } from 'react';
import axios from 'axios';

function ValidationBotton({ name }) {
  const [isdisable, setDisable] = useState(false);
  const validateHandler = () => {
    const options = {
      url: `http://localhost:5000/validationEmail/${name}`,
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
        setDisable(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <button disabled={isdisable} onClick={validateHandler}>
      validate
    </button>
  );
}

export default ValidationBotton;
