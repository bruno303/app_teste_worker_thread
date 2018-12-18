const worker_threads = require('worker_threads');
const log = require('../logger.js')();

function createWorker(path, callback, params = []){
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


module.exports = {
    createWorker
};