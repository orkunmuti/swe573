import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { RecipeList } from '../pages/Recipe/RecipeList';
import { SignIn, SignUp } from '../components/Authentication';
import { Home } from '../pages/Home/Home';
import ProtectedRoute from './ProtectedRoute';

export const AppRoutes = () => {
  return (
    <Switch>
      <Route exact path='/' component={RecipeList} />
      <ProtectedRoute path='/home' component={Home} />
    </Switch>
  );
};
