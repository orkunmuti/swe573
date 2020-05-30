import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { RecipeList } from '../pages/Recipe/RecipeList';
import { RecipeDetails } from '../pages/Recipe/RecipeDetails';
import { RecipeCreate } from '../pages/Recipe/RecipeCreate';
import { Home } from '../pages/Home/Home';
import ProtectedRoute from './ProtectedRoute';

export const AppRoutes = () => {
  return (
    <Switch>
      <Route exact path='/recipes' component={RecipeList} />
      <Route exact path='/recipes/create' component={RecipeCreate} />
      <Route exact path='/recipes/:id' component={RecipeDetails} />
      <ProtectedRoute path='/home' component={Home} />
    </Switch>
  );
};
