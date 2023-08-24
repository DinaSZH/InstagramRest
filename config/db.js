// database.js

const { Sequelize } = require("sequelize");
const dbConf = require("./config");
let sequelize;
if(process.env.NODE_ENV === 'production'){
  console.log("here")
   sequelize = new Sequelize(
    dbConf.production.database,
    dbConf.production.username,
    dbConf.production.password,
    {
      host: dbConf.production.host,
      dialect: dbConf.production.dialect,
      port: dbConf.production.port,
    }
  );
} else {
 sequelize = new Sequelize(
  dbConf.development.database,
  dbConf.development.username,
  dbConf.development.password,
  {
    host: dbConf.development.host,
    dialect: dbConf.development.dialect,
  }
);
}


async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("Соединение с базой данных успешно установлено.");
  } catch (error) {
    console.error("Ошибка при подключении к базе данных:", error);
  }
}

testConnection();

module.exports = sequelize;
