// knexfile.js
require('dotenv').config();

module.exports = {
  client: 'mssql',
  connection: {
    server: 'DESKTOP-QVKSA13',
    user: 'cdss_kailash',
    password: 'pcbnl123',
    database: 'kodukku_project',
    charset: 'utf8',
   
    options: {
      encrypt: false, 
      
    },
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: './migrations',
  },
  seeds: {
    directory: './seeds',
  },
};


// module.exports = {
//   client: 'mysql',
//   connection: {
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'kodukku_test_project',
//     charset: 'utf8',
//   },
  
//   migrations: {
//     tableName: 'knex_migrations',
//     directory: './migrations',
//   },
//   seeds: {
//     directory: './seeds',
//   },
// };