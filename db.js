const { Pool } = require('pg');
// const dotenv = require('dotenv');
const express = require('express');
//const mongoose = require('mongoose');
const app = express();
// dotenv.config();

const pool = new Pool({
 connectionString :"postgres://postgres:root@localhost:5432/postgres"
/*connectionString: process.env.DATABASE_URL*/
});

pool.on('connect', () => {
  console.log('connected to the db');
});

const createUserTable = () => {
    const queryText =
      `
        users(
          id UUID PRIMARY KEY,
          email VARCHAR(128) UNIQUE NOT NULL,
          password VARCHAR(128) NOT NULL
          
        )`;
  
    pool.query(queryText)
      .then((res) => {
        console.log(res);
        pool.end();
      })
      .catch((err) => {
        console.log(err);
        pool.end();
      });
  }

  const createAllTables = () => {
    createUserTable();
  }

  pool.on('remove', () => {
    console.log('client removed');
    process.exit(0);
  });

  module.exports = {
    createUserTable,
    createAllTables,
  };
  
  app.listen(4111,()=>{
    console.log('listening to port 4111');
  });
//   require('make-runnable');
  