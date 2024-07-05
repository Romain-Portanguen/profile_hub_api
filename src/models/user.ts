import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

export interface UserAttributes {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string;
  address: string;
  phoneNumber: string;
  identityNumber: string;
  identityType: string;
  profilePicture?: string;
  password: string;
  role: 'User' | 'Admin' | 'Owner';
}

export interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'profilePicture'> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: string;
  public firstName!: string;
  public lastName!: string;
  public email!: string;
  public dateOfBirth!: string;
  public address!: string;
  public phoneNumber!: string;
  public identityNumber!: string;
  public identityType!: string;
  public profilePicture?: string;
  public password!: string;
  public role!: 'User' | 'Admin' | 'Owner';

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    dateOfBirth: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    identityNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    identityType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    profilePicture: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('User', 'Admin', 'Owner'),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'User',
  }
);

export default User;

/** USER SCHEMA
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - email
 *         - dateOfBirth
 *         - address
 *         - phoneNumber
 *         - identityNumber
 *         - identityType
 *         - password
 *         - role
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the user
 *         firstName:
 *           type: string
 *           description: The first name of the user
 *         lastName:
 *           type: string
 *           description: The last name of the user
 *         email:
 *           type: string
 *           description: The email of the user
 *         dateOfBirth:
 *           type: string
 *           format: date
 *           description: The date of birth of the user
 *         address:
 *           type: string
 *           description: The address of the user
 *         phoneNumber:
 *           type: string
 *           description: The phone number of the user
 *         identityNumber:
 *           type: string
 *           description: The identity number of the user
 *         identityType:
 *           type: string
 *           description: The type of identity document of the user
 *         profilePicture:
 *           type: string
 *           description: The profile picture of the user
 *         password:
 *           type: string
 *           description: The password of the user
 *         role:
 *           type: string
 *           enum: [User, Admin, Owner]
 *           description: The role of the user
 *       example:
 *         id: d290f1ee-6c54-4b01-90e6-d701748f0851
 *         firstName: John
 *         lastName: Doe
 *         email: john.doe@example.com
 *         dateOfBirth: 1990-01-01
 *         address: 123 Main St
 *         phoneNumber: +1234567890
 *         identityNumber: AB123456
 *         identityType: Passport
 *         profilePicture: http://example.com/profile.jpg
 *         password: password123
 *         role: User
 */
