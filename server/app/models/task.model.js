const { sequelize, Sequelize } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const Task = sequelize.define("tasks", {
        title: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        isDone: {
            type: Sequelize.BOOLEAN
        }
    });

    return Task;
};