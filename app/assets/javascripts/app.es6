"use strict";
console.log("version 2");
console.log("Lets find a car.");

var
//functions
    findCar,
    loadCar,
    dreadedError,
    serviceIntervals,
    showService,
    showRecalls,
    automobileRecalls,
 //variables
    carId;
$(document).on("turbolinks:load", function() {
    var $navLinks = $("#navLinks");

    $(".js-search-button").on("click", findCar);
    // $(".js-search-dealers").on("click",findDealers);

    $("#menuBtn").click(function(e) {
        e.preventDefault();

        $navLinks.toggleClass("hideNav");
    });
});

findCar = function (theCar) {
    // take the parameter name/this causes the page to not refresh.
    theCar.preventDefault();
    // console.log to make sure your getting results.
    console.log("Did you find the car?");
    console.log("WORKING???");
    $.ajax({
        type: "get",
        // url for all makes of cars
        url: "http://api2.carmd.com/v2.0/maintstatuspolicy?vehicleID=541655333c10813ac8a0f766",
        //url: "https://api.edmunds.com/api/vehicle/v2/makes?view=basic&fmt=json&api_key=tcd64uafxynpwvkeyaxv56qt ",
        // success is what you name the next function/action from the ajax url request.
        success: loadCar,
        // // error, name of error function when something doesnt work.
        error: dreadedError
    });

    console.log("Vroooooom!");
};

 loadCar = function(response) {
    // these variables are equal to the class set in the home.html.erb  input class field.
    var theYear = $(".js-search-year").val();
    var theMake = $(".js-search-make").val();
    var theModel = $(".js-search-model").val();
    // this returns all makes of cars.
    var carMakes = response.makes;

    console.log("RESPONSE", response);
    console.log("CAR MAKES", carMakes);
    // loop to loop over user input for one car make.
    carMakes.forEach(function(carMake) {
        if (carMake.name.toLowerCase() === theMake.toLowerCase()) {
            console.log("ONE CAR MAKE", carMake);
            // variable set to carMake input . models to retrieve all models for the make.
            var carModels = carMake.models;
            console.log("CAR MODELS", carModels);
            // loop to return one model.
            carModels.forEach(function(carModel) {
                if (carModel.name.toLowerCase() === theModel.toLowerCase()) {
                    console.log("ONE MODEL", carModel);
                    // variable set to car model to go inside the array for model then years to show all years
                    var carYears = carModel.years;
                    console.log("MANY YEARS", carYears);
                    // loop to show one single year for that make and model from user input
                    carYears.forEach(function(carYear) {
                        if (String(carYear.year) === theYear) {
                            console.log("ONE YEAR", carYear);
                            carId = carYear.id;
                            // shows the id for the single car from search
                            console.log("CAR ID FOR THE CAR YEAR!", carId);
                            // this defines serviceintervals/carid for the maintenance request.
                            serviceIntervals(carId);
                            automobileRecalls(carId);
                            // automobileTsbs(carId);
                        }
                    });
                }
            });
        }
    });
};
// shows error message if page doesnt load correctly.
dreadedError = function (error) {
    console.log(error.responseText);
};
// function defined for second ajax request to link service intervals for the car.  NEED REDIRECT TO ANOTHER PAGE AND SHOW RESULTS AFTER SUBMISSION
serviceIntervals = function() {
    $.ajax({
        type: "get",
        // url for all service intervals a single car from the search
        url: `https://api.edmunds.com/v1/api/maintenance/actionrepository/findbymodelyearid?modelyearid=${carId}&fmt=json&api_key=tcd64uafxynpwvkeyaxv56qt`,
        // success is what you name the next function/action from the ajax url request.this shows the results. without it nothing will appear
        success: showService,
        // // error, name of error function when something doesnt work.
        // error: dreadedError
    });
};

showService = function (theService) {
    // console.log("ALL SERVICE INTERVALS FROM THE SEARCH BAR",theService);

    $(".js-auto-list").empty();
    //var theMileage = $(".js-search-mileage").val();
    var allServices = theService.actionHolder;
    // console.log("All SERVICES",allServices)

    //var actionForService = allServices.action;

    // console.log("SERVICE SELECTED",actionForService)

    allServices.forEach(function(service) {
        // console.log("WEEEE",service)
        if (service.partCostPerUnit === undefined) {
           service.partCostPerUnit = "Not available";
        }
        var addToMaintenanceList =
          `
            <br><li>
              <b> ${service.action}: ${service.item} </b><br>
              Every: ${service.intervalMileage} Miles <br>
              Item Description: ${service.itemDescription}<br>
              Time to Complete: ${service.laborUnits} Hour(s)<br>
              Qty Needed: ${service.partUnits}<br>
              Part Cost $ ${service.partCostPerUnit}<br>
            </li> `;

        $(".js-auto-list").append(addToMaintenanceList);
    });
};

automobileRecalls = function () {
    $.ajax({
        type: "get",
        // url for all service intervals a single car from the search
          url: `https://{carId}`,
        //url: `https://api.edmunds.com/v1/api/maintenance/recallrepository/findbymodelyearid?modelyearid=${carId}&fmt=json&api_key=tcd64uafxynpwvkeyaxv56qt`,
        // success is what you name the next function/action from the ajax url request.this shows the results. without it nothing will appear
        success: showRecalls,
        // // error, name of error function when something doesnt work.
        // error: dreadedError
    });
};

showRecalls = function (theRecall) {
    // show all recalls for current car selection
    console.log("ALL RECALLS FOR CURRENT CAR", theRecall);

    var carRecalls = theRecall.recallHolder;
    $(".js-auto-recalls").empty();

    carRecalls.forEach(function(recall) {
        // display all recalls available for the car.
        console.log("FOUND ALL AVAILABLE RECALLS", recall);
           if (recall.consequense === undefined) {
           recall.consequense = "Not available";
        }

        var recallList = `
            <br><li>
              <b> Defective Part: ${recall.componentDescription} </b> <br>
              <br>
              Description of defect: ${recall.defectDescription}<br>
              <br>
              Possible Consequense if not repaired: ${recall.consequense}<br>
              Automobile Manufactured From: ${recall.manufacturedFrom}<br>
              Automobile Manufactured To: ${recall.manufacturedTo}<br>
            </li>`;

        $(".js-auto-recalls").append(recallList);
    });
};

// function automobileTsbs(theTsb) {
// $.ajax ({
// 	type: "get",
// 	// url for all service intervals a single car from the search
// 	url: `https://api.edmunds.com/v1/api/maintenance/servicebulletinrepository/findbymodelyearid?modelyearid=${carId}&fmt=json&api_key=tcd64uafxynpwvkeyaxv56qt`,
// 	// success is what you name the next function/action from the ajax url request.this shows the results. without it nothing will appear
// 	success: showTsbs,
// 	// // error, name of error function when something doesnt work.
// 	// error: dreadedError
// 	});
// }
// function showTsbs(theServiceBulletin){
// // show all recalls for current car selection
// console.log("ALL BULLETINS FOR CURRENT CAR",theServiceBulletin);

// var carBulletins = theServiceBulletin.serviceBulletinHolder
// $(".js-auto-bulletins").empty();

// carBulletins.forEach(function(bulletin) {
// // display all recalls available for the car.
// console.log("FOUND ALL AVAILABLE BULLETINS",bulletin)


// var bulletinList = `

// <br><li>

// 			<b> Bulletin Date: 			${bulletin.bulletinDate} </b> <br>
// <br>
// 					Bulletin Number: 		${bulletin.bulletinNumber}<br>
// <br>
// 					Description: 				${bulletin.componentDescription}<br>
// 					Summary: 						${bulletin.summaryText}<br>

// 		</li>
// `;

// $(".js-auto-bulletins").append(bulletinList);

// 	})
// }
