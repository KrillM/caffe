function Review(sequelize, DataTypes) {
    return sequelize.define(
        'review', {
            reviewId: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            title: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            content: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            likeNum: {
                type: DataTypes.INTEGER,
            },
            writtenBy: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: "crew",
                    key: 'crewId',
                },
                onDelete: 'CASCADE',
            },
        }, {
            tableName: 'review',
            freezeTableName: true,
            timestamps: true,
        }
    );
}

module.exports = Review;
  