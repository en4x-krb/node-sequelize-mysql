'use strict';

const app = require('./app');
const models = require('./models/v1');

const port = process.env.PORT || 4944;

models.sequelize
	.authenticate()
	.then(() => {
		console.log('Connection has been established successfully.');
		app.listen(port, () => {
			console.info(`Server is running on port ${port}`);
		});
	})
	.catch(err => {
		console.error('Unable to connect to the database:', err);
	});

process.on('SIGTERM', shutDown);
process.on('SIGINT', shutDown);

async function shutDown() {
	console.log("Server shutdown");
	try {
		await models.sequelize.close();
		process.exit(0);
	} catch(err) {
		process.exit(1);
	}
}