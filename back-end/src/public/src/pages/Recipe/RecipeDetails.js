import React, { useState, useContext, useEffect } from 'react';
import UserContext from '../../context/UserContext';
import AppRating from '../../components/AppRating';
import Avatar from '@material-ui/core/Avatar';
import { colors } from '../../styles';
import TimeLapse from '@material-ui/icons/TimelapseRounded';
import PieChart from '@material-ui/icons/PieChartRounded';
import BarChart from '@material-ui/icons/BarChartRounded';
import FastFood from '@material-ui/icons/Restaurant';
import AppModal from '../../components/AppModal';
import Interweave from 'interweave';
import axios from 'axios';
import api from '../../constants/api';
import AppComment from '../../components/AppComment';

export const RecipeDetails = (props) => {
  const data = props.location.state.data[0];
  const { user } = useContext(UserContext);

  const [showNutrition, setShowNutrition] = useState(false);
  const [nutrients, setNutrients] = useState([]);
  const [canEdit, setCanEdit] = useState(false);

  useEffect(() => {
    if (user?.id === parseInt(data.createdBy)) {
      setCanEdit(true);
    }
  }, [user]);

  const calculateNutrients = async () => {
    let dataToSend = {};
    let searchArray = [];

    const { ingredients } = data;

    ingredients.forEach(({ id, unitValue, portion }) => {
      if (portion < 0 || isNaN(portion)) {
        return;
      }
      dataToSend[id] = unitValue * portion;
      searchArray.push(id);
    });
    let objectToSend = { searchArray, dataToSend };

    await axios
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

  const editRecipe = () => {
    props.history.push(`${props.location.pathname}/` + 'edit', {
      data: data,
    });
  };

  const renderRecipeDetails = () => {
    return (
      <div style={styles.recipeDetailContainer}>
        <div style={styles.recipeImage}>
          <img src={api.images + data?.image} />
        </div>
        <div style={styles.recipeTitle}>{data.title}</div>
        {/* <AppRating style={styles.recipeRating} rating={data.rating} /> */}
        {renderSubDetails(data)}
        {renderShortDescription(data)}
        {renderIngredients(data)}
        {renderDirections(data)}

        <br style={{ height: '1rem', backgroundColor: 'white' }} />
        {renderBottom()}
        {renderComments()}
      </div>
    );
  };

  const renderShortDescription = (data) => {
    return (
      <div style={styles.shortDescGrid}>
        <Avatar style={styles.avatarGrid} src={data.avatar} />
        <div>
          <span style={{ color: colors.subHeader }}>
            Recipe by : {data.creatorName}
          </span>
          {data.author}
        </div>
        <div style={styles.recipeDesc}>{data.description}</div>
      </div>
    );
  };

  const renderSubDetails = (data) => {
    return (
      <div style={styles.subDetailsParent}>
        <div style={styles.subDetailsChildren}>
          <div>{data.timeToMake} mins</div>
          <TimeLapse style={styles.subDetailIcon} />
        </div>
        <div style={styles.subDetailsChildren}>
          <div>{data.servingSize} serving</div>
          <PieChart style={styles.subDetailIcon}></PieChart>
        </div>
        <div style={styles.subDetailsChildren}>
          <div>{data.difficulty}</div>
          <BarChart style={styles.subDetailIcon}></BarChart>
        </div>
      </div>
    );
  };

  const renderIngredients = (data) => {
    const { ingredients } = data;
    return (
      <div style={styles.ingredientsContainer}>
        <div style={styles.subHeader}>Ingredients</div>
        {ingredients.map((ingredient) => (
          <div style={styles.ingredientItem} key={ingredient.id}>
            <FastFood style={styles.ingredientIcon} />
            <div style={styles.ingredientDesc}>
              {ingredient.description} -{' '}
              {ingredient.portion * ingredient.unitValue} g
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderDirections = (data) => {
    let directions = data.directions.replace(/\\n/g, '');
    directions = directions.replace(/(^|[^\\])(\\\\)*\\$/, '$&\\');
    directions = directions.replace(/\n/g, '');
    return (
      <div style={styles.directionsContainer}>
        <div style={styles.subHeader}>Directions</div>
        <Interweave content={directions} />
      </div>
    );
  };

  const renderBottom = () => {
    return (
      <div
        style={{
          display: 'flex',
          alignSelf: 'flex-start',
          marginTop: '2rem',
          flexDirection: 'row',
          width: '100%',
          alignItems: 'center',
        }}>
        <div
          onClick={() => calculateNutrients()}
          style={{
            fontSize: '1.1rem',
            color: colors.primary,
            cursor: 'pointer',
            textDecoration: 'underline',
          }}>
          Show Nutrition Facts
        </div>
        {canEdit && (
          <button
            onClick={() => editRecipe()}
            key={canEdit}
            className='positive large ui button'
            style={{
              float: 'right',
              alignSelf: 'flex-end',
              marginLeft: 'auto',
            }}>
            Edit Recipe
          </button>
        )}
      </div>
    );
  };

  const renderModal = () => {
    const { servingSize } = data;
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
          <div style={{ marginTop: '1rem' }}>{data.title}</div>
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

  const renderComments = () => {
    return (
      <div style={styles.commentsParentContainer}>
        <AppComment />
      </div>
    );
  };

  return (
    <div style={styles.mainContainer}>
      {renderRecipeDetails()}{' '}
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
  recipeDetailContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '60%',
    margin: 'auto 0',
    // backgroundColor: colors.background,
    // backgroundColor: '#FAFAFA',
    height: '100%',
    padding: '1rem',
    backgroundColor: 'white',
    MozBoxShadow: '1px -2px 16px -4px rgba(0,0,0,0.75)',
    WebkitBoxShadow: '1px -2px 16px -4px rgba(0,0,0,0.75)',
    boxShadow: '1px -2px 16px -4px rgba(0,0,0,0.75)',
    borderRadius: '10px',
  },
  recipeImage: {
    width: '-webkit-fill-available',
    height: '20rem',
    color: 'black',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '2rem',
    borderRadius: '5px',
    overflow: 'hidden',
  },
  recipeTitle: {
    marginTop: '1.5rem',
    fontSize: 30,
    letterSpacing: '1px',
    lineHeight: '2rem',
  },
  recipeRating: {
    marginTop: '1rem',
  },
  subDetailsParent: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'gray',
    marginTop: '1.5rem',
  },
  subDetailsChildren: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    marginRight: '1rem',
  },
  subDetailIcon: {
    marginLeft: '0.2rem',
    color: colors.orange,
  },
  shortDescGrid: {
    display: 'grid',
    gridTemplateColumns: 'auto auto',
    gridGap: '1rem',
    marginTop: '1rem',
  },
  avatarGrid: {
    gridRowStart: 1,
    gridRowEnd: 4,
  },
  recipeDesc: {
    letterSpacing: '0.5px',
  },
  ingredientsContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'flex-start',
    marginTop: '1.5rem',
  },
  subHeader: {
    fontSize: '25px',
    alignSelf: 'flex-start',
    letterSpacing: '1px',
    color: 'gray',
    marginBottom: '1rem',
  },
  ingredientItem: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: '1rem',
  },
  ingredientIcon: {
    color: colors.orange,
  },
  ingredientDesc: {
    marginLeft: '1rem',
  },
  directionsContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'flex-start',
    marginTop: '1.5rem',
  },
  nutritionsContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'flex-start',
    marginTop: '1rem',
  },
  commentsParentContainer: {
    alignSelf: 'flex-start',
    width: '100%',
    marginTop: '1.5rem',
  },
};
