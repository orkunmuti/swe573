import React, { useContext, createContext, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { AppRoutes } from './routes/AppRoutes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Header from './components/Header';
import auth from './utils/auth';

import jwt from 'jsonwebtoken';
import UserContext from './context/UserContext';
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';
import shadstyles from './shard/shards-dashboards.1.1.0.min.css';

let token = localStorage.getItem('chewyToken');
axios.defaults.headers.common.Authorization = `Bearer ${token}`;

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#800000',
    },
    secondary: {
      main: '#DFF0D8',
    },
  },
});

function App() {
  useEffect(() => {
    getUser();
  }, []);

  const contextUser = useContext(UserContext);

  const getUser = () => {
    let token = localStorage.getItem('chewyToken');
    if (token) {
      const userFromToken = jwt.decode(token);
      contextUser.setUser(userFromToken?.user);
      auth.login();
    }
  };

  return (
    <Router>
      <MuiThemeProvider theme={theme}>
        <Header />
        <AppRoutes />
        <ToastContainer
          position='bottom-center'
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </MuiThemeProvider>
    </Router>
  );
}

export default App;
