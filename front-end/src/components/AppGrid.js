import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import tileData from '../assets/tileData';
import toBase64 from '../utils/toBase64';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: '80%',
    height: '80%',
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}));

export default function AppGrid(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <GridList
        spacing={20}
        cols={2}
        cellHeight={180}
        className={classes.gridList}>
        <GridListTile
          key='Subheader'
          cols={4}
          style={{ height: 'auto' }}></GridListTile>
        {props.data.map((tile) => (
          <GridListTile
            key={tile.id}
            onClick={() => props.onClick(tile.id)}
            style={{ cursor: 'pointer' }}>
            <img src={tile.image} />
            <GridListTileBar
              title={tile.title}
              subtitle={<span>by: {tile.createdBy}</span>}
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}
