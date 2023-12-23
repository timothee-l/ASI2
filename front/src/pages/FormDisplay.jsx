import React, { useState } from 'react';
import { Grid, Segment,Container } from 'semantic-ui-react'
import {User } from '../components/user/containers/User.jsx'
import {UserForm } from '../components/userform/UserForm.jsx'
import { useNavigate } from 'react-router-dom';



export const FormDisplay =(props) =>{
const [currentUser,setCurrentUser]= useState({});

const navigate = useNavigate();

function callbackErr(data){
  console.log(data);
};


function handleChange(data){
  console.log(data);
  setCurrentUser({
    id:data.id,
    surname:data.surname,
    lastname:data.lastname,
    login:data.login,
    pwd:data.pwd,
    money:data.money,
    img:data.img,
  });
};

function redirectHandler(data){

  navigate('/display');
};

return (
  <Container>
  
    <Segment>
      <UserForm 
            handleChange={handleChange}
            redirect={redirectHandler}>
      </UserForm>
    </Segment>
        
  </Container>
);
}
