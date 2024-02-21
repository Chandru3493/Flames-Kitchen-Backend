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
        salary: 45,
        email_id: 'anurag@gmail.com',
        role: 'waiter',
        address: 'kolkata',
        password:await  hashu('anurag')
    },{
      name: 'Anurag Bhattacharjee',
      salary: 45,
      email_id: 'anurag1@gmail.com',
      role: 'admin',
      address: 'kolkata',
      password:await  hashu('anurag')
  },{
    name: 'Shubham Lingwal',
    salary: 45,
    email_id: 'shubham@gmail.com',
    role: 'admin',
    address: 'uttarakhand',
    password:await  hashu('anurag')
},{
  name: 'Muhammed Razin',
  salary: 45,
  email_id: 'muhammed@gmail.com',
  role: 'admin',
  address: 'kerala',
  password:await  hashu('anurag')
},{
  name: 'Sanjay',
  salary: 45,
  email_id: 'sanjay@gmail.com',
  role: 'admin',
  address: 'chennai',
  password:await  hashu('anurag')
},{
  name: 'Chandru',
  salary: 50,
  email_id: 'chandru@gmail.com',
  role: 'admin',
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
