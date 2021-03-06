import React from 'react';
import { render } from 'react-dom';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'

import App from './components/App/App';
import NotFound from './components/App/NotFound';
import Home from './components/Home/Home';
import HelloWorld from './components/HelloWorld/HelloWorld';

import Login from './components/Login/Login';
import Register from './components/Register/Register';

import './styles/styles.scss';

render((
  <Router>

      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/helloworld" component={HelloWorld}/>
        <Route path="/login" component={Login}/>
        <Route path="/register" component={Register}/>
        <Route component={NotFound}/>
      </Switch>

  </Router>
), document.getElementById('app'));
