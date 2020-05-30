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
    recipeTitle: {
      presence: {
        message: '^Please enter a recipe title.',
      },
    },
    recipeDescription: {
      presence: {
        message: '^Please enter recipe description.',
      },
    },
    recipeDirections: {
      presence: {
        message: '^Please enter recipe directions.',
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
