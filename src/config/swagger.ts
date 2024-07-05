import express, { Express } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Profile Hub API',
      version: '1.0.0',
      description: 'API for managing user profiles',
    },
    servers: [
      {
        url: 'http://localhost:4000',
      },
    ],
    components: {
      schemas: {
        User: {
          type: 'object',
          required: [
            'firstName',
            'lastName',
            'email',
            'dateOfBirth',
            'address',
            'phoneNumber',
            'identityNumber',
            'identityType',
            'password',
            'role'
          ],
          properties: {
            id: {
              type: 'string',
              description: 'The auto-generated id of the user',
            },
            firstName: {
              type: 'string',
              description: 'The first name of the user',
            },
            lastName: {
              type: 'string',
              description: 'The last name of the user',
            },
            email: {
              type: 'string',
              description: 'The email of the user',
            },
            dateOfBirth: {
              type: 'string',
              format: 'date',
              description: 'The date of birth of the user',
            },
            address: {
              type: 'string',
              description: 'The address of the user',
            },
            phoneNumber: {
              type: 'string',
              description: 'The phone number of the user',
            },
            identityNumber: {
              type: 'string',
              description: 'The identity number of the user',
            },
            identityType: {
              type: 'string',
              description: 'The type of identity document of the user',
            },
            profilePicture: {
              type: 'string',
              description: 'The profile picture of the user',
            },
            password: {
              type: 'string',
              description: 'The password of the user',
            },
            role: {
              type: 'string',
              enum: ['User', 'Admin', 'Owner'],
              description: 'The role of the user',
            },
          },
        },
        CreateUserDto: {
          type: 'object',
          required: [
            'firstName',
            'lastName',
            'email',
            'dateOfBirth',
            'address',
            'phoneNumber',
            'identityNumber',
            'identityType',
            'password',
            'role'
          ],
          properties: {
            firstName: {
              type: 'string',
              description: 'The first name of the user',
            },
            lastName: {
              type: 'string',
              description: 'The last name of the user',
            },
            email: {
              type: 'string',
              description: 'The email of the user',
            },
            dateOfBirth: {
              type: 'string',
              format: 'date',
              description: 'The date of birth of the user',
            },
            address: {
              type: 'string',
              description: 'The address of the user',
            },
            phoneNumber: {
              type: 'string',
              description: 'The phone number of the user',
            },
            identityNumber: {
              type: 'string',
              description: 'The identity number of the user',
            },
            identityType: {
              type: 'string',
              description: 'The type of identity document of the user',
            },
            password: {
              type: 'string',
              description: 'The password of the user',
            },
            role: {
              type: 'string',
              enum: ['User', 'Admin', 'Owner'],
              description: 'The role of the user',
            },
            profilePicture: {
              type: 'string',
              description: 'The profile picture of the user',
              nullable: true,
            },
          },
        },
        UpdateUserDto: {
          type: 'object',
          properties: {
            firstName: {
              type: 'string',
              description: 'The first name of the user',
            },
            lastName: {
              type: 'string',
              description: 'The last name of the user',
            },
            email: {
              type: 'string',
              description: 'The email of the user',
            },
            dateOfBirth: {
              type: 'string',
              format: 'date',
              description: 'The date of birth of the user',
            },
            address: {
              type: 'string',
              description: 'The address of the user',
            },
            phoneNumber: {
              type: 'string',
              description: 'The phone number of the user',
            },
            identityNumber: {
              type: 'string',
              description: 'The identity number of the user',
            },
            identityType: {
              type: 'string',
              description: 'The type of identity document of the user',
            },
            password: {
              type: 'string',
              description: 'The password of the user',
            },
            role: {
              type: 'string',
              enum: ['User', 'Admin', 'Owner'],
              description: 'The role of the user',
            },
            profilePicture: {
              type: 'string',
              description: 'The profile picture of the user',
              nullable: true,
            },
          },
        },
        PaginatedUsersDto: {
          type: 'object',
          properties: {
            totalItems: {
              type: 'integer',
              description: 'The total number of items',
            },
            totalPages: {
              type: 'integer',
              description: 'The total number of pages',
            },
            currentPage: {
              type: 'integer',
              description: 'The current page number',
            },
            users: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/UserDto',
              },
              description: 'The list of users',
            },
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.ts', './src/models/*.ts'],
};

export function setupSwagger(app: Express): void {
  const swaggerDocs = swaggerJsdoc(swaggerOptions);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
  console.log('Swagger UI is available at /api-docs');
}
