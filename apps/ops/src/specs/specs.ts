import {
  V1Container,
  V1Deployment,
  V1Namespace
} from '@kubernetes/client-node';

// All operations for this repository are isolated in the following namespace
export const NAMESPACE_NAME = 'k8s-demo-byjean';
export const NAMESPACE: V1Namespace = {
  apiVersion: 'v1',
  kind: 'Namespace',
  metadata: {
    name: NAMESPACE_NAME,
    labels: {
      visualize: 'visualize'
    }
  }
};
// This repository contains 2 deployed applications :
const PRICER_CONTAINER: V1Container = {
  name: 'k8s-demo-pricer',
  image: 'jeantil/k8s-demo-pricer',
  resources: {
    limits: { cpu: '2', memory: '250Mi' },
    requests: { cpu: '1', memory: '32Mi' }
  }
};
const CRUDER_CONTAINER: V1Container = {
  name: 'k8s-demo-cruder',
  image: 'jeantil/k8s-demo-cruder',
  resources: {
    limits: { cpu: '2', memory: '250Mi' },
    requests: { cpu: '1', memory: '32Mi' }
  }
};
// Cruder and pricer run in a single coordinated deployment
// their lyfecycles are coupled
export const API_DEPLOYMENT: V1Deployment = {
  apiVersion: 'apps/v1',
  kind: 'Deployment',
  metadata: {
    name: 'k8s-demo-api',
    labels: {
      app: 'api',
      name: 'api-deployment',
      visualize: 'true',
      run: 'visualize'
    }
  },
  spec: {
    replicas: 2,
    selector: {
      matchLabels: {
        app: 'api'
      }
    },
    template: {
      metadata: {
        labels: {
          app: 'api',
          name: 'api',
          run: 'visualize',
          visualize: 'true'
        }
      },
      spec: { containers: [PRICER_CONTAINER, CRUDER_CONTAINER] }
    }
  }
};
