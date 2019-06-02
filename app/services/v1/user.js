'use strict';

const bcrypt = require('bcryptjs');

const models = require('../../models/v1');

function createUser(user) {
    return models.User.create(user);
}

async function findByCredentials(email, password) {
    const user = await models.User.findOne({ 
        where: {
            email
        }
    });
    
    if (!user) {
        throw new Error('Email/Password does not match');
    }

    if (!user.status) {
        throw new Error('User account does not exist');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error('Email/Password does not match');
    }

    return user;
}

function removeUser(userId) {
    return models.User.update({
        status: 0,
        token: null
    }, {
        where: {
            id: userId
        }
    });
}

function clearAuthToken(userId) {
    return _setAuthToken(userId);
}

function addAuthToken(userId, token) {
    return _setAuthToken(userId, token);
}

function _setAuthToken(userId, token = null) {
    return models.User.update({
        token
    }, {
        where: {
            id: userId
        }
    });
}

module.exports = {
    createUser,
    findByCredentials,
    removeUser,
    clearAuthToken,
    addAuthToken
};