import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import url from '../../constants/api';
import { toast } from 'react-toastify';

export default function ForgotPassword(props) {
  const [user, setUser] = useState({
    email: 'orkun.muti@gmail.com',
    password: '123456',
  });

  const handleResetPassword = async () => {
    toast('Your password has been reset.', {
      position: 'bottom-center',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    props.navigateTo('SignIn');
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        // alignItems: 'center',
      }}>
      <h1>Reset password</h1>

      <TextField
        value={user.email}
        id='outlined-basic'
        label='email'
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        style={styles.textField}
      />

      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <Button
          style={{
            marginTop: '2vh',
          }}
          variant='contained'
          onClick={() => handleResetPassword()}>
          Reset password
        </Button>
        <Button
          style={styles.signInButton}
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

  signInButton: {
    marginTop: '0.5vh',
    marginLeft: 'auto',
  },
};
