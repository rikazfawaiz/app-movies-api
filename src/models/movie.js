const sequelize = require('../dbconfig');
const { DataTypes } = require('sequelize');

const Movie = sequelize.define('movie', 
{
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        autoIncrement: false
    },
    title: {
        type: DataTypes.STRING
    },
    year: {
        type: DataTypes.INTEGER
    },
    runtime: {
        type: DataTypes.INTEGER
    },
    genres: {
        type: DataTypes.STRING
    },
    director: {
        type: DataTypes.STRING
    },
    plot: {
        type: DataTypes.TEXT
    }
},{
    freezeTableName: true
});

module.exports = Movie;

