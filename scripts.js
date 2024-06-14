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

async function WeatherAPI() {
    //const apiKey = 'e80e08082b326ecb698e3a8ed6ed366e';
    //const url = `https://pro.openweathermap.org/data/2.5/forecast/hourly?q=London,us&mode=xml&appid=${apiKey}`;
    const url = 'https://api.open-meteo.com/v1/forecast?latitude=40.2671&longitude=22.5962&hourly=temperature_2m,rain,cloud_cover,wind_speed_180m&daily=temperature_2m_max,temperature_2m_min,uv_index_max,rain_sum,wind_speed_10m_max&timezone=auto';
    try {
        const response = await fetch(url);
        if (!response.ok) {
            console.log("Hiba történt!");
            return;
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("Error: ", error);
    }
}

async function GenerateDayCards() {
    let data = await WeatherAPI();
    console.log(data)
    for (let i = 0; i < 7; i++) {
        let card = document.createElement("div")
        let datum = document.createElement("h1")
        datum.textContent = data[i]
        card.appendChild(datum)
        card.classList.add("day-card")
        card.innerHTML = `<div class="days-temp"><div class="max-temp">${data.daily.temperature_2m_max[i]}</div>
        <div class="min-temp">${data.daily.temperature_2m_min[i]}</div></div>`;

        document.querySelector(".days").appendChild(card)
    }
}

GenerateDayCards()