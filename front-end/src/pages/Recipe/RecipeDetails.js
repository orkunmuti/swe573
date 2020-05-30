import React, { useState } from 'react';
import AppRating from '../../components/AppRating';
import Avatar from '@material-ui/core/Avatar';
import { colors } from '../../styles';
import TimeLapse from '@material-ui/icons/TimelapseRounded';
import PieChart from '@material-ui/icons/PieChartRounded';
import BarChart from '@material-ui/icons/BarChartRounded';
import FastFood from '@material-ui/icons/AddCircleRounded';
import AppComment from '../../components/AppComment';

export const RecipeDetails = (props) => {
  const data = props.location.state.data[0];

  const renderRecipeDetails = () => {
    return (
      <div style={styles.recipeDetailContainer}>
        <img style={styles.recipeImage} src={data.img} />
        <div style={styles.recipeTitle}>{data.title}</div>
        <AppRating style={styles.recipeRating} rating={data.rating} />
        {renderSubDetails(data)}
        {renderShortDescription(data)}
        {renderIngredients(data)}
        {renderDirections(data)}
        {renderNutrionFacts(data)}

        <br style={{ height: '1rem', backgroundColor: 'white' }} />
        {renderComments()}
      </div>
    );
  };

  const renderShortDescription = (data) => {
    return (
      <div style={styles.shortDescGrid}>
        <Avatar style={styles.avatarGrid} src={data.avatar} />
        <div>
          <span style={{ color: colors.subHeader }}>Recipe by : </span>
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
          <div>{data.timetomake} mins</div>
          <TimeLapse style={styles.subDetailIcon} />
        </div>
        <div style={styles.subDetailsChildren}>
          <div>{data.servingsize} serving</div>
          <PieChart style={styles.subDetailIcon}></PieChart>
        </div>
        <div style={styles.subDetailsChildren}>
          <div>{data.calories} cals</div>
          <BarChart style={styles.subDetailIcon}></BarChart>
        </div>
      </div>
    );
  };

  const renderIngredients = (data) => {
    return (
      <div style={styles.ingredientsContainer}>
        <div style={styles.subHeader}>Ingredients</div>
        {data.ingredients.map((ingredient) => (
          <div style={styles.ingredientItem}>
            <FastFood style={styles.ingredientIcon} />
            <div style={styles.ingredientDesc}>{ingredient}</div>
          </div>
        ))}
      </div>
    );
  };

  const renderDirections = (data) => {
    return (
      <div style={styles.directionsContainer}>
        <div style={styles.subHeader}>Directions</div>
        <div>{data.directions}</div>
      </div>
    );
  };

  const renderNutrionFacts = (data) => {
    return (
      <div style={styles.nutritionsContainer}>
        <div style={styles.subHeader}>Nutrition facts</div>
        {data.nutrition.map((nutrition) => (
          <div style={styles.ingredientItem}>
            <FastFood style={styles.ingredientIcon} />
            <div style={styles.ingredientDesc}>{nutrition}</div>
          </div>
        ))}
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

  return <div style={styles.mainContainer}>{renderRecipeDetails()}</div>;
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
    backgroundColor: '#FAFAFA',
    height: '100%',
    padding: '1rem',
  },
  recipeImage: {
    alignSelf: 'flex-center',
  },
  recipeTitle: {
    marginTop: '1rem',
    fontSize: 30,
    letterSpacing: '1px',
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
  },
  subHeader: {
    fontSize: '25px',
    alignSelf: 'flex-start',
    letterSpacing: '1px',
    color: 'gray',
    marginBottom: '0.5rem',
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
    marginTop: '1rem',
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
  },
};
