const { DataTypes } = require('sequelize');
const { dbSQLize } = require('../database');
const bcrypt = require('bcrypt');
const validator = require('validator');
const { apiErrors } = require('../middleware/apiError');
const { HttpStatusCode } = require('axios');



//DataSource
const dataSource = dbSQLize;

const LockerGroup = dataSource.define(
    'LockerGroup',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(33),
            allowNull: false
        },
        tags: {
            type: DataTypes.JSON,
            defaultValue: [],
            allowNull: false
        }
    },
    {
        tableName: null,
        hooks: {
            beforeCreate: async (lockergroup) => {
             

            },
            beforeUpdate: async (lockergroup) => {
                
            },
            afterUpdate: async (lockergroup) => {
                
            },
        }
    }
)


module.exports = {LockerGroup}