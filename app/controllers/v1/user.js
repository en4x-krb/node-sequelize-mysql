const log = require('debug')('routes:users');

const userServices = require('../../services/v1/user');

async function createUser(req, res) {
    try {
        const user = await userServices.createUser(req.body);
        const token = user.generateAuthToken();
        await userServices.addAuthToken(user.id, token);

        res.set('Authorization', `Bearer ${token}`);
        res.status(201).send({ user, token });
        
    } catch (err) {
        log(err);
        res.status(500).send(err);
    }
}

async function getMyProfile(req, res) {
    try {
        res.send(req.user);
    } catch(err) {
        log(err);
        res.status(500).send(err);
    }
}

async function removeUser(req, res) {
    try {
        const disabledUser = await userServices.removeUser(req.user.id);
        res.send(disabledUser);

    } catch(err) {
        log(err);
        res.status(500).send(err.message);
    }
}

async function login(req, res) {
    try {
        const { email, password } = req.body;

        const user = await userServices.findByCredentials(email, password);

        const token = user.generateAuthToken();

        await userServices.addAuthToken(user.id, token);

        res.set('Authorization', 'Bearer ' + token);
        res.send({ user, token });

    } catch (err) {
        log(err);
        res.status(401).send(err.message);
    }
}

async function logout(req, res) {
    try {
        const user = await userServices.clearAuthToken(req.user.id);
        res.send(user);
    } catch (err) {
        log(err);
        res.status(500).send(err.message);
    }
}

module.exports = {
    createUser,
    getMyProfile,
    removeUser,
    login,
    logout
};