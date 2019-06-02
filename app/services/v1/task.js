'use strict';

const models = require('../../models/v1');

function createTask(userId, task) {
    return models.Task.create({
        ...task,
        userId
    });
}

function updateTask(userId, taskId, data) {
    return models.Task.update(data, {
        where: {
            id: taskId,
            userId,
            status: 1
        }
    });
}

function getTasks(userId) {
    return models.Task.findAll({
        where: {
            userId,
            status: 1
        }
    });
}

function getTask(userId, taskId) {
    return models.Task.findOne({
        where: {
            id: taskId,
            userId,
            status: 1
        }
    });
}

function removeTask(userId, taskId) {
    return models.Task.update({
        status: 0
    }, {
        where: {
            id: taskId,
            userId
        }
    })
}

module.exports = {
    createTask,
    updateTask,
    getTasks,
    getTask,
    removeTask
};