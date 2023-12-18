const Sequelize = require("sequelize");
const config = require("../config/config.json")["development"];

const db = {};
const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.Crew = require("./Crew")(sequelize, Sequelize);
// db.Review = require("./Review")(sequelize, Sequelize);

module.exports = db;