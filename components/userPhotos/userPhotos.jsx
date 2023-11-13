import React from 'react';
import {
  Typography, Grid, Card, CardContent, CardMedia, Link
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import axios from 'axios';

class UserPhotos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      photos: [],
    };
  }

  componentDidMount() {
    const newUserId = this.props.match.params.userId;
    this.fetchUser(newUserId);
  }

  componentDidUpdate() {
    const newId = this.props.match.params.userId;
    const current_user_id = this.state.userId;
    if (current_user_id  !== newId){
        this.fetchUser(newId);
    }
  }

  fetchUser(userId){
    axios.get("/photosOfUser/" + userId)
        .then((response) =>
        {
            this.setState({
                userId : userId,
                userPhotosDetails: response.data
            });
        });
    axios.get("/user/" + userId)
        .then((response) =>
        {
            const new_user = response.data;
            const main_content = "User Photos for " + new_user.first_name + " " + new_user.last_name;
            this.props.changeTopbarContent(main_content);
        });
  }

  render() {
    const { user, photos } = this.state;

    if (!user || !photos) {
      return <Typography variant="h5">Photos or User not found</Typography>;
    }

    return (
      <Grid container spacing={2}>
        {photos.map((photo) => (
          <Grid item xs={12} md={6} key={photo._id}> {/* Add a key prop here */}
            <Card variant="outlined">
              <CardMedia
                component="img"
                alt={`Photo by ${user.first_name} ${user.last_name}`}
                height="300"
                image={`/images/${photo.file_name}`}
                title={`Photo by ${user.first_name} ${user.last_name}`}
              />
              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                  {photo.date_time}
                </Typography>
                {photo.comments && photo.comments.map((comment) => (
                  <div key={comment._id}> {/* Add a key prop here */}
                    {comment.user && (
                      <Link component={RouterLink} to={`/users/${comment.user._id}`}>
                        {`${comment.user.first_name} ${comment.user.last_name}`}
                      </Link>
                    )}
                    <Typography variant="body2" color="textSecondary" component="p">
                      {comment.date_time}: {comment.comment}
                    </Typography>
                  </div>
                ))}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  }
}

export default UserPhotos;
