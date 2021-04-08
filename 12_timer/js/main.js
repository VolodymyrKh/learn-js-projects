const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const giveaway = document.querySelector(".giveaway");
const deadline = document.querySelector(".deadline");
const items = document.querySelectorAll(".deadline-format h4");


const expiredDate = new Date(2021, 3, 12, 00, 00, 00);

// format values
const format = (item) => (item < 10 ? `0${item}` : item);

const year = expiredDate.getFullYear();
const hours = format(expiredDate.getHours());
const minutes = format(expiredDate.getMinutes());
const secs = format(expiredDate.getSeconds());
const date = expiredDate.getDate();

const month = months[expiredDate.getMonth()];
const weekDay = weekdays[expiredDate.getDay()];

giveaway.textContent = `birthday time is on ${weekDay}, ${date} ${month} ${year} ${hours}:${minutes}:${secs}`;

// expiredDate in ms
const expiredTime = expiredDate.getTime();

function getRemainingTime() {
  const now = new Date().getTime();
  const time = expiredTime - now;

  // values in ms: days, hours, mins, secs
  const oneDay = 24 * 60 * 60 * 1000;
  const oneHour = 60 * 60 * 1000;
  const oneMin = 60 * 1000;

  // calculate value in ms according to time variable
  let days = Math.floor(time / oneDay);
  let hours = Math.floor((time % oneDay) / oneHour);
  let mins = Math.floor((time % oneHour) / oneMin);
  let secs = Math.floor((time % oneMin) / 1000);

  // set values into array
  const values = [days, hours, mins, secs];

    items.forEach((item, index) => {
    item.innerHTML = format(values[index]);
    if (time < 0) {
        clearInterval(countdown);
        deadline.innerHTML = `<h4 class="expired">this proposal is expired</h4>`
    }
  });
}

// countdown
let countdown = setInterval(getRemainingTime, 1000);

getRemainingTime()