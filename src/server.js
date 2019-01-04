'use strict'

const port = 3000;
const express = require('express');
const app = express();
const log = require('./logger.js')(false);
const Pool = require('./Pool.js');
const pool = new Pool();

/* Async Route */
app.route('/async/:num')
.get((req, res) => {
    log.registerLogExec('Execução assíncrona iniciada.');

    /* Send to pool queue */
    pool.enqueue('./src/workerMethods/methodSum.js', { maxSum: req.params.num }, (err, result) => {
        if(err) {
            res.status(500).send(`Erro: ${JSON.stringify(err)}`);
        } else {
            res.status(200).send(JSON.stringify(result));
        }
    });
});

/* Sync Route */
app.route('/sync/:num')
.get((req, res) => {
    log.registerLogExec('Execução síncrona iniciada.');
    const sum = require('./methods/sum.js');

    /* Run in the Event Loop thread */
    let result = sum(req.params.num);
    res.status(200).send(result);
});

app.listen(port, () => {
    log.registerLogExec(`Executando em: http://127.0.0.1:${port}.`);
});