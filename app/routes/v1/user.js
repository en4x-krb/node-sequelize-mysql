'use strict';

const router = require('express').Router();

const auth = require('../../middlewares/auth');

const userController = require('../../controllers/v1/user');

router.post('/', userController.createUser);

router.post('/login', userController.login);

router.get('/me', auth, userController.getMyProfile);

router.delete('/', auth, userController.removeUser);

router.delete('/logout', auth, userController.logout);


module.exports = router;