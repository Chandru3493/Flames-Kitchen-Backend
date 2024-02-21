'use strict';
const {DataTypes}= require('sequelize');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('logins', {email_id : {
    type: DataTypes.STRING,
    allowNull : false,
    unique : true
    

},role :{
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
  }});
  
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('logins');
  }
};
