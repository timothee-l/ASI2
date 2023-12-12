import React, { useState } from 'react';
import { Grid, Segment, Menu } from 'semantic-ui-react';
import { 
  BrowserRouter,
  Routes,
  Route,
  NavLink
} from "react-router-dom";

import { Home } from './pages/Home';
import { Display } from './pages/Display';
import { FormDisplay } from './pages/FormDisplay';
import { Achat } from './pages/Magasin/Achat';
import { Vente } from './pages/Magasin/Vente';

//Create function component
export const App =(props) =>{
  const [currentUser,setCurrentUser]= useState({
                                      id:12,
                                      surname:"John",
                                      lastname:"Doe",
                                      login:"jDoe",
                                      pwd:"jdoepwd",
                                      img:'https://www.nicepng.com/png/full/982-9820051_heart-2352306885-deadpool-png.png',
                                      money:1000,
                                    });


   
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
        <Route path='/' element={<Home/>} />
        </Routes>
      </div>
    </BrowserRouter>
     
    </>
  );
}

