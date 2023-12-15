function Crew(sequelize, DataTypes) {
  return sequelize.define(
    "crew",
    {
      // ID 설정
      crewId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      // 이메일 설정
      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      // 닉네임 설정
      nickname: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      // 비밀번호 설정
      password: {
        type: DataTypes.STRING(1000), // 변경 가능한 크기에 따라 조정
        allowNull: false,
      },
      // 전화번호 설정
      phoneNumber: {
        type: DataTypes.INTEGER,
      },
      // 프로필 이미지 설정
      profileImage: {
        type: DataTypes.BLOB, // 또는 DataTypes.TEXT('long')로 변경
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