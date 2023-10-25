// config.js
const fs = require('fs');
const path = require('path')

module.exports = {
  development: {
    username: "adminInsta",
    password: "rootInsta",
    database: "adminInsta",
    host: "localhost",
    dialect: "postgres",
  },
  production: {
    username: "doadmin",
    password: "AVNS_n7uBP1tnhQQx3oGTOy2",
    database: "defaultdb",
    host: "db-postgresql-instagram-do-user-14842323-0.c.db.ondigitalocean.com",
    dialect: "postgres",
    port: 25060,
    dialectOptions: {
      ssl: {
        ca: fs.readFileSync(path.resolve("config", "ca-certificate.crt"))
      }
    }
  },
};
