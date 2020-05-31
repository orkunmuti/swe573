const validationConfig = () => {
  return {
    email: {
      presence: {
        message: '^Please enter an email.',
      },
      email: {
        message: '^Please enter a valid email.',
      },
    },
    password: {
      presence: {
        message: '^Please enter a password.',
      },
      length: {
        minimum: 6,
        message: '^Password must be at least 6 characters long.',
      },
    },
    username: {
      presence: {
        message: '^Please enter your name.',
      },
      length: {
        minimum: 2,
        message: '^Username must be at least 2 characters long.',
      },
    },
    userSurname: {
      presence: {
        message: '^Please enter your surname.',
      },

      length: {
        minimum: 2,
        message: '^Surname must be at least 2 characters long.',
      },
    },
    recipeTitle: {
      presence: {
        message: '^Please enter a recipe title.',
      },
      length: {
        minimum: 2,
        message: '^Recipe title must be at least 2 characters long.',
      },
    },
    recipeDescription: {
      presence: {
        message: '^Please enter recipe description.',
      },
      length: {
        minimum: 20,
        message: '^Description must be at least 20 characters long.',
      },
    },
    recipeDirections: {
      presence: {
        message: '^Please enter recipe directions.',
      },
      length: {
        minimum: 20,
        message: '^Directions must be at least 20 characters long.',
      },
    },
    recipeIngredients: {
      presence: {
        message: '^Please select at least 1 ingredient.',
      },
      length: {
        minimum: 1,
        message: '^Please select at least 1 ingredient.',
      },
    },
    recipeImage: {
      presence: {
        message: '^Please upload an image.',
      },
    },
    recipePortion: {
      presence: {
        message: '^Please enter a ingredient portion.',
      },
      numericality: {
        message: '^Portion should be a number.',
      },
    },
    recipeServingSize: {
      presence: {
        message: '^Please enter a serving size.',
      },
      numericality: {
        message: '^Serving size should be a number.',
      },
    },
    recipeTimeToMake: {
      presence: {
        message: '^Please enter a serving time.',
      },
      numericality: {
        message: '^Serving time should be a number in minutes.',
      },
    },
  };
};

export default validationConfig;
