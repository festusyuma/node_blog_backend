import sq from "sequelize";
const { Sequelize } = sq

const db = new Sequelize('node_blog', 'root', '12345678', {
    host: 'localhost',
    dialect: 'mysql',
    logging: console.log,
    freezeTableName: true,
});

module.exports = db