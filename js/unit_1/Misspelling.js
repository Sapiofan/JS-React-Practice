/* eslint-disable linebreak-style */
/* eslint-disable no-console */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-plusplus */
/* eslint-disable linebreak-style */
class Misspelled {
    misspelled(str1, str2) {
        const array1 = str1.split('');
        const array2 = str2.split('');
        let counter = 0;

        counter = Math.abs(array1.length - array2.length);

        for (let i = 0; i < array1.length; i++) {
            if (array1[i] !== array2[i]) { counter++; }
        }

        if (counter >= 2) {
            return 2;
        }
        if (counter === 1) {
            return 1;
        }

        return 0;
    }
}

const str1 = 'versed';
const str2 = 'veesed1';

const misspelled = new Misspelled();
const check = misspelled.misspelled(str1, str2);

if (check === 1) {
    console.log('Misspelled');
} else if (check === 2) {
    console.log('Different words');
} else {
    console.log('Words are the same');
}
