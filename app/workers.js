/* eslint-disable global-require */
import createWorkerMiddleware from './worker-middleware';

export default [
  createWorkerMiddleware('generate', () => require('worker-loader!../app/containers/GeneratePage/worker.js')),
];
