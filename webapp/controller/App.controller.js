sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function(Controller, JSONModel, Filter, FilterOperator) {
	"use strict";
	return Controller.extend("sap.ui.iterface_monitor.controller.App", {
		onInit: function() {
			var oViewModel = new JSONModel({
				filterParams: { 
					selectedInterface: "I",
					startDate: new Date(),
					endDate: new Date(),
					startTime: new Date(0, 0, 0, 0, 0),
					endTime: new Date(0, 0, 0, 23, 59),
					aItemsIds: [],
					aItemsTypeSystem: [],
					descriptionIterface: "",
					aItemsStates: []
				}
			});

			this.getView().setModel(oViewModel, "globalView");
		}
	});
});