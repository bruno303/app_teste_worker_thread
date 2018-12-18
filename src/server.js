const port = 3000;
const express = require('express');
const app = express();
const log = require('./logger.js')();
const workerSum = require('./workers/workerSum.js');

app.route('/async')
.get((req, res) => {
    log.gravarLogExecucao('Execução assíncrona iniciada.');
    workerSum.createWorker('./src/workerMethods/methodSum.js', (err, result) => {
        if(err) {
            log.gravarLogErro(err);
        } else {
            res.end(`The sum is ${result}`);
        }
    }, { maxSum: req.query.max });
});

app.route('/sync')
.get((req, res) => {
    log.gravarLogExecucao('Execução síncrona iniciada.');
    const sum = require('./methods/sum.js');
    let result = sum(req.query.max);
    res.end(`The sum is ${result}`);
});

app.listen(port, () => {
    log.gravarLogExecucao(`Executando em: http://127.0.0.1:${port}.`);
});