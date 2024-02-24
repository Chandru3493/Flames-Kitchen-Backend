const {sequelize} = require('../db.js');
const {DataTypes} = require('sequelize');
const Role = require('./role.js');
const Login = sequelize.define('logins',{
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
    autoIncrement: true,
    primaryKey:true
  },
    email_id : {
        type: DataTypes.STRING,
        allowNull : false,
        unique : true,
        
        

    }, roleId :{
        type: DataTypes.INTEGER,
        allowNull: false ,
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
Login.belongsTo(Role, { foreignKey: 'roleId' });

module.exports= Login