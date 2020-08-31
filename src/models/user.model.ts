import { sequelize } from '../database/mysql.database';
import { Model, Optional, DataTypes } from 'sequelize';
import IUser from '../interfaces/user.interface';

interface UserCreationAttributes extends Optional<IUser, "id"> { }

class User extends Model<IUser, UserCreationAttributes> implements IUser {

  public id!: number;
  public name!: string;
  public password!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    password: {
      type: new DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    tableName: "users",
    sequelize,
  }
)

User.sync()
  .then(() => console.log('Users table created successfully.'))
  .catch((err) => console.log('Error on trying to create Users table', err));

export default User;