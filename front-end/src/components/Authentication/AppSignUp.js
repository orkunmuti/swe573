import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link } from 'react-router-dom';
import { colors } from '../../styles';
import { toast } from 'react-toastify';
import url from '../../constants/api';
import InputValidation from '../../utils/InputValidation';
import validationConfig from '../../utils/validationConfig';

export const AppSignUp = (props) => {
  const classes = useStyles();

  const [user, setUser] = useState({
    name: 'Orkun',
    surname: 'Muti',
    email: 'vadersama@gmail.com',
    password: '123456',
  });

  let config = validationConfig();
  let validation = new InputValidation(config);

  const [errors, setErrors] = useState({
    nameError: null,
    surnameError: null,
    emailError: null,
    passwordError: null,
  });

  const checkInputs = () => {
    let isError = false;
    let newError = { ...errors };

    newError.nameError = validation.validateInput('username', user.name);
    setErrors(newError);
    if (newError.nameError) isError = true;

    newError.surnameError = validation.validateInput(
      'userSurname',
      user.surname,
    );
    setErrors(newError);
    if (newError.surnameError) isError = true;

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

  const handleSignUp = async () => {
    const isError = checkInputs();
    if (isError) return;

    let result = await fetch(url.signin, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    if (result.status === 200) {
      result = await result.json();
      props.history.push('/signin');

      toast('You have successfully signed up.', {
        position: 'bottom-center',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
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
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
                autoComplete='fname'
                name='firstName'
                variant='outlined'
                required
                fullWidth
                id='firstName'
                label='First Name'
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                value={user.surname}
                onChange={(e) => setUser({ ...user, surname: e.target.value })}
                variant='outlined'
                required
                fullWidth
                id='lastName'
                label='Last Name'
                name='lastName'
                autoComplete='lname'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                variant='outlined'
                required
                fullWidth
                id='email'
                label='Email Address'
                name='email'
                autoComplete='email'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                variant='outlined'
                required
                fullWidth
                name='password'
                label='Password'
                type='password'
                id='password'
                autoComplete='current-password'
              />
            </Grid>
            {errors.nameError && (
              <div style={styles.errorText}>{errors.nameError}</div>
            )}
            {errors.surnameError && (
              <div style={styles.errorText}>{errors.surnameError}</div>
            )}
            {errors.emailError && (
              <div style={styles.errorText}>{errors.emailError}</div>
            )}
            {errors.passwordError && (
              <div style={styles.errorText}>{errors.passwordError}</div>
            )}
          </Grid>

          <Button
            onClick={handleSignUp}
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}>
            Sign Up
          </Button>
          <Grid container justify='flex-end'>
            <Grid item>
              <Link
                to='/signin'
                style={{ color: colors.primary }}
                variant='body2'>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
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
  paper: {
    marginTop: theme.spacing(8),
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
