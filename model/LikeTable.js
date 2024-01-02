function LikeTable(sequelize, DataTypes){
    return sequelize.define(
        'LikeTable', {
            likeId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            crewId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            reviewId: {
                type: DataTypes.INTEGER,
                allowNull: false
            }
            }, {
              tableName: 'LikeTable',
            freezeTableName: true,
            timestamps: false,
        }
    )
}

module.exports = LikeTable;