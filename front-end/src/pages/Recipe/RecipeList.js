import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppGrid from '../../components/AppGrid';
import AppPagination from '../../components/AppPagination';
import tileData from '../../assets/tileData';

export const RecipeList = ({ props }) => {
  const [recipeData, setRecipeData] = useState([]);
  const classes = useStyles();

  return (
    <div style={styles.container}>
      <div style={styles.appGrid}>
        <AppGrid data={recipeData} className={classes.grid} />
      </div>

      <div style={styles.paginationContainer}>
        <AppPagination
          className={classes.pagination}
          data={tileData}
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
