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
    password: "AVNS_Vvo-7n29D1KoInnEqbA",
    database: "defaultdb",
    host: "db-insta-do-user-15416786-0.c.db.ondigitalocean.com",
    dialect: "postgres",
    port: 25060,
    dialectOptions: {
      ssl: {
        ca: fs.readFileSync(path.resolve("config", "ca-certificate.crt"))
      }
    }
  },
};
