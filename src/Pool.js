"use strict"

const Workers = require('./worker/Workers.js');
const WorkerResult = require('./worker/WorkerResult.js');

function Pool(opts) {
    this.opts = opts || {};
    this.max = this.opts.max || require('os').cpus().length;

    let workers = new Workers(this.methodsPath);

    this.getSize = function() {
        return workers.getSize();
    }

    this.enqueue = function(method, args, callback) {
        try {
            if (this.getSize() < this.max) {

                workers.createWorker(method, args, callback, true);

            } else {
                this.tryAllocate(method, args, callback);
            }
        }
        catch(err) {
            let workerResult = new WorkerResult();
            workerResult.err = { message: err.message, args, cb: callback };
            workerResult.result = null;
            callback(workerResult.err, workerResult.result);
        }
    }

    this.tryAllocate = function(method, args, callback) {
        let workerFree = workers.getFreeWorker();
        if (workerFree !== undefined) {
            workerFree.run(method, args, callback);
        }
        else {
            let workerResult = new WorkerResult();
            workerResult.err = { message: 'full', args, cb: callback };
            workerResult.result = null;
            callback(workerResult.err, workerResult.result);
        }
    }

    this.terminateAll = function() {
        workers.terminateAll();
    }
}

module.exports = Pool;