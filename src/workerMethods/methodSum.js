'use strict'

const worker_threads = require('worker_threads');
const WorkerResult = require('./../worker/WorkerResult.js');

/* Load sum function */
const sum = require('./../methods/sum.js');

/* Process on message event */
worker_threads.parentPort.on('message', msg => {

    let workerResult = new WorkerResult();

    try {
        workerResult.result = sum(msg.maxSum);
    }
    catch(err) {
        workerResult.err = err;
    }

    /* Answer with object */
    worker_threads.parentPort.postMessage(workerResult);
});