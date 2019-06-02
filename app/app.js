'use strict';

const express = require('express');

const userRoutes = require('./routes/v1/user');
const taskRoutes = require('./routes/v1/task');

const app = express();

const V1 = '/api/v1';

app.use(express.json());

app.use(`${V1}/users`, userRoutes);
app.use(`${V1}/tasks`, taskRoutes);

module.exports = app;