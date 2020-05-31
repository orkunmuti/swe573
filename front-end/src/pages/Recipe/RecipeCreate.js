import React, { useState, useContext } from 'react';
import UserContext from '../../context/UserContext';
import { colors } from '../../styles';
import { AppDrop } from '../../components/AppDrop';
import { Input } from 'semantic-ui-react';
import AsyncSelect from 'react-select/async';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import ingredientData from '../../assets/ingredientData';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import AppEditor from '../../components/Editor/AppEditor';
import { stateToHTML } from 'draft-js-export-html';
import InputValidation from '../../utils/InputValidation';
import validationConfig from '../../utils/validationConfig';
import { toast } from 'react-toastify';
export const RecipeCreate = (props) => {
  // Initialize validation class
  let config = validationConfig();
  let validation = new InputValidation(config);

  const { user } = useContext(UserContext);

  const [data, setData] = useState(ingredientData);
  const [title, setTitle] = useState(undefined);
  const [image, setImage] = useState(undefined);
  const [description, setDescription] = useState(undefined);
  const [searchInput, setSearchInput] = useState(undefined);
  const [ingredients, setIngredients] = useState([]);
  const [directions, setDirections] = useState();
  const [servingSize, setServingSize] = useState(undefined);
  const [timeToMake, setTimeToMake] = useState(undefined);
  const [isLoading, setIsLoading] = useState('false');

  const [errors, setErrors] = useState({
    imageError: null,
    titleError: null,
    descriptionError: null,
    directionsError: null,
    ingredientError: null,
    portionError: {},
    servingSizeError: null,
    timeToMakeError: null,
  });

  const filterData = (inputValue) => {
    return data.filter((i) =>
      i.label.toLowerCase().includes(inputValue.toLowerCase()),
    );
  };

  const handleUpdateItems = (ingredient) => {
    let ingredientList = [...ingredients];
    ingredient.portion = null;
    ingredient.unit = null;
    ingredientList.push(ingredient);
    setIngredients(ingredientList);
  };

  const promiseOptions = (inputValue) =>
    new Promise((resolve) => {
      setSearchInput(inputValue);
      setTimeout(() => {
        resolve(filterData(inputValue));
      }, 1000);
    });

  const removeItem = (id) => {
    const updatedList = ingredients.filter((item) => item.id !== id);
    setIngredients(updatedList);
  };

  const handleDirectionsUpdate = (updatedDirections) => {
    console.log(updatedDirections);
    let htmlDirections = stateToHTML(updatedDirections.getCurrentContent());
    console.log(htmlDirections);
    setDirections(htmlDirections);
  };

  const handlePortionUpdate = (id, value) => {
    let itemIndex;
    let item = ingredients.filter((ingredient, index) => {
      if (ingredient.id === id) {
        itemIndex = index;
        return true;
      }
    });
    item = item[0];
    item.portion = value;

    let updatedIngredients = [...ingredients];
    updatedIngredients[itemIndex] = item;
    setIngredients(updatedIngredients);
  };

  const handleUnitUpdate = (id, value) => {
    let itemIndex;
    let item = ingredients.filter((ingredient, index) => {
      if (ingredient.id === id) {
        itemIndex = index;
        return true;
      }
    });
    item = item[0];
    item.unit = value;

    let updatedIngredients = [...ingredients];
    updatedIngredients[itemIndex] = item;
    setIngredients(updatedIngredients);
  };

  const checkInputs = () => {
    let newError = { ...errors };
    newError.isError = false;

    let imageError = validation.validateInput('recipeImage', image);
    newError.imageError = imageError;
    if (imageError) newError.isError = true;

    let ingredientError = validation.validateInput(
      'recipeIngredients',
      ingredients,
    );
    newError.ingredientError = ingredientError;
    if (ingredientError) newError.isError = true;

    let titleError = validation.validateInput('recipeTitle', title);
    newError.titleError = titleError;
    if (ingredientError) newError.isError = true;

    let descriptionError = validation.validateInput(
      'recipeDescription',
      description,
    );
    newError.descriptionError = descriptionError;
    if (descriptionError) newError.isError = true;

    let directionsError = validation.validateInput(
      'recipeDirections',
      directions,
    );
    newError.directionsError = directionsError;
    if (directionsError) newError.isError = true;

    let newPortionError = {};
    for (let i = 0; i < ingredients.length; i++) {
      let portionError = validation.validateInput(
        'recipePortion',
        ingredients[i].portion,
      );
      newPortionError[ingredients[i].id] = portionError;
      if (portionError) newError.isError = true;
    }
    newError.portionError = newPortionError;

    let servingSizeError = validation.validateInput(
      'recipeServingSize',
      servingSize,
    );
    newError.servingSizeError = servingSizeError;
    if (servingSizeError) newError.isError = true;

    let timeToMakeError = validation.validateInput(
      'recipeTimeToMake',
      timeToMake,
    );
    newError.timeToMakeError = timeToMakeError;
    if (timeToMakeError) newError.isError = true;

    setErrors(newError);

    return newError.isError;
  };

  const createRecipe = () => {
    setIsLoading(true);
    let isError = checkInputs();

    if (isError) {
      toast('Please fill the required fields correctly.', {
        position: 'bottom-center',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setIsLoading(false);
      return;
    }

    let recipe = {};
    recipe.title = title;
    recipe.image = image;
    recipe.description = description;
    recipe.directions = directions;
    recipe.ingredients = ingredients;
    recipe.servingSize = servingSize;
    recipe.timeToMake = timeToMake;
    recipe.createdBy = user;
    recipe.createdAt = Date.now().toLocaleString();
  };

  const renderCreateBody = () => {
    const {
      imageError,
      titleError,
      descriptionError,
      ingredientError,
      directionsError,
      portionError,
      servingSizeError,
      timeToMakeError,
    } = errors;

    return (
      <div style={styles.recipeDetailContainer}>
        <div style={styles.mainHeader}>Create Recipe</div>
        <AppDrop
          dropStyle={styles.dropImage}
          imgStyle={styles.recipeImage}
          onChange={setImage}
        />
        {imageError && <div style={styles.errorText}>{imageError}</div>}

        <div style={styles.subHeader}>Title</div>
        <Input
          style={styles.recipeTitle}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {titleError && <div style={styles.errorText}>{titleError}</div>}

        <div style={styles.subHeader}>Description</div>
        <div class='ui form' style={styles.recipeDescription}>
          <div class='field'>
            <textarea
              rows='2'
              value={description}
              onChange={(e) => setDescription(e.target.value)}></textarea>
          </div>
        </div>
        {descriptionError && (
          <div style={styles.errorText}>{descriptionError}</div>
        )}

        <div style={styles.subHeader}>Directions</div>
        <div style={{ width: '100%' }}>
          <AppEditor
            editorState={''}
            onChange={handleDirectionsUpdate}
            placeholder={'Tell about your recipe directions...'}
          />
        </div>
        {directionsError && (
          <div style={styles.errorText}>{directionsError}</div>
        )}

        <div style={styles.subHeader}>Ingredients</div>
        <div style={styles.searchContainer}>
          <AsyncSelect
            autoBlur
            blurInputOnSelect
            isOptionSelected
            value=''
            onChange={(ingredient) => handleUpdateItems(ingredient)}
            loadOptions={promiseOptions}
          />
        </div>
        {ingredientError && (
          <div style={styles.errorText}>{ingredientError}</div>
        )}
        <div style={styles.itemsContainer}>
          {ingredients.map((ingredient) => (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={styles.itemContainer}>
                <i class='circle icon' style={styles.itemIcon} />
                <div style={styles.itemValue}>{ingredient.value}</div>
                <Input
                  placeholder={'portion'}
                  style={styles.portionInput}
                  value={ingredient.portion}
                  onChange={(e) =>
                    handlePortionUpdate(ingredient.id, e.target.value)
                  }
                />

                <Dropdown
                  style={styles.unitSelect}
                  options={ingredientData}
                  placeholder='Unit'
                  value={ingredient.unit}
                  onChange={(e) => handleUnitUpdate(ingredient.id, e.value)}
                />
                <i
                  onClick={() => removeItem(ingredient.id)}
                  class='trash alternate icon'
                  style={styles.itemRemoveIcon}
                />
              </div>
              {portionError[ingredient.id] ? (
                <div style={styles.errorText}>
                  {portionError[ingredient.id]}
                </div>
              ) : null}
            </div>
          ))}
        </div>

        <div style={styles.rowInputContainer}>
          <div style={styles.rowInputHeader}>Serving size</div>
          <div style={styles.rowInput}>
            <Input
              value={servingSize}
              onChange={(e) => setServingSize(e.target.value)}
              placeholder='serving size (in person)'
            />
            {servingSizeError && (
              <div style={styles.errorText}>{servingSizeError}</div>
            )}
          </div>
        </div>

        <div style={styles.rowInputContainer}>
          <div style={styles.rowInputHeader}>Time to make</div>
          <div style={styles.rowInput}>
            <Input
              value={timeToMake}
              onChange={(e) => setTimeToMake(e.target.value)}
              placeholder='time to make (in mins)'
            />
            {timeToMakeError && (
              <div style={styles.errorText}>{timeToMakeError}</div>
            )}
          </div>
        </div>

        <div style={styles.subHeader}>Nutrients</div>
        <div style={styles.itemsContainer}>
          {ingredientData.map((ingredient) => (
            <div style={styles.itemContainer}>
              <i class='circle icon' style={styles.itemIcon} />
              <div style={styles.itemValue}>{ingredient.value}</div>
            </div>
          ))}
        </div>

        <button
          onClick={() => createRecipe()}
          class='positive large ui button'
          style={{ alignSelf: 'flex-start', marginTop: '2rem' }}>
          Create Recipe
        </button>
      </div>
    );
  };

  return <div style={styles.mainContainer}>{renderCreateBody()}</div>;
};

const styles = {
  mainContainer: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
    marginTop: '2rem',
    fontFamily: 'medium-content-sans-serif-font',
  },
  mainHeader: {
    fontSize: '30px',
    letterSpacing: '1px',
  },

  recipeDetailContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '60%',
    margin: 'auto 0',
    height: '100%',
    padding: '1rem',
  },
  dropImage: {
    border: '5px dashed lightgray',
    minWidth: '25rem',
    maxWidth: '30rem',
    minHeight: '15rem',
    maxHeight: '20rem',
    color: 'black',
    padding: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '2rem',
  },
  recipeImage: {
    minWidth: '25rem',
    maxWidth: '30rem',
    minHeight: '15rem',
    maxHeight: '20rem',
    color: 'black',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '2rem',
  },

  subHeader: {
    fontSize: '25px',
    alignSelf: 'flex-start',
    letterSpacing: '1px',
    color: 'gray',
    marginBottom: '1rem',
    marginTop: '2rem',
  },
  recipeTitle: {
    width: '100%',
  },
  recipeDescription: {
    width: '100%',
  },
  searchContainer: {
    width: '100%',
  },
  itemsContainer: {
    width: '100%',
  },
  itemContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: '1rem',
    alignItems: 'center',
  },
  itemIcon: { color: colors.orange, fontSize: '16px' },
  itemValue: { textAlign: 'center', fontSize: '16px', marginLeft: '1rem' },
  portionInput: {
    width: '6rem',
    alignSelf: 'flex-end',
    marginLeft: 'auto',
    marginRight: '1rem',
  },
  unitSelect: {
    alignSelf: 'flex-end',
  },
  itemRemoveIcon: {
    marginLeft: '1rem',
    color: colors.primary,
    cursor: 'pointer',
  },
  rowInputContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: '2rem',
    alignSelf: 'flex-start',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowInputHeader: {
    fontSize: '25px',
    alignSelf: 'center',
    letterSpacing: '1px',
    color: 'gray',
  },
  rowInput: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: '2rem',
  },
  errorText: {
    color: 'red',
    fontSize: '0.8rem',
    marginTop: '0.3rem',
    textAlign: 'center',
  },
};
