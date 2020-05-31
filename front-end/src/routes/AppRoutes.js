import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { RecipeList } from '../pages/Recipe/RecipeList';
import { AppSignIn } from '../components/Authentication/AppSignIn';
import { AppSignUp } from '../components/Authentication/AppSignUp';
import { ForgotPassword } from '../components/Authentication/ForgotPassword';
import { RecipeDetails } from '../pages/Recipe/RecipeDetails';
import { RecipeCreate } from '../pages/Recipe/RecipeCreate';
import { Home } from '../pages/Home/Home';
import ProtectedRoute from '../components/ProtectedRoute';

export const AppRoutes = () => {
  return (
    <Switch>
      <Redirect exact from='/' to='/recipes' />
      <Route exact path='/signin' component={AppSignIn} />
      <Route exact path='/signup' component={AppSignUp} />
      <Route exact path='/forgotpassword' component={ForgotPassword} />

      <Route exact path='/recipes' component={RecipeList} />

      <ProtectedRoute exact path='/recipes/create' component={RecipeCreate} />
      <Route exact path='/recipes/:id' component={RecipeDetails} />
      <ProtectedRoute path='/home' component={Home} />
    </Switch>
  );
};
