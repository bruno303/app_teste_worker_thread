"use strict"

const port = 3000;
const express = require('express');
const app = express();
const log = require('./logger.js')(true);
const Pool = require('./Pool.js');
const pool = new Pool();
const methods = require('./workerMethods/methods.js');

/* Async Sum Route */
app.route('/asyncsum/:num')
.get((req, res) => {
    log.registerLogExec('Execução assíncrona iniciada.');

    /* Send to pool queue */
    pool.enqueue(methods.sum.toString(), { maxSum: req.params.num }, (err, result) => {
        if(err) {
            res.status(500).send(`Erro: ${JSON.stringify(err)}`);
        } else {
            res.status(200).send(JSON.stringify(result));
        }
    });
});

/* Async Fibonacci Route */
app.route('/asyncfibo/:num')
.get((req, res) => {
    log.registerLogExec('Execução assíncrona iniciada.');

    /* Send to pool queue */
    pool.enqueue(methods.fibonacci.toString(), { num: req.params.num }, (err, result) => {
        if(err) {
            res.status(500).send(`Erro: ${JSON.stringify(err)}`);
        } else {
            res.status(200).send(JSON.stringify(result));
        }
    });
});

/* Async Multip Route */
app.route('/asyncmultip/:num/:num2')
.get((req, res) => {
    log.registerLogExec('Execução assíncrona iniciada.');

    const func = `
        function x(obj)
        {
            return Number.parseInt(obj.num, 10) * Number.parseInt(obj.num2, 10); 
        }`

    /* Send to pool queue */
    pool.enqueue(func, { num: req.params.num, num2: req.params.num2 }, (err, result) => {
        if(err) {
            res.status(500).send(`Erro: ${JSON.stringify(err)}`);
        } else {
            res.status(200).send(JSON.stringify(result));
        }
    });
});

/* Sync Sum Route */
app.route('/syncsum/:num')
.get((req, res) => {
    log.registerLogExec('Execução síncrona iniciada.');
    const sum = methods.sum;

    /* Run in the Event Loop thread */
    let result = sum({ maxSum: req.params.num });
    res.status(200).send(JSON.stringify(result));
});

/* Sync Fibonacci Route */
app.route('/syncfibo/:num')
.get((req, res) => {
    log.registerLogExec('Execução síncrona iniciada.');
    const fibo = methods.fibonacci;

    /* Run in the Event Loop thread */
    let result = fibo({ num: req.params.num });
    res.status(200).send(JSON.stringify(result));
});

/* Sync Multip Route */
app.route('/syncmultip/:num/:num2')
.get((req, res) => {
    log.registerLogExec('Execução síncrona iniciada.');
    const multip = function(obj) {
        return Number.parseInt(obj.num) * Number.parseInt(obj.num2);
    };

    /* Run in the Event Loop thread */
    let result = multip({ num: req.params.num, num2: req.params.num2 });
    res.status(200).send(JSON.stringify(result));
});

app.listen(port, () => {
    log.registerLogExec(`Executando em: http://127.0.0.1:${port}.`);
});