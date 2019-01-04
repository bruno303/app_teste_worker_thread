'use strict'

const Worker = require('./Worker.js');

function Workers() {
    /* Array to keep the threads */
    let workers = [];

    /* Return number of threads */
    this.getSize = function() {
        return workers.length;
    }   

    /* Create a new Worker Thread, insert into array and start the execution */
    this.createWorker = function(path, args, callback, start = false) {
        let worker = new Worker(path, args, callback);

        /* Add thread on the array */
        workers.push(worker);

        /* Start processing */
        if (start) {
            worker.run(args);
        }
    }

    /* Search for a free worker thread */
    this.getFreeWorker = function() {
        let workerFree = undefined;
        let i = 0;
        while (i < workers.length && workerFree === undefined) {
            if (!workers[i].busy) {
                workerFree = workers[i];
            }
            i++;
        }
        return workerFree;
    }

    /* Terminate all threads and clean the array */
    this.terminateAll = function() {
        for (let i = 0; i < workers.length; i++) {
            workers[i].terminate();
        }
        workers.splice(0, workers.length);
    }
}

module.exports = Workers;