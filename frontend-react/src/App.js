import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    isLoading: true,
    lists: []
  };

  async componentDidMount() {
    const response = await fetch('/api/lists');
    const body = await response.json();
    this.setState({ lists: body, isLoading: false });
  }

  render() {
    const {lists, isLoading} = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    return (  
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <div className="App-intro">
            <h2>Özenç Çelik - ToDo Lists</h2>
            {lists.map(list =>
              <div key={list.id}>
                {list.name}
              </div>
            )}
          </div>
        </header>
      </div>
    );
  }
}

export default App;