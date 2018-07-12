sap.ui.define([], function () {
	"use strict";
	return {
		time: function(val) {
				  if (val) {
				    var timeinmiliseconds = val.ms;
				
				    var timeFormat = sap.ui.core.format.DateFormat.getTimeInstance({
				      pattern: "HH:mm:ss"
				    });
				    var TZOffsetMs = new Date(0).getTimezoneOffset() * 60 * 1000;
				    return timeFormat.format(new Date(timeinmiliseconds + TZOffsetMs));
				  }
				  return val;
		},
		
		date: function(val) {
			var timeFormat = sap.ui.core.format.DateFormat.getDateInstance({
				      pattern: "dd.MM.yyyy"
		    });
		    
		    return timeFormat.format(val);
		},
		
		countIterfaces: function(val) {
			var oModel = this.getView().getModel("i18n");
			
			if(oModel){
				var resourceBundle = this.getView().getModel("i18n").getResourceBundle();
			    return resourceBundle.getText("countInterfaces", [val]);
			}
		},
		
		statusIcon: function (sStatus) {
			switch (sStatus) {
				case "N":
					return  "sap-icon://message-information";
				case "W":
					return "sap-icon://message-warning";
				case "S":
					return "sap-icon://message-success";
				case "E":
					return "sap-icon://message-error";					
				default:
					return sStatus;
			}
		},
		
		statusIconColor: function (sStatus) {
			switch (sStatus) {
				case "N":
					return  "#1E90FF";
				case "W":
					return "#FFA500";
				case "S":
					return "#32CD32";
				case "E":
					return "#FF4500";					
				default:
					return sStatus;
			}
		},
		
		statusText: function (sStatus) {
			
			var oModel = this.getView().getModel("i18n");
			
			if(oModel){
				var resourceBundle = this.getView().getModel("i18n").getResourceBundle();

				switch (sStatus) {
					case "N":
						return resourceBundle.getText("notExecuted");
					case "W":
						return resourceBundle.getText("expired");
					case "S":
						return resourceBundle.getText("success");
					case "E":
						return resourceBundle.getText("error");					
					default:
						return sStatus;
				}
			}
		},
		
		msgType: function(msgType) {
			switch (msgType) {
				case "N": 
				case "I":
					return  sap.ui.core.MessageType.Information;
				case "W":
					return sap.ui.core.MessageType.Warning;
				case "A": 
				case "S":
					return sap.ui.core.MessageType.Success;
				case "E":
					return sap.ui.core.MessageType.Error;
				default:
					return msgType;
			}
		},
		
		frequency: function(frequencyType) {
						
			var oModel = this.getView().getModel("i18n");
			
			if(oModel){
				var resourceBundle = this.getView().getModel("i18n").getResourceBundle();
				
				switch (frequencyType) {
					case "W":
						return  resourceBundle.getText("wFrequencyType");
					case "D":
						return resourceBundle.getText("dFrequencyType");
					case "M":
						return resourceBundle.getText("mFrequencyType");
					default:
						return frequencyType;
				}
			}
		}
	};
});
