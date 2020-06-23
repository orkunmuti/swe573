const knex = require('../../configuration/dbConnection');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const SqlString = require('sqlstring');
const {
  getFoodAPI,
  searchFoodAPI,
  getFoodNutrientsAPI,
} = require('../utils/fetchUsda');
const { conversions } = require('../constants/conversions');
require('dotenv').config();

const toBase64 = async (file) => {
  let a = file === null;
  if (file === null || file === '') {
    return;
  } else {
    return new Promise((resolve, reject) => {
      fs.readFile(file, { encoding: 'base64' }, (err, data) => {
        if (err) {
          reject();
        }
        resolve(data);
      });
    });
  }
};

const createRecipe = async (req, res, next) => {
  const { recipe } = req.body;
  const {
    createdBy,
    image,
    title,
    description,
    directions,
    servingSize,
    timeToMake,
    difficulty,
    ingredients,
    creatorName,
  } = recipe;

  let escapedDirections = SqlString.escape(directions);
  escapedDirections = escapedDirections.replace(/(^|[^\\])(\\\\)*\\$/, '$&\\');
  escapedDirections = escapedDirections.replace(/\\n/g, '');
  escapedDirections = escapedDirections.replace(/\n/g, '');

  let base64Image = image.split(';base64,').pop();
  let imagePath = path.join(__dirname, '../../public/images/');
  let imageName = uuidv4() + '.png';
  imagePath = imagePath + imageName;

  await fs.writeFile(imagePath, base64Image, { encoding: 'base64' }, function (
    err,
  ) {
    fileName = imagePath;
  });

  let newRecipe = {
    createdBy,
    image: imageName,
    title,
    description,
    directions: escapedDirections,
    servingSize,
    timeToMake,
    difficulty,
    creatorName,
  };
  newRecipe.createdAt = new Date();

  let newIngredients = ingredients.map(
    ({ id, description, portion, unitValue, unitLabel }) => ({
      id,
      description,
      portion,
      unitValue,
      unitLabel,
    }),
  );

  let newFoodPortions = [];
  ingredients.forEach(({ foodPortions }) => {
    foodPortions.forEach((item) => {
      newFoodPortions.push(item);
    });
  });

  try {
    await knex.transaction(async (trx) => {
      const [newRecipeId] = await knex('recipes')
        .insert(newRecipe, 'id')
        .transacting(trx);

      newIngredients.forEach(
        (ingredient) => (ingredient.recipeId = newRecipeId),
      );
      await knex('recipe_ingredients').insert(newIngredients).transacting(trx);

      newFoodPortions.forEach((portion) => (portion.recipeId = newRecipeId));
      const newPortionId = await knex('ingredient_portions')
        .insert(newFoodPortions)
        .transacting(trx);

      res.status(200).send('Successfully create recipe.');
    });
  } catch (error) {
    console.log(error);
    res.status(400).send('Error while creating recipe.');
  }
};

const updateRecipe = async (req, res, next) => {
  const recipeId = req.params.id;
  let { recipe } = req.body;

  const {
    createdBy,
    image,
    title,
    description,
    directions,
    servingSize,
    timeToMake,
    difficulty,
    ingredients,
    creatorName,
  } = recipe;

  if (req.user.user.id !== Number(createdBy)) {
    res.status(400).send('Not authorized');
    return;
  }

  let escapedDirections = SqlString.escape(directions);
  escapedDirections = escapedDirections.replace(/(^|[^\\])(\\\\)*\\$/, '$&\\');
  escapedDirections = escapedDirections.replace(/\\n/g, '');
  escapedDirections = escapedDirections.replace(/\n/g, '');

  let newRecipe = {
    createdBy,
    title,
    description,
    directions: escapedDirections,
    servingSize,
    timeToMake,
    difficulty,
    creatorName,
  };
  newRecipe.updatedAt = new Date();

  let [dbRecipe] = await knex('recipes').where('id', recipeId);

  if (image && image !== '' && image !== dbRecipe.image) {
    let imagePath = path.join(__dirname, '../../public/images/');
    let oldImage;
    if (dbRecipe.image !== null && dbRecipe.image !== '') {
      oldImage = await toBase64(imagePath + dbRecipe.image);
    }
    let userImage = image.split(',')[1];
    if (userImage === oldImage) {
      newRecipe.image = dbRecipe.image;
    } else {
      let imageName = uuidv4() + '.png';
      imagePath = imagePath + imageName;
      newRecipe.image = imageName;

      await fs.writeFile(
        imagePath,
        userImage,
        { encoding: 'base64' },
        function (err) {
          console.log('image written');
        },
      );
    }
  }

  let newIngredients = ingredients.map(
    ({ id, description, portion, unitValue, unitLabel }) => ({
      id,
      description,
      portion,
      unitValue,
      unitLabel,
      recipeId: recipeId,
    }),
  );

  let newFoodPortions = [];
  ingredients.forEach(({ foodPortions }) => {
    foodPortions.forEach((item) => {
      item.recipeId = recipeId;
      newFoodPortions.push(item);
    });
  });

  try {
    await knex.transaction(async (trx) => {
      console.log(newRecipe);
      await knex('recipes')
        .where('id', recipeId)
        .update(newRecipe)
        .transacting(trx);

      let oldIds = await knex('recipe_ingredients')
        .where({ recipe_id: recipeId })
        .select('id');

      let oldIdArr = [];
      for (let i = 0; i < oldIds.length; i++) {
        oldIdArr.push(oldIds[i].id);
      }

      let newIdArr = [];
      for (let i = 0; i < newIngredients.length; i++) {
        newIdArr.push(newIngredients[i].id);
      }

      const toBeDeleted = oldIdArr.filter((x) => !newIdArr.includes(x));
      const toBeAdded = newIdArr.filter((x) => !oldIdArr.includes(x));
      const toBeUpdated = newIdArr.filter((x) => oldIdArr.includes(x));

      for (let i = 0; i < toBeDeleted.length; i++) {
        console.log('removing');

        await knex('recipe_ingredients')
          .where({ id: toBeDeleted[i], recipe_id: recipeId })
          .delete()
          .transacting(trx);
      }

      for (let i = 0; i < toBeAdded.length; i++) {
        console.log('adding');
        let [newIngredient] = newIngredients.filter(
          (item) => item.id === toBeAdded[i],
        );
        let newPortions = newFoodPortions.filter(
          (item) => item.id === toBeAdded[i],
        );
        console.log(toBeAdded[i]);
        await knex('recipe_ingredients').insert(newIngredient).transacting(trx);
        // console.log(newPortions);
        await knex('ingredient_portions').insert(newPortions).transacting(trx);
      }

      for (let i = 0; i < toBeUpdated.length; i++) {
        console.log('updating');
        let [updatedIngredient] = newIngredients.filter(
          (item) => item.id === toBeUpdated[i],
        );

        await knex('recipe_ingredients')
          .where({ id: toBeUpdated[i], recipe_id: recipeId })
          .update(updatedIngredient)
          .transacting(trx);
      }
    });
    res.status(200).send('Recipe update is successful.');
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

const deleteRecipe = async (req, res, next) => {
  res.json('Hello?');
};

const getRecipe = async (req, res, next) => {
  try {
    let recipeId = req.params.id;
    recipeId = Number(recipeId);

    let [recipe] = await knex('recipes').where('id', recipeId);

    let ingredients = await knex('recipe_ingredients').where(
      'recipe_id',
      recipeId,
    );
    recipe.ingredients = ingredients;

    for (let j = 0; j < ingredients.length; j++) {
      let ingredient = ingredients[j];

      let foodPortions = await knex('ingredient_portions').where({
        id: ingredient.id,
        recipe_id: recipeId,
      });
      ingredient.foodPortions = foodPortions;
    }

    let [user] = await knex('users').where('id', recipe.createdBy);
    recipe.user = {};
    recipe.user.avatar = user.image;
    res.status(200).send(recipe);
  } catch (error) {
    res.status(400).send('Cannot get recipe.');
  }
};

const getRecipes = async (req, res, next) => {
  try {
    let recipes = await knex('recipes');

    for (let i = 0; i < recipes.length; i++) {
      let recipe = recipes[i];
      recipe.directions = recipe.directions.replace(/['"]+/g, '');

      let ingredients = await knex('recipe_ingredients').where({
        recipe_id: recipe.id,
      });
      recipe.ingredients = ingredients;

      for (let j = 0; j < ingredients.length; j++) {
        let ingredient = ingredients[j];

        let foodPortions = await knex('ingredient_portions').where({
          id: ingredient.id,
          recipe_id: recipe.id,
        });
        ingredient.foodPortions = foodPortions;
      }
    }

    res.status(200).send(recipes);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
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

const convertForAddition = (data) => {
  const { fdcId: id, foodPortions, description } = data;
  data = {
    id,
    description,
    foodPortions,
    portion: 1,
    unitValue: 100,
    unitLabel: '100 g',
  };

  data.foodPortions = data.foodPortions.map(
    ({ gramWeight: value, modifier, measureUnit: { name } }) => ({
      value,
      label: `${name} ${modifier} ${value} g`.trim(),
      id,
    }),
  );
  data.foodPortions.push({ value: 100, label: '100 g', id });
  return data;
};

const getIngredient = async (req, res, next) => {
  let query = req.params.id;
  let result = await getFoodAPI(query);

  result = convertForAddition(result);

  res.status(200).send(result);
};

const convertForSearch = (data) => {
  let result = {};
  let mappedData = data.foods.map(({ fdcId: value, description: label }) => ({
    value,
    label,
  }));

  const { currentPage, totalPages } = data;
  result.currentPage = currentPage;
  result.totalPages = totalPages;
  result.data = mappedData;
  return result;
};

const searchIngredient = async (req, res, next) => {
  let query = req.body.query;
  let result = await searchFoodAPI(query);

  result = convertForSearch(result);

  res.status(200).send(result);
};

const convertForNutritions = (data, amounts) => {
  let nutrientObj = {};
  let number = '';
  let amount = 0;
  let unitName = '';

  if (!data.length >= 1) {
    return [];
  }

  data.forEach((item) => {
    let portionAmount = amounts[item.fdcId] / 100;

    item.foodNutrients.forEach((nutrient) => {
      name = nutrient.name;
      if (Number(name[0])) {
        return;
      }
      number = nutrient.number;
      amount =
        nutrient.amount *
        conversions[nutrient.unitName].conversionUnit *
        portionAmount;
      unitName = conversions[nutrient.unitName].unitName;

      if (!nutrientObj[number]) {
        nutrientObj[number] = {
          name,
          amount,
          unitName,
        };
      } else {
        nutrientObj[number].amount += amount;
      }
    });
  });

  let arrayToSend = [];
  let keys = Object.keys(nutrientObj);

  keys.forEach((key) => {
    arrayToSend.push(nutrientObj[key]);
  });

  return arrayToSend;
};

const calculateNutrients = async (req, res, next) => {
  let { objectToSend } = req.body;
  let { searchArray, dataToSend } = objectToSend;

  let result = await getFoodNutrientsAPI(searchArray);
  result = convertForNutritions(result, dataToSend);
  res.send(result);
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
  getIngredient,
  searchIngredient,
  calculateNutrients,
};
