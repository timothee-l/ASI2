import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {set_user} from '../slices/userSlice.js';

export const UserForm = (props) =>{
    const [surName, setSurName] = useState('');
    const [lastName, setLastName] = useState('');
    const [login, setLogin] = useState('');
    const [pwd, setPwd] = useState('');
    const [account, setAccount] = useState('');
    const [img, setImg] = useState('');
    const [registrationResult, setRegistrationResult] = useState(null);
    const dispatch = useDispatch();
    let current_user = useSelector(state => state.userReducer.user);
    console.log("user:"+JSON.stringify(current_user));  
  
    const handleSubmit = async () => {
      // Prepare data to send to the server
      const formData = {
        surName,
        lastName,
        login,
        pwd,
        account: parseInt(account, 10),
        img,
      };
    
      try {
        // Send a POST request to the server
        const response = await fetch('/mono/user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
    
        // Parse the server response
        const result = await response.json();
    
        console.log(result);
    
        // Check for success and handle accordingly
        if (result.success) {
          // Registration successful, user object is available
          dispatch(set_user(result));
          setRegistrationResult('Registration successful');
          console.log('User Object:', result.user);
        } else {
          // Registration failed, handle the error
          setRegistrationResult('Registration failed');
        }
      } catch (error) {
        // Handle network or other errors
        console.error('Error during registration:', error);
        setRegistrationResult('An error occurred during registration');
      }
    };
    
  
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <label>
            Surname:
            <input type="text" value={surName} onChange={(e) => setSurName(e.target.value)} />
          </label>
          <br />
          <label>
            Last Name:
            <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
          </label>
          <br />
          <label>
            Login:
            <input type="text" value={login} onChange={(e) => setLogin(e.target.value)} />
          </label>
          <br />
          <label>
            Password:
            <input type="pwd" value={pwd} onChange={(e) => setPwd(e.target.value)} />
          </label>
          <br />
          <label>
            Money:
            <input type="number" value={account} onChange={(e) => setAccount(e.target.value)} />
          </label>
          <br />
          <label>
            img URL:
            <input type="text" value={img} onChange={(e) => setImg(e.target.value)} />
          </label>
          <br />
          <button type="submit">Register</button>
        </form>
  
        {registrationResult && <p>{registrationResult}</p>}
      </div>
    );
  };
  
  export default UserForm;