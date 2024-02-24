'use strict';
const bcrypt = require('bcrypt');
const hashu =async(pass)=>{
  return bcrypt.hash(pass,10);
}


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

   
      await queryInterface.bulkInsert('logins', [{
        
        email_id: 'anurag@gmail.com',
        password: await hashu('anurag'),
        roleId: 3
      },{
        email_id: 'anurag1@gmail.com',
        password:await  hashu('anurag'),
        roleId: 1
      },{
        email_id: 'muhammed@gmail.com',
        password:await hashu('anurag'),
        roleId: 1
      },{
        email_id: 'shubham@gmail.com',
        password:await hashu('anurag'),
        roleId: 1
      },{
        email_id: 'chandru@gmail.com',
        password:await  hashu('anurag'),
        roleId: 1
      },{
        email_id: 'sanjay@gmail.com',
        password:await  hashu('anurag'),
        roleId: 1
      }], {});
    
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
