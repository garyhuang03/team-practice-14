let ph=null;
fetch("https://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0004-001?Authorization="+CWB_API_KEY).then((response)=>{
	return response.json();
}).then((data)=>{
	ph=data.records.weatherElement[0]; // 6月資料

    let title = document.createElement("p");
    title.textContent = data.records.weatherElement[0].elementName;
    rain_ph.appendChild(title)
	phData(0);
});
function phData(page){
	let startIndex=page*12;
	let endIndex=(page+1)*12;
	let container=document.querySelector("#rain_ph");
	for(let i=startIndex;i<endIndex;i++){
		let loaction=document.createElement("div");
		loaction.className="location";

		const town=document.createElement("div");
		town.className="town";

        const locationName = document.createElement("p")
		locationName.textContent=ph.location[i].locationName

		const averagePh =  document.createElement("div") // 平均值
		averagePh.className = "averagePh"; 
		averagePh.textContent = ph.location[i].parameter[0].parameterName + "：" + ph.location[i].parameter[0].parameterValue

		const maxPh =  document.createElement("div") // 最大值
		maxPh.className = "maxPh";
		maxPh.textContent = ph.location[i].parameter[1].parameterName + "：" + ph.location[i].parameter[1].parameterValue

		const minPh =  document.createElement("div") // 最低值
		minPh.className = "minPh";
		minPh.textContent = ph.location[i].parameter[2].parameterName + "：" + ph.location[i].parameter[2].parameterValue

		const sap =  document.createElement("div") // 採樣數
		sap.className = "sap";
		sap.textContent = ph.location[i].parameter[3].parameterName + "：" + ph.location[i].parameter[3].parameterValue

		container.appendChild(loaction);
		loaction.appendChild(town);
        town.appendChild(locationName)
		town.appendChild(averagePh);
		town.appendChild(maxPh);
		town.appendChild(minPh);
		town.appendChild(sap);
	}	
}