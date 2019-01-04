'use strict'

const worker_threads = require('worker_threads');

worker_threads.Worker.prototype.busy = false;

function Worker(path, args, callback) {

    /* Internal worker thread */
    const _worker = new worker_threads.Worker(path, { workerData: args });
    this.busy = false;
    this.callback = callback;

    /* Send a message to start execution */
    this.run = function(args) {
        this.busy = true;
        _worker.postMessage(args);
    }

    /* Listen message event for the result */
    _worker.on('message', obj => {
        this.busy = false;
        this.callback(obj.err, obj.result);
    });

    /* Listen error event */
    _worker.on('error', err => {
        this.busy = false;
        this.callback(err, null);
    });

    /* Terminate the worker thread */
    this.terminate = function(){
        _worker.terminate();
    }
}

module.exports = Worker;