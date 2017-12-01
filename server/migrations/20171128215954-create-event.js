
module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.createTable('Events', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      bookingStatus: {
        type: Sequelize.INTEGER,
        default: 0,
      },
      userId: {
        type: Sequelize.STRING,
        references: {
          model: 'users',
          key: 'email',
          as: 'userId',
        },
      },
      centerId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Centers',
          key: 'id',
          as: 'centerId',
        },
      },
      eventDate: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface, Sequelize) => { return queryInterface.dropTable('Events'); },
};
