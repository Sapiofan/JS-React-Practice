/* eslint-disable linebreak-style */
const findVowels = (str) => Array.from(str.toLowerCase()).filter((letter) => 'уеоаэяиюёы'.includes(letter)).length;
console.log(findVowels('Абракадабра'));
