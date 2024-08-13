const { Sequelize, DataTypes } = require("sequelize");
const config = require("../config/config.json");

const env = process.env.NODE_ENV || "development";
const dbConfig = config[env];

const sequelize = new Sequelize(
    dbConfig.database,
    dbConfig.username,
    dbConfig.password,
    {
        host: dbConfig.host,
        dialect: dbConfig.dialect,
    }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Note = require("./note")(sequelize, DataTypes);

module.exports = db;
