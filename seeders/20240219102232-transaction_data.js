'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
      await queryInterface.bulkInsert('transactions', [{
        date:'2024-05-01',time:'0600',mode:'cash',name:'A',refid:'1',type:'food order',sum: 1000,items: ['kadai paneer','rice','chicken korma','naan']
      },{
        date: '2024-05-01',
        time: '0700',
        mode: 'card',
        name: 'B',
        refid: '2',
        type: 'food order',
        sum: 850,
        items: ['biryani', 'naan', 'rasmalai']
        },{
          date: '2024-05-01',
          time: '1000',
          mode: 'online',
          name: 'D',
          refid: '4',
          type: 'food order',
          sum: 500,
          items: ['sushi', 'miso soup']
          },{
            date: '2024-05-01',
            time: '1400',
            mode: 'card',
            name: 'F',
            refid: '6',
            type: 'food order',
            sum: 950,
            items: ['pasta', 'caesar salad', 'garlic bread']
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
