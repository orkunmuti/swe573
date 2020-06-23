import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardHeader,
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Form,
  FormGroup,
  FormInput,
  FormSelect,
  FormTextarea,
  Button,
} from 'shards-react';
import { AppDrop } from '../components/AppDrop';
import DropDown from 'react-dropdown';
import { geo } from '../assets/city';
import { Form as SemanticForm, Input } from 'semantic-ui-react';
import Chip from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/core/styles';
import api from '../constants/api';
import axios from 'axios';
import UserContext from '../context/UserContext';
import { toast } from 'react-toastify';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
}));

const cities = geo.data.map(({ cityName }) => cityName);

export const AppProfile = ({ title }) => {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('email');
  const [image, setImage] = useState(undefined);
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [states, setStates] = useState([]);
  const [allergies, setAllergies] = useState([]);
  const [allergy, setAllergy] = useState('');
  const [imageApi, setImageApi] = useState(false);

  let contextUser = useContext(UserContext);

  useEffect(() => {
    if (contextUser.user) {
      initializeData();
    }
  }, [contextUser.user]);

  const initializeData = async () => {
    let userId = contextUser.user.id;
    try {
      let result = await axios.get(api.getUser + userId);
      if (result.status === 200) {
        let { data: dbUser } = result;
        setName(dbUser.name);
        setLastName(dbUser.surname);
        setCity(dbUser.city);
        setState(dbUser.state);
        setImage(dbUser.image);
        setAllergies(dbUser.userAllergy);
        setEmail(dbUser.email);
        if (dbUser.image !== '') {
          setImageApi(true);
        } else {
          setImageApi(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onImageChange = (image) => {
    setImage(image);
    setImageApi(false);
  };

  const onChangeCity = (cityName) => {
    setCity(cityName);

    let [{ states }] = geo.data.filter((city) => city.cityName === cityName);

    states = states.map(({ stateName }) => stateName);
    setStates(states);
  };

  const onChangeState = (stateName) => {
    setState(stateName);
  };

  const onAllergyUpdate = () => {
    if (allergy.trim() === '') {
      return;
    }
    let newAllergies = [...allergies];
    newAllergies.push(allergy);
    setAllergies(newAllergies);
    setAllergy('');
  };

  const onAllergyChange = (e) => {
    setAllergy(e.target.value);
  };

  const onRemoveAllergy = (index) => {
    const newAllergies = [...allergies];
    newAllergies.splice(index, 1);
    setAllergies(newAllergies);
  };

  const renderAllergies = () => {
    return (
      allergies?.length > 0 && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            flexShrink: 1,
            width: '50%',
          }}>
          {allergies?.map((allergy, index) => {
            return (
              <Chip
                label={allergy}
                style={{ margin: 10, maxWidth: '80%' }}
                onDelete={() => onRemoveAllergy(index)}
              />
            );
          })}
        </div>
      )
    );
  };

  const updateUser = async () => {
    let userId = contextUser.user.id;
    let user = {};
    user.name = name;
    user.surname = lastName;
    user.city = city;
    user.state = state;
    user.image = image;
    user.userAllergy = allergies;

    let result = await axios.put(api.updateUser + userId, { user });
    if (result.status === 200) {
      toast.success('Profile update is successful.', {
        position: 'bottom-center',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <Card small className='mb-4' style={{ margin: 10 }}>
      <CardHeader className='border-bottom'>
        <h6 className='m-0'>{title}</h6>
      </CardHeader>
      <ListGroup flush>
        <ListGroupItem className='p-3'>
          <Row>
            <Col>
              <Form>
                <div
                  style={{
                    display: 'flex',
                    alignSelf: 'flex-start',
                    flexDirection: 'column',
                    marginBottom: 10,
                  }}>
                  <label htmlFor='feFirstName'>Profile image</label>
                  <div
                    style={{
                      display: 'flex',
                      alignSelf: 'flex-start',
                      marginTop: 2,
                    }}>
                    <AppDrop
                      api={imageApi}
                      image={image}
                      onChange={onImageChange}
                      dropStyle={styles.dropImage}
                      imgStyle={styles.profilePhoto}
                    />
                  </div>
                </div>

                <Row form>
                  {/* First Name */}
                  <Col md='6' className='form-group'>
                    <label htmlFor='feFirstName'>First Name</label>
                    <FormInput
                      id='feFirstName'
                      placeholder='First Name'
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Col>
                </Row>
                <Row form>
                  {/* Last Name */}
                  <Col md='6' className='form-group'>
                    <label htmlFor='feLastName'>Last Name</label>
                    <FormInput
                      id='feLastName'
                      placeholder='Last Name'
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </Col>
                </Row>
                <Row form>
                  {/* Email */}
                  <Col md='6' className='form-group'>
                    <label htmlFor='feEmail'>Email</label>
                    <FormInput
                      type='email'
                      id='feEmail'
                      placeholder='Email Address'
                      value={email}
                      onChange={() => {}}
                      disabled={true}
                      autoComplete='email'
                    />
                  </Col>
                  {/* Password */}
                </Row>

                <Row form>
                  {/* City */}
                  <Col md='6' className='form-group'>
                    <label htmlFor='feCity'>City</label>
                    <DropDown
                      value={city}
                      options={cities}
                      onChange={({ value }) => onChangeCity(value)}
                    />
                  </Col>
                </Row>
                <Row form>
                  {/* State */}
                  <Col md='6' className='form-group'>
                    <label htmlFor='feState'>State</label>
                    <DropDown
                      value={state}
                      options={states}
                      onChange={({ value }) => onChangeState(value)}
                    />
                  </Col>
                </Row>

                <Row form>
                  {/* Description */}
                  <Col md='12' className='form-group' style={{ width: '100%' }}>
                    <label htmlFor='feDescription'>Allergens</label>
                    <div style={{ width: '100%' }}>
                      <SemanticForm onSubmit={onAllergyUpdate}>
                        <Input
                          id='feDescription'
                          placeholder='Enter any food you are allergic to'
                          style={{ width: '50%' }}
                          value={allergy}
                          onChange={(e) => onAllergyChange(e)}
                        />
                      </SemanticForm>
                    </div>
                  </Col>
                </Row>
                {renderAllergies()}
                <div style={{ marginTop: 20 }}>
                  <Button onClick={() => updateUser()} theme='accent'>
                    Update Account
                  </Button>
                </div>
              </Form>
            </Col>
          </Row>
        </ListGroupItem>
      </ListGroup>
    </Card>
  );
};

const styles = {
  profilePhoto: {
    width: '10rem',
    height: '10rem',
    color: 'black',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    marginTop: 5,
    border: '1px solid #800000',
  },
  dropImage: {
    border: '1px dashed lightgray',
    minWidth: '15rem',
    maxWidth: '5rem',
    minHeight: '5rem',
    maxHeight: '7rem',
    color: 'black',
    padding: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '5%',
  },
};

AppProfile.propTypes = {
  /**
   * The component's title.
   */
  title: PropTypes.string,
};

AppProfile.defaultProps = {
  title: 'Account Details',
};
