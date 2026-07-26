const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'AttendX Enterprise HRMS & Workforce Management API',
    version: '2.5.0',
    description: 'Complete OpenAPI documentation for AttendX modules: Auth, Employee Directory, Attendance, Leaves, Payroll, Performance, Audit Logs, Help Desk, AI HR Assistant, and Organization Management.',
    contact: {
      name: 'AttendX Engineering Team',
      email: 'support@attendx.com'
    }
  },
  servers: [
    {
      url: 'http://localhost:5000',
      description: 'Local Development Server'
    },
    {
      url: 'https://attendx-api.onrender.com',
      description: 'Production Cloud Server'
    }
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      }
    }
  },
  security: [
    {
      bearerAuth: []
    }
  ]
};

const options = {
  swaggerDefinition,
  apis: ['./routes/*.js', './server.js']
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
