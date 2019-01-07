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
    const now = new Date();

    /* Send to pool queue */
    pool.enqueue(methods.sum,   // function to execute
        (err, result) => {      // callback called after execution
            if(err) {
                res.status(500).send(`Erro: ${JSON.stringify(err)}`);
            } else {
                res.status(200).send(`Executed in ${(new Date() - now) / 1000} sec(s). Result: ${JSON.stringify(result)}`);
            }
        },
        Number.parseInt(req.params.num)); // parameters
});

/* Async Fibonacci Route */
app.route('/asyncfibo/:num')
.get((req, res) => {
    log.registerLogExec('Execução assíncrona iniciada.');
    const now = new Date();

    /* Send to pool queue */
    pool.enqueue(methods.fibonacci, (err, result) => {
        if(err) {
            res.status(500).send(`Erro: ${JSON.stringify(err)}`);
        } else {
            res.status(200).send(`Executed in ${(new Date() - now) / 1000} sec(s). Result: ${JSON.stringify(result)}`);
        }
    }, Number.parseInt(req.params.num));
});

/* Async Multip Route */
app.route('/asyncmultip/:num/:num2')
.get((req, res) => {
    log.registerLogExec('Execução assíncrona iniciada.');
    const now = new Date();

    /* Send to pool queue */
    pool.enqueue(
        (num1, num2) => Number.parseInt(num1, 10) * Number.parseInt(num2, 10),
        (err, result) => {      // callback called after execution
            if(err) {
                res.status(500).send(`Erro: ${JSON.stringify(err)}`);
            } else {
                res.status(200).send(`Executed in ${(new Date() - now) / 1000} sec(s). Result: ${JSON.stringify(result)}`);
            }
    }, Number.parseInt(req.params.num), Number.parseInt(req.params.num2));
});

/* Sync Sum Route */
app.route('/syncsum/:num')
.get((req, res) => {
    log.registerLogExec('Execução síncrona iniciada.');
    const now = new Date();
    const sum = methods.sum;

    /* Run in the Event Loop thread */
    let result = sum(Number.parseInt(req.params.num));
    res.status(200).send(`Executed in ${(new Date() - now) / 1000} sec(s). Result: ${JSON.stringify(result)}`);
});

/* Sync Fibonacci Route */
app.route('/syncfibo/:num')
.get((req, res) => {
    log.registerLogExec('Execução síncrona iniciada.');
    const now = new Date();
    const fibo = methods.fibonacci;

    /* Run in the Event Loop thread */
    let result = fibo(Number.parseInt(req.params.num));
    res.status(200).send(`Executed in ${(new Date() - now) / 1000} sec(s). Result: ${JSON.stringify(result)}`);
});

/* Sync Multip Route */
app.route('/syncmultip/:num/:num2')
.get((req, res) => {
    log.registerLogExec('Execução síncrona iniciada.');
    const now = new Date();
    const multip = function(num1, num2) {
        return num1 * num2;
    };

    /* Run in the Event Loop thread */
    let result = multip(Number.parseInt(req.params.num), Number.parseInt(req.params.num2));
    res.status(200).send(`Executed in ${(new Date() - now) / 1000} sec(s). Result: ${JSON.stringify(result)}`);
});

app.listen(port, () => {
    log.registerLogExec(`Executando em: http://127.0.0.1:${port}.`);
});