function Review(sequelize, DataTypes) {
  const Crew = require('./Crew'); // 모듈 가져오기를 함수 내부로 이동

  return sequelize.define(
    'Review',
    {
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
        type: DataTypes.LONGTEXT,
        allowNull: false,
      },
      like: {
        type: DataTypes.INTEGER,
      },
      writtenBy: {
        type: DataTypes.INTEGER,
        references: {
          model: Crew,
          key: 'crewId',
        },
        onDelete: 'CASCADE',
      },
    },
    {
      tableName: 'review',
      freezeTableName: true,
      timestamps: true,
    }
  );
}

// Review 모델에 Crew 모델과의 관계를 추가합니다.
Review.belongsTo(Crew, { foreignKey: 'writtenBy' });

module.exports = Review;
