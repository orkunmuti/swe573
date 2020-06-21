import React, { Component } from 'react';

const UserContext = React.createContext();

class UserProvider extends Component {
  // Context state
  state = {
    user: undefined,
  };

  // Method to update state
  setUser = (user, token) => {
    this.setState((prevState) => ({ user }));
  };

  setToken = (token) => {
    localStorage.setItem('chewyToken', token);
  };

  removeToken = () => {
    localStorage.removeItem('chewyToken');
  };

  render() {
    const { children } = this.props;
    const { user } = this.state;
    const { setUser } = this;
    const { setToken } = this;
    const { removeToken } = this;

    return (
      <UserContext.Provider
        value={{
          user,
          setUser,
          setToken,
          removeToken,
        }}>
        {children}
      </UserContext.Provider>
    );
  }
}

export default UserContext;

export { UserProvider };
