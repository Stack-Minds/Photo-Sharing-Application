import React from 'react';
import {
  Typography, Grid, Card, CardContent, Link, Button
} from '@mui/material';
import './userDetail.css';
import { Link as RouterLink } from 'react-router-dom';
import axios from 'axios';

class UserDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        user: undefined
    };
  }
  componentDidMount() {
      const new_user_id = this.props.match.params.userId;
      this.handleUserChange(new_user_id);
  }

  componentDidUpdate() {
      const new_user_id = this.props.match.params.userId;
      const current_user_id = this.state.user?._id;
      if (current_user_id  !== new_user_id){
          this.handleUserChange(new_user_id);
      }
  }

  handleUserChange(user_id){
      axios.get("/user/" + user_id)
          .then((response) =>
          {
              const new_user = response.data;
              this.setState({
                  user: new_user
              });
              const main_content = "User Details for " + new_user.first_name + " " + new_user.last_name;
              this.props.changeMainContent(main_content);
          });
  }

  render() {
    const { user } = this.state;
    const topNameValue = user ? `User details for ${user.first_name} ${user.last_name}` : '';
    return (
      <div>
        <TopBar topName={topNameValue} />
        {user ? (
          <div>
            <Grid container justifyContent="space-between">
              <Grid item>
                <Button component={Link} to={`/photos/${user._id}`} variant="contained" color="primary">
                  User Photos
                </Button>
              </Grid>
            </Grid>

            <div className="user-detail-box" style={{ marginTop: '16px' }}>
              <Typography variant="body1" className="user-detail-title">
                First Name
              </Typography>
              <Typography variant="body1" className="user-detail-value">
                {user.first_name}
              </Typography>
            </div>

            {/* Include other user details here */}            

            <div className="user-detail-box">
              <Typography variant="body1" className="user-detail-title">
                Last Name
              </Typography>
              <Typography variant="body1" className="user-detail-value">
                {user.last_name}
              </Typography>
            </div>
            <div className="user-detail-box">
              <Typography variant="body1" className="user-detail-title">
                Location
              </Typography>
              <Typography variant="body1" className="user-detail-value">
                {user.location}
              </Typography>
            </div>
            <div className="user-detail-box">
              <Typography variant="body1" className="user-detail-title">
                Description
              </Typography>
              <Typography variant="body1" className="user-detail-value">
                {user.description}
              </Typography>
            </div>
            <div className="user-detail-box">
              <Typography variant="body1" className="user-detail-title">
                Occupation
              </Typography>
              <Typography variant="body1" className="user-detail-value">
                {user.occupation}
              </Typography>
            </div>
          </div>
        ) : (
          <Typography variant="body1" className="user-detail-box loading-text">
            Loading user details...
          </Typography>
        )}
      </div>
    );
  }
}

export default UserDetail;
