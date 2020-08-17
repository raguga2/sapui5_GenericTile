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

  return Controller.extend('namespace.controller.busket',{ 

format1:function(Quantity,Cost){
return Quantity*Cost;
},
      
      
format2:function(aBusketData){
    debugger;
if (aBusketData!=null){
var sum=0;
    for(var i=0;i<aBusketData.length;i++){
    sum+=aBusketData[i].Cost* aBusketData[i].Quantity;  
    //    sum+=aBusketData[i].format1()+sum;
    };
return sum;    
}
return 0;
},

      
     onAdd: function(oEvent) {
	let sBusketRowPath = oEvent.getSource().getBindingContext("main").getPath();// путь массива event.getsource() 
	let oModel = oEvent.getSource().getModel('main')
	let oBusketItem = oModel.getProperty(sBusketRowPath)// строка
	let Quantity = oBusketItem.Quantity
	let namenotebook = oBusketItem.namenotebook
    let Cost =oBusketItem.Cost
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
        let Cost = oBusketItem.Cost
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
