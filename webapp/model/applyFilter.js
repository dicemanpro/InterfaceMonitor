sap.ui.define([
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
	], function(Filter, FilterOperator) {
	return {
		applyFilter: function(oEvent) {

			var oGlobalViewModel = this.getView().getModel("globalView");
			var filterParams = oGlobalViewModel.getProperty("/filterParams");
			
			var aFilter = [];

			var TZOffsetMs = new Date(0).getTimezoneOffset() * 60 * 1000;
			
			var startDate = filterParams.startDate;
			startDate = startDate ? new Date(startDate.getTime() - TZOffsetMs) : null;
			
			var endDate = filterParams.endDate
			endDate = endDate ? new Date(endDate.getTime() - TZOffsetMs) : null;

			var startDateTime = filterParams.startTime;
			startDateTime = startDateTime ? startDateTime.toTimeString().split(':') : null;
			
			var endDateTime = filterParams.endTime;
			endDateTime = endDateTime ? endDateTime.toTimeString().split(':') : null;
			
			var startTime = startDateTime ? "PT" + startDateTime[0] + "H" + startDateTime[1] + 'M00S' : null;
			var endTime = endDateTime ? "PT" + endDateTime[0] + "H" + endDateTime[1] + 'M00S' : null;

			var selectedInterface = filterParams.selectedInterface;
			var aitemsIds = filterParams.aItemsIds;
			var aItemsTypeSystem = filterParams.aItemsTypeSystem;
			var typeIntefaceSystem = selectedInterface === "I" ? "Syssr" : "Systr";
			var textDescription = filterParams.descriptionIterface;
			textDescription = textDescription ? textDescription.trim() : null;
			var aitemsStates = filterParams.aItemsStates;

			var filterStartDate = startDate ? new Filter("Exdat", FilterOperator.GE, startDate) : null;
			var filterEndDate = endDate ? new Filter("Exdat", FilterOperator.LE, endDate) : null;
			var filterStartTime = startTime ? new Filter("Extim", FilterOperator.GE, startTime) : null;
			var filterEndTime = endTime ? new Filter("Extim", FilterOperator.LE, endTime) : null;

			var filterDate = new Filter({
				filters: [],
				and: true
			});
			
			if(filterStartDate)
				filterDate.aFilters.push(filterStartDate);
			if(filterEndDate)
				filterDate.aFilters.push(filterEndDate);

			var filterTime = new Filter({
				filters: [],
				and: true
			});
			
			if(filterStartTime)
				filterTime.aFilters.push(filterStartTime);
			if(filterEndTime)
				filterTime.aFilters.push(filterEndTime);

			var dateAndTimeFilter = new Filter({
				filters: [],
				and: true
			});
			
			if(filterDate.aFilters.length > 0)
				dateAndTimeFilter.aFilters.push(filterDate);
			if(filterTime.aFilters.length > 0)
				dateAndTimeFilter.aFilters.push(filterTime);

			if(dateAndTimeFilter.aFilters.length > 0)
				aFilter.push(dateAndTimeFilter);
			
			aitemsIds.forEach((elem) => {
				aFilter.push(new Filter("Intid", FilterOperator.EQ, elem));
			});

			aItemsTypeSystem.forEach((elem) => {
				aFilter.push(new Filter(typeIntefaceSystem, FilterOperator.EQ, elem));
			});
			
			aItemsTypeSystem.forEach((elem) => {
				aFilter.push(new Filter(typeIntefaceSystem, FilterOperator.EQ, elem));
			});
			
			aitemsStates.forEach((elem) => {
				aFilter.push(new Filter("State", FilterOperator.EQ, elem));
			});
			
			if(textDescription) {
				aFilter.push(new Filter("Inttx", FilterOperator.Contains, textDescription));
			}
			
			aFilter.push(new Filter("Intty", FilterOperator.EQ, selectedInterface));
			
			var oBus = sap.ui.getCore().getEventBus();
			oBus.publish("applayFilter", {
				aFilter: aFilter
			});
		}
	}
})