const cityForm = document.querySelector("#changeLocation");
const card = document.querySelector("#card");
const details = document.querySelector("#details");
const time = document.querySelector("#time");
const icon = document.querySelector("div#icon img");

const forecast = new Forecast();

const updateUI = (data) => {
  const { EnglishName } = data.cityDetails;
  const { WeatherText, Temperature } = data.weather;

  details.innerHTML = `
    <h5 class="my-3">${EnglishName}</h5>
    <div class="my-3">${WeatherText}</div>
    <div class="display-6 mb-4">
        <span>${Temperature.Metric.Value}</span>
        <span>&deg;C</span>
    </div>
    `;

  const iconSrc = `images/icons/${data.weather.WeatherIcon}.svg`;
  let timeSrc = null;

  data.weather.IsDayTime
    ? (timeSrc = "images/day.svg")
    : (timeSrc = "images/night.svg");

  time.setAttribute("src", timeSrc);
  icon.setAttribute("src", iconSrc);

  if (card.classList.contains("d-none")) {
    card.classList.remove("d-none");
  }
};

cityForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const city = cityForm.city.value.trim();
  cityForm.reset();

  forecast
    .updateCity(city)
    .then((data) => updateUI(data))
    .catch((err) => console.log(err));

  localStorage.setItem("city", city);
});

if (localStorage.getItem("city")) {
  forecast
    .updateCity(localStorage.getItem("city"))
    .then((data) => updateUI(data))
    .catch((err) => console.log(err));
}
