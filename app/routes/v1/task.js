'use strict';

const router = require('express').Router();

const auth = require('../../middlewares/auth');

const taskController = require('../../controllers/v1/task');

router.post('/', auth, taskController.createTask);

router.get('/', auth, taskController.getTasks);

router.get('/:id', auth, taskController.getTask);

router.delete('/:id', auth, taskController.removeTask);

router.patch('/:id', auth, taskController.updateTask);


module.exports = router;