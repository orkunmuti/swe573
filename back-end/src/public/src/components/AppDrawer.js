import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import ProfileIcon from '@material-ui/icons/Person';
import MenuIcon from '@material-ui/icons/RestaurantMenu';
import FoodProvider from '@material-ui/icons/MenuBook';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

export default function AppDrawer(props) {
  const classes = useStyles();
  const history = useHistory();

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    console.log(open);
    console.log(props.isOpen);

    props.toggleDrawer(open);
  };

  const onListButtonClick = (path) => {
    history.push('/' + path);
    toggleDrawer(false);
  };

  const list = () => (
    <div
      className={clsx(classes.list)}
      role='presentation'
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}>
      <div
        style={{
          backgroundColor: '#800000',
          color: 'white',
          display: 'flex',
          textAlign: 'center',
          padding: '1rem',
        }}>
        <img
          style={{ height: 20, widht: 20, textAlign: 'center' }}
          src={process.env.PUBLIC_URL + '/chewy.png'}
        />
        <p
          style={{
            alignSelf: 'center',
            fontSize: '1.2rem',
            letterSpacing: 0.2,
            marginLeft: '0.5rem',
            fontFamily: 'Didot',
          }}>
          Chewy
        </p>
      </div>
      <List>
        <ListItem button onClick={() => onListButtonClick('profile')}>
          <ListItemIcon>
            <ProfileIcon />
          </ListItemIcon>
          <ListItemText primary={'Profile'} />
        </ListItem>
        <ListItem button onClick={() => onListButtonClick('recipes')}>
          <ListItemIcon>
            <MenuIcon />
          </ListItemIcon>
          <ListItemText primary={'Recipes'} />
        </ListItem>
        <ListItem button onClick={() => onListButtonClick('foodproviders')}>
          <ListItemIcon>
            <FoodProvider />
          </ListItemIcon>
          <ListItemText primary={'Food providers'} />
        </ListItem>
      </List>
      <Divider />
    </div>
  );

  return (
    <div>
      <Drawer anchor={'left'} open={props.isOpen} onClose={toggleDrawer(false)}>
        {list()}
      </Drawer>
    </div>
  );
}
