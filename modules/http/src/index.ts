import { fastify } from 'fastify';
import pino from 'pino';

export const logger = pino();
export const server = fastify({
  logger,
  bodyLimit: 2097152,
  requestIdHeader: 'X-Request-ID'
});

if (process.env.NODE_ENV === 'development') {
  server.ready(() => {
    console.log(server.printRoutes());
  });
}

process.on('SIGINT', function () {
  server.log.info('Server shutting down...');
  server.close();
  server.log.info('Ok thx bye');
});
