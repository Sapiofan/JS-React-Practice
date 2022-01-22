/* eslint-disable linebreak-style */
/* eslint-disable no-plusplus */
function loopFactorial(number) {
    let result = 1;
    for (let i = 2; i <= number; i++) {
        result *= i;
    }
    return result;
}

function recursionFactorial(number) {
    if (number === 1) {
        return 1;
    }
    return number * recursionFactorial(number - 1);
}

console.log(loopFactorial(10));
console.log(recursionFactorial(10));
