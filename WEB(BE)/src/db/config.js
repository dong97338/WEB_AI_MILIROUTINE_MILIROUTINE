const mysql = require('mysql');
const path = require('path');

require('dotenv').config({ path: path.join(__dirname, '.env') });

const db = mysql.createConnection({
  // host : process.env.DB_HOST,
  // user : process.env.DB_USER,
  // password : process.env.DB_PASSWORD,
  // port : process.env.DB_PORT,
  // database : process.env.DB_DATABASE
  host: 'database', // Container 밖에서 사용할 때는 'localhost'
  user: 'miliroutine_developer',
  password: '2022MySQL!@',
  port: 3306,
  database: 'miliroutine_db',
  charset: 'UTF8MB4_GENERAL_CI',
});

db.connect();

module.exports = db;
