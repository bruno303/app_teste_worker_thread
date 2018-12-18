function Logger() {
    this.gravarLogExecucao = function(msg) {
        const data = new Date();
        console.log(`${data.toLocaleDateString()} ${data.toLocaleTimeString()} - ${msg}`);
    };

    this.gravarLogErro = function(err) {
        if (err) {
            const data = new Date();
            console.error(`${data.toLocaleDateString()} ${data.toLocaleTimeString()} - ${err}`);
        }
    };
}

function createLogger(){
    return new Logger();
}

module.exports = createLogger;