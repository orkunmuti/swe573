let food = 'https://api.nal.usda.gov/fdc/v1/food';
let foods = 'https://api.nal.usda.gov/fdc/v1/foods';

const usdaAPI = {
  getFood: food,
  searchFoods: foods + '/search',
  getIngredients: foods,
};

module.exports = { usdaAPI };
