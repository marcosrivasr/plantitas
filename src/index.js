import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import App from './App';
import Nuevo from './components/Nuevaplanta'
import DetallePlanta from './components/DetallePlanta'
import * as serviceWorker from './serviceWorker';

const routing = (
    <Router>
        <div className="menu-container">
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/nueva-planta">Nuevo</a></li>
            </ul>
            <div className="boton-fl"><a href="/nueva-planta">+</a></div>
        </div>
      <div>
        <Route exact path="/" component={App} />
        <Route path="/nueva-planta" component={Nuevo} />
        <Route path="/ver-planta/:id" component={DetallePlanta} />
      </div>
    </Router>
  )
  

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
