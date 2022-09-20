import { DataTypes } from "sequelize";

const Suppliers = (sequelize) => {
  const Schema = {
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING, //= TEXT
      allowNull: false,
    },
  };

  return sequelize.define("suppliers", Schema);
};

export default Suppliers;
