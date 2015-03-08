
var twoJsonDatasource = function (settings, updateCallback) {
	var self = this;
	var currentSettings = settings;

	function getData(){

	    $.getJSON("utilities/scm-static.json", function(data1) {
		    $.getJSON("utilities/scm-evolutionary.json", function(data2) {
		        updateCallback([data1,data2]);
		        		    console.log(data1.commits);
		    				console.log(data2.added_lines[1]);
		    });
	    });
		
	}

	var refreshTimer=true;

	function createRefreshTimer(interval){
		if(refreshTimer){
			clearInterval(refreshTimer);

		}
		refreshTimer=setInterval(function(){
			getData();
		},interval);
	}

	self.onSettingsChanged= function(newSettings){
		currentSettings=newSettings;
	}

	self.updateNow = function(){
		getData();
	}

	self.onDispose = function(){
		clearInterval(refreshTimer);
		refreshTimer=undefined;
	}
	//createRefreshTimer(1);
	getData();


};


	freeboard.loadDatasourcePlugin({
		type_name: "twoJSON",
		display_name:"Plugin 2 JSON",
		description:"lee dos JSON y lo guarda",
		settings: [
			{
				name: "url",
				display_name: "URL",
				type: "text"
			},
			{
				name: "use_thingproxy",
				display_name: "Try thingproxy",
				description: 'A direct JSON connection will be tried first, if that fails, a JSONP connection will be tried. If that fails, you can use thingproxy, which can solve many connection problems to APIs. <a href="https://github.com/Freeboard/thingproxy" target="_blank">More information</a>.',
				type: "boolean",
				default_value: true
			},
			{
				name: "refresh",
				display_name: "Refresh Every",
				type: "number",
				suffix: "seconds",
				default_value: 5
			},
			{
				name: "method",
				display_name: "Method",
				type: "option",
				options: [
					{
						name: "GET",
						value: "GET"
					},
					{
						name: "POST",
						value: "POST"
					},
					{
						name: "PUT",
						value: "PUT"
					},
					{
						name: "DELETE",
						value: "DELETE"
					}
				]
			},
			{
				name: "body",
				display_name: "Body",
				type: "text",
				description: "The body of the request. Normally only used if method is POST"
			},
			{
				name: "headers",
				display_name: "Headers",
				type: "array",
				settings: [
					{
						name: "name",
						display_name: "Name",
						type: "text"
					},
					{
						name: "value",
						display_name: "Value",
						type: "text"
					}
				]
			}
		],
		newInstance: function (settings, newInstanceCallback, updateCallback) {
			newInstanceCallback(new twoJsonDatasource(settings, updateCallback));
		}
	});

