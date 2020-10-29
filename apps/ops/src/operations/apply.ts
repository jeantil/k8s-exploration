import { KubernetesObject, KubernetesObjectApi } from '@kubernetes/client-node';
import { Logger } from 'pino';
export async function apply(
  client: KubernetesObjectApi,
  logger: Logger,
  spec: KubernetesObject
): Promise<KubernetesObject> {
  spec.metadata = spec.metadata || {};
  spec.metadata.annotations = spec.metadata.annotations || {};
  delete spec.metadata.annotations[
    'kubectl.kubernetes.io/last-applied-configuration'
  ];
  spec.metadata.annotations[
    'kubectl.kubernetes.io/last-applied-configuration'
  ] = JSON.stringify(spec);
  try {
    // try to get the resource, if it does not exist an error will be thrown and we will end up in the catch
    // block.
    await client.read(spec);
    // we got the resource, so it exists, so patch it
    const response = await client.patch(spec);
    logger.info('%s %s successfully updated', spec.kind, spec.metadata?.name);
    return response.body;
  } catch (e) {
    // we did not get the resource, so it does not exist, so create it
    const response = await client.create(spec);
    logger.info('%s %s successfully created', spec.kind, spec.metadata?.name);
    return response.body;
  }
}
