'use strict';
const bcrypt = require('bcrypt');
const hashu =async(pass)=>{
  return bcrypt.hash(pass,10);
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
     await queryInterface.bulkInsert('employee_data', [{
        name: 'Anurag Bhattacharjee',
       
        email_id: 'anurag@gmail.com',
        roleId: 3,
        address: 'kolkata',
        password:await  hashu('anurag')
    },{
      name: 'new',
     
      email_id: 'anurag2@gmail.com',
      roleId: 2,
      address: 'kolkata',
      password:await  hashu('anurag')
  },{
    name: 'new2',
   
    email_id: 'anurag3@gmail.com',
    roleId: 2,
    address: 'kolkata',
    password:await  hashu('anurag')
},{
      name: 'Anurag Bhattacharjee',
      
      email_id: 'anurag1@gmail.com',
      roleId: 1,
      address: 'kolkata',
      password:await  hashu('anurag')
  },{
    name: 'Shubham Lingwal',
    
    email_id: 'shubham@gmail.com',
    roleId: 1,
    address: 'uttarakhand',
    password:await  hashu('anurag')
},{
  name: 'Muhammed Razin',

  email_id: 'muhammed@gmail.com',
  roleId: 1,
  address: 'kerala',
  password:await  hashu('anurag')
},{
  name: 'Sanjay',
  
  email_id: 'sanjay@gmail.com',
  roleId: 1,
  address: 'chennai',
  password:await  hashu('anurag')
},{
  name: 'Chandru',
  
  email_id: 'chandru@gmail.com',
  roleId: 1,
  address: 'chennai',
  password:await  hashu('anurag')
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
