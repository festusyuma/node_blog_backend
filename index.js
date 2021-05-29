import sq from "sequelize";
const { Sequelize, DataTypes, Model, Op } = sq

const sequelize = new Sequelize('node_blog', 'root', '12345678', {
    host: 'localhost',
    dialect: 'mysql',
    logging: console.log,
    freezeTableName: true,
});

try {
    await sequelize.authenticate()
    console.log('connection established')
} catch(err) {
    console.error('Unable to connect to the database:', err);
}

class User extends Model {}
User.init({
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'username' // custom column name
    },
    password: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    // Create composite index
    /* uniqueOne: {
        type: DataTypes.STRING,
        unique: 'compositeIndex',
    },
    uniqueTwo: {
        type: DataTypes.INTEGER,
        unique: 'compositeIndex',
    }, */
}, {
    sequelize,
    modelName: 'User',
})

class Customer extends Model {
    getFullName() {
        return `${this.firstName} ${this.lastName}`
    }
}
Customer.init({
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id',
        }
    }
}, {
    sequelize,
    modelName: 'Customer',
})

await sequelize.sync({
    force: true,
    alter: true,
})

const newCustomer = Customer.build({
    firstName: 'Festus',
    lastName: 'Agboma'
})
console.log(newCustomer.getFullName())
await newCustomer.save()
console.log('Customer was saved')

try {
    const festus = await Customer.create({
        firstName: 'Jane',
        lastName: 'Doe',
    })

    festus.firstName = 'Festus'
    festus.lastName = 'Agboma'

    await festus.save({ fields: ['firstName'] }) // update only specific column
    await festus.reload()

    console.log(festus instanceof Customer);
    // console.log(festus.toJSON());

    const users = await Customer.findAll({
        attributes: ['firstName', 'lastName'] // fetch only selected columns
    })

    const userSearch = await Customer.findAll({
        where: {
            lastName: {
                [Op.like]: '%Agb%'
            }
        },
    })

    // console.log("All users:", JSON.stringify(users, null, 2));
    console.log("All users:", JSON.stringify(userSearch, null, 2));
} catch(e) {
    console.log(e)
}

newCustomer.destroy().then(() => {
    console.log('record deleted')
})