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

  componentDidUpdate() {
    const new_user_id = this.props.match?.params.userId;
    const current_user_id = this.state.user_id;
    if (current_user_id  !== new_user_id){
      this.fetchUser(new_user_id);
    }
  }

  fetchUser(user_id){
    this.setState({
      user_id: user_id
    });
  }

  fetchUserList(){
      axios.get("/user/list")
        .then((response) =>
          {
              this.setState({
              userListModel: response.data
          });
        });
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
