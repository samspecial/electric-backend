"use strict";
require("dotenv").config();
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { AdminOnePassword, AdminTwoPassword, AdminOneEmail, AdminTwoEmail } = process.env;
    await queryInterface.bulkInsert(
      "users",
      [
        {
          uuid: "7a38141f-4268-4150-b10e-f5ce75beb3b1",
          firstname: "Samuel",
          lastname: "Osinloye",
          email: AdminOneEmail,
          password: AdminOnePassword,
          role: "admin",
          updatedAt: new Date(),
          createdAt: new Date()
        },
        {
          uuid: "eb55c024-48f7-4fcd-bc8a-a3ad0cc25eac",
          firstname: "Emmanuel",
          lastname: "Osinloye",
          email: AdminTwoEmail,
          password: AdminTwoPassword,
          role: "admin",
          updatedAt: new Date(),
          createdAt: new Date()
        }
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
