const express = require('express');
const recipeRouter = express.Router();
const {
  createRecipe,
  updateRecipe,
  deleteRecipe,
  getRecipe,
  getRecipes,
  createComment,
  updateComment,
  deleteComment,
  getIngredient,
  searchIngredient,
  calculateNutrients,
} = require('../controllers/recipeController');
const { authenticateToken } = require('../utils/authenticateToken');

// CREATE RECIPE
recipeRouter.post('/recipes', authenticateToken, createRecipe);

// UPDATE RECIPE
recipeRouter.put('/recipes/:id', authenticateToken, updateRecipe);

// DELETE RECIPE
recipeRouter.delete('/recipes', authenticateToken, deleteRecipe);

// GET RECIPE
recipeRouter.get('/recipes/:id', getRecipe);

// GET ALL RECIPES
recipeRouter.get('/recipes', getRecipes);

// COMMENT ON RECIPE
recipeRouter.post('/recipes/comments', authenticateToken, createComment);

// UPDATE RECIPE COMMENT
recipeRouter.put('/recipes/comments/:id', authenticateToken, updateComment);

// DELETE RECIPE COMMENT
recipeRouter.put('/recipes/comments/:id', authenticateToken, deleteComment);

// GET INGREDIENT
recipeRouter.get('/ingredients/:id', authenticateToken, getIngredient);

// SEARCH INGREDIENT
recipeRouter.post('/ingredients', authenticateToken, searchIngredient);

// CALCULATE NUTRIENTS
recipeRouter.post('/nutrients', authenticateToken, calculateNutrients);

module.exports = recipeRouter;
