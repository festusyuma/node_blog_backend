import sq from "sequelize";
const { Sequelize, DataTypes, Model, Op } = sq

const db = new Sequelize('node_blog', 'root', '12345678', {
    host: 'localhost',
    dialect: 'mysql',
    logging: console.log,
    freezeTableName: true,
});

export default db