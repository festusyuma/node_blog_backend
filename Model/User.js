import bcrypt from "bcrypt";
import db from "../config/db.js";
import sq from "sequelize";

const { DataTypes, Model } = sq
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