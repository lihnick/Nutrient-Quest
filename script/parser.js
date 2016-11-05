var apiKey = "&api_key=lnpVL48QKRvh2kyG4IpDzgCqv5cJQVU8pPsRKMLP";
var urlRef = "https://api.nal.usda.gov/ndb/search/?format=json&q=";

var sortByName = (sort) => "&sort=" + sort;
var displayN = (num) => "&max=" + num;
var offsetData = (num) => "&offset=" + num;

var result = {}; // stores the search result 
var tmp; // use for testing, temporary variable
var showN = 25;
var page = 0;
var stringResult;


function search() {
    if (event.keyCode == 13) {

		var url = urlRef + document.getElementById("searchBar").value + sortByName(document.getElementById("sortID").value) + displayN(showN) + offsetData(page) + apiKey;
		console.log(url);
		$.getJSON(url, function(data) {
			console.log(data);
			tmp = data.list;

			result['total'] = data.list.total;
			result['start'] = page; // page is used because data.list.start will always be 0
			result['end'] = data.list.end + page; // data.list.end is the length of the dataset + page will produce the offset
			result['sort'] = data.list.sort;

			result['item'] = [];
			for (var i in data.list.item) {
				result['item'].push({
					offset: data.list.item[i].offset,
					group: data.list.item[i].group,
					name: data.list.item[i].name
				});
			}

		})
		.done(function() {
			console.log("Successful");
			// display more buttons if there are more values
			stringResult = "<ul class='table-view'>";

			for (var i in result['item']) {
				stringResult += "<li class='table-view-cell'><a class='navigate-right' href='info.html' data-transition='slide-in'> value=" + result['item'][i]['ndbno'] + "" + result['item'][i]['name'].substring(0, result['item'][i]['name'].indexOf(',')) + "</a></li>";
			}
			document.getElementById("results").innerHTML = stringResult + "</ul>";
			window.addEventListener('push', function(data) {
				console.log(data);
			});
		})
		.fail(function() {
			console.log("Failed");
		})
		.always(function() {
			console.log("Final Check");
		});

	}
}

