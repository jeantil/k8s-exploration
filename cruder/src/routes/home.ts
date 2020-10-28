import { FastifyPluginAsync, RouteShorthandOptions } from 'fastify';

const homeSchema: RouteShorthandOptions = {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          crud: { type: 'string' }
        }
      }
    }
  }
};
export const home: FastifyPluginAsync = async (server, opts) => {
  server.get('/', homeSchema, (req, res) => {
    res.send({ crud: 'get' });
  });
};
