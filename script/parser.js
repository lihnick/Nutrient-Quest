var apiKey = "&api_key=lnpVL48QKRvh2kyG4IpDzgCqv5cJQVU8pPsRKMLP";
var urlRef = "http://api.nal.usda.gov/ndb/search/?format=json&q=";

var sortByName = (sort) => "&sort=" + sort;
var displayN = (num) => "&max=" + num;
var offsetData = (num) => "&offset=" + num;

var result = {}; // stores the search result 
var tmp; // use for testing, temporary variable
var showN = 25;
var page = 0;
var stringResult;

http://api.nal.usda.gov/ndb/search/?format=json&q=butter&sort=n&max=25&offset=0&api_key=DEMO_KEY

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
			
			for (var i in result['item']) {
				stringResult += "<p>" + result['item'][i]['name'].substring(0, result['item'][i]['name'].indexOf(',')) + "</p>";
			}
			document.getElementById("results").innerHTML = stringResult;
		})
		.fail(function() {
			console.log("Failed");
		})
		.always(function() {
			console.log("Final Check");
		});

	}
}

