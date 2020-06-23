const knex = require('../../configuration/dbConnection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
require('dotenv').config();

// Configure bcrypt options
const saltRounds = 10;
const hashSalt = process.env.HASH_SALT;

// Util function to determine if the user has entered valid inputs
const validUser = (user) => {
  return (
    typeof user.email === 'string' &&
    user.email.trim() !== '' &&
    typeof user.password === 'string' &&
    user.password.trim() !== '' &&
    user.password.trim().length >= 5
  ); // when hashing trim also!
};

const toBase64 = async (file) => {
  let a = file === null;
  if (file === null || file === '') {
    return;
  } else {
    return new Promise((resolve, reject) => {
      fs.readFile(file, { encoding: 'base64' }, (err, data) => {
        if (err) {
          reject();
        }
        resolve(data);
      });
    });
  }
};

const signUp = async (req, res, next) => {
  try {
    console.log(req.body);
    // Check if input is valid
    const user = req.body;
    console.log(user);
    if (!validUser(user)) {
      throw new Error('Enter valid inputs!');
    }
    // Check if a user with the same email exist
    await knex('users')
      .where('email', user.email)
      .first()
      .then((user) => {
        if (user) {
          throw new Error('User with the same email exists!');
        }
      });

    const newUser = user;
    await bcrypt
      .hash(newUser.password, 10)
      .then((hash) => (newUser.password = hash));

    knex('users')
      .insert(user)
      .returning('id')
      .then((createdUser) => {
        res.status(200).json({
          message: 'Your account has been successfully created.',
        });
      });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const signIn = async (req, res, next) => {
  try {
    const user = req.body;
    if (!validUser(user)) {
      throw new Error('Enter valid inputs!');
    }

    // Check if a user with the email exists
    await knex('users')
      .where('email', user.email)
      .first()
      .then(async (dbUser) => {
        if (!dbUser) {
          throw new Error('User with this email does not exist.');
        }

        const isPasswordMatched = await bcrypt.compare(
          user.password,
          dbUser.password,
        );
        if (!isPasswordMatched) {
          throw new Error('Password is wrong.');
        }
        delete dbUser.password;
        dbUser.fullName = `${dbUser.name} ${dbUser.surname}`;

        let userToSign = {};
        userToSign.user = dbUser;
        const accessToken = jwt.sign(
          userToSign,
          process.env.ACCESS_TOKEN_SECRET,
        );

        res.status(200).json({
          message: 'You have succesfully logged in.',
          token: accessToken,
        });
      });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const getUser = async (req, res, next) => {
  const userId = req.params.id;
  try {
    if (req.user.user.id !== Number(userId)) {
      throw new Error('Not authorized');
    }
    let [user] = await knex('users').where('id', userId);
    delete user.password;

    let allergies = await knex('user_allergy').where('user_id', userId);
    if (allergies.length > 0) {
      allergies = allergies.map(({ allergy }) => allergy);
      user.userAllergy = allergies;
    }

    res.status(200).send(user);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

const updateUser = async (req, res, next) => {
  let userId = req.params.id;
  userId = Number(userId);
  try {
    if (req.user.user.id !== userId) {
      throw new Error('Not authorized');
    }
    let { user } = req.body;
    let { userAllergy } = user;
    delete user.userAllergy;

    let [dbUser] = await knex('users').where('id', userId);

    if (user.image && user.image !== '' && user.image !== dbUser.image) {
      let imagePath = path.join(__dirname, '../../public/images/');
      let oldImage;
      if (dbUser.image !== null && dbUser.image !== '') {
        oldImage = await toBase64(imagePath + dbUser.image);
      }
      let userImage = user.image.split(',')[1];
      if (userImage === oldImage) {
        user.image = dbUser.image;
      } else {
        let base64Image = user.image.split(';base64,').pop();
        let imageName = uuidv4() + '.png';
        imagePath = imagePath + imageName;
        user.image = imageName;

        await fs.writeFile(
          imagePath,
          base64Image,
          { encoding: 'base64' },
          function (err) {
            console.log('image written');
          },
        );
      }
    }

    let result = await knex('users').where('id', userId).update(user);
    if (userAllergy === undefined) {
      res.status(200).send('Profile update is successful.');
      return;
    }

    let dbAllergies = await knex('user_allergy')
      .where({ user_id: userId })
      .select('allergy');

    let oldItems = dbAllergies.map(({ allergy }) => allergy);
    oldItems = [...new Set(oldItems)];

    let newItems = [...userAllergy];
    newItems = [...new Set(newItems)];

    const toBeDeleted = oldItems.filter((x) => !newItems.includes(x));
    const toBeAdded = newItems.filter((x) => !oldItems.includes(x));

    await knex.transaction(async (trx) => {
      // Removing
      for (let i = 0; i < toBeDeleted.length; i++) {
        console.log('removing');

        await knex('user_allergy')
          .where({ user_id: userId, allergy: toBeDeleted[i] })
          .delete()
          .transacting(trx);
      }

      // Adding
      for (let i = 0; i < toBeAdded.length; i++) {
        console.log('adding');

        let newAllergy = { userId, allergy: toBeAdded[i] };

        let result = await knex('user_allergy')
          .insert(newAllergy)
          .transacting(trx)
          .returning('allergy');
      }
    });

    res.status(200).send(user);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

// Return controller functions
module.exports = {
  signUp,
  signIn,
  getUser,
  updateUser,
};
