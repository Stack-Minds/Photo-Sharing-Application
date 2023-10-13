import React from 'react';
import {
  AppBar, Toolbar, Typography, Box
} from '@mui/material';
import './TopBar.css';
import fetchModel from '../../lib/fetchModelData.js';

class TopBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let title;
    const location = this.props.location.pathname;
    if (location === "/") {
      title = "Home";
    } else if (location.startsWith("/users/")) {
      const userId = location.split("/")[2];
      const user = window.models.userModel(userId);
      title = user ? `${user.first_name} ${user.last_name}` : "User Not Found";
    } else if (location.startsWith("/photos/")) {
      const userId = location.split("/")[2];
      const user = window.models.userModel(userId);
      title = user ? `Photos of ${user.first_name} ${user.last_name}` : "Photos Not Found";
    } else {
      title = "Unknown";
    }

    return (
      <AppBar className="topbar-appBar" position="absolute">
        <Toolbar>
          <Typography variant="h5" color="inherit" style={{ flexGrow: 1 }}>
            StackMinds
          </Typography>
          <Box display={{ xs: 'none', sm: 'block' }}>
            <Typography variant="h6" color="inherit">
              {title}
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
    );
  }
}

export default TopBar;
