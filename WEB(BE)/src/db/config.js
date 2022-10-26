const mysql = require('mysql');
const path = require('path');

require('dotenv').config({ path: path.join(__dirname, '.env') });

const db = mysql.createConnection({
  host: 'database', // Container 밖에서 사용할 때는 'localhost'
  user: 'miliroutine_developer',
  password: '2022MySQL!@',
  port: 3306,
  database: 'miliroutine_db',
  charset: 'utf8mb4_general_ci',
});

db.connect();

module.exports = db;
