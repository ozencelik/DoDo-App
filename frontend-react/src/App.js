import React, { Component } from 'react';
import './App.css';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ListGroup from './ListGroup';
import ListEdit from './ListEdit';
import { CookiesProvider } from 'react-cookie';

class App extends Component {
  render() {
    return (
      <CookiesProvider>
        <Router>
          <Switch>
            <Route path='/' exact={true} component={Home}/>
            <Route path='/lists' exact={true} component={ListGroup}/>
            <Route path='/lists/:id' component={ListEdit}/>
          </Switch>
        </Router>
      </CookiesProvider>
    )
  }
}

export default App;