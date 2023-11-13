import React from 'react';
import {
  Typography, Grid, Card, CardContent, Link, TextField, Button
} from '@mui/material';
import './userDetail.css';
import { Link as RouterLink } from 'react-router-dom';
import axios from 'axios';

class UserDetail extends React.Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = { user: {} };
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  componentDidMount() {
    const newId = this.props.match.params.userId;
    this.handleUserChange(newId);
}

  componentDidUpdate() {
    const newId = this.props.match.params.userId;
    const currentId = this.state.userDetails?._id;
    if (currentId  !== newId){
        this.handleUserChange(newId);
    }
  }

  handleUserChange(userId){
    axios.get("/user/" + userId)
        .then((response) =>
        {
            const newUser = response.data;
            this.setState({
                userDetails: newUser
            });
            const main_content = "User Details " + newUser.first_name + " " + newUser.last_name;
            this.props.changeTopbarContent(main_content);
        });
  }

  render() {
    const { user } = this.state;

    if (!user) {
      return <Typography variant="h5">User not found</Typography>;
    }

    return (
      <Card variant="outlined">
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h5">{`${user.first_name} ${user.last_name}`}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1">Location: {user.location}</Typography>
              <Typography variant="body1">Description: {user.description}</Typography>
              <Typography variant="body1">Occupation: {user.occupation}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Link component={RouterLink} to={`/photos/${user._id}`}>
                View Photos
              </Link>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  }
}

export default UserDetail;
