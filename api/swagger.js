const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
	openapi: '3.0.0',
	info: {
	  title: 'API de Presupuesto Personal',
	  version: '1.0.0',
	  description: 'Documentación de la API de Presupuesto Personal',
	},
	servers: [
	  {
		url: 'http://localhost:5000',
	  },
	],
  },
  apis: ['./routes/*.js'],
};

const specs = swaggerJsdoc(options);

module.exports = {
  swaggerUi,
  specs,
};