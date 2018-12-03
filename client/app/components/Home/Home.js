import React, { Component } from 'react';
import 'whatwg-fetch';


import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';



class Home extends Component {

  state = {
    res: {
      success: false
    }
  }

  componentDidMount() {
          // Verify token
    fetch('/api/account/verify')
      .then(res => res.json())
      .then(json => {
        console.log(json);
        this.setState({res: json});
      })


  }


  render() {
    const {

    } = this.props;



    return (
        <div>
          <AppBar position="static">
            <Toolbar>
              <IconButton color="inherit" aria-label="Menu">
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" color="inherit" >
                News
              </Typography>
              {this.state.res.success ? this.state.res.user.email : 'not logged in'}
            </Toolbar>
          </AppBar>

        </div>
      );
    }


}

export default Home;
