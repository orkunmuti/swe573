import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppGrid from '../../components/AppGrid';
import AppPagination from '../../components/AppPagination';
import AddIcon from '@material-ui/icons/AddCircleRounded';
import { Link } from 'react-router-dom';
import { colors } from '../../styles';
import axios from 'axios';
import api from '../../constants/api';
import toBase64 from '../../utils/toBase64';

export const RecipeList = (props) => {
  const [recipeData, setRecipeData] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    getRecipes();
  }, []);

  const getRecipes = async () => {
    let recipes = await axios.get(api.getRecipes);
    setRecipeData(recipes.data);
  };

  const handleGridClick = (id) => {
    const dataToPass = recipeData.filter((data) => data.id === id);
    props.history.push(`${props.location.pathname}/` + id, {
      data: dataToPass,
    });
  };

  return (
    <div style={styles.container}>
      <div style={styles.headerContainer}>
        <div style={styles.headerContainerChild}>Recipes</div>
        <Link to='/recipes/create'>
          <button className='ui left labeled icon button'>
            Create
            <i className='plus icon' style={{ color: colors.orange }}></i>
          </button>
        </Link>
      </div>
      <div style={styles.appGrid}>
        <AppGrid
          data={recipeData}
          className={classes.grid}
          onClick={handleGridClick}
        />
      </div>

      <div style={styles.paginationContainer}>
        <AppPagination
          className={classes.pagination}
          data={recipeData}
          updateData={setRecipeData}
        />
      </div>
    </div>
  );
};

const styles = {
  container: {
    position: 'relative',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  headerContainer: {
    width: '75%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: '1rem',
    marginTop: '2rem',
    display: 'flex',
    flexDirection: 'row',
    color: 'gray',
  },
  headerContainerChild: {
    fontSize: '30px',
    fontFamily: 'charter',
    fontWeight: 'bold',
    letterSpacing: '1px',
    width: '100%',
  },
  createContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '30%',
    alignItems: 'center',
    cursor: 'pointer',
  },
  addIcon: {
    fontSize: '30px',
    color: colors.orange,
  },
  createText: {
    textAlign: 'center',
    fontSize: '20px',
    marginLeft: '0.5rem',
  },
  appGrid: {
    paddingBottom: '4rem',
  },
  paginationContainer: {
    position: 'absolute',
    height: 'auto',
    bottom: 0,
    width: '100%',
    height: '2.5rem',
    marginBottom: '2vh',
  },
};

const useStyles = makeStyles((theme) => ({
  pagination: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  grid: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
}));
