// wearther box title
document.getElementById("weather-title").textContent = "全台今日天氣預報";
// icon CSS
const link = document.createElement("link");
link.rel="stylesheet";
link.type="text/css";
link.href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css";
document.getElementsByTagName("head")[0].appendChild(link);

let weathers=null;
let weatherPage = 0;
fetch("https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?elementName=MaxT&elementName=Wx&format=JSON&Authorization="+CWB_API_KEY).then((response)=>{
	return response.json();
}).then((data)=>{
	weathers=data.records;
    renderWeather(weatherPage);
});

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const countrys = ["Jiayi County", "Xinbei City", "Jiayi City", "Xinzhu County", "Xinzhu City", "Taipei City", "Tainan City", "Yilan County", "Miaoli County", "Yunlin County", "Hualian County", "Taizhong City", "Taidong County", "Taoyuan City", "Nantou County", "Kaohsiung City", "Kinmen County", "Pingtung County", "Keelung City", "Penghu County", "Changhua County", "Lienchiang County"];
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
const today = new Date();

function removeWeatherData(){
    const weatherBox = document.querySelector("#weather");
    weatherBox.innerHTML = "";
    createSlidesBtn();
}

function renderWeather(index){
    removeWeatherData();
    const weatherBox = document.querySelector("#weather");
    let cardContainer = document.createElement("div");
    if(index < 0) weatherPage = Math.floor(weathers.location.length / 5);
    if(index * 5 > weathers.location.length) weatherPage = 0;
    let start = weatherPage * 5;
    let end = weatherPage * 5 + 5;
    for(let i = start; i < end; i++){
        if(weathers.location[i]){
            // weather card
            const weatherCard = document.createElement("div");
            weatherCard.className = "weather-card";
            // location
            const location = weathers.location[i];
            // country name
            const countryName = document.createElement("h3");
            countryName.className = "country-name";
            countryName.textContent = countrys[i];
            // country temp
            const countryTemp = document.createElement("p");
            countryTemp.className = "country-temp";
            countryTemp.textContent = location.weatherElement[1].time[0].parameter.parameterName + " °C";
            // weather icon
            const countryIcon = document.createElement("i");
            // wearther code
            let weatherCode =  location.weatherElement[0].time[0].parameter.parameterValue
            if(weatherCode <= 3) countryIcon.className = "fas fa-sun country-icon";
            if(3 < weatherCode <= 7) countryIcon.className = "fas fa-cloud country-icon";
            if(weatherCode > 7) countryIcon.className = "fas fa-cloud-showers-heavy country-icon";
            // date
            const countryDate = document.createElement("p");
            countryDate.className = "country-date";
            let m = monthNames[parseInt(location.weatherElement[0].time[0].startTime.split("-")[1]) - 1];
            let d = parseInt(location.weatherElement[0].time[0].startTime.split("-")[2]);
            let y = parseInt(location.weatherElement[0].time[0].startTime.split("-")[0]);
            countryDate.textContent = m + " " + d + ", " + y;
            // day
            const countryDay = document.createElement("p");
            countryDay.className = "country-day";
            countryDay.textContent = days[today.getDay()];
            // render wearther box
            weatherCard.appendChild(countryName);
            weatherCard.appendChild(countryTemp);
            weatherCard.appendChild(countryIcon);
            weatherCard.appendChild(countryDate);
            weatherCard.appendChild(countryDay);
            cardContainer.appendChild(weatherCard);
        }
        weatherBox.appendChild(cardContainer);
    }
    // page number
    const pageNumber = document.createElement("p");
    pageNumber.textContent = "第 " + parseInt(weatherPage + 1) + " 頁，" + "共 " + parseInt(Math.floor(weathers.location.length / 5) + 1) + " 頁";
    weatherBox.appendChild(pageNumber);
}

function plusSlides(n){
    renderWeather(weatherPage += n);
}

function createSlidesBtn(){
    const prev = document.createElement("a");
    prev.className = "prev";
    prev.innerHTML = "&#10094;";
    prev.addEventListener("click", plusSlides.bind(null, -1))
    const next = document.createElement("a");
    next.className = "next";
    next.innerHTML = "&#10095;";
    next.addEventListener("click", plusSlides.bind(null, 1))
    const weatherBox = document.querySelector("#weather");
    weatherBox.appendChild(prev);
    weatherBox.appendChild(next);
}