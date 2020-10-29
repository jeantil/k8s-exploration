import * as k8s from '@kubernetes/client-node';
import pino from 'pino';

import { apply } from './operations/apply';
import { API_DEPLOYMENT, NAMESPACE, NAMESPACE_NAME } from './specs/specs';

const logger = pino();

// TODO make config switchable ?
const kc = new k8s.KubeConfig();
kc.loadFromDefault();

async function main(): Promise<void> {
  kc.addContext({
    name: NAMESPACE_NAME,
    namespace: NAMESPACE_NAME,
    cluster: 'minikube',
    user: 'minikube'
  });

  kc.setCurrentContext(NAMESPACE_NAME);
  kc.mergeConfig;
  logger.info('Switched to namespace %s', NAMESPACE_NAME);
  const client = kc.makeApiClient(k8s.CoreV1Api);
  return client.listNamespacedPod(NAMESPACE_NAME).then((res) => {
    logger.info(res.body);
  });
}

main().catch((error) => logger.error(error));
