function sum(max) {
    let sum = 0;
    for (let cont = 0; cont < max; cont++) {
        sum += cont;
    }
    return sum;
}

module.exports = sum;