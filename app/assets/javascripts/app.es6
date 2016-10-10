
console.log("Lets find a car.")

$(document).on("turbolinks:load", function () {
let $navLinks = $("#navLinks");

$(".js-search-button").on("click",findCar);
// $(".js-search-dealers").on("click",findDealers);

$("#menuBtn").click(function (e) {
	e.preventDefault();

$navLinks.toggleClass("hideNav");
	});

});

function findCar(theCar){

// take the parameter name/this causes the page to not refresh.
theCar.preventDefault();
// console.log to make sure your getting results.
console.log("Did you find the car?");

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
console.log("Vroooooom!");
}

var carId
function loadCar (response) {
// these variables are equal to the class set in the home.html.erb  input class field.
var theYear    = $(".js-search-year").val();
var theMake    = $(".js-search-make").val();
var theModel   = $(".js-search-model").val();

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
automobileRecalls(carId);	
// automobileTsbs(carId);		

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
// console.log("ALL SERVICE INTERVALS FROM THE SEARCH BAR",theService);


$(".js-auto-list").empty();
var theMileage = $(".js-search-mileage").val();
var allServices = theService.actionHolder
// console.log("All SERVICES",allServices)

var actionForService = allServices.action

	// console.log("SERVICE SELECTED",actionForService)

allServices.forEach(function(service){
// console.log("WEEEE",service)

var addToMaintenanceList = `

<br><li> 
			<b> ${service.action}: ${service.item} </b><br>
			Every: ${service.intervalMileage} Miles <br>
			Item Description: ${service.itemDescription}<br>
			Time to Complete: ${service.laborUnits} Hour(s)<br>
			Qty Needed: ${service.partUnits}<br>
			Part Cost $ ${service.partCostPerUnit}<br>
		</li>

		`;

		$(".js-auto-list").append(addToMaintenanceList);
	})

// var acceptedActions = [{action:'Change', item:'Engine Oil'},{action:'Change', item:'Automatic Transmission fluid'},
// 											 {action:'Replace ', item:'Automatic Transmission filter'},{action:'Replace', item:'Air filter'},
// 											 {action:'Replace', item:'Spark Plugs'},{action:'Replace', item:'Cabin Air filter'},
// 											 {action:'Flush / replace', item:'Coolant'},{action:'Flush / replace', item:'Brake Fluid'},
// 											 {action:'Inspect ', item:'Drive belt(s)'},{action:'Inspect/rotate', item:'Wheels & tires'},
// 											 {action:'Inspect', item:'Brake system'},{action:'Inspect', item:'Steering & suspension'},
// 											 {action:'Inspect', item:'Brakes'},]

// acceptedActions.forEach(function (acceptedService) {
// 	allServices.forEach(function (oneService) {
// 		if (oneService.action.toLowerCase() == acceptedService.action.toLowerCase() &&
// 				oneService.item.toLowerCase() == acceptedService.item.toLowerCase()) {
// 					console.log("FOUND ONE");
// 						console.log(oneService);
			
			// var addToMaintenanceList = `
			
			// 	<br><li> 
			// 				<b> ${oneService.action}: ${oneService.item} </b><br>
			// 				Every: ${oneService.intervalMileage} Miles <br>
			// 				Item Description: ${oneService.itemDescription}<br>
			// 				Time to Complete: ${oneService.laborUnits} Hour(s)<br>
			// 				Qty Needed: ${oneService.partUnits}<br>
			// 				Part Cost $ ${oneService.partCostPerUnit}<br>
			// 		</li>

			// 			`;

			// 			$(".js-auto-list").append(addToMaintenanceList);

		// }
// 	});
// });

}

function automobileRecalls(theRecalls){
$.ajax ({ 
	type: "get",
	// url for all service intervals a single car from the search
	url: `https://api.edmunds.com/v1/api/maintenance/recallrepository/findbymodelyearid?modelyearid=${carId}&fmt=json&api_key=tcd64uafxynpwvkeyaxv56qt`, 
	// success is what you name the next function/action from the ajax url request.this shows the results. without it nothing will appear
	success: showRecalls,
	// // error, name of error function when something doesnt work.
	// error: dreadedError 
	});
}
function showRecalls(theRecall){
// show all recalls for current car selection
console.log("ALL RECALLS FOR CURRENT CAR",theRecall);

var carRecalls = theRecall.recallHolder
$(".js-auto-recalls").empty();

carRecalls.forEach(function(recall) {
// display all recalls available for the car.
console.log("FOUND ALL AVAILABLE RECALLS",recall)


var recallList = ` 

<br><li> 

			<b> Defective Part: 									${recall.componentDescription} </b> <br>
<br>
			Description of defect: 								${recall.defectDescription}<br>
<br>
			Possible Consequense if not repaired: ${recall.consequense}<br>
			Automobile Manufactured From: 				${recall.manufacturedFrom}<br>
			Automobile Manufactured To: 					${recall.manufacturedTo}<br>			
		</li>
`;

$(".js-auto-recalls").append(recallList);

	})
}

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




