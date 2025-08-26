// Swagger definition for Where2Meet Email API
export default {
  openapi: '3.0.0',
  info: {
    title: 'Where2Meet Email API',
    version: '1.0.0',
    description: 'API for sending invites and welcome emails for Where2Meet.'
  },
  servers: [
    {
      url: 'http://localhost:3010',
      description: 'Local server'
    }
  ],
  paths: {
    '/api/email/invite': {
      post: {
        summary: 'Send map collaboration invite emails',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  senderEmail: { type: 'string' },
                  senderName: { type: 'string' },
                  recipientEmail: { type: 'string' },
                  mapId: { type: 'string' },
                  mapName: { type: 'string' }
                },
                required: ['senderEmail', 'recipientEmail', 'mapId', 'mapName']
              }
            }
          }
        },
        responses: {
          200: { description: 'Success' },
          400: { description: 'Missing required fields' },
          500: { description: 'Failed to send invite emails' }
        }
      }
    },
    '/api/email/welcome': {
      post: {
        summary: 'Send welcome email',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  email: { type: 'string' },
                  name: { type: 'string' }
                },
                required: ['email']
              }
            }
          }
        },
        responses: {
          200: { description: 'Success' },
          400: { description: 'Missing email' },
          500: { description: 'Failed to send welcome email' }
        }
      }
    }
  }
};
