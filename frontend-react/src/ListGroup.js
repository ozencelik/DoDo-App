import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppBar';
import { Link } from 'react-router-dom';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import { withRouter } from 'react-router'

class ListGroup extends Component {

  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor(props) {
    super(props);
    const {cookies} = props;
    this.state = {lists: [], csrfToken: cookies.get('XSRF-TOKEN'), isLoading: true};
    this.remove = this.remove.bind(this);

    this.setActiveId = this.setActiveId.bind(this);
  }

  componentDidMount() {
    this.setState({isLoading: true});

    fetch('api/lists')
      .then(response => response.json())
      .then(data => this.setState({lists: data, isLoading: false}))
      .catch(() => this.props.history.push('/'));
  }

  async remove(id) {
    await fetch(`/api/list/${id}`, {
      method: 'DELETE',
      headers: {
        'X-XSRF-TOKEN': this.state.csrfToken,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    }).then(() => {
      let updatedLists = [...this.state.lists].filter(i => i.id !== id);
      this.setState({lists: updatedLists});
    });

    this.props.history.push('/lists'); //Render the page without reload.
  }

  async removeItem(itemId, listId) {
    await fetch(`/api/list/${listId}/item/${itemId}`, {
      method: 'DELETE',
      headers: {
        'X-XSRF-TOKEN': this.state.csrfToken,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    }).then(() => {
      let updatedLists = [...this.state.lists.items].filter(i => i.id !== id);
      this.setState({lists: updatedLists});
    });

    this.props.history.push('/lists'); //Render the page without reload.
  }

  async setActiveId(event) {
    const target = event.target;
    const value = target.value;
    let id = {...this.state.activeId};
    id = value;
    this.state.activeId = id;

    const {activeId} = id;

    window.location.reload();
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
                <Button size="sm" color="danger" onClick={() => this.removeItem(item.id, list.id)}>Delete</Button>
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
              <br></br>&nbsp;
              <div className="column">
                <Button color="info" tag={Link} to={"/lists/" + this.state.activeId}>Edit</Button>
                &nbsp;
                <Button color="danger" onClick={() => this.remove(this.state.activeId)}>Delete</Button>
              </div>
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

export default withCookies(ListGroup);