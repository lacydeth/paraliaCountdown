let end = new Date("06/24/2024 11:00 AM");

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

  document.querySelector(
    ".countdown"
  ).textContent = `${days} nap ${hours} óra ${minutes} perc ${seconds} másodperc`;

  if (end <= now) {
    document.querySelector("#countLabel").innerHTML = "🐋NYARALUNK!🐋";
    document.querySelector(".countdown").textContent = "";
    return;
  }
}

timer = setInterval(showRemaining, 1000);

async function WeatherAPI() {
  const url =
    "https://api.open-meteo.com/v1/forecast?latitude=40.2671&longitude=22.5962&hourly=temperature_2m,rain,cloud_cover,wind_speed_180m&daily=temperature_2m_max,temperature_2m_min,uv_index_max,rain_sum,wind_speed_10m_max&timezone=auto";
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
  let now = new Date();
  let data = await WeatherAPI();
  console.log(data);
  let dailyTemp = splitArray(data.hourly.temperature_2m, 24);
  for (let i = 0; i < 7; i++) {
    let card = document.createElement("div");
    card.classList.add("day-card");
    card.innerHTML = `
    <div class="days-temp">
        <h2>${data.daily.time[i].substring(5)}</h2>
        <div class="max-temp">${data.daily.temperature_2m_max[i]}°</div>
        <div class="min-temp">${data.daily.temperature_2m_min[i]}°</div>
    </div>`;
    card.addEventListener("click", () => {
        if (document.querySelector(".chart-container").children.count != 0) {
            document.querySelector(".chart-container").innerHTML = "";
            document.querySelector(".hourly-data").innerHTML = "";
        }
      let canvas = document.createElement("canvas");
      let chart = new Chart(canvas, {
        type: "line",
        data: {
          labels: [
            "0",
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "10",
            "11",
            "12",
            "13",
            "14",
            "15",
            "16",
            "17",
            "18",
            "19",
            "20",
            "21",
            "22",
            "23",
            "24",
          ],
          datasets: [
            {
              label: "Hőmérséklet",
              data: dailyTemp[i],
              borderWidth: 1,
              borderColor: '#FF6384',
              backgroundColor: '#FFB1C1',
            },
          ],
        },
        options: {
          maintainAspectRatio:false,
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
      document.querySelector(".chart-container").appendChild(canvas);
      chart.canvas.parentNode.style.height = "25vh";
      window.innerWidth > 900 ? chart.canvas.parentNode.style.width = "80vw" : chart.canvas.parentNode.style.width = "80vw"
      chart.canvas.parentNode.style.backgroundColor = "none";
      if (i == 0) {
          document.querySelector(".hourly-data").innerHTML = `
          <div class="current-temp">
          🌡️ ${data.hourly.temperature_2m[now.getHours()]} ${data.hourly_units.temperature_2m}
          </div>
          <div class="current-wind">
          💨 ${data.hourly.wind_speed_180m[now.getHours()]} ${data.hourly_units.wind_speed_180m}
          </div>
          <div class="current-rain">
          🌧️ ${data.hourly.rain[now.getHours()]} ${data.hourly_units.rain}
          </div>
          `;
        }
    });
    
    document.querySelector(".days").appendChild(card);
}
}

function splitArray(originalArray, chunkSize) {
    let result = [];
    for (let i = 0; i < originalArray.length; i += chunkSize) {
        let chunk = originalArray.slice(i, i + chunkSize);
        result.push(chunk);
    }
    return result;
}
GenerateDayCards();

// Object { latitude: 40.3125, longitude: 22.625, generationtime_ms: 0.16200542449951172, utc_offset_seconds: 10800, timezone: "Europe/Athens", timezone_abbreviation: "EEST", elevation: 6, hourly_units: {…}, hourly: {…}, daily_units: {…}, … }
// ​
// daily: Object { time: (7) […], temperature_2m_max: (7) […], temperature_2m_min: (7) […], … }
// ​
// daily_units: Object { time: "iso8601", temperature_2m_max: "°C", temperature_2m_min: "°C", … }
// ​
// elevation: 6
// ​
// generationtime_ms: 0.16200542449951172
// ​
// hourly: Object { time: (168) […], temperature_2m: (168) […], rain: (168) […], … }
// ​
// hourly_units: Object { time: "iso8601", temperature_2m: "°C", rain: "mm", … }
// ​
// latitude: 40.3125
// ​
// longitude: 22.625
// ​
// timezone: "Europe/Athens"
// ​
// timezone_abbreviation: "EEST"
// ​
// utc_offset_seconds: 10800
// ​
// <prototype>: Object { … }
