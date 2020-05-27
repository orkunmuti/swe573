import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { AppRoutes } from './routes/AppRoutes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Header from './components/Header';

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
