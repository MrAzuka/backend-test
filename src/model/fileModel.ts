import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/connect";

class File extends Model {
  public id!: number;
  public filename!: string;
  public key!: string;
  public location!: string;
  public status!: "safe" | "unsafe";
  public userId!: number;
}

File.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    filename: {
      type: DataTypes.STRING(64),
      allowNull: false,
      validate: {
        len: {
          args: [2, 64],
          msg: "File name length must be between 2 and 64 characters"
        }
      }
    },
    key: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    location: { type: DataTypes.STRING, allowNull: false },
    status: {
      type: DataTypes.ENUM,
      values: ["safe", "unsafe"],
      defaultValue: "safe"
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  { sequelize }
);

export default File;
