function Comment(sequelize, DataTypes){
    return sequelize.define(
        'comment', {
            commentId: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            comment: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            writtenAt: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: "review",
                    key: 'reiewId',
                },
                onDelete: 'CASCADE',
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
            tableName: 'comment',
            freezeTableName: true,
            timestamps: true,
        }
    )
}

module.exports = Comment;