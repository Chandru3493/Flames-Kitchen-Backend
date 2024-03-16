'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
     await queryInterface.bulkInsert('tables', [{
        
        capacity: 0,
        status: 'Available'
      },{
        
        capacity: 0,
        status: 'Available'
      },{
       
        capacity: 0,
        status: 'Available'
      },{
        
        capacity: 0,
        status: 'Available'
      },{
       
        capacity: 0,
        status: 'Available'
      },{
       
        capacity: 0,
        status: 'Available'
      },{
        
        capacity: 0,
        status: 'Available'
      },{
        
        capacity: 0,
        status: 'Available'
      },{
       
        capacity: 0,
        status: 'Available'
      },{
        
        capacity: 0,
        status: 'Available'
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
