import * as k8s from '@kubernetes/client-node';
import pino from 'pino';

import { apply } from './operations/apply';
import { API_DEPLOYMENT, NAMESPACE, NAMESPACE_NAME } from './specs/specs';

const logger = pino();

// TODO make config switchable ?
const kc = new k8s.KubeConfig();
kc.loadFromDefault();

async function main(): Promise<void> {
  const defaultClient = k8s.KubernetesObjectApi.makeApiClient(kc);
  await apply(defaultClient, logger, NAMESPACE);
  /*kc.addContext({
    name: NAMESPACE_NAME,
    namespace: NAMESPACE_NAME,
    cluster: 'microk8s-cluster',
    user: 'admin'
  });*/
  kc.setCurrentContext(NAMESPACE_NAME);
  logger.info('Switched to namespace %s', NAMESPACE_NAME);
  const client = k8s.KubernetesObjectApi.makeApiClient(kc);
  await apply(client, logger, API_DEPLOYMENT);
}

main().catch((error) => logger.error(error));
