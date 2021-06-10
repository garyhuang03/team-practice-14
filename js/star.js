//Title
document.getElementById("star-title").textContent = "各縣市日出日落時刻";
document.getElementById("star-title").className = "title";

const stars_city = ["宜蘭縣", "花蓮縣", "臺東縣", "澎湖縣", "金門縣", "連江縣", "臺北市", "新北市", "桃園市", "臺中市", "臺南市", "高雄市", "基隆市", "新竹縣", "新竹市", "苗栗縣", "彰化縣", "南投縣", "雲林縣", "嘉義縣", "嘉義市", "屏東縣"];
const star_body = document.querySelector("#star");

//create element
const star_box = document.createElement("div");
const sun_up_box = document.createElement("div");
const sun_down_box = document.createElement("div");
const sun_up = document.createElement("div");
const sun_down = document.createElement("div");
const sunup_city = document.createElement("div");
const sundown_city = document.createElement("div");
const sun_up_text = document.createElement("div");
const sun_down_text = document.createElement("div");

//sun_up and sun_down card
star_body.appendChild(star_box);
star_box.className="star_box"
sun_up_box.className="sun_up_box";
sun_down_box.className="sun_down_box";
sunup_city.className="sun_city";
sundown_city.className="sun_city";
sun_up_text.className="sun_text";
sun_down_text.className="sun_text";
sun_up.className="sun_time";
sun_down.className="sun_time";

//first data
sunup_city.textContent = "請點選縣市";
sundown_city.textContent = "請點選縣市";
sun_up_text.textContent = "日出時刻";
sun_down_text.textContent = "日落時刻";

//create city button
for(let i=0; i<stars_city.length; i++){
	const star_city_input = document.createElement("button");
	star_city_input.setAttribute("value", stars_city[i]);
	star_city_input.setAttribute("onclick", "click_star_city(this)");
	star_city_input.className = "button";
	star_city_input.textContent = stars_city[i];
	star_box.appendChild(star_city_input);
}
star_body.appendChild(sun_up_box);
star_body.appendChild(sun_down_box);
sun_up_box.appendChild(sunup_city);
sun_down_box.appendChild(sundown_city);
sun_up_box.appendChild(sun_up_text);
sun_down_box.appendChild(sun_down_text);
sun_up_box.appendChild(sun_up);
sun_down_box.appendChild(sun_down);

//Get sun_up and sun_down data
function click_star_city(city){
	let star=null;
	url = "https://opendata.cwb.gov.tw/api/v1/rest/datastore/A-B0062-001?Authorization="+CWB_API_KEY+"&locationName="+city.value+"&dataTime="+getTodayDate();
	fetch(url).then((response)=>{
		return response.json();
	}).then((data)=>{
		star = data.records.locations.location[0].time[0];
		sunup_city.textContent = city.value;
		sundown_city.textContent = city.value;
		sun_up.textContent = star.parameter[1].parameterValue;
		sun_down.textContent = star.parameter[5].parameterValue;
	});
}

//Get_time
function getTodayDate() {
	var fullDate = new Date();
	var yyyy = fullDate.getFullYear();
	var MM = (fullDate.getMonth() + 1) >= 10 ? (fullDate.getMonth() + 1) : ("0" + (fullDate.getMonth() + 1));
	var dd = fullDate.getDate() < 10 ? ("0"+fullDate.getDate()) : fullDate.getDate();
	var today = yyyy + "-" + MM + "-" + dd;
	return today;
}
