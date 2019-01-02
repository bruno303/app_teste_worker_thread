'use strict'

const worker_threads = require('worker_threads');
const log = require('./logger.js')();
const Workers = require('./Workers.js');

function createWorker(path, callback, params = {}){
    const worker = new worker_threads.Worker(path, { workerData: params });
    worker.ref();
    worker.on('message', obj => {
        callback(obj.err, obj.result);
    });

    worker.on('error', callback);

    worker.on('exit', (code) => {
        if (code !== 0) {
            log.gravarLogErro(`Thread died with code ${code}!`);
        } else {
            log.gravarLogExecucao(`Thread died!`);
        }
    });

    return worker;
}

function Pool(opts) {
    this.opts = opts || {};
    this.max = this.opts.max || require('os').cpus().length;
    this.workers = new Workers();

    this.enqueue = function(path, callback, args = {}) {
        if(this.workers.getSize() < this.max) {

            const worker = createWorker(path, callback, args);
            worker.on('message', obj => {
                this.workers.remove(worker);
            });

            this.workers.add(worker);
        }
        else {
            callback('Queue is full!', null);
        }
    }
}

module.exports = Pool;