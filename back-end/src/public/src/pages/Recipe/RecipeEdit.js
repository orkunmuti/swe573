import React, { useState, useContext, useEffect } from 'react';
import UserContext from '../../context/UserContext';
import { colors } from '../../styles';
import { AppDrop } from '../../components/AppDrop';
import { Input } from 'semantic-ui-react';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import ingredientData from '../../assets/ingredientData';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import AppEditor from '../../components/Editor/AppEditor';
import { stateToHTML } from 'draft-js-export-html';
import InputValidation from '../../utils/InputValidation';
import validationConfig from '../../utils/validationConfig';
import { toast } from 'react-toastify';
import api from '../../constants/api';
import axios from 'axios';
import debounce from 'lodash.debounce';
import AppModal from '../../components/AppModal';
import SearchField from 'react-search-field';
import InfiniteScroll from 'react-infinite-scroller';

let debouncedGetIngredients;
const difficultyOptions = [
  { value: 'Easy', label: 'Easy' },
  { value: 'Medium', label: 'Medium' },
  { value: 'Hard', label: 'Hard' },
];

export const RecipeEdit = (props) => {
  const propData = props.location.state.data;
  const { user } = useContext(UserContext);

  const [data, setData] = useState(ingredientData);
  const [title, setTitle] = useState(undefined);
  const [image, setImage] = useState(undefined);
  const [description, setDescription] = useState(undefined);
  const [searchInput, setSearchInput] = useState(undefined);
  const [ingredients, setIngredients] = useState([]);
  const [nutrients, setNutrients] = useState([]);
  const [directions, setDirections] = useState();
  const [servingSize, setServingSize] = useState(undefined);
  const [timeToMake, setTimeToMake] = useState(undefined);
  const [ingredientOptions, setIngredientOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMoreData, setHasMoreData] = useState(false);
  const [showNutrition, setShowNutrition] = useState(false);
  const [difficulty, setDifficulty] = useState('Easy');
  const [editorDefault, setEditorDefault] = useState(undefined);
  const [imageApi, setImageApi] = useState(false);

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
  // Initialize validation class
  let config = validationConfig();
  let validation = new InputValidation(config);

  const initializeData = () => {
    const {
      title,
      image,
      description,
      ingredients,
      directions,
      servingSize,
      timeToMake,
      difficulty,
    } = propData;
    console.log(propData);

    setTitle(title);
    setImage(image);
    setDescription(description);
    setIngredients(ingredients);
    setDirections(directions);
    setServingSize(servingSize);
    setTimeToMake(timeToMake);
    setDifficulty(difficulty);
    setEditorDefault(directions);
    if (image !== '') {
      setImageApi(true);
    } else {
      setImageApi(false);
    }
  };

  useEffect(() => {
    initializeData();
  }, []);

  const searchInputChange = (input) => {
    if (input.trim() === '') {
      setIngredientOptions([]);
      setIsLoading(false);
      return;
    }

    setSearchInput(input);
    debouncedGetIngredients(input);
  };

  const getIngredients = async (input, pageNumber = 1) => {
    setIsLoading(true);
    let result = await axios
      .post(api.searchIngredient, {
        query: { filter: input.toLowerCase(), pageNumber },
      })
      .then((res) => {
        if (res.status === 200 || res.status === 204) {
          let isThereMoreData = res.data.currentPage !== res.data.totalPages;
          setIsLoading(false);
          setIngredientOptions(res.data);
          setHasMoreData(isThereMoreData);

          return res.data;
        }
      });

    return result;
  };

  const getIngredient = async (id) => {
    return new Promise(async (resolve, reject) => {
      let result = await axios.get(api.getIngredient + `/${id}`).then((res) => {
        if (res.status === 200 || res.status === 204) {
          resolve(res.data);
        } else {
          reject([]);
        }
      });
    });
  };

  useEffect(() => {
    debouncedGetIngredients = debounce(getIngredients, 500);
    return () => {
      debouncedGetIngredients.cancel();
    };
  }, []);

  useEffect(() => {
    if (searchInput) {
      debouncedGetIngredients(searchInput);
    }
  }, [searchInput]);

  const handleUpdateItems = async (id) => {
    const ingredient = await getIngredient(id);

    let ingredientList = [...ingredients];
    ingredientList.push(ingredient);

    setIngredients(ingredientList);
    setSearchInput('');
    setIsLoading(false);
    setIngredientOptions([]);
  };

  const renderIngredientOption = (item, idx) => {
    return (
      <div
        key={idx}
        style={{
          padding: '1rem',
          margin: 6,
          padding: 8,
          borderBottomWidth: '0.05rem',
          borderTop: 0,
          borderLeft: 0,
          borderRight: 0,

          borderColor: 'lightgray',
          borderStyle: 'solid',
        }}>
        <a
          style={{ color: 'gray', cursor: 'pointer' }}
          onClick={() => handleUpdateItems(item.value)}>
          {item.label}
        </a>
      </div>
    );
  };

  const fetchMoreIngredients = async () => {
    let { currentPage, totalPages } = ingredientOptions;
    if (currentPage === totalPages) {
      setHasMoreData(false);
      return;
    }
    currentPage += 1;
    setHasMoreData(true);

    let result = await getIngredients(searchInput, currentPage);

    let newOptions = {};
    newOptions.data = ingredientOptions.data.concat(result.data);
    newOptions.currentPage = result.currentPage;
    newOptions.totalPages = result.totalPages;
    setIngredientOptions(newOptions);
  };

  const removeItem = (id) => {
    const updatedList = ingredients.filter((item) => item.id !== id);
    setIngredients(updatedList);
  };

  const handleDirectionsUpdate = (updatedDirections) => {
    let htmlDirections = stateToHTML(updatedDirections.getCurrentContent());
    console.log(htmlDirections);
    htmlDirections = htmlDirections.trim();
    console.log(htmlDirections);
    setDirections(htmlDirections);
  };

  const handlePortionUpdate = (id, value) => {
    let itemIndex;
    let [item] = ingredients.filter((ingredient, index) => {
      if (ingredient.id === id) {
        itemIndex = index;
        return true;
      }
    });
    item.portion = value;

    let updatedIngredients = [...ingredients];
    updatedIngredients[itemIndex] = item;
    setIngredients(updatedIngredients);
  };

  const handleUnitUpdate = (id, unit) => {
    let itemIndex;

    let [item] = ingredients.filter((ingredient, index) => {
      if (ingredient.id === id) {
        itemIndex = index;
        return true;
      }
    });

    item.unitValue = unit.value;
    item.unitLabel = unit.label;

    let updatedIngredients = [...ingredients];
    updatedIngredients[itemIndex] = item;
    setIngredients(updatedIngredients);
  };

  const calculateNutrients = async () => {
    let dataToSend = {};
    let searchArray = [];

    ingredients.forEach(({ id, unitValue, portion }) => {
      if (portion < 0 || isNaN(portion)) {
        return;
      }
      dataToSend[id] = unitValue * portion;
      searchArray.push(id);
    });

    let objectToSend = { searchArray, dataToSend };

    let result = await axios
      .post(api.calculateNutrients, {
        objectToSend,
      })
      .then((res) => {
        if (res.status === 200) {
          setNutrients(res.data);
          setShowNutrition(true);
        }
      });
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

  const editRecipe = async () => {
    let isError = checkInputs();

    if (isError) {
      toast.error('Please fill the required fields correctly.', {
        position: 'bottom-center',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    console.log(user);

    let recipe = {};
    recipe.createdBy = user.id;
    recipe.image = image;
    recipe.title = title;
    recipe.description = description;
    recipe.directions = directions;
    recipe.ingredients = ingredients;
    recipe.servingSize = servingSize;
    recipe.timeToMake = timeToMake;
    recipe.difficulty = difficulty;
    recipe.creatorName = `${user.name} ${user.surname}`;

    try {
      let result = await axios.put(api.updateRecipe + '/' + propData.id, {
        recipe,
      });
      if (result.status === 200) {
        toast.success('Recipe has been updated successfully.', {
          position: 'bottom-center',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        props.history.push('/recipes');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onImageChange = (image) => {
    setImage(image);
    setImageApi(false);
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
        <div style={styles.mainHeader}>Edit Recipe</div>
        <AppDrop
          api={imageApi}
          dropStyle={styles.dropImage}
          imgStyle={styles.recipeImage}
          onChange={onImageChange}
          image={image}
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
        <div className='ui form' style={styles.recipeDescription}>
          <div className='field'>
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
            defaultValue={editorDefault}
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
          <SearchField
            searchText={searchInput}
            style={{ width: '100%' }}
            onChange={(input) => searchInputChange(input)}
          />
          {isLoading && (
            <div
              style={{
                marginTop: 10,
                fontFamily: 'Source sans pro',
                color: 'gray',
              }}>
              Loading ...
            </div>
          )}
          {ingredientOptions?.data?.length > 0 && (
            <div
              style={{
                maxHeight: '200px',
                overflow: 'auto',
                marginTop: 20,
                borderWidth: '0.05rem',
                borderColor: 'lightgray',
                borderStyle: 'solid',
              }}>
              <InfiniteScroll
                pageStart={1}
                initialLoad={false}
                threshold={190}
                loadMore={fetchMoreIngredients}
                hasMore={!isLoading && hasMoreData}
                useWindow={false}
                loader={<div>Loading ...</div>}>
                <div>
                  {ingredientOptions.data.map((i, index) =>
                    renderIngredientOption(i, index),
                  )}
                </div>
              </InfiniteScroll>
            </div>
          )}
        </div>
        {ingredientError && (
          <div
            style={{
              color: 'red',
              fontSize: '0.8rem',
              marginTop: '0.3rem',
              alignSelf: 'flex-start',
            }}>
            {ingredientError}
          </div>
        )}
        <div style={styles.itemsContainer}>
          {ingredients.map(
            ({
              description,
              foodPortions,
              id,
              portion,
              unitValue,
              unitLabel,
            }) => (
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={styles.itemContainer}>
                  <i className='circle icon' style={styles.itemIcon} />
                  <div style={styles.itemValue}>{description}</div>
                  <Input
                    placeholder={'portion'}
                    style={styles.portionInput}
                    value={portion}
                    onChange={(e) => handlePortionUpdate(id, e.target.value)}
                  />

                  <Dropdown
                    style={styles.unitSelect}
                    options={foodPortions}
                    placeholder='Unit'
                    value={{ label: unitLabel, value: unitValue }}
                    onChange={(e) => handleUnitUpdate(id, e)}
                  />
                  <i
                    onClick={() => removeItem(id)}
                    className='trash alternate icon'
                    style={styles.itemRemoveIcon}
                  />
                </div>
                {portionError[id] && (
                  <div style={styles.errorText}>{portionError[id]}</div>
                )}
              </div>
            ),
          )}
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

        <div style={styles.rowInputContainer}>
          <div style={styles.rowInputHeader}>Difficulty</div>
          <div style={styles.rowInput}>
            <Dropdown
              style={styles.unitSelect}
              options={difficultyOptions}
              placeholder='difficulty'
              value={{ label: difficulty, value: difficulty }}
              onChange={(e) => setDifficulty(e.value)}
            />
          </div>
        </div>

        <div
          onClick={() => calculateNutrients()}
          style={{
            alignSelf: 'flex-start',
            marginTop: '2rem',
            fontSize: '1.1rem',
            color: colors.primary,
            cursor: 'pointer',
            textDecoration: 'underline',
          }}>
          Show Nutrition Facts
        </div>

        <button
          onClick={() => editRecipe()}
          className='positive large ui button'
          style={{ alignSelf: 'flex-start', marginTop: '2rem' }}>
          Save
        </button>
      </div>
    );
  };

  const renderModal = () => {
    let [energy] = nutrients.filter((item) => item.unitName === 'KCAL');
    energy = energy?.amount;

    let servePerNutrient = servingSize ? parseFloat(servingSize) : 1;

    const calculatePerPerson = (nutrient) => {
      let nutrientValue = parseFloat(nutrient);
      nutrientValue = nutrientValue / servePerNutrient;
      nutrientValue = nutrientValue.toFixed(6);
      return nutrientValue;
    };

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}>
        <i
          onClick={() => setShowNutrition(false)}
          className='window close outline icon '
          style={{
            fontSize: '1rem',
            alignSelf: 'flex-end',
            marginBottom: '1rem',
            cursor: 'pointer',
            fontWeight: 'lighter',
          }}
        />
        <div
          style={{
            fontFamily: 'Source sans pro',
            display: 'flex',
            alignItems: 'flex-start',
            flexDirection: 'column',
            borderWidth: '0.05rem',
            borderColor: 'lightgray',
            borderStyle: 'solid',
            padding: '1rem',
          }}>
          <div
            style={{
              fontSize: '2rem',
              lineHeight: '2.2rem',
              letterSpacing: '0.1rem',
            }}>
            <div>Nutritional</div>
            <div>Information</div>
          </div>
          <div style={{ marginTop: '1rem' }}>{title}</div>
          <div style={{ marginTop: '0.5rem' }}>
            <div
              style={{
                fontSize: '0.6rem',
                fontWeight: 'bold',
              }}>
              Serving size:{' '}
              <span style={{ fontWeight: 'lighter' }}>{servePerNutrient}</span>
            </div>
            <div
              style={{
                fontSize: '0.6rem',
                fontWeight: 'bold',
              }}>
              Total calories:
              <span style={{ fontWeight: 'lighter' }}> {energy} KCAL</span>
            </div>
            <div
              style={{
                fontSize: '0.6rem',
                fontWeight: 'bold',
                marginTop: 5,
              }}>
              Nutrients per size
            </div>
            <div
              style={{
                backgroundColor: 'lightgray',
                borderWidth: '0.05rem',
                borderStyle: 'solid',
                borderColor: 'lightgray',
              }}
            />
            {nutrients
              ? nutrients.map((item) => {
                  return (
                    <div
                      style={{
                        fontSize: '0.6rem',
                        fontWeight: 'bold',
                      }}>
                      {item.name} :{' '}
                      <span style={{ fontWeight: 'lighter' }}>
                        {calculatePerPerson(item.amount)} {item.unitName}
                      </span>
                      <div
                        style={{
                          borderWidth: '0.01rem',
                          borderStyle: 'solid',
                          borderColor: 'lightgray',
                        }}
                      />
                    </div>
                  );
                })
              : null}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div style={styles.mainContainer}>
      {renderCreateBody()}
      <div>
        <AppModal
          open={showNutrition}
          onClose={() => setShowNutrition(false)}
          component={renderModal}
        />
      </div>
    </div>
  );
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
    marginTop: '1rem',
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
    backgroundColor: 'white',
    MozBoxShadow: '1px -2px 16px -4px rgba(0,0,0,0.75)',
    WebkitBoxShadow: '1px -2px 16px -4px rgba(0,0,0,0.75)',
    boxShadow: '1px -2px 16px -4px rgba(0,0,0,0.75)',
    borderRadius: '10px',
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
    borderRadius: '5px',
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
  itemValue: {
    textAlign: 'center',
    fontSize: '16px',
    marginLeft: '1rem',
  },
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
