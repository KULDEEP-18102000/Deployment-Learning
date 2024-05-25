const Sequelize=require('sequelize')

const sequelize=require('../util/database')

const ForgotPassword=sequelize.define('forgotpasswordrequests',{
    id:{
        type:Sequelize.STRING,
        allowNull:false,
        primaryKey:true
    },
    userId:{
        type:Sequelize.INTEGER
    },
    isactive:Sequelize.BOOLEAN
})

module.exports=ForgotPassword