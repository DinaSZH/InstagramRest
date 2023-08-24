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
    password: "AVNS_jS3x-ilSQEu77mrnLxq",
    database: "defaultdb",
    host: "instagram-do-user-14539456-0.b.db.ondigitalocean.com",
    dialect: "postgres",
    port: 25060,
    dialectOptions: {
      ssl: {
        ca: fs.readFileSync(path.resolve("config", "ca-certificate.crt"))
      }
    }
  },
};
