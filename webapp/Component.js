sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/model/json/JSONModel",
	"sap/ui/Device"
], function (UIComponent, JSONModel, Device) {
	"use strict";
	return UIComponent.extend("sap.ui.iterface_monitor.Component", {
		metadata : {
			manifest : "json"
		},
		init : function () {
			UIComponent.prototype.init.apply(this, arguments);
		}
	});
});