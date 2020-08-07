//"use strict";

sap.ui.define([
	'sap/ui/core/mvc/Controller', 
	'sap/ui/model/json/JSONModel', 
	'sap/ui/model/resource/ResourceModel'
], function (
	Controller, 
	SONModel, 
	ResourceModel) {
  //"use strict";

  return Controller.extend('namespace.controller.busket', {

     onAdd: function(oEvent) {
	let sBusketRowPath = oEvent.getSource().getBindingContext("main").getPath();// путь массива event.getsource() 
	let oModel = oEvent.getSource().getModel('main')
	let oBusketItem = oModel.getProperty(sBusketRowPath)// строка
	let Quantity = oBusketItem.Quantity
	let namenotebook = oBusketItem.namenotebook
	let oCatalog = oModel.getProperty("/catalog") // все товары каталога
	//console.dir(sBusketRowPath);
	let aFindEl = oCatalog.find(oBusketItem => oBusketItem.namenotebook == namenotebook)
	let QuanityStock = aFindEl.Quantity
	if (QuanityStock > Quantity) {
		Quantity++
	}
	oModel.setProperty(sBusketRowPath + "/Quantity", Quantity)
	},
		
	onDelete: function(oEvent) {
		let sBusketRowPath = oEvent.getSource().getBindingContext("main").getPath();
		let oModel = oEvent.getSource().getModel('main')
		let oBusketItem = oModel.getProperty(sBusketRowPath)
		let Quantity = oBusketItem.Quantity
		let aBusketData = oModel.getProperty("/busket") // массив все данных элемента
		//console.dir(sBusketRowPath);
		Quantity--
		if (oBusketItem.Quantity > 0) {
			oModel.setProperty(sBusketRowPath + "/Quantity", Quantity)
		}
			let aFilteredBusket = aBusketData.filter(oBusketItem => oBusketItem.Quantity > 0);
			oModel.setProperty("/busket", aFilteredBusket)
		}

  });
});
