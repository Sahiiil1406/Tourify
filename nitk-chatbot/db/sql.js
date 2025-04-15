// db.js
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'your_password',
  database: 'your_database_name'
});

async function testConnection() {
    try {
      const connection = await pool.getConnection();
      console.log('MySql Database connected');
      connection.release();
      return true;
    } catch (error) {
      console.error('Database connection failed:', error);
      return false;
    }
  }

module.exports = {pool,testConnection};