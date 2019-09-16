import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import Nuevo from './components/Nuevaplanta';
import DetallePlanta from './components/DetallePlanta';
import * as serviceWorker from './serviceWorker';

const routing = (
    <Router>
      <>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/">Plantitas</Navbar.Brand>
        <Nav className="mr-auto">
        <Nav.Link href="/">Inicio</Nav.Link>
          <Nav.Link href="/nueva-planta">Nueva planta</Nav.Link>
        </Nav>
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-info">Search</Button>
        </Form>
      </Navbar>
      </>
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
