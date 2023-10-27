import React from 'react';
import {
  Typography, Grid, Card, CardContent, Link
} from '@mui/material';
import './userDetail.css';
import { Link as RouterLink } from 'react-router-dom';
import fetchModel from '../../lib/fetchModelData.js';

class UserDetail extends React.Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = { user: undefined };
  }

  componentDidMount() {
    const new_user_id = this.props.match.params.userId;
    this.handleUserChange(new_user_id);
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  componentDidUpdate() {
    const new_user_id = this.props.match.params.userId;
    const current_user_id = this.state.user?._id;
    if (current_user_id  !== new_user_id){
        this.handleUserChange(new_user_id);
    }
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
