const worker_threads = require('worker_threads');

const sum = require('./../methods/sum.js');

const params = worker_threads.workerData;
let result = 0;

try {
    result = sum(params.maxSum);
}
catch(err) {
    worker_threads.parentPort.postMessage({
        err,
        result: null
    });
}

worker_threads.parentPort.postMessage({
    err: null,
    result: `The sum until ${params.maxSum} is ${result}`
});