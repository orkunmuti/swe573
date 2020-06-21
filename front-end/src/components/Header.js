import React, { useContext, useEffect, useState } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import ExitIcon from '@material-ui/icons/ExitToApp';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import AppModal from '../components/AppModal';
import { Link } from 'react-router-dom';
import UserContext from '../context/UserContext';
import { toast } from 'react-toastify';
import auth from '../utils/auth';
import { useHistory } from 'react-router-dom';
import AppDrawer from '../components/AppDrawer';

export default function Header() {
  const classes = useStyles();
  const [isModalOpen, setModalOpen] = useState(false);
  const [drawerVisibility, setDrawerVisibility] = useState(false);
  let isOnAuthPage = false;

  let history = useHistory();

  // if (
  //   history.location.pathname === '/signin' ||
  //   history.location.pathname === '/signup' ||
  //   history.location.pathname === '/forgotpassword'
  // ) {
  //   isOnAuthPage = false;
  // }

  console.log(history.location.pathname);

  const contextUser = useContext(UserContext);

  const handleAuthClick = () => {
    if (!contextUser.user) {
      setModalOpen(true);
    } else {
      contextUser.setUser(undefined);
      contextUser.removeToken();
      auth.logout();
      history.push('/recipes');

      toast('You have signed out.', {
        position: 'bottom-center',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const handleDrawerVisibility = (visibility) => {
    setDrawerVisibility(visibility);
  };

  return (
    <div className={classes.grow}>
      <AppBar position='static'>
        <Toolbar>
          <IconButton
            onClick={() => handleDrawerVisibility(true)}
            edge='start'
            className={classes.menuButton}
            color='inherit'
            aria-label='open drawer'>
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant='h6' noWrap>
            <Link
              style={{
                textDecoration: 'none',
                color: 'white',
                cursor: 'pointer',
              }}
              to='/recipes'>
              Chewy
            </Link>
          </Typography>

          <div className={classes.grow} />

          {!isOnAuthPage && (
            <div>
              <IconButton
                aria-label='show more'
                aria-haspopup='true'
                onClick={handleAuthClick}
                color='inherit'>
                <i
                  className={
                    contextUser.user ? 'sign out icon' : 'sign out icon'
                  }
                />
                <Link to='/signin' style={{ color: 'white' }}>
                  <span style={{ fontSize: '1rem', marginLeft: '0.5rem' }}>
                    {contextUser.user ? 'Sign out' : 'Sign in / Sign up'}
                  </span>
                </Link>
              </IconButton>
            </div>
          )}
        </Toolbar>
        <AppDrawer
          isOpen={drawerVisibility}
          toggleDrawer={handleDrawerVisibility}
        />
      </AppBar>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));
