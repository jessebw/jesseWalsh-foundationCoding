$(document).ready(function(){

(function (){
  // Grab json data
  var json = JSON.parse(transData);
  // brag input selects:
  var selectElementA = $('#vehicleSelect').val();
  var selectElementB = $('#inlineFormCustomSelect').val();
  var selectElementC = $('#origin').val();
  var selectElementD = $('#destination').val();

  // Grab DOM Els
  var pinkStripe = $('.topRightDiv');
  var infoEl = $('#infoEl');
  var containerTop = $('#containerTop');
  var closeInfo = $('#closeInfo');
  var showInfo = $('#info');
  var containerTopLeft = $('#containerTopLeft');
  var containerTopRight = $('#containerTopRight');

  //Grab form output div elements
  var searchEl = $('#submit');
  var showForm = $('#getFormEl');
  
function windowLoadModal(){
  var modal = document.getElementById('myModal');
  var myModal = $('#myModal');
  var btn = document.getElementById("myBtn");
  var span = document.getElementsByClassName("close")[0];
  var info = $('#info');

  showInfo.click(function () {
      modal.style.display = "block";
  });

  window.onload = function() {
    modal.style.display = "block";
  };

  span.onclick = function() {
      modal.style.display = "none";
  };

  myModal.onclick = function() {
      modal.style.display = "none";
  };

  window.onclick = function(event) {
      if (event.target == modal) {
          modal.style.display = "none";
      }
  };
}

windowLoadModal();

  // parsley plug in:
  $('#form').parsley();

  // mapbox plug in start:
  var directions = new MapboxDirections({
    accessToken: 'pk.eyJ1IjoiamVzc2VidyIsImEiOiJjamFqMXFmbXYyMWU1MnducTk2NWhiZXU5In0.MxwoBAa46pq3de4H_frIzA',
    units: 'metric',
  });

  mapboxgl.accessToken = 'pk.eyJ1IjoiamVzc2VidyIsImEiOiJjamFqMXFmbXYyMWU1MnducTk2NWhiZXU5In0.MxwoBAa46pq3de4H_frIzA';

  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/jessebw/cjaizex4vadyk2slrexidsysz',
    center:[175.591,-41],
    zoom: 3.5
  });

  map.addControl(directions, 'top-left');

  document.getElementById('dir').addEventListener('click', setRouteDynamically, false);

  function setRouteDynamically(){
    var myOrigin = document.getElementById('origin').value;
    var myDest = document.getElementById('destination').value;
    directions.setOrigin(myOrigin); 
    directions.setDestination(myDest);        
  } 

  setRouteDynamically();
// mapbox plug in end:

  pinkStripe.css("background-image", "url(img/pinkStripe.png)");

function init(){
  //Grab form output div elements
  var showForm = $('#getFormEl');
  var vehicleEl = $('#vehicleEl');
  var dayCostEl = $('#dayCostEl');
  var litresEl = $('#litresEl');
  var dayTotalEl = $('#dayTotalEl');
  var kmTotalEl = $('#kmTotalEl');
  var fuelTotalEl = $('#fuelTotalEl');
  var totalEl = $('#totalEl');
  var form = $('#form');

  var selectElementA = $('#vehicleSelect').val();
  var selectElementB = $('#inlineFormCustomSelect').val();
  var selectElementC = $('#origin').val();
  var selectElementD = $('#destination').val();

// form error modal vars
  var errorMask = document.getElementById('errorMask');
  var errorModal = $('#errorModal');
  var closeError = document.getElementsByClassName("closeError")[0];

// vehicle error msg
function vehicleError(){ 
  var errorMask = document.getElementById('errorMask');
  var errorModal = $('#errorModal');
  var closeError = document.getElementsByClassName("closeError")[0];
  closeError.onclick = function() {
    errorMask.style.display = "none";
    errorModal.fadeOut("slow");
  };
  errorMask.style.display = "block";
  errorModal.fadeIn("slow");
}

// days error msg
function daysError(){ 
  var errorMaskDays = document.getElementById('errorMaskDays');
  var errorModalDays = $('#errorModalDays');
  var closeErrorDays = document.getElementsByClassName("closeErrorDays")[0];
  closeErrorDays.onclick = function() {
    errorMaskDays.style.display = "none";
    errorModalDays.fadeOut("slow");
  };
  errorMaskDays.style.display = "block";
  errorModalDays.fadeIn("slow");
}

    // errorMask.style.display = "block";

// directions route and fuel calculation
  directions.on('route', function(directions){

    var kmTotalEl = $('#kmTotalEl');
    var fuelTotalEl = $('#fuelTotalEl');
    var totalEl = $('#totalEl');
    var form = $('#form');
    var meters = directions.route[0].distance;
    var km = Math.round(meters / 1000);
    var findFuel = km / 100;

    
    function fuelPrice(){

      var bike = Math.round(findFuel * json[0].fuel100Km);
      var smallCar = Math.round(findFuel * json[1].fuel100Km);
      var largeCar = Math.round(findFuel * json[2].fuel100Km);
      var motorHome = Math.round(findFuel * json[3].fuel100Km);

      function bikeObj(){
        var a = selectElementB * json[0].hire;
        var b = a + bike;
        fuelTotalEl.text("Over: " + km + " km" + " / Est fuel: $" + bike);
        totalEl.text('Total trip travel estimate: $' + b);
      }

      function smallCarObj(){
        var a = selectElementB * json[1].hire;
        var b = a + smallCar;
        fuelTotalEl.text("Over: " + km + " km" + " / Est fuel: $" + smallCar);
        totalEl.text('Total trip travel estimate: $' + b);
      }

      function largeCarObj(){
        var a = selectElementB * json[2].hire;
        var b = a + largeCar;
        fuelTotalEl.text("Over: " + km + " km" + " / Est fuel: $" + largeCar);
        totalEl.text('Total trip travel estimate: $' + b);
      }

      function motorHomeObj(){
        var a = selectElementB * json[3].hire;
        var b = a + motorHome;
        fuelTotalEl.text("Over: " + km + " km" + " / Est fuel: $" + motorHome);
        totalEl.text('Total trip travel estimate: $' + b);
      }

      switch(selectElementA){
        case "MotorCycle":
          bikeObj();
          break;
        case "Small Car":
          smallCarObj();
          break;
        case "Large Car":
          largeCarObj();
          break;
        case "Motor Home":
          motorHomeObj();
          break;
        default:
      }

    // fuel price ends  
    }

    fuelPrice();

  // directions.on ends
  }); 

    function motorcycle(){
      var a = selectElementB * json[0].hire;
      vehicleEl.text(selectElementA);
      dayCostEl.text('$' + json[0].hire + ' / day');
      litresEl.text(json[0].litre100km + 'L / 100km');
      dayTotalEl.text(selectElementB + ' days hire / $' + a);
    }

    function smallCar(){
      var a = selectElementB * json[1].hire;
      vehicleEl.text(selectElementA);
      dayCostEl.text('$' + json[1].hire + ' / day');
      litresEl.text(json[1].litre100km + 'L / 100km');
      dayTotalEl.text(selectElementB + ' days hire / $' + a);
    }

    function largeCar(){
      var a = selectElementB * json[2].hire;
      vehicleEl.text(selectElementA);
      dayCostEl.text('$' + json[2].hire + ' / day');
      litresEl.text(json[2].litre100km + 'L / 100km');
      dayTotalEl.text(selectElementB + ' days hire / $' + a);
    }

    function motorHome(){
      var a = selectElementB * json[3].hire;
      vehicleEl.text(selectElementA);
      dayCostEl.text('$' + json[3].hire + ' / day');
      litresEl.text(json[3].litre100km + 'L / 100km');
      dayTotalEl.text(selectElementB + ' days hire / $' + a);
    }

      // conditional for the vehicle select validation
      switch(selectElementA){
        case "MotorCycle":
          motorcycle();
          motorDays();
          console.log(selectElementA);
          console.log(motorcycle);
          break;
        case "Small Car":
          smallCar();
          smallCarDays();
          break;
        case "Large Car":
          largeCar();
          largeCarDays();
          break;
        case "Motor Home":
          motorHome();
          motorHomeDays();
          break;
        default:
        vehicleError();
      }

      // conditional for the days validation
      switch(selectElementB){
        case null:
          daysError();

          break;
        default:
      }

      // days conditionals
      function motorDays(){
        var a = selectElementB;
        if (a <= 5){
          motorcycle();
        }else{
          alert('Motorcycle hire at a 5 days max.');
        }
      }

      function smallCarDays(){
        var a = selectElementB;
        if (a <= 10){
          smallCar();
        }else{
          alert('Small Cars hire at a 10 days max.');
        
        }
      }

      function largeCarDays(){
        var a = selectElementB;
        if (a <= 2 || a >= 11){
          alert('Large Cars hire at a 3 day minimum and a 10 day max.');
  
        }else{
          largeCar();
        }
      }

      function motorHomeDays(){
        var a = selectElementB;
        if (a > 1){
          motorHome();
        }else{
          alert('Motor Homes hire at a 1 days minimum.');
        }
      }

    // show the form div 
      function result(){
        showForm.show();
        pinkStripe.css("background-image", "url(img/pinkStripeFade.png)");

      }

      result();

// end if init function
  }

  searchEl.click(function(e){
    e.preventDefault();
    init();
  });


// code iife ends
})();
  });
