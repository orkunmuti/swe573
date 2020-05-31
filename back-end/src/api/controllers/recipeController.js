const knex = require('../../configuration/dbConnection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const createRecipe = async (req, res, next) => {
  res.json('Hello?');
};

const updateRecipe = async (req, res, next) => {
  res.json('Hello?');
};

const deleteRecipe = async (req, res, next) => {
  res.json('Hello?');
};

const getRecipe = async (req, res, next) => {
  res.json('Hello?');
};

const getRecipes = async (req, res, next) => {
  res.json('Hello?');
};

const createComment = async (req, res, next) => {
  res.json('Hello?');
};

const updateComment = async (req, res, next) => {
  res.json('Hello?');
};

const deleteComment = async (req, res, next) => {
  res.json('Hello?');
};

const searchIngredient = async (req, res, next) => {
  res.json('Hello?');
};

const calculateNutrients = async (req, res, next) => {
  res.json('Hello?');
};

module.exports = {
  createRecipe,
  updateRecipe,
  deleteRecipe,
  getRecipe,
  getRecipes,
  createComment,
  updateComment,
  deleteComment,
  searchIngredient,
  calculateNutrients,
};
