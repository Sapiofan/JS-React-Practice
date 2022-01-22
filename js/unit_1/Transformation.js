/* eslint-disable linebreak-style */
/* eslint-disable no-plusplus */
function transform(str) {
    const array = str.split('');
    let counter = 0;

    for (let i = 0; i < array.length / 2 + 1; i++) {
        if (array[i] === array[i].toUpperCase()) {
            counter++;
        }
    }
    if (counter > array.length / 2) {
        return str.toUpperCase();
    }
    return str.toLowerCase();
}

const str = 'COden';
console.log(transform(str));
