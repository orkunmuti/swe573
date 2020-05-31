const knex = require('../../configuration/dbConnection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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

// Return controller functions
module.exports = {
  signUp,
  signIn,
};
