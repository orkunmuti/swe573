require('dotenv').config();
const { usdaAPI } = require('../constants/usdaAPI');
const fetch = require('node-fetch');

let apiKey = `?api_key=${process.env.USDA_API_KEY}`;
let dataType = ['Foundation', 'FNDDS', 'SR Legacy'];
let pageSize = 100;

const getFoodAPI = async (id) => {
  let url = `${usdaAPI.getFood}/${id}${apiKey}`;

  let result = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  result = await result.json();
  return result;
};

const searchFoodAPI = async (query) => {
  console.log('query', query);
  const { filter, pageNumber = 1 } = query;
  let url = `${usdaAPI.searchFoods}${apiKey}`;

  let result = await fetch(url, {
    method: 'POST',
    'content-type': 'application/json',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query: filter, dataType, pageSize, pageNumber }),
  });
  result = await result.json();
  return result;
};

const getFoodNutrientsAPI = async (query) => {
  let url = `${usdaAPI.getIngredients}${apiKey}`;

  let result = await fetch(url, {
    method: 'POST',
    'content-type': 'application/json',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ fdcIds: query, format: 'abridged', pageSize: 1000 }),
  });
  result = await result.json();
  return result;
};

module.exports = {
  getFoodAPI,
  searchFoodAPI,
  getFoodNutrientsAPI,
};
