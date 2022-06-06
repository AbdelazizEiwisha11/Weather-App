/* Main Function that get API */
async function search(city) {
let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=58f6e04e959a4287bee150812220406&q=${city}&days=3`)

    if(response.status != 400){
        let result = await response.json();
        displayCurruntWeather(result);
        displayAnotherDays(result.forecast.forecastday);
    }
}
/* Search Input Evarnt */
document.getElementById("searchInput").addEventListener("keyup", (a) => {
    search(a.target.value);
});
/* Days & Monthes Name */
let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];
const monthNames = [
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

//display Currunt Day Weather
function displayCurruntWeather(result){
    
    let d = new Date(result.current.last_updated);

    let dayInfo =  `
    <div class="col-lg-4">
        <div id="curruntDay" class="day-info text-center rounded-start  mt-5 p-3 pb-4">
            <div class="day-head d-flex justify-content-between ">
                <span class="fs-5">${days[d.getDay()]}</span>
                <span class="fs-5">${d.getDate() + monthNames[d.getMonth()]}</span>
            </div>
            <div class="day-body mt-4">
                <h4 class="mt-4">${result.location.name}</h4>
                <div class="first-degree d-sm-flex d-lg-block justify-content-center align-items-center">
                    <div class="currentTemp">${result.current.temp_c}<sup>o</sup>C</div>
                    <img class="ms-4" src="https:${result.current.condition.icon}" alt="" width="90"></img>
                </div>
                <div class="sunny  mb-4 mt-2">${result.current.condition.text}</div>
                <span class="me-2   "><img src="images/icon-umberella.png" alt=""> ${result.current.wind_degree}%</span>
                <span class="me-2  "><img src="images/icon-wind.png   " alt=""> ${result.current.wind_kph} km/h</span>
                <span class="me-2 "><img src="images/icon-compass.png" alt=""> ${result.current.wind_dir}</span>
            </div>
        </div>
    </div>`
    document.getElementById('anotherDayInfo').innerHTML = dayInfo;
}

//display Next Two Days Weather
function displayAnotherDays(result){
    let anotherDayInfo = ``
    for (let i = 1; i < result.length; i++)
    anotherDayInfo += `
    <div class="col-lg-4">
        <div  class="day-info  text-center rounded-end my-5 p-3 pb-5">
            <div class="day-head pt-3">
                <span class="fs-4">${days[new Date(result[i].date).getDay()]}</span>
            </div>
            <div class="day-body mt-2">
                <div class="degree ">
                    <img src="https:${result[i].day.condition.icon}" alt="" >
                    <span class=" fs-3 d-block mt-3 ">${result[i].day.maxtemp_c}<sup>o</sup>C</span>
                    <span class="text-white-50 d-block mt-2">${result[i].day.mintemp_c} <sup>o</sup></span>
                </div>
                <div class="sunny  mb-5 mt-4 pb-5">${result[i].day.condition.text}</div>
            </div>
        </div>
    </div>`
    document.getElementById('anotherDayInfo').innerHTML += anotherDayInfo;
}
/* Call Search Function */
(async function(){
    await search("cairo");
})();
