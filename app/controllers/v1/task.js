'use strict';

const log = require('debug')('routes:tasks');

const taskServices = require('../../services/v1/task');

const allowedTaskUpdates = ['description', 'name', 'completed'];

async function createTask(req, res) {
    try {
        const task = await taskServices.createTask(req.user.id, req.body);
        res.status(201).send(task);
        
    } catch (err) {
        log(err);
        res.status(500).send(err);
    }
}

async function getTasks(req, res) {
    try {
        const tasks = await taskServices.getTasks(req.user.id);
        res.send(tasks);
    } catch(err) {
        log(err);
        res.status(500).send(err);
    }
}

async function getTask(req, res) {
    try {
        const task = await taskServices.getTask(req.user.id, req.params.id);
        res.send(task);

    } catch(err) {
        log(err);
        res.status(500).send(err.message);
    }
}

async function removeTask(req, res) {
    try {
        const task = await taskServices.removeTask(req.user.id, req.params.id);
        res.send(task);

    } catch (err) {
        log(err);
        res.status(401).send(err.message);
    }
}

async function updateTask(req, res) {
    try {

        const isValidOperation = Object.keys(req.body).every(update => allowedTaskUpdates.includes(update));
    
        if (!isValidOperation)
            return res.status(400).send({error: 'Invalid updates!'});

        const task = await taskServices.updateTask(req.user.id, req.params.id, req.body);
        res.send(task);
    } catch (err) {
        log(err);
        res.status(500).send(err.message);
    }
}

module.exports = {
    createTask,
    getTasks,
    getTask,
    removeTask,
    updateTask
};