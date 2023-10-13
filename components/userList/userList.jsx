import React from 'react';
import { Link } from 'react-router-dom';
import {HashRouter as Router} from 'react-router-dom';
import fetchModel from '../../lib/fetchModelData.js';

class UserList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { users : [], };
    }

    addUserName(user) {
        if (!user) return "";
        return user.first_name + " " + user.last_name;
    }

    addList() {
        return (
          this.state.users.map((user) =>
              <ListItem divider={true} key={user._id}>
                <Link to={"/users/" + user._id} className="user-list-item">
                  <ListItemText primary={this.addUserName(user)} />
                </Link>
              </ListItem>
          )
        );
    }

    componentDidMount() {
        fetchModel('/user/list')
          .then((response) => {
            let users = response['data'];
            this.setState({ users : users });
          })
          .catch((e) => {
            console.log(e);
          });
    }

    render() {
        return (
          <Router>
            <List component="nav">
              {this.addList()}
            </List>
          </Router>
        );
    }
}

export default UserList;
