import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('mydb', process.env.DATABASE_USER, process.env.DATABASE_PASSWORD, {
  host: 'localhost',
  dialect: 'mysql',
});

export default sequelize;