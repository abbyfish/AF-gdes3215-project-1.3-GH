// add your API key inside the quotes on line 5
// add the latitude and longitude for your location one lines 6 and 7
// move on to adding your data requests on line 22
function weatherBalloon() {
  var key = '4f4e72406c8736d066812e9c8362d75f';
  var lat = '38.9784';
  var lon = '-76.4922';
  fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&appid=' + key)  
  .then(function(resp) { return resp.json() }) // Convert data to json
  .then(function(data) {
    drawWeather(data);
    console.log(data);
  })
  .catch(function() {
    // catch any errors
  });
}

// display weather information
function drawWeather( d ) {
  //current day
  $('.current h1').html(convertTemp(d.current.temp));
  $('.high h3').html(convertTemp(d.daily [0].temp.max));
  $('.low h3').html(convertTemp(d.daily [0].temp.min));
  $('.sundown h3').html( convertTime(d.current.sunset) );

  //day 1
  $('.monday h3').html(displayDay(1) );
  $('.monday .hl h4').html(convertTemp(d.daily [1].temp.max));
  $('.monday .time h4').html( convertTime(d.daily [1].sunset) );
  $('.monday .icon').html(printGraphic(d.daily [1].weather[0].description) );

  //day 2
  $('.tuesday h3').html(displayDay(2) );
  $('.tuesday .hl h4').html(convertTemp(d.daily [2].temp.max));
  $('.tuesday .time h4').html( convertTime(d.daily [2].sunset) );
  $('.tuesday .icon').html(printGraphic(d.daily [2].weather[0].description) );

  //day 3
  $('.wednesday h3').html(displayDay(3) );
  $('.wednesday .hl h4').html(convertTemp(d.daily [3].temp.max));
  $('.wednesday .time h4').html( convertTime(d.daily [3].sunset) );
  $('.wednesday .icon').html(printGraphic(d.daily [3].weather[0].description) );

  //day 4
  $('.thursday h3').html(displayDay(4) );
  $('.thursday .hl h4').html(convertTemp(d.daily [4].temp.max));
  $('.thursday .time h4').html( convertTime(d.daily [4].sunset) );
  $('.thursday .icon').html(printGraphic(d.daily [4].weather[0].description) );

  //day 5
  $('.friday h3').html(displayDay(5) );
  $('.friday .hl h4').html(convertTemp(d.daily [5].temp.max));
  $('.friday .time h4').html( convertTime(d.daily [5].sunset) );
  $('.friday .icon').html(printGraphic(d.daily [5].weather[0].description) );

  //day 6
  $('.saturday h3').html(displayDay(6) );
  $('.saturday .hl h4').html(convertTemp(d.daily [6].temp.max));
  $('.saturday .time h4').html( convertTime(d.daily [6].sunset) );
  $('.saturday .icon').html(printGraphic(d.daily [6].weather[0].description) );

}
  // add your specfic weather requests here




/* -----------------------------------------------
   Function for converting temp to fahrenheit
   ----------------------------------------------- */

function convertTemp(t){

  return Math.round(((parseFloat(t)-273.15)*1.8)+32);

}


/* -------------------------------------------------------
   Function for printing weather-specific class on body
   ------------------------------------------------------- */

function changeTheme(d){
  
  // if the description includes the word "rain"
  if( d.indexOf('rain') > 0 ) {
    $('body').addClass('rainy');
    return

  // if the description includes the word "cloud"
  } else if( d.indexOf('cloud') > 0 ) {
    $('body').addClass('cloudy');

  // if the description includes the word "sunny"  
  } else if( d.indexOf('sunny') > 0 ) {
    $('body').addClass('sunny');

  // if none of those cases are true, assume it's clear
  } else {
    $('body').addClass('clear');
  }

}


/* -----------------------------------------------
   Function for printing weather-specific graphic
   ----------------------------------------------- */

function printGraphic(d){
  
  // if the description includes the word "rain"
  if( d.indexOf('rain') > 0 ) {
    return '<img src="img/svg/Cloud-Drizzle.svg" alt="Cloud icon">';
  
  // if the description includes the word "cloud"
  } else if( d.indexOf('cloud') > 0 ) {
    return '<img src="img/svg/Cloud.svg" alt="Cloud icon">';
  
  // if the description includes the word "clear"
  } else if( d.indexOf('clear') > 0 ) {
    return '<img src="img/svg/Sun.svg" alt="Cloud icon">';

  // if the description includes the word "party cloudy"
  } else if( d.indexOf('partly') > 0 ) {
    return '<img src="img/svg/Cloud-Sun.svg" alt="Cloud icon">';

  // if the description includes the word "fog"
  } else if( d.indexOf('fog') > 0 ) {
    return '<img src="img/svg/Cloud-Fog.svg" alt="Cloud icon">';

  // if the description includes the word "thunder"
  } else if( d.indexOf('thunder') > 0 ) {
    return '<img src="img/svg/Cloud-Fog.svg" alt="Cloud icon">';
 
  // if none of those cases are true, assume it's clear
  } else {
    return '<img src="img/svg/Sun.svg" alt="Cloud icon">';
  }

}


/* -----------------------------------------------
   Function for converting time to hours/minutes
   ----------------------------------------------- */

function convertTime(t){

  var unixTimestamp = t;
  // since javascript works in milliseconds, you should convert 
  // the time into milliseconds by multiplying it by 1000.
  var date = new Date(unixTimestamp * 1000);
  // hours part from the timestamp (extra code needed to convert from military)
  var hours = (date.getHours() + 24) % 12 || 12;;
  // minutes part from the timestamp
  var minutes = "0" + date.getMinutes();
  // seconds part from the timestamp
  var seconds = "0" + date.getSeconds();
  // will display time in 11:10 format
  var formatTime = hours + ':' + minutes.substr(-2);
  // send formatted date back
  return formatTime;

}


/* -----------------------------------------------
   Function for creating day of the week
   ----------------------------------------------- */

// based on a system where 0 = today, 1 = tomorrow, etc.
// note: the number system below does not immediately correlate
// for example, 0 for today does not line up with 0 for Sunday below

// how this works – in the return statement, d.getDay() gets today's date
// as a number (if today is Thursday, d.getDay() will be 4)
// adding "n" to this number gives you how many days from today.
// n is passed as an argument to the displayDay() function
// in the main body of the code above.
// if today is Thursday, the 4th day of the week,
// and the number 2 is passed as an argument, 
// the function will return the number 6. 6 maps to Saturday in the 
// weekday array below.

function displayDay(n){

  var d = new Date();
  var weekday = new Array();

  weekday[0] = "Sun";
  weekday[1] = "Mon";
  weekday[2] = "Tue";
  weekday[3] = "Wed";
  weekday[4] = "Thu";
  weekday[5] = "Fri";
  weekday[6] = "Sat";

  var dispDay = d.getDay() + n;

  // adjust number system for numbers over 6
  // subtract 7 from totals higher than 6
  // to keep the day numbers in the array range above
  if(dispDay > 6){
    dispDay = dispDay - 7;
  }

  return weekday[ dispDay ];

}

/* --------------------------------------------------
   Event to get weather information when page loads
   -------------------------------------------------- */

window.onload = function() {
  weatherBalloon();
}

// screen flipping action //


$('button').click(function(){
  $('.cover').addClass('open');
})

$('.current h1').click(function(){
  $('.home').removeClass('open');
})
