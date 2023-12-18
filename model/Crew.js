function Crew(sequelize, DataTypes) {
  return sequelize.define(
    "crew",
    {
      crewId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      nickname: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING(1000), 
        allowNull: false,
      },
      phoneNumber: {
        type: DataTypes.INTEGER,
      },
      bio: {
        type: DataTypes.STRING(100),
      },
      myPageImg: {
        type: DataTypes.STRING(500),
      },
      profileImage: {
        type: DataTypes.STRING(500),
      },
    },
    {
      tableName: "crew",
      freezeTableName: true,
      timestamps: true,
    }
  );
}

module.exports = Crew;