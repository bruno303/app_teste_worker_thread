function fibonacci(obj) {

    let num = Number.parseInt(obj.num);

    if (num < 2){
        return num
    }
    return fibonacci({ num: num - 1 }) + fibonacci({ num: num - 2 });
}

function sum(obj) {

    let max = Number.parseInt(obj.maxSum);

    let sum = 0;
    for (let cont = 0; cont < max; cont++) {
        sum += cont;
    }
    return sum;
}

module.exports = {
    sum,
    fibonacci
}