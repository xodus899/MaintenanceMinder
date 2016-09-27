console.log("Lets find a car.")

$(document).ready(function () {

	$(".js-search-button").on("click",findCar);
});
	function findCar(theCar){

		// take the parameter name/this causes the page to not refresh.
		theCar.preventDefault();
		// console.log to make sure your getting results.
		console.log("Did you find the car?");

		// to my understanding use the class created for input field and .val to grab the information inputted.
		// var theYear = $(".js-search-year").val();
		// var theMake = $(".js-search-make").val();
		// var theModel = $(".js-search-model").val();

		console.log("WORKING???");
		$.ajax ({ 
			type: "get",
			// url for all makes of cars
			url: "https://api.edmunds.com/api/vehicle/v2/makes?view=basic&fmt=json&api_key=tcd64uafxynpwvkeyaxv56qt ",
			// success is what you name the next function/action from the ajax url request.
			success: loadCar,
			// // error, name of error function when something doesnt work.
			error: dreadedError 
		});
		// 
		console.log("Vroooooom!");
	}

var carId
	function loadCar (response) {
		// these variables are equal to the class set in the home.html.erb  input class field.
		var theYear = $(".js-search-year").val();
		var theMake = $(".js-search-make").val();
		var theModel = $(".js-search-model").val();

		console.log("RESPONSE", response)
		// this returns all makes of cars.
		var carMakes = response.makes
		console.log("CAR MAKES", carMakes)
		// loop to loop over user input for one car make.
		carMakes.forEach(function(carMake){
			if (carMake.name.toLowerCase() == theMake.toLowerCase() ) {
				console.log("ONE CAR MAKE", carMake);
				// variable set to carMake input . models to retrieve all models for the make.
				var carModels = carMake.models
				console.log("CAR MODELS", carModels);
				// loop to return one model.
				carModels.forEach(function(carModel){
					if (carModel.name.toLowerCase() == theModel.toLowerCase() ){
						console.log("ONE MODEL", carModel);
						 // variable set to car model to go inside the array for model then years to show all years
							 var carYears = carModel.years
						 			console.log("MANY YEARS",carYears)
						 	// loop to show one single year for that make and model from user input
						carYears.forEach(function(carYear){
						  if (carYear.year == theYear) {
						 		console.log("ONE YEAR",carYear);
					 		 carId = carYear.id
								// shows the id for the single car from search
								console.log("CAR ID FOR THE CAR YEAR!", carId)
								// this defines serviceintervals/carid for the maintenance request.
								serviceIntervals(carId);
					 		}
					 });
					}
				})	 	 		
			}
		});
	}
	// shows error message if page doesnt load correctly.
	function dreadedError (error) {
		console.log(error.responseText);
	}
	// function defined for second ajax request to link service intervals for the car.  NEED REDIRECT TO ANOTHER PAGE AND SHOW RESULTS AFTER SUBMISSION
	function serviceIntervals(theId){
		// carId = carYear.id
		// var carId 
			$.ajax ({ 
				type: "get",
			// url for all service intervals a single car from the search
				url: `https://api.edmunds.com/v1/api/maintenance/actionrepository/findbymodelyearid?modelyearid=${carId}&fmt=json&api_key=tcd64uafxynpwvkeyaxv56qt`, 
			// success is what you name the next function/action from the ajax url request.this shows the results. without it nothing will appear
				success: showService,
			// // error, name of error function when something doesnt work.
				// error: dreadedError 
			});
	}

function showService(theService){
	console.log("ALL SERVICE INTERVALS FROM THE SEARCH BAR",theService);

var allServices = theService.actionHolder
	console.log("All SERVICES",allServices)

var actionForService = allServices.action
	console.log("SERVICE SELECTED",actionForService)




var newAllServices = allServices.concat();
	console.log(newAllServices)

var acceptedActions = [{action:'Inspect/rotate', item:'Wheels & tires'},{action:'Flush / replace', item:'Coolant'},
											 {action:'Flush / replace', item:'Brake Fluid'},{action:'Inspect ', item:'Drive belt(s)'},
											 {action:'Inspect', item:'Brake system'},{action:'Inspect', item:'Steering & suspension'},
											 {action:'Replace', item:'Air filter'},{action:'Replace', item:'Spark Plugs'},
											 {action:'Change', item:'Automatic Transmission fluid'},{action:'Replace ', item:'Automatic Transmission filter'},
											 {action:'Replace', item:'Cabin Air filter'},{action:'Inspect', item:'Brakes'},]

acceptedActions.forEach(function (acceptedService) {
	allServices.forEach(function (oneService) {

		if (oneService.action.toLowerCase() == acceptedService.action.toLowerCase() &&
				oneService.item.toLowerCase() == acceptedService.item.toLowerCase()) {
					console.log("FOUND ONE");
						console.log(oneService);
		}
	});
});


}
















