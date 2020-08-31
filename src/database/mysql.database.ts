import { Sequelize } from 'sequelize';
import databaseConfig from '../config/database.config';

const connection = new Sequelize({
  ...databaseConfig,
  dialect: 'mysql'
});

connection
  .authenticate()
  .then(() => console.log('Connection has been established successfully.'))
  .catch(err => console.error('Unable to connect to the database:', err));

const sequelize = new Sequelize(`mysql://${databaseConfig.username}:${databaseConfig.password}@${databaseConfig.host}:${databaseConfig.port}/${databaseConfig.database}`);

export {
  connection,
  sequelize
};