const jwt = require('jsonwebtoken');

const models = require('../../models/v1');

const user1 = {
    id: 1,
    name: 'Christofer Null',
    email: 'null@nullable.com',
    password: 'nullable',
    token: jwt.sign({
        id: 1
    }, process.env.JWT_SECRET)
};

const setupDatabase = async () => {
    await models.User.destroy({
        truncate: true
    });
    await models.User.create(user1);
};

const tearDown = async() => {
    await models.sequelize.close();
}

module.exports = {
    user1,
    setupDatabase,
    tearDown
};