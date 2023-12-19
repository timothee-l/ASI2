import React, { useState } from 'react';
import { Grid, Segment, Menu } from 'semantic-ui-react';
import { useEffect } from 'react';
import { 
  BrowserRouter,
  Routes,
  Route,
  NavLink
} from "react-router-dom";
import io from 'socket.io-client';

import { Home } from './pages/Home';
import { Display } from './pages/Display';
import { FormDisplay } from './pages/FormDisplay';
import { Achat } from './pages/Magasin/Achat';
import { Vente } from './pages/Magasin/Vente';
import { SelecDeck } from './pages/Jeu/SelecDeck';
import { Jeu } from './pages/Jeu/Jeu';
import { useSelector } from 'react-redux';


//Create function component
export const App =(props) =>{
  let current_user = useSelector(state => state.userReducer.user);

  useEffect(() => {
    const socket = io({path: "/socket-service/", transports: ["websocket"]});

    // Register the client with the server
    socket.emit('register-client', current_user.id);

    // Listen for the 'post-data' event
    socket.on('post-data', (data) => {
      console.log(`Received data from server for client ${current_user.id}:`, data);
    });

    // Clean up the WebSocket connection when the component unmounts
    return () => {
      socket.disconnect();
    };
  }, []);
   
  return (
    <>
      <BrowserRouter>
      <Menu>
        <Menu.Item
          name='menuHome'
          
        >
        <NavLink to="/" >Home</NavLink>
        </Menu.Item> 
        <Menu.Item
          name='menuConnexion'
        >
        <NavLink to="/display">Connexion</NavLink>
        </Menu.Item> 
        <Menu.Item
          name='menuInscription'
        >
        <NavLink to="/form"> Inscription</NavLink>
        </Menu.Item> 
        <Menu.Item
          name='menuAchat'
          
        >
        <NavLink to="/achat" >Achat</NavLink>
        </Menu.Item> 
        <Menu.Item
          name='menuVente'
          
        >
        <NavLink to="/vente" >Vente</NavLink>
        </Menu.Item> 
      </Menu>
      <div>
       
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Routes>
        <Route path='/achat' element={<Achat/>} />
        <Route path='/vente' element={<Vente/>} />
        <Route path='/display' element={<Display/>} />
        <Route path='/form' element={<FormDisplay/>} />
        <Route path='/deck' element={<SelecDeck/>} />
        <Route path='/room' element={<Jeu/>} />
        <Route path='/' element={<Home/>} />
        </Routes>
      </div>
    </BrowserRouter>
     
    </>
  );
}

