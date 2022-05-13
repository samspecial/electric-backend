"use strict";
require("dotenv").config();
console.log(process.env.NODE_ENV);
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { AdminOneEmail, AdminTwoEmail, AdminOnePassword, AdminTwoPassword } = process.env;

    await queryInterface.bulkInsert(
      "users",
      [
        {
          uuid: "7a38141f-4268-4150-b10e-f5ce75beb3b1",
          fullname: "Samuel Osinloye",
          phoneNumber: "08066876531",
          email: AdminOneEmail,
          password: AdminOnePassword,
          role: "admin",
          updatedAt: new Date(),
          createdAt: new Date()
        },
        {
          uuid: "eb55c024-48f7-4fcd-bc8a-a3ad0cc25eac",
          fullname: "Emmanuel Osinloye",
          phoneNumber: "08165058537",
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
