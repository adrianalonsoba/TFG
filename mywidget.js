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
    	if(settingName == "the_text"){
    		$(myTextElement).html(newValue);
    	}
    }

    self.onDispose = function(){

    }


};

freeboard.loadWidgetPlugin({
    type_name: "my_text_widget",
    display_name: "Widget de prueba",
    description:"hola mundo",
    fill_size:false,
    settings: [
        {
            name: "the_text",
            display_name: "Titulo",
            type: "calculated"
        }
    ],
    newInstance: function (settings, newInstanceCallback) {
        newInstanceCallback(new myTextWidget(settings));

    }
});