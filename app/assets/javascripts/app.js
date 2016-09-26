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
		var theYear = $(".js-search-year").val();
		var theMake = $(".js-search-make").val();
		var theModel = $(".js-search-model").val();

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
					 		}
					 });
					}
				})	 	 		
			}
		});
	 			


		


		


		// var addCar = `
		// 				<li>
		// 					<h5> ${theCar.makes}  
		// 					</h5> 
		// 				</li>
		// 			`;
		// 		})
		// 			$(".js-auto-list").html(addCar);
		 }


	function dreadedError (error) {
		console.log(error.responseText);
	}