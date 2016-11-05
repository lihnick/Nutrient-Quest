var apiKey = "&api_key=lnpVL48QKRvh2kyG4IpDzgCqv5cJQVU8pPsRKMLP";
var urlRef = "http://api.nal.usda.gov/ndb/search/?format=json&q=";

var sortByName = (sort) => "&sort=" + sort;
var displayN = (num) => "&max=" + num;
var offsetData = (num) => "&offset=" + num;


function search() {
	var url = urlRef + document.getElementById("searchBar").value + sortByName(document.getElementById("sortID").value) + displayN("25") + offsetData("0") + apiKey;
	$.getJSON(url, function(data) {
		console.log(data);

	})
	.done(function() {
		console.log("Successful");
	})
	.fail(function() {
		console.log("Failed");
	})
	.always(function() {
		console.log("Final Check");
	});
}

