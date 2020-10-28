import { server } from '@k8s-demo-byjean/http';
import { home } from './routes/home';
import { echo } from './routes/echo';

server.register(home, { prefix: '/api' });
server.register(echo, { prefix: '/api' });

server.listen(3000, '::').then(
  () => {},
  (err) => {
    server.log.error(err);
    process.exit(1);
  }
);
