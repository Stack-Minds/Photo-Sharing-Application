import React, { Component } from 'react';
import { List, ListItem, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';

class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
    };
  }

  componentDidMount() {
    this.fetchUserList();
  }

  fetchUserList() {
    axios.get('/user/list')
      .then((response) => {
        const users = response.data;
        this.setState({ users });
      })
      .catch((error) => {
        console.error('Error fetching user list:', error);
      });
  }

  addUserName(user) {
    if (!user) return '';
    return user.first_name + ' ' + user.last_name;
  }

  render() {
    return (
      <List component="nav">
        {this.state.users.map((user) => (
          <ListItem divider={true} key={user._id}>
            <Link to={`/users/${user._id}`} className="user-list-item">
              <ListItemText primary={this.addUserName(user)} />
            </Link>
          </ListItem>
        ))}
      </List>
    );
  }
}

export default UserList;
