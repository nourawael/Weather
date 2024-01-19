let currentWeather = {};
let nextDayWeather = {};
let thirdDayWeather = {};
let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  $.ajax({
    url: "https://geolocation-db.com/jsonp",
    jsonpCallback: "callback",
    dataType: "jsonp",
    success: function(location) {
        console.log(location.city);
        createCards(location.city);

    }
  });


let Countryname=document.getElementById('cityName');
let counter=0;
document.getElementById("cityName").addEventListener('keypress',function(){
    
    counter++;
    if(counter>3){
        createCards(Countryname.value);
        counter=0;
    }else{
        console.log("No");
    }
    
});



$('#searchbtn').on('click',function(){
    createCards(Countryname.value);
});

async function getWeather(name) {
  const response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=a8b95fc25d954456809183156241801&q=${name}&days=3`
  );

  let finalResponse = await response.json();
  let date = finalResponse.forecast.forecastday;
  currentWeather.date = date[0].date;
  let d = new Date(currentWeather.date );
  currentWeather.day=days[d.getDay()];
  currentWeather.location = finalResponse.location.name;
  currentWeather.currentTemp = finalResponse.current.temp_c;
  currentWeather.feelsLike = finalResponse.current.feelslike_c;
  currentWeather.condition = finalResponse.current.condition.text;
  currentWeather.wind = finalResponse.current.wind_kph;
  currentWeather.windDirection = finalResponse.current.wind_dir;
  currentWeather.icon=finalResponse.current.condition.icon;

  nextDayWeather.day = finalResponse.forecast.forecastday[1].date;
  nextDayWeather.maxTemp = finalResponse.forecast.forecastday[1].day.maxtemp_c;
  nextDayWeather.minTemp = finalResponse.forecast.forecastday[1].day.mintemp_c;
  nextDayWeather.condition =
    finalResponse.forecast.forecastday[1].day.condition.text;
  nextDayWeather.icon=finalResponse.forecast.forecastday[1].day.condition.icon;

  thirdDayWeather.day = finalResponse.forecast.forecastday[2].date;
  thirdDayWeather.maxTemp = finalResponse.forecast.forecastday[2].day.maxtemp_c;
  thirdDayWeather.minTemp = finalResponse.forecast.forecastday[2].day.mintemp_c;
  thirdDayWeather.condition =
    finalResponse.forecast.forecastday[2].day.condition.text;
  thirdDayWeather.icon=finalResponse.forecast.forecastday[2].day.condition.icon;
}

async function createCards(cityName) {
    await getWeather(cityName);
  $("#cards").html(`
  <div class="row mt-5 g-4">
  <div class="col-md-4">
    <div class="cardContainer">
      <div class="d-flex justify-content-between mb-2">
        <div class=""><label>${currentWeather.day}</label></div>
        <div><label>${currentWeather.date}</label></div>
      </div>
      <div><label>${currentWeather.location}</label></div>
      <div class="tempToday  d-flex justify-content-center">
          <div>${currentWeather.currentTemp}<sup>o</sup>c </div> 
          <div><img src="http:${currentWeather.icon}"></div>
      </div>
      <div class="mb-2"><label>${currentWeather.condition}</label></div>
      <div class="d-flex justify-content-evenly">
        <div><i class="bi bi-wind"> </i><label> ${currentWeather.wind}km/h</label></div>
        <div><i class="bi bi-compass"></i> <label> ${currentWeather.windDirection}</label></div>
      </div>
    </div>
  </div>
  <div class="col-md-4 ">
      <div class="cardContainer">
          <div class="d-flex justify-content-center mb-2">
            <div class=""><label>${nextDayWeather.day}</label></div>
            
          </div>
          <div class="text-center"><img src="http:${nextDayWeather.icon}"><label></div>
          <div class="tempOther text-center">${nextDayWeather.maxTemp} <sup>o</sup> c </div>
          <div class=" text-center">${nextDayWeather.minTemp}  <sup>o</sup> c </div>
          <div class="mb-2 text-center mt-4"><label>${nextDayWeather.condition} </label></div>
          
        </div>
  </div>
  <div class="col-md-4 ">
  <div class="cardContainer">
  <div class="d-flex justify-content-center mb-2">
    <div class=""><label>${thirdDayWeather.day}</label></div>
    
  </div>
  <div class="text-center"><img src="http:${thirdDayWeather.icon}"></div>
  <div class="tempOther text-center">${thirdDayWeather.maxTemp} <sup>o</sup> c </div>
  <div class=" text-center">${thirdDayWeather.minTemp}  <sup>o</sup> c </div>
  <div class="mb-2 text-center mt-4"><label>${thirdDayWeather.condition} </label></div>
  
</div>
  </div>
</div>
    `);
}

