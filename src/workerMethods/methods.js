function fibonacci(num) {
    if (num < 2){
        return num
    }
    return fibonacci(num - 1) + fibonacci(num - 2);
}

function sum(num) {
    let sum = 0;
    for (let cont = 0; cont < num; cont++) {
        sum += cont;
    }
    return sum;
}

module.exports = {
    sum,
    fibonacci
}