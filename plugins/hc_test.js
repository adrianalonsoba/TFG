var hcTestWidget = function (settings) {

    var self = this;

    var currentSettings = settings;

    var myTextElement = $("<span>HOLA CARACOLA</span>");

    self.render= function(containerElement){
    	$(containerElement).append(myTextElement);
    }

    self.getHeight = function(){

    	if(currentSettings.size == "big"){
    		return 2;

    	}else{
    		return 1;
    	}
    }

    self.onSettingsChanged = function(newSettings){
    	currentSettings=newSettings;
    }

    self.onCalculatedValueChanged = function(settingName, newValue){
        // here go the chart->
         $(myTextElement).html("lalalalalal");
    }

    self.onDispose = function(){

    }


};

freeboard.loadWidgetPlugin({
    type_name: "hcTestWidget",
    display_name: "high charts test widget ",
    description:"widget high charts",
    external_scripts:["plugins/highcharts/js/highcharts.js",
                      "plugins/highcharts/js/modules/exporting.js"],
    fill_size:true,
    settings: [
        {
            name: "data",
            display_name:"JSON source",
            type:"calculated"
        },

        {
            name: "variable",
            display_name: "Variable",
            type: "option",
            options:[
                {
                    name: "commits",
                    value: "commits"
                },
                {
                    name: "authors",
                    value: "authors"
                },
                {
                    name: "files",
                    value: "files"
                }
            ]
        },

        {
            name:"size",
            display_name: "Size",
            type:"option",
            options:[

                {name:"Normal",
                value:"regular"},

                {name:"Big",
                value:"big"}

            ]
            
        }
    ],
    newInstance: function (settings, newInstanceCallback) {
        newInstanceCallback(new hcTestWidget(settings));

    }
});