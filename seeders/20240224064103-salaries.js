'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
      await queryInterface.bulkInsert('salaries', [{
        emp_salary: 45
      },{
        emp_salary: 45
      },{
        emp_salary: 45
      },{
        emp_salary: 45
      },{
        emp_salary: 45
      },{
        emp_salary: 45
      },{
        emp_salary: 45
      },{
        emp_salary: 50
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
