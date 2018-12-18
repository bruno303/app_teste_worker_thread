const worker_threads = require('worker_threads');

const sum = require('./../methods/sum.js');

const params = worker_threads.workerData;

const result = sum(params.maxSum);
worker_threads.parentPort.postMessage({ err: null, result });