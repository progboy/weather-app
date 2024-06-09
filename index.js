let apiKey;
async function getApiKey(){
    try{
        let apiContent = await fetch("apikey.json");
        apiKey = await apiContent.json();
    }catch(error){
        console.error(error);
    }
}
getApiKey();
let loc = document.getElementById("inputPlace");
let opLocation = document.getElementById("location");
let temp = document.getElementById("temp");
let humidity = document.getElementById("humidity");
let desc = document.getElementById("desc");
let weathericon = document.getElementById("weathericon");


async function getWeather(val){
    try{
        const response = await fetch(" http://api.weatherapi.com/v1/current.json?key="+apiKey+"&q="+val);
        if(!response.ok){
            desc.parentElement.style.display = "none";
            throw new error();
        }
        const data = await response.json();
        if(data.location.name.toLowerCase() !== val.toLowerCase()){
            desc.parentElement.style.display = "none";
            throw new error();
        }
        showStuff(data);
    }catch(error){
        window.alert("Please enter a valid location");
    }
}

function showStuff(data){
    desc.parentElement.style.display = "block";
    opLocation.innerHTML = data.location.name + "<br>" + data.location.country;

    let arr = data.current.last_updated.split("-");
    arr[2] = arr[2].slice(0,3).trim();
    [arr[0],arr[2]] = [arr[2],arr[0]];

    desc.textContent = data.current.condition.text;
    document.getElementById("last_update").innerHTML = "Last updated on:<br>" + arr.join("/") + " at " + data.current.last_updated.split(" ")[1];
    humidity.textContent = "Humidity: " + data.current.humidity + "%";
    temp.textContent = data.current.temp_c + "°C";
    weathericon.src = data.current.condition.icon;
}

function getInfo(){
    if(loc.value === ""){
        window.alert("Please enter a valid location");
    }else{
        getWeather(loc.value);
    }
}
