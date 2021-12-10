/* eslint-disable linebreak-style */
const findVowels = (str) => Array.from(str.toLowerCase()).filter((letter) => 'уеоаэяиюё'.includes(letter)).length;
console.log(findVowels('Привет'));
