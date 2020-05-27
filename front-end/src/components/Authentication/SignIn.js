import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import url from '../../constants/api';

export default function SignIn(props) {
  const [user, setUser] = useState({
    email: 'orkun.muti@gmail.com',
    password: '123456',
  });

  const handleSignIn = async () => {
    const { email, password } = user;

    let body = { email, password };
    let result = await fetch(url.signin, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    localStorage.setItem('userData', 'reisUser');
    this.props.history.push('/home');
    // result = result.json();
    // if (result.status === 200) {
    //   alert('You have successfully signed up!');
    // }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        // alignItems: 'center',
      }}>
      <h1>Sign in</h1>

      <TextField
        value={user.email}
        id='outlined-basic'
        label='email'
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        style={styles.textField}
      />

      <TextField
        type='password'
        id='outlined-basic'
        label='password'
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        style={styles.textField}
      />
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <Button
          style={{
            marginTop: '2vh',
          }}
          variant='contained'
          onClick={() => handleSignIn()}>
          Sign in
        </Button>
        <Button
          style={styles.forgotPasswordButton}
          color='primary'
          onClick={() => props.navigateTo('ForgotPassword')}>
          Forgot password?
        </Button>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <p style={{ textAlign: 'center' }}>Do not have an account?</p>
        <Button
          style={{ marginTop: '0.5vh' }}
          color='primary'
          onClick={() => props.navigateTo('SignUp')}>
          Sign up
        </Button>
      </div>
    </div>
  );
}

const styles = {
  textField: {
    margin: 10,
  },
  forgotPasswordButton: {
    marginTop: '0.5vh',
    marginLeft: 'auto',
  },
};
