'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
     await queryInterface.bulkInsert('Table', [{
        
        capacity: 4,
        status: 'vacant'
      },{
        
        capacity: 4,
        status: 'vacant'
      },{
       
        capacity: 4,
        status: 'vacant'
      },{
        
        capacity: 4,
        status: 'vacant'
      },{
       
        capacity: 4,
        status: 'vacant'
      },{
       
        capacity: 4,
        status: 'vacant'
      },{
        
        capacity: 4,
        status: 'vacant'
      },{
        
        capacity: 4,
        status: 'vacant'
      },{
       
        capacity: 4,
        status: 'vacant'
      },{
        
        capacity: 4,
        status: 'vacant'
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
