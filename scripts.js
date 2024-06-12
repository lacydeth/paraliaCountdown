let end = new Date('06/24/2024 11:00 AM');

let _second = 1000;
let _minute = _second * 60;
let _hour = _minute * 60;
let _day = _hour * 24;
let timer;

function showRemaining() {
    let now = new Date();
    let distance = end - now;
    
    let days = Math.floor(distance / _day);
    let hours = Math.floor((distance % _day) / _hour);
    let minutes = Math.floor((distance % _hour) / _minute);
    let seconds = Math.floor((distance % _minute) / _second);

    document.querySelector('.countdown').textContent = `${days} nap ${hours} óra ${minutes} perc ${seconds} másodperc`;
}

timer = setInterval(showRemaining, 1000);