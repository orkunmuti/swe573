import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import url from '../../constants/api';

export default function SignUp(props) {
  const [user, setUser] = useState({
    email: 'orkun.muti@gmail.com',
    password: '123456',
  });

  const handleSignUp = async () => {
    const { email, password } = user;

    let body = { email, password };
    let result = await fetch(url.signup, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

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
      <h1>Sign up</h1>

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
      <div>
        <Button
          style={{
            marginTop: '2vh',
          }}
          variant='contained'
          onClick={() => handleSignUp()}>
          Sign up
        </Button>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <p style={{ textAlign: 'center' }}>Already have an account?</p>
        <Button
          style={{ marginTop: '0.5vh' }}
          color='primary'
          onClick={() => props.navigateTo('SignIn')}>
          Sign in
        </Button>
      </div>
    </div>
  );
}

const styles = {
  textField: {
    margin: 10,
  },
};
