/* eslint-disable radix */
/* eslint-disable no-multiple-empty-lines */
/* eslint-disable linebreak-style */

function solution(str, num) {
  let newStr = str.substring(0, num);
  if (newStr.length < str.length) {
    newStr += '...';
  }
  return newStr;
}

function daysRepresented(...arrays) {
  let days = 0;
  for (let i = 0; i < arrays.length; i++) {
    days += Math.abs(arrays[i][1] - arrays[i][0]) + 1;
  }
  return days;
}

const substring = solution('Testing String', 8);
console.log(substring);

console.log(daysRepresented([2, 8], [220, 229], [10, 16]));
