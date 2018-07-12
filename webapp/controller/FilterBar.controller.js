sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
	'sap/ui/model/json/JSONModel',
	"../model/applyFilter",
	"../model/dataHelper"
], function(Controller, MessageToast, JSONModel, applyFilter, dataHelper) {
	"use strict";
	return Controller.extend("sap.ui.iterface_monitor.controller.FilterBar", {

		onAfterRendering: function () {
			var oModel = this.getView().getModel("executions");

			var promise = dataHelper.readInterfaceSetFromDataModel(oModel)
			.then((data) => {
				this.getView().getModel("globalModel").setProperty("/interfaceSet", data.results);
			});
			
			dataHelper.readSystemSetFromDataModel(oModel)
			.then((data) => {
				this.getView().getModel("globalModel").setProperty("/systemSet", data.results);
			});
		},
		
		onReset: function(oEvent) {
			var sMessage = "onReset trigered";
			sap.m.MessageToast.show(sMessage);
		},

		onSearch: applyFilter.applyFilter
	});
});