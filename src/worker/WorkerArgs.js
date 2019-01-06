function WorkerArgs(method, args) {
    this.method = method;
    this.args = args;
}

module.exports = function createWorkerArgs(method, args) {
    return new WorkerArgs(method, args);
}