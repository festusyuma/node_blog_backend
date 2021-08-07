const bcrypt = require('bcrypt')
const db = require('../config/db')
const { DataTypes, Model } = require('sequelize')


class User extends Model {}
User.init({
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        set(val) {
            let hashedPassword = bcrypt.hashSync(val)
            this.setDataValue('password', hashedPassword)
        }
    }
}, {
    sequelize: db,
    modelName: 'user',
})

module.exports = User