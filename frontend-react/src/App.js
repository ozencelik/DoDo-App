import React, { Component } from 'react';
import './App.css';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ListGroup from './ListGroup';
import ListEdit from './ListEdit';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path='/' exact={true} component={Home}/>
          <Route path='/lists' exact={true} component={ListGroup}/>
          <Route path='/lists/:id' component={ListEdit}/>
        </Switch>
      </Router>
    )
  }
}

export default App;