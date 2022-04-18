import { useEffect, useState } from 'react';
import axios from 'axios';
import './validationPage.css';

import ValidationBotton from '../buttonHandlers/ValidationBotton';
import TokenBotton from '../buttonHandlers/TokenBotton';

const ValidationPage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const onSubmit = (e) => {
      const options = {
        url: 'http://localhost:5000/validationPage',
        method: 'GET',
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      };

      axios(options)
        .then((response) => {
          // this is the token
          console.log(response.data);
          setData(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    onSubmit();
  }, []);

  return (
    <>
      <table className='tg'>
        <thead>
          <tr>
            <th className='tg-0pky'>name</th>
            <th className='tg-0pky'>lastname</th>
            <th className='tg-0pky'>email</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td className='tg-0pky'> {item.name} </td>
              <td className='tg-0pky'> {item.lastname} </td>
              <td className='tg-0pky'> {item.email} </td>
              <td>
                <ValidationBotton name={item.name} />
              </td>
              <td>
                <TokenBotton name={item.name} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default ValidationPage;
