/* eslint-disable linebreak-style */
/* eslint-disable radix */
function correctTime(timeStr) {
    const str = timeStr.split(':');
    if (str.length !== 3) {
        return 'Incorrect time format';
    }
    const seconds = parseInt(str[2]) % 60;
    const addMin = Math.floor((parseInt(str[2]) / 60));

    const minutes = (parseInt(str[1]) + addMin) % 60;
    const addHours = Math.floor((parseInt(str[1]) + addMin) / 60);
    const hours = (parseInt(str[0]) + addHours) % 24;
    const event = new Date(0, 0, 0, hours, minutes, seconds);
    return event;
}

const time = correctTime('52:01:01');
console.log(time.toLocaleTimeString('it-IT'));
