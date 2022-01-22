/* eslint-disable linebreak-style */
/* eslint-disable no-plusplus */

function nextSymbol(ch) {
    let char = ch.charCodeAt(0);
    char++;
    return String.fromCharCode(char);
}

function deleteString(str, num) {
    const array = str.split('');
    let counter = 0;
    let letter = 'a';

    while (counter < num) {
        while (array.indexOf(letter) !== -1 && counter < num) {
            array.splice(array.indexOf(letter), 1);
            counter++;
        }
        if (letter === 'z') { return ''; }
        letter = nextSymbol(letter);
    }
    return array.join('');
}

console.log(deleteString('abracadabra', 6));
