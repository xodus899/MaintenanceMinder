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
		var foundCar = $(".js-search-field").val();
		console.log("WORKING???");
		$.ajax ({ 
			type: "get",
			url: `https://api.edmunds.com/api/vehicle/v2/makes?view=basic&fmt=json&api_key=tcd64uafxynpwvkeyaxv56qt`,
			// success is what you name the next function/action.
			success: loadCar,
			// // error, name of error function when something doesnt work.
			error: dreadedError 
		});
		// 
		console.log("Vroooooom!");
	}


	function loadCar (response) {
		console.log(response);
	}


	function dreadedError (error) {
		console.log(error.responseText);
	}