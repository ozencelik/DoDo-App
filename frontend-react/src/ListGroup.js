import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';

class ListGroup extends Component {

  constructor(props) {
    super(props);
    this.state = {lists: [], isLoading: true, activeId: 5};
    this.remove = this.remove.bind(this);
  }

  componentDidMount() {
    this.setState({isLoading: true});

    fetch('api/lists')
      .then(response => response.json())
      .then(data => this.setState({lists: data, isLoading: false}));
  }

  async remove(id) {
    await fetch(`/api/list/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(() => {
      let updatedLists = [...this.state.lists].filter(i => i.id !== id);
      this.setState({lists: updatedLists});
    });
  }

  render() {
    const {lists, isLoading, activeId} = this.state;
    
    if (isLoading) {
      return <p>Loading...</p>;
    }

    const listGroup = lists.map(list => {
        return <div id="content" key={list.id}>
          <Button color="success" tag={Link} to="/lists/new" disabled>{list.name}, {list.id}</Button>
          &nbsp;
        </div>
    });
    const items = lists.map(list => {
        if(list.id == activeId){
          return list.items.map(item => {
              return <tr key={item.id}>
              <td style={{whiteSpace: 'nowrap'}}>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.dependencies.map(ite => {
                return <Button key={ite.id} type="button" disabled size="sm" color="info">{ite.name}</Button>
              })}</td>
              <td>
                <Button size="sm" color="primary" tag={Link} to={"/lists/" + list.id}>Show  </Button>
                &nbsp;
                <Button size="sm" color="danger" onClick={() => this.remove(list.id)}>Delete</Button>
              </td>
            </tr>
          });
  
        }
      });
  

      return (
        <div id="content">
          <AppNavbar/>
          <Container fluid>
  
            <div className="float-right">
              <Button color="success" tag={Link} to="/lists/new">Add New Lists</Button>
            </div>
            <h2>My Todo Lists</h2>
  
            <div className="row">
                {listGroup}
            </div>
  
            
            <Table className="mt-4">
              <thead>
              <tr>
                <th width="20%">Id</th>
                <th width="20%">Name</th>
                <th width="20%">Items</th>
                <th width="20%">Actions</th>
              </tr>
              </thead>
              <tbody>
                {items}
              </tbody>
            </Table>
  
          </Container>
        </div>
      );
  }
}

export default ListGroup;