import { server } from '@k8s-demo-byjean/http';

server.get('/', {}, (req, res) => {
  res.send({ crud: 'get' });
});

server.listen(3000, (err: Error, address: string) => {
  if (err) {
    server.log.error(err);
    process.exit(1);
  }
  server.log.info(`pricer server listening on ${address}`);
});
