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
db.Review = require("./Review")(sequelize, Sequelize);

db.Crew.hasMany(db.Review, { foreignKey: 'writtenBy', sourceKey: 'crewId' });
db.Review.belongsTo(db.Crew, { foreignKey: 'writtenBy', targetKey: 'crewId' });

module.exports = db;