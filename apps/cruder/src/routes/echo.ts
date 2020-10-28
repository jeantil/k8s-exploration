import { FastifyPluginAsync, RouteShorthandOptions } from 'fastify';

const opts: RouteShorthandOptions = {
  schema: {
    body: {
      type: 'object',
      required: ['echo'],
      properties: {
        echo: { type: 'string' }
      }
    },
    response: {
      200: {
        type: 'object',
        required: ['echo'],
        properties: {
          echo: { type: 'string' }
        }
      }
    }
  }
};

export const echo: FastifyPluginAsync = async (server): Promise<void> => {
  server.post<{ Body: { echo: string } }>('/echo', opts, (req, res) => {
    server.log.info('body %s', req.body.echo);
    res
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ echo: req.body.echo });
  });
};
