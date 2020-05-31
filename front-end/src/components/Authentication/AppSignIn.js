import React, { useState, useContext } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { colors } from '../../styles';
import authCover from '../../assets/authCover.jpg';
import { toast } from 'react-toastify';
import UserContext from '../../context/UserContext';
import url from '../../constants/api';
import jwt from 'jsonwebtoken';
import auth from '../../utils/auth';
import InputValidation from '../../utils/InputValidation';
import validationConfig from '../../utils/validationConfig';

export const AppSignIn = (props) => {
  const classes = useStyles();
  const [user, setUser] = useState({
    email: 'vadersama@gmail.com',
    password: '123456',
  });

  let config = validationConfig();
  let validation = new InputValidation(config);

  const [errors, setErrors] = useState({
    emailError: null,
    passwordError: null,
  });

  const checkInputs = () => {
    let isError = false;
    let newError = { ...errors };

    newError.emailError = validation.validateInput('email', user.email);
    setErrors(newError);
    if (newError.emailError) isError = true;

    newError.passwordError = validation.validateInput(
      'password',
      user.password,
    );
    setErrors(newError);
    if (newError.emailError) isError = true;

    return isError;
  };

  const contextUser = useContext(UserContext);

  const handleSignIn = async () => {
    let isError = checkInputs();
    if (isError) return;

    let result = await fetch(url.signin, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    console.log(result);
    if (result.status === 200) {
      result = await result.json();
      const userFromToken = jwt.decode(result.token);
      contextUser.setUser(userFromToken.user);
      contextUser.setToken(result.token);
      auth.login();

      toast('You have successfully signed in.', {
        position: 'bottom-center',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      props.history.push('/recipes');
    } else {
      result = await result.json();
      toast(result.message, {
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

  return (
    <Grid container component='main' className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              variant='outlined'
              margin='normal'
              required
              fullWidth
              id='email'
              label='Email Address'
              name='email'
              autoComplete='email'
              autoFocus
            />
            <TextField
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              variant='outlined'
              margin='normal'
              required
              fullWidth
              name='password'
              label='Password'
              type='password'
              id='password'
              autoComplete='current-password'
            />
            {errors.emailError && (
              <div style={styles.errorText}>{errors.emailError}</div>
            )}
            {errors.passwordError && (
              <div style={styles.errorText}>{errors.passwordError}</div>
            )}

            <Button
              onClick={handleSignIn}
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}>
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link
                  to='/forgotpassword'
                  style={{ color: colors.primary }}
                  variant='body2'>
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link
                  to='/signup'
                  style={{ color: colors.primary }}
                  variant='body2'>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  );
};

const styles = {
  errorText: {
    color: 'red',
    fontSize: '1rem',
    marginTop: '1rem',
  },
};

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: `url(${authCover})`,
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
