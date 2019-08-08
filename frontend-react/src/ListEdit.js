import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppBar';

class ListEdit extends Component {

  emptyItem = {
    name: '',
    user: null,
    items: [
      {
          deadline: '',
          name: '',
          description: '',
          dependencies: []
      }
    ]
  };

  constructor(props) {
    super(props);
    this.state = {
      item: this.emptyItem
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    if (this.props.match.params.id !== 'new') {
      const list = await (await fetch(`/api/list/${this.props.match.params.id}`)).json();
      this.setState({item: list});
    }
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let item = {...this.state.item};

    console.log(item);
    console.log(item[name]);
    console.log(value);

    if(name == 'name'){
      item[name] = value;
    }else if(name == 'itemname'){
      item["items"][0].name = value;
    }else if(name == 'description'){
      item["items"][0].description = value;
    }else if(name == 'deadline'){
      item["items"][0].deadline = value;
    }



    
    this.setState({item});
  }

  async handleSubmit(event) {
    event.preventDefault();
    const {item} = this.state;

    await fetch('/api/list', {
      method: (item.id) ? 'PUT' : 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item),
    });
    this.props.history.push('/lists');
  }

  render() {
    const {item} = this.state;
    const title = <h2>{item.id ? 'Edit List' : 'Add List'}</h2>;
    
    
    return <div>
      <AppNavbar/>
      <Container>
        {title}
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
          <Label for="name">Name</Label>
            <Input type="text" name="name" id="name" value={item.name || ''}
                   onChange={this.handleChange}/>
          </FormGroup>
          <h2>Add Item to List</h2>
          <div className="group row">
            <FormGroup className="col-md-4 mb-3">
              <Label for="itemname">Item Name</Label>
              <Input type="text" name="itemname" id="itemname" value={item.items[0].name || ''}
                     onChange={this.handleChange} autoComplete="name"/>
            </FormGroup>
            <FormGroup className="col-md-5 mb-3">
              <Label for="description">Description</Label>
              <Input type="text" name="description" id="description" value={item.items[0].description || ''}
                     onChange={this.handleChange} autoComplete="description"/>
            </FormGroup>
            <FormGroup>
              <Label for="deadline">Deadline</Label>
              <Input type="date" name="deadline" id="deadline" min="2019-08-08" onChange={this.handleChange} value={item.items[0].deadline || ''}/>
            </FormGroup>
          </div>
          <FormGroup>
            <Button color="primary" type="submit">Save</Button>{' '}
            <Button color="secondary" tag={Link} to="/lists">Cancel</Button>
          </FormGroup>
        </Form>
      </Container>
    </div>

  }
}

export default withRouter(ListEdit);