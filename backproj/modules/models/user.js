import { Model, DataTypes } from "sequelize"
import Comment from "./comments.js";

export default class User extends Model { }

export const userInitter = (sequelize) => {
  User.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    secondName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    login: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
    { sequelize, tableName: "users" }
  );
  return () => {
    User.hasMany(Comment, { foreignKey: "userId", onDelete: "CASCADE"});
    //Comment.belongsTo(User, { foreignKey: "id", as: "Commentary", onDelete: "CASCADE"});
  }
}

