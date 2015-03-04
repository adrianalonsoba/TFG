var myTextWidget = function (settings) {

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
    	if(settingName == "datos"){
            if(currentSettings.variable=='commits'){
                $(myTextElement).html('<p id="parf">Commits totales:'+newValue.commits+'<br>'+
                                      'Commits útimo mes:'+newValue.commits_30+'<br>'+
                                      'Commits útimo año:'+newValue.commits_365+'<br>'+
                                      'Commits útima semana:'+newValue.commits_7+'<br>'+
                                      'Commiters:'+newValue.committers+'</p>');

            }else if(currentSettings.variable=='autores'){
                $(myTextElement).html('<p id="parf" >Autores totales:'+newValue.authors+'<br>'+
                                      'Autores útimo mes:'+newValue.authors_30+'<br>'+
                                      'Autores útimo año:'+newValue.authors_365+'<br>'+
                                      'Autores útima semana:'+newValue.authors_7+'</p>');
            }else if(currentSettings.variable=='ficheros'){
                $(myTextElement).html('<p id="parf">Ficheros totales:'+newValue.files+'<br>'+
                                      'Ficheros útimo mes:'+newValue.files_30+'<br>'+
                                      'Ficheros útimo año:'+newValue.files_365+'<br>'+
                                      'Ficheros útima semana:'+newValue.files_7+'</p>');

            }
            
    	}
    }

    self.onDispose = function(){

    }


};

freeboard.loadWidgetPlugin({
    type_name: "my_text_widget",
    display_name: "Widget estatico",
    description:"widget estatico",
    fill_size:true,
    settings: [
        {
            name: "datos",
            display_name:"Datos del JSON",
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
                    name: "autores",
                    value: "autores"
                },
                {
                    name: "ficheros",
                    value: "ficheros"
                }
            ]
        },

        {
            name:"size",
            display_name: "Tamaño",
            type:"option",
            options:[

                {name:"Normal",
                value:"regular"},

                {name:"Grande",
                value:"big"}

            ]
            
        }
    ],
    newInstance: function (settings, newInstanceCallback) {
        newInstanceCallback(new myTextWidget(settings));

    }
});