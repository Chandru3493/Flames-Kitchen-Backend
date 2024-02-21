const {sequelize} = require('../db.js');
const {DataTypes} = require('sequelize');

const Login = sequelize.define('login',{
    email_id : {
        type: DataTypes.STRING,
        allowNull : false,
        unique : true
        

    }, role :{
        type: DataTypes.STRING,
        allowNull: false   
    },
    password : {
        type : DataTypes.STRING,
        allowNull: false
    }
    ,
    loggedin : {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      },
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true
      },
})
;


module.exports= Login