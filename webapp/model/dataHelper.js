sap.ui.define([
		"sap/ui/model/json/JSONModel"
	], function () {
	"use strict";
	return {
		readExecutionsFromDataModel: function(oDataModel, filters) {
			return new Promise((resolve, reject) => {
				oDataModel.read("/Executions", {
					filters: filters,
					success: function(data) {
						resolve(data);
					},
					
					error: function(err) {
						reject(err);
					}
				});
			});
		},
		
		readInterfaceSetFromDataModel: function(oDataModel) {
			return new Promise((resolve, reject) => {
				oDataModel.read("/VH_InterfaceSet", {
					success: function(data) {
						resolve(data);
					},
					
					error: function(err) {
						reject(err);
					}
				});
			});
		},
		
		readSystemSetFromDataModel: function(oDataModel) {
			return new Promise((resolve, reject) => {
				oDataModel.read("/VH_SystemSet", {
					success: function(data) {
						resolve(data);
					},
					
					error: function(err) {
						reject(err);
					}
				});
			});
		}
	};
});
