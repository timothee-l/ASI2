// import react tools
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
// import the created Main component
import {App} from './App';
import store from './store.js';
//add Semantic UI import
import './lib/Semantic-UI-CSS/semantic.min.css'


//Insert a <Main> component inside the <div id='root'/>
// send the property title to the App component
  ReactDOM.createRoot(document.getElementById('root')).render(
      <Provider store={store} >
        <App />
      </Provider>
  )
  