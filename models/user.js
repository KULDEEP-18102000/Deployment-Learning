const Sequelize=require('sequelize');

const sequelize=require('../util/database')

const User=sequelize.define('users',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    name:{
        type:Sequelize.STRING,
        allowNull:false
    },
    email:{
        type:Sequelize.STRING,
        unique:true,
        allowNull:false
    },
    password:{
        type:Sequelize.STRING,
        allowNull:false
    },
    ispremiumuser:Sequelize.BOOLEAN,
    Total_cost:{
        type:Sequelize.INTEGER
    }
})

module.exports=User