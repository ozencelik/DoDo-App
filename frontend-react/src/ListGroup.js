import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppBar';
import { Link } from 'react-router-dom';

class ListGroup extends Component {

  constructor(props) {
    super(props);
    this.state = {lists: [], isLoading: true, activeId: -1};
    this.remove = this.remove.bind(this);

    this.setActiveId = this.setActiveId.bind(this);
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

  async setActiveId(event) {
    const target = event.target;
    const value = target.value;
    let id = {...this.state.activeId};
    id = value;
    this.state.activeId = id;

    const {activeId} = id;

    this.props.history.push('/lists'); //Render the page without reload.
  }

  render() {
    const {lists, isLoading, activeId} = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    const getListTitle = lists.map(list => {
      if(list.id == this.state.activeId){
        return <h2>{list.name}</h2>
      }
    });

    const listGroup = lists.map(list => {
        return <div key={list.id}>
          <Button color="primary" value={list.id || ''}
                     onClick={this.setActiveId}>{list.name}</Button>
          &nbsp;
        </div>
    });

    
    const items = lists.map(list => {
        if(list.id == this.state.activeId){
          return list.items.map(item => {
              return <tr key={item.id}>
              <td style={{whiteSpace: 'nowrap'}}>{item.name}</td>
              <td>{item.description}</td>
              <td>{item.dependencies.map(ite => {
                return <Button key={ite.id} type="button" disabled size="sm" color="info">{ite.name}</Button>
              })}</td>
              <td>
                <Button size="sm" color="success" tag={Link} to={"/lists/" + list.id}>Complete</Button>
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
              <Button tag={Link} to="/lists/new">Add New Lists</Button>
            </div>
            <h2>{getListTitle}</h2>
  
            <div className="row">
                {listGroup}
            </div>
  
            
            <Table className="mt-4">
              <thead>
              <tr>
                <th width="20%">Name</th>
                <th width="20%">Descripton</th>
                <th width="20%">Dependency Items</th>
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