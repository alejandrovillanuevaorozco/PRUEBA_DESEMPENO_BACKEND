import swaggerJSDoc, { Options } from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Application } from 'express';

const swaggerOptions: Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'RiwiMediCare Plus API',
      version: '1.0.0',
      description: 'API REST para gestionar las solicitudes de abastecimiento de medicamentos.',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor Local',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    // Aplica el candado de seguridad globalmente
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  // Le indicamos a Swagger dónde buscar los comentarios JSDoc
  apis: ['./src/routes/*.ts'], 
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

export const swaggerDocs = (app: Application, port: number | string): void => {
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log(`📄 Documentación Swagger disponible en http://localhost:${port}/api/docs`);
};