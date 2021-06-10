let page = 0;
async function getData() {
  let response = await fetch(
    "https://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0003-001?Authorization=" +
      CWB_API_KEY
  );
  let result = await response.json();
  data = result["records"];
  //   console.log(data);
  getWeather(page);
  createBtn();
  let mybutton = document.querySelector("button");
  mybutton.addEventListener("click", (e) => {
    e.preventDefault();
    getWeather(++page);
  });
}
getData();

function getWeather(page) {
  let startIndex = page * 12;
  let endIndex = (page + 1) * 12;
  const container = document.querySelector("#weather_now");
  for (let j = startIndex; j < endIndex; j++) {
    const location = data.location[j];
    const item = document.createElement("div");
    item.className = "location";
    const town = document.createElement("div");
    town.className = "town";
    town.textContent =
      location.parameter[0].parameterValue +
      "-" +
      location.parameter[2].parameterValue;

    const img = document.createElement("img");
    img.className = "status_img";
    if (
      location.weatherElement[20].elementValue.includes("陰") ||
      location.weatherElement[20].elementValue.includes("雲")
    ) {
      img.src = "./js/img/cloudy.png";
    }
    if (location.weatherElement[20].elementValue.includes("晴")) {
      img.src = "./js/img/sunny.png";
    }
    if (location.weatherElement[20].elementValue.includes("雨")) {
      img.src = "./js/img/rain.png";
    }

    const status = document.createElement("li");
    status.className = "status";
    status.textContent = "天氣: " + location.weatherElement[20].elementValue;
    if (location.weatherElement[20].elementValue == -99) {
      status.textContent = "天氣: " + "暫時斷線";
      img.src = "./js/img/wind.png";
    }

    const temp = document.createElement("li");
    temp.className = "temp";
    temp.textContent =
      "即時溫度: " +
      parseFloat(location.weatherElement[3].elementValue) +
      " ﾟC";

    const temprange = document.createElement("li");
    temprange.className = "temprange";
    temprange.textContent =
      parseFloat(location.weatherElement[16].elementValue) +
      " - " +
      parseFloat(location.weatherElement[14].elementValue) +
      " ﾟC";

    const updatetime = document.createElement("p");
    updatetime.textContent = "updatetime";
    updatetime.textContent = "更新時間: " + location.time.obsTime.slice(0, 16);

    item.appendChild(town);
    item.appendChild(status);
    item.appendChild(img);
    item.appendChild(temp);
    item.appendChild(temprange);
    item.appendChild(updatetime);
    container.appendChild(item);
  }
}

function createBtn() {
  const container2 = document.querySelector("body");
  let section = document.createElement("section");
  let button = document.createElement("button");
  section.appendChild(button);
  container2.appendChild(section);
  button.textContent = "Load More";
}
