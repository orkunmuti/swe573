require('dotenv').config();

module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: process.env.DATABASE_URL,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_TABLE,
    },
  },
  production: {
    client: 'pg',
    connection: {
      host: process.env.DATABASE_URL + '?ssl=true',
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_TABLE,
    },
  },
};
