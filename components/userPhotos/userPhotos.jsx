import React from 'react';
import {
  Typography, Grid, Card, CardContent, CardMedia, Link
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import fetchModel from '../../lib/fetchModelData.js';

class UserPhotos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      photos: [],
    };
  }

  componentDidMount() {
    this.fetchUserData();
  }

  fetchUserData() {
    const userId = this.props.match.params.userId;
    fetchModel(`/user/${userId}`)
      .then((response) => {
        const user = response.data;
        this.setState({ user });
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });

    fetchModel(`/photosOfUser/${userId}`)
      .then((response) => {
        const photos = response.data;
        this.setState({ photos });
      })
      .catch((error) => {
        console.error('Error fetching user photos:', error);
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
          <Grid item xs={12} md={6} key={photo._id}>
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
                  <div key={comment._id}>
                    <Link component={RouterLink} to={`/users/${comment.user._id}`}>
                      {`${comment.user.first_name} ${comment.user.last_name}`}
                    </Link>
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
