/* eslint-disable linebreak-style */
/* eslint-disable no-plusplus */

function loopFib(number) {
    let counter = 1;

    const FibNumber = [0, 1];

    while (number >= (FibNumber[counter - 1] + FibNumber[counter])) {
        FibNumber.push(FibNumber[counter - 1] + FibNumber[counter]);
        counter++;
    }
    return FibNumber;
}

function recursionFib(number) {
    return number < 2 ? number : (recursionFib(number - 2) + recursionFib(number - 1));
}

function writeToConsole() {
    const array = loopFib(100);
    //   array.forEach((number) => console.log(number));
    console.log(...array);

    const quantity = 15;
    const fibNumbers = [];
    for (let i = 0; i < quantity; i++) {
        fibNumbers.push(recursionFib(i));
    }
    console.log(...fibNumbers);
}

writeToConsole();
