'use strict';
const {DataTypes}= require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('logins', {id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      autoIncrement: true,
      primaryKey:true
    },email_id : {
    type: DataTypes.STRING,
    allowNull : false,
    unique : true
    

},roleId :{
    type: DataTypes.INTEGER,
    allowNull: false,references:{
      model: 'roles',
      key: 'roleid'
    }   
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
  }});
  
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('logins');
  }
};
