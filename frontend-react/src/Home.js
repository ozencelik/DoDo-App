import React, { Component } from 'react';
import './App.css';
import AppNavbar from './AppBar';
import { Link } from 'react-router-dom';
import { Button, Container } from 'reactstrap';

class Home extends Component {
  render() {
    return (
      <div>
        <AppNavbar/>
        <Container fluid>
          <Button color="link"><Link to="/lists">Manage ToDo Lists</Link></Button>
        </Container>
      </div>
    );
  }
}

export default Home;