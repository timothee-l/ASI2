import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";

export const UserForm = (props) =>{
    const [surname, setSurname] = useState('');
    const [last_name, setLastName] = useState('');
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [money, setMoney] = useState('');
    const [image, setImage] = useState('');
    const [registrationResult, setRegistrationResult] = useState(null);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      // Prepare data to send to the server
      const formData = {
        surname,
        last_name,
        login,
        password,
        money: parseInt(money, 10),
        image,
      };
  
      try {
        // Send a POST request to the server
        const response = await fetch('/db/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
  
        // Parse the server response
        const result = await response.json();
  
        // Update the state with the registration result
        setRegistrationResult(result.success ? 'Registration successful' : 'Registration failed');
      } catch (error) {
        console.error('Error during registration:', error);
        setRegistrationResult('An error occurred during registration');
      }
    };
  
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <label>
            Surname:
            <input type="text" value={surname} onChange={(e) => setSurname(e.target.value)} />
          </label>
          <br />
          <label>
            Last Name:
            <input type="text" value={last_name} onChange={(e) => setLastName(e.target.value)} />
          </label>
          <br />
          <label>
            Login:
            <input type="text" value={login} onChange={(e) => setLogin(e.target.value)} />
          </label>
          <br />
          <label>
            Password:
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          <br />
          <label>
            Money:
            <input type="number" value={money} onChange={(e) => setMoney(e.target.value)} />
          </label>
          <br />
          <label>
            Image URL:
            <input type="text" value={image} onChange={(e) => setImage(e.target.value)} />
          </label>
          <br />
          <button type="submit">Register</button>
        </form>
  
        {registrationResult && <p>{registrationResult}</p>}
      </div>
    );
  };
  
  export default UserForm;