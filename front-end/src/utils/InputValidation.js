import validate from 'validate.js';

class InputValidation {
  constructor(configuration) {
    this.configuration = configuration;
  }

  validateInput = (fieldName, value) => {
    if (!this.configuration) {
      return;
    }
    const formValues = {};
    formValues[fieldName] = value;
    const formFields = {};
    formFields[fieldName] = this.configuration[fieldName];

    const result = validate(formValues, formFields);
    if (result) {
      return result[fieldName][0];
    }
    return null;
  };
}

export default InputValidation;
