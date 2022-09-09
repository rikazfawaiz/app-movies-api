const Sequalize = require('sequelize');

const sequelize = new Sequalize('db_nodejs', 'root', '', {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql'
});

const db = {}

db.sequelize = sequelize;
db.Sequalize = Sequalize;

// console.log(db);

module.exports = sequelize;
