'use strict'

const Workers = require('./worker/Workers.js');
const WorkerResult = require('./worker/WorkerResult.js');

function Pool(opts) {
    this.opts = opts || {};
    let workers = new Workers();

    this.max = this.opts.max || require('os').cpus().length;

    this.getSize = function() {
        return workers.getSize();
    }

    this.enqueue = function(path, args, callback) {
        try {
            if (this.getSize() < this.max) {

                workers.createWorker(path, args, callback, true);

            } else {
                this.tryAllocate(path, args, callback);
            }
        }
        catch(err) {
            let workerResult = new WorkerResult();
            workerResult.err = { message: err, path, args, cb: callback };
            workerResult.result = null;
            callback(workerResult.err, workerResult.result);
        }
    }

    this.tryAllocate = function(path, args, callback) {
        let workerFree = workers.getFreeWorker();
        if (workerFree !== undefined) {
            workerFree.callback = callback;
            workerFree.run(args);
        }
        else {
            let workerResult = new WorkerResult();
            workerResult.err = { message: 'full', path, args, cb: callback };
            workerResult.result = null;
            callback(workerResult.err, workerResult.result);
        }
    }

    this.terminateAll = function() {
        workers.terminateAll();
    }
}

module.exports = Pool;