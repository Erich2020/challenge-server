import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { join } from 'path';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Challenge Server API',
      version: '1.0.0',
      description: 'API documentation for the Challenge Server project',
    },
    basePath: 'api',
    tags: [
      {
        name: 'Auth',
        description: 'Endpoints para autenticación de usuarios',
      },
      {
        name: 'Users',
        description: 'Gestión de usuarios',
      },
      {
        name: 'Booking',
        description: 'Gestión de Booking',
      },
      {
        name: 'Occurrence',
        description: 'Gestión de Occurrence',
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
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: [join(__dirname, '../routes/*.{ts,js}')],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

export const setupSwagger = (app: any) => {
  app.use('/api/swagger-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};
