'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'first_name',
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'last_name',
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'username',
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'email',
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'password',
      },
      gender: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'gender',
      },
      profileImage: {
        type: Sequelize.STRING,
        allowNull: true,
        field: 'profile_image',
      },
      isDeleted: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        field: 'is_deleted',
        defaultValue: false,
      },
      mobileNumber: {
        type: Sequelize.STRING,
        allowNull: true,
        field: 'mobile_number',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'created_at',
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'updated_at',
      },
    })
  },
  async down(queryInterface) {
    await queryInterface.dropTable('users')
  },
}
