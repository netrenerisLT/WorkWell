import { DataTypes } from "sequelize";

const Workers = (sequelize) => {
  const Schema = {
    first_name: {
      type: DataTypes.STRING, //=VARCHAR(255)
      allowNull: false, //neleidžiamas tuščias laukas - Standartinė reikšmė true
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    photo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  };

  return sequelize.define("workers", Schema);
};

export default Workers;
