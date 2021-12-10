/* eslint-disable radix */
/* eslint-disable no-multiple-empty-lines */
/* eslint-disable linebreak-style */

function solution(str, num) {
  let newStr = str.substring(0, num);
  if (newStr.length < str.length) {
    newStr += "...";
  }
  return newStr;
}

function correctTime(timeStr) {
  const str = timeStr.split(":");
  if (str.length !== 3) {
    return "Incorrect time format";
  }
  const seconds = parseInt(str[2]) % 60;
  const addMin = Math.floor((parseInt(str[2]) / 60));

  const minutes = (parseInt(str[1]) + addMin) % 60;
  const addHours = Math.floor((parseInt(str[1]) + addMin) / 60);
  const hours = (parseInt(str[0]) + addHours) % 24;
  const event = new Date(0, 0, 0, hours, minutes, seconds);
  return event;
}

function daysRepresented(...arrays) {
  let days = 0;
  for (let i = 0; i < arrays.length; i++) {
    days += Math.abs(arrays[i][1] - arrays[i][0]) + 1;
  }
  return days;
}

function checkPassword(password) {
  if (password.length < 8 || password.length > 20) { return "not valid"; }
  let upper = false;
  let lower = false;
  let symbol = false;
  let number = false;
  const pass = password.split("");
  for (let i = 0; i < password.length; i++) {
    if (!upper && pass[i] === pass[i].toUpperCase()) {
      upper = true;
    }
    if (!lower && pass[i] === pass[i].toLowerCase()) {
      lower = true;
    }
  }
  if (Array.from(password.toLowerCase()).filter((letter) => "123456789!@#$%^&*?".includes(letter))) {
    symbol = true;
    number = true;
  }
  if (upper && lower && symbol && number) return "valid";
  return "invalid";
}

const substring = solution("Testing String", 8);
console.log(substring);

const time = correctTime("52:01:01");
console.log(time.toLocaleTimeString("it-IT"));

console.log(checkPassword("Paaaaaa222!!!"));

console.log(daysRepresented([2, 8], [220, 229], [10, 16]));
