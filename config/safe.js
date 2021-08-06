import bcrypt from "bcrypt";
import db from "./db";
import sq from "sequelize";

const { DataTypes, Model, Op } = sq

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
        set(value) {
            let hashedPassword = bcrypt.hashSync(value, 10)
            this.setDataValue('password', hashedPassword)
        },
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
    sequelize: db,
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
        isAlpha: true,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        isAlpha: true,
    },
    fullName: {
        type: DataTypes.VIRTUAL,
        get() {
            return `${this.firstName} ${this.lastName}`
        },
        set(value) {
            throw new Error('Do not try to set the `fullName` value!');
        }
    },
    wallet: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0,
        isDecimal: true,
    },
    dateOfBirth: {
        type: DataTypes.DATE,
        allowNull: false,
        isDate: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id',
        },
        unique: true,
    }
}, {
    sequelize: db,
    modelName: 'Customer',
})

await db.sync({
    force: true,
    alter: true,
})

const users = [
    {
        firstName: 'festus',
        lastName: 'Agboma',
        wallet: 10000000000,
        dateOfBirth: new Date('1998-07-23'),
    },
    {
        firstName: 'Jon',
        lastName: 'Doe',
        wallet: 1000000,
        dateOfBirth: new Date('2000-02-01'),
    },
    {
        firstName: 'Frank',
        lastName: 'Lampard',
        wallet: 5000000000,
        dateOfBirth: new Date('1923-01-26'),
    },
    {
        firstName: 'Vladmir',
        lastName: 'Dracula',
        wallet: 10000000000,
        dateOfBirth: new Date('1020-09-11'),
    },
]

await Customer.bulkCreate(users)
console.log('users created')

const steph = await Customer.create({
    firstName: 'Steph',
    lastName: 'Demi',
    wallet: 1235000000,
    dateOfBirth: new Date('2000-04-03')
})
console.log('Steph was added')

const maris = Customer.build({
    firstName: 'Maris',
    lastName: 'Stella',
    wallet: 235000000,
    dateOfBirth: new Date('1997-12-05')
})
await maris.save()
console.log('Maris was built and saved')

const jon = await Customer.findOne({
    where: {
        firstName: 'Jon'
    }
})
if (jon !== null) {
    console.log('Found ', jon.toJSON())
    jon.firstName = 'Jonathan'
    jon.lastName = 'Donald'

    await jon.save()
    console.log('Jon saved')

}else console.log('Not found')

const dracula = await Customer.findOne({ where: { lastName: 'Dracula' } })
if (dracula !== null) {
    await dracula.destroy()
    console.log('Dracula was killed and destroyed')
}else console.log('Dracula was not found')


let fetchUsers = await Customer.findAll({
    attributes: ['firstName', 'lastName'],
    limit: 2,
    offset: 1,
})
console.log(JSON.stringify(fetchUsers, null, 2))

fetchUsers = await Customer.findAll({
    attributes:  {
        exclude: ['createdAt']
    }
})
console.log(JSON.stringify(fetchUsers, null, 2))

fetchUsers = await Customer.findAll({
    where: {
        [Op.or]: {
            dateOfBirth: {
                [Op.lte]: new Date('2000-01-01')
            },
            wallet: {
                [Op.gte]: 1000000000
            }
        }
    }
})
console.log(JSON.stringify(fetchUsers, null, 2))

fetchUsers = await Customer.findAll({
    where: {
        dateOfBirth: {
            [Op.lte]: new Date('2000-01-01')
        },
        wallet: {
            [Op.gte]: 1000000000
        }
    },
    order: [
        ['wallet', 'DESC']
    ],
})
console.log(JSON.stringify(fetchUsers, null, 2))

fetchUsers = await Customer.findAll({
    where: {
        id: [1, 2]
    }
})
console.log(JSON.stringify(fetchUsers, null, 2))

await Customer.update({ lastName: 'Nkiru' }, {
    where: {
        id: 6,
    },
})

await Customer.destroy({
    where: {
        firstName: {
            [Op.like]: '%fest%'
        },
    },
})

const count = await Customer.count()
console.log(`we have ${count} customers in the database`)

const richest = await Customer.max('wallet')
const poorest = await Customer.min('wallet')
console.log(`The richest has ${richest}, while the poorest has ${poorest}`)

const customer = await Customer.findByPk(3)
if (customer !== null) {
    console.log('Customer found: ', customer.toJSON())
} else console.log('Customer not found')

const addFestus = await Customer.findOrCreate({
    where: { firstName: 'Festus' },
    defaults: {
        firstName: 'festus',
        lastName: 'Agboma',
        wallet: 10000000000,
        dateOfBirth: new Date('1998-07-23'),
    },
})

const newUser = await User.create({
    username: 'festusyuma',
    password: '1234567,'
})

const festus = await Customer.findOne({
    where: {
        firstName: 'festus',
        lastName: 'Agboma',
    }
})

if (festus !== null) {
    festus.userId = newUser.id
    await festus.save()
    console.log('Saved user to festus')
}

/*
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
})*/
