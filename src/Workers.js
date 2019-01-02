'use strict'

function Workers() {
    this.workers = [];

    this.add = function(worker) {
        this.workers.push(worker);
    }

    this.remove = function(worker) {
        const index = this.workers.indexOf(worker);
        if(index !== -1){
            this.workers.splice(index, 1);
        }
    }

    this.getSize = function() {
        return this.workers.length;
    }
}

module.exports = Workers;