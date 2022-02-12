import { DataTypes, Model } from "sequelize/types";
import { sequelize } from "../database/connect";

class User extends Model {
  public id!: number;
  public firstName!: string;
  public lastName!: string;
  public emailAddress!: string;
  public password!: string;

  //Timestamps
  public readonly updatedAt!: Date;
  public readonly createdAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    firstName: {
      type: DataTypes.STRING(64),
      allowNull: false,
      validate: {
        len: {
          args: [2, 64],
          msg: "First name length must be between 2 and 64 characters"
        }
      }
    },
    lastName: {
      type: DataTypes.STRING(64),
      allowNull: false,
      validate: {
        len: {
          args: [2, 64],
          msg: "Last name length must be between 2 and 64 characters"
        }
      }
    },
    emailAddress: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  { sequelize }
);

export default User;
