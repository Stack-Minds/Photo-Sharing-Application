import React from 'react';
import {
  AppBar, Toolbar, Typography
} from '@mui/material';
import './TopBar.css';
import fetchModel from '../../lib/fetchModelData.js';

class TopBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { version: null };
  }

  componentDidMount() {
    this.handleAppInfoChange();
}

  handleAppInfoChange(){
      const app_info = this.state.app_info;
      if (app_info === undefined){
          axios.get("/test/info")
              .then((response) =>
              {
                  this.setState({
                      app_info: response.data
                  });
              });
      }
  }

  render() {
    let title;
    const location = this.props.location.pathname;
    if (location === "/") {
      title = "Home";
    } else if (location.startsWith("/users/")) {
      const userId = location.split("/")[2];
      title = `User Profile (ID: ${userId})`;
    } else if (location.startsWith("/photos/")) {
      title = "Photos";
    } else {
      title = "Unknown";
    }

    return (
      <AppBar className="topbar-appBar" position="absolute">
        <Toolbar>
          <Typography variant="h5" color="inherit" style={{ flexGrow: 1 }}>
            StackMinds
          </Typography>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }} color="inherit">
            {title}
          </Typography>
          <Typography variant="h5" component="div" color="inherit">
            Version: {this.state.version}
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }
}

export default TopBar;
