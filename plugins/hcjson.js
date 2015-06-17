var hcjson = function (settings) {

    var self = this;

    var currentSettings = settings;

    var myTextElement = $("<span>HOLA CARACOLA</span>");


    function makeChart(){
        $('.chart').highcharts({
            title: {
                text: 'Ejemplo graficas combinadas'
            },
            xAxis: {
                categories: ['Apples', 'Oranges', 'Pears', 'Bananas', 'Plums']
            },
            labels: {
                items: [{
                    html: 'Total fruit consumption',
                    style: {
                        left: '50px',
                        top: '18px',
                        color: (Highcharts.theme && Highcharts.theme.textColor) || 'black'
                    }
                }]
            },
            series: [{
                type: 'column',
                name: 'Jane',
                data: [3, 2, 1, 3, 4]
            }, {
                type: 'column',
                name: 'John',
                data: [2, 3, 5, 7, 6]
            }, {
                type: 'column',
                name: 'Joe',
                data: [4, 3, 3, 9, 0]
            }, {
                type: 'spline',
                name: 'Average',
                data: [3, 2.67, 3, 6.33, 3.33],
                marker: {
                    lineWidth: 2,
                    lineColor: Highcharts.getOptions().colors[3],
                    fillColor: 'white'
                }
            }, {
                type: 'pie',
                name: 'Total consumption',
                data: [{
                    name: 'Jane',
                    y: 13,
                    color: Highcharts.getOptions().colors[0] // Jane's color
                }, {
                    name: 'John',
                    y: 23,
                    color: Highcharts.getOptions().colors[1] // John's color
                }, {
                    name: 'Joe',
                    y: 19,
                    color: Highcharts.getOptions().colors[2] // Joe's color
                }],
                center: [100, 80],
                size: 100,
                showInLegend: false,
                dataLabels: {
                    enabled: false
                }
            }]
        });
    }

    self.render= function(containerElement){
    	$(containerElement).append(myTextElement);
    }

    self.getHeight = function(){

    	if(currentSettings.size == "big"){
    		return 6;

    	}else{
    		return 3;
    	}
    }

    self.onSettingsChanged = function(newSettings){
    	currentSettings=newSettings;
    }

    self.onCalculatedValueChanged = function(settingName, newValue){
        
         $(myTextElement).html('<div class="chart" style="min-width: 310px; height: 400px; margin: 0 auto"></div>');
         makeChart();
    }

    self.onDispose = function(){

    }


};

freeboard.loadWidgetPlugin({
    type_name: "hcJSON",
    display_name: "high charts test widget WITH JSON",
    description:"widget high charts with JSON",
    external_scripts:["http://code.highcharts.com/highcharts.js",
                      "http://code.highcharts.com/modules/exporting.js",
                      "plugins/highcharts/js/themes/dark-unica.js"],
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
        newInstanceCallback(new hcjson(settings));

    }
});