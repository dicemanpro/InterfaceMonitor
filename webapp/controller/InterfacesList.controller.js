sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessagePopover",
	"../model/formatter",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/m/MessageBox",
	"sap/m/MessageItem",
	"../model/applyFilter",
	"../model/dataHelper"
], function (Controller, MessagePopover, formatter, JSONModel, Filter, FilterOperator, MessageBox, MessageItem, applyFilter, dataHelper) {
	"use strict";
	return Controller.extend("sap.ui.iterface_monitor.controller.InterfacesList", {
		formatter: formatter,

		onInit: function () {
			var oBus = sap.ui.getCore().getEventBus();
			oBus.subscribe("applayFilter", this.bindFilter, this);
			oBus.subscribe("applayFilter", this.updateColumnsTabel, this);

			var oViewModel = new JSONModel({
				countIterface: 0,
				selectItemStatus: null,
				intefaceId: null,
				externalId: null,
				selectedItemExha: null
			});

			this.getView().setModel(oViewModel, "view");
          
		},

		onAfterRendering: function () {
			var oModel = this.getView().getModel("executions");
			var oBinding = this.byId("interfacesList").getBinding("items");

			oBinding.attachChange(this.interfacesReceived, this);
	
			dataHelper.readExecutionsFromDataModel(oModel)
			.then((data) => {
				this.getView().getModel("globalModel").setProperty("/executions", data.results);
			});
			
			applyFilter.applyFilter.call(this);
		},

		onExit: function () {

		},

		handlePopoverPress: function (oEvent) {
			var oTarget = oEvent.getSource();
			var oSelectedIterace = oTarget.getBindingContext("globalModel").getObject();
			var oViewModel = this.getView().getModel("view");

			// oViewModel.setProperty("/intefaceId", oSelectedIterace.Intid);
			// oViewModel.setProperty("/externalId", oSelectedIterace.Exeid);
			// oViewModel.setProperty("/selectedItemExha", oTarget.data("exha"));
			if(this.oPopover && this.oPopover._oPopover)
				this.oPopover.destroy();
			else {
	            this.oPopover = sap.ui.xmlfragment("sap.ui.iterface_monitor.view.StateIcon", this);
				this.oPopover.attachAfterClose((oEvent) => {oEvent.getSource().destroy()});
				this.getView().addDependent(this.oPopover);
	
				var template =  new MessageItem({
						title: "{executions>Msgtx}",
						type: {
							path: 'executions>Msgty',
							formatter: formatter.msgType
						}
				});
	
				var filters = [new Filter({
						path: 'Exhan',
						operator: FilterOperator.EQ,
						value1: oTarget.data("exha")
					})];
	
				this.oPopover.bindAggregation("items", {
					path: "executions>/Executions(Intid='" + oSelectedIterace.Intid + "',Exeid='" + oSelectedIterace.Exeid + "')" + '/ToMessages',
					filters: filters,
					template: template
				});
	
				this.oPopover.openBy(oTarget);
			}
		},

		// handleOpenPopover: function (oEvent) {
		// 	var oSource = oEvent; //.getSource();

		// 	var oViewModel = this.getView().getModel("view");
		// 	var exha = oViewModel.getProperty("/selectedItemExha");
		// 	var intefaceId = oViewModel.getProperty("/intefaceId");
		// 	var externalId = oViewModel.getProperty("/externalId");

		// 	var template = new MessageItem({
		// 		title: "{executions>Msgtx}",
		// 		type: {
		// 			path: 'executions>Msgty',
		// 			formatter: formatter.msgType
		// 		}
		// 	});

		// 	var filters = [new Filter({
		// 		path: 'Exhan',
		// 		operator: FilterOperator.EQ,
		// 		value1: exha
		// 	})];

		// 	oSource.bindAggregation("items", {
		// 		path: "executions>/Executions(Intid='" + intefaceId + "',Exeid='" + externalId + "')" + '/ToMessages',
		// 		filters: filters,
		// 		template: template
		// 	});
		// },

		handleNextExecutionPress: function (oEvent) {
			var oModel = this.getView().getModel("i18n");
			var resourceBundle = oModel.getResourceBundle();

			var intefaceId = oEvent.getSource().getBindingContext("globalModel").getObject().Intid;

			var text = resourceBundle.getText("boxMessageExecuteInterfaces", [intefaceId]);
			var title = resourceBundle.getText("appTitle");
			
			// var bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;
			MessageBox.show(
				text ? text : "ERROR!", {
					icon: MessageBox.Icon.NONE,
					actions: [MessageBox.Action.OK, MessageBox.Action.CANCEL],
					title: title
					// styleClass: "sapUiSizeCompact"
				}
			);
		},

		interfacesReceived: function (oEvent) {
			this.getView().getModel("view").setProperty("/countIterface", oEvent.getSource().oList.length);
		},

		bindFilter: function (sChenel, oEvent, oData) {
			var oModel = this.getView().getModel("executions");

			dataHelper.readExecutionsFromDataModel(oModel, oData.aFilter)
			.then((data) => {
				this.getView().getModel("globalModel").setProperty("/executions", data.results);
			});
		},

		updateColumnsTabel: function (sChenel, oEvent, oData) {
			var selectedInterface = this.getView().getModel("globalView").getProperty("/filterParams").selectedInterface;
			var listView = this.getView().byId("interfacesList");

			listView.getColumns().forEach((cl) => {
				if (cl.data("forTypeiterface")) {
					if (cl.data("forTypeiterface") !== selectedInterface)
						cl.setVisible(false);
					else
						cl.setVisible(true);
				}
			});
		}
	});
});