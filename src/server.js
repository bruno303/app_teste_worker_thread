const port = 3000;
const express = require('express');
const app = express();
const log = require('./logger.js')();
const Pool = require('./Pool.js');
const pool = new Pool();

app.route('/async/:num')
.get((req, res) => {
    log.gravarLogExecucao('Execução assíncrona iniciada.');
    pool.enqueue('./src/workerMethods/methodSum.js', (err, result) => {
        if(err) {
            log.gravarLogErro(err);
            res.end(err);
        } else {
            res.end(result);
        }
    }, { maxSum: req.params.num });
});

app.route('/sync/:num')
.get((req, res) => {
    log.gravarLogExecucao('Execução síncrona iniciada.');
    const sum = require('./methods/sum.js');
    let result = sum(req.params.num);
    res.end(result);
});

app.listen(port, () => {
    log.gravarLogExecucao(`Executando em: http://127.0.0.1:${port}.`);
});