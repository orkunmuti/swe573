import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppGrid from '../../components/AppGrid';
import AppPagination from '../../components/AppPagination';
import AddIcon from '@material-ui/icons/AddCircleRounded';
import { Link } from 'react-router-dom';
import { colors } from '../../styles';
import axios from 'axios';
import api from '../../constants/api';
import SearchField from 'react-search-field';
import UserContext from '../../context/UserContext';
import emptyplate from '../../assets/empty_plate.jpg';

export const RecipeList = (props) => {
  const [recipeData, setRecipeData] = useState([]);
  const [totalData, setTotalData] = useState([]);
  const [searchInput, setSearchInput] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [user, setUser] = useState({});
  const [excludeAlg, setExcludeAlg] = useState(false);
  const classes = useStyles();
  const contextUser = useContext(UserContext);

  useEffect(() => {
    getRecipes();
  }, []);

  useEffect(() => {
    if (contextUser.user) {
      getUserDetails();
    }
  }, [contextUser.user]);

  const getRecipes = async () => {
    let recipes = await axios.get(api.getRecipes);
    console.log(recipes.length, 'length');
    setTotalData(recipes.data);
    setFilteredData(recipes.data);
  };

  const getUserDetails = async () => {
    let userId = contextUser?.user?.id;
    let result = await axios.get(api.getUser + userId);
    if (result.status === 200) {
      setUser(result.data);
      console.log(result.data);
    }
  };

  function filterIt(array, value) {
    return array.filter(
      (data) =>
        JSON.stringify(data).toLowerCase().indexOf(value.toLowerCase()) !== -1,
    );
  }

  function excludeFilter(array, value) {
    return array.filter(
      (data) =>
        JSON.stringify(data).toLowerCase().indexOf(value.toLowerCase()) === -1,
    );
  }

  const searchInputChange = (input) => {
    setSearchInput(input);
    if (input.trim() === '') {
      setFilteredData(totalData);
      return;
    }
    let searchedData = filterIt(totalData, input);
    setFilteredData(searchedData);
  };

  const changeExcludeAlg = () => {
    if (!excludeAlg === true) {
      const allergies = user.userAllergy;
      let newFilteredData = [...filteredData];
      allergies.forEach((allergy) => {
        let excludedData = excludeFilter(newFilteredData, allergy);
        newFilteredData = excludedData;
      });
      setFilteredData(newFilteredData);
    } else {
      let searchedData = filterIt(totalData, searchInput);
      setFilteredData(searchedData);
    }
    setExcludeAlg(!excludeAlg);
  };

  const handleGridClick = (id) => {
    const dataToPass = totalData.filter((data) => data.id === id);
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

      <div
        style={{
          width: '75%',
          marginLeft: 'auto',
          marginRight: 'auto',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          paddingBottom: '1rem',
        }}>
        <SearchField
          searchText={searchInput}
          style={{ width: '100%' }}
          onChange={(input) => searchInputChange(input)}
        />
        <button
          onClick={() => changeExcludeAlg()}
          className='ui  icon button'
          style={{ marginLeft: 15, backgroundColor: excludeAlg && 'darkgray' }}>
          Exclude allergens
        </button>
      </div>

      <div style={styles.appGrid}>
        {filteredData.length > 0 ? (
          <AppGrid
            data={filteredData}
            className={classes.grid}
            onClick={handleGridClick}
          />
        ) : (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: '6%',
              flexDirection: 'column',
            }}>
            <h2 style={{ letterSpacing: 0.5, marginBottom: '3rem' }}>
              Nothing to see here, just an empty plate...
            </h2>
            <img
              src={emptyplate}
              style={{
                height: '30%',
                width: '30%',
                MozBoxShadow: '1px -2px 16px -4px rgba(0,0,0,0.75)',
                WebkitBoxShadow: '1px -2px 16px -4px rgba(0,0,0,0.75)',
                boxShadow: '1px -2px 16px -4px rgba(0,0,0,0.75)',
              }}
            />
          </div>
        )}
      </div>

      <div style={styles.paginationContainer}>
        <AppPagination
          className={classes.pagination}
          data={filteredData}
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
