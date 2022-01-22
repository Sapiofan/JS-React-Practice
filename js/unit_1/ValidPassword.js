/* eslint-disable linebreak-style */
/* eslint-disable no-plusplus */

function checkPassword(password) {
  if (password.length < 8 || password.length > 20) { return 'invalid'; }
  let upper = false;
  let lower = false;
  let symbol = false;
  let number = false;
  const pass = password.split('');
  for (let i = 0; i < password.length; i++) {
    if (!upper && pass[i] === pass[i].toUpperCase()) {
      upper = true;
    }
    if (!lower && pass[i] === pass[i].toLowerCase()) {
      lower = true;
    }
  }
  if (password.includes('!') || pass.includes('@')
  || pass.includes('#') || pass.includes('$')
  || pass.includes('%') || pass.includes('^')
  || pass.includes('&') || pass.includes('*') || pass.includes('?')) {
    symbol = true;
  }
  if (/\d/.test(password)) {
    number = true;
  }
  if (upper && lower && symbol && number) return 'valid';
  return 'invalid';
}

function checkPasswordAdvanced(password) {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*?])(?=.{8,})/;
  if (regex.test(password)) {
    return 'valid';
  }
  return 'invalid';
}

console.log(checkPassword('paaaaAaaaa1%'));
console.log(checkPasswordAdvanced('Paaaaaa333$'));
