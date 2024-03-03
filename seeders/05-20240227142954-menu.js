'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
     await queryInterface.bulkInsert('MenuItems', [{
        name: 'biriyani',
        description: 'A',
        price: 100,
        category: "main course",
        
      },{
        name: 'naan',
        description: 'A',
        price: 100,
        category: "main course",
        
      },{
        name: 'rasmalai',
        description: 'A',
        price: 100,
        category: "dessert",
        
      },{
        name: 'miso soup',
        description: 'A',
        price: 100,
        category: "main course",
        
      },{
        name: 'pasta',
        description: 'A',
        price: 100,
        category: "main course",
        
      },{
        name: 'sushi',
        description: 'A',
        price: 100,
        category: "starter",
        
      },{
        name: 'caesar salad',
        description: 'A',
        price: 100,
        category: "starter",
        
      },{
        name: 'garlic bread',
        description: 'A',
        price: 100,
        category: "starter",
        
      },{
        name: 'pizza',
        description: 'A',
        price: 100,
        category: "main course",
        
      },{
        name: 'chicken chowmein',
        description: 'A',
        price: 100,
        category: "main course",
        
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
