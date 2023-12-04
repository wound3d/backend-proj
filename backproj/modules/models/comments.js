import { Model, DataTypes } from "sequelize"
import User from "./user.js";

export default class Comment extends Model { }

export const commentInitter = (sequelize) => {
  Comment.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
    { sequelize, tableName: "comments" }
  );
  return () => {
    //User.hasMany(Comment, { foreignKey: "id", as: "userID", onDelete: "CASCADE"});
    Comment.belongsTo(User, { foreignKey: "userId", onDelete: "CASCADE"});
  }
}
