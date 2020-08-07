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

  return Controller.extend('namespace.controller.catalog', {

    onInit: function onInit () {
			// получаем роутер
			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			let oList = this.getView().byId("catalogList");
			
			// навешиваем на события роутера обработчики
			
			// если осуществляется преход по роуту "catalog" - список ВСЕХ товаров (загружается по умолчанию, такого пункта меню нет, можно добавить)
			this.oRouter.getRoute('catalog').attachPatternMatched(function (oEvent) {
				// берем элемент, в котором отображаются товары 
				// очищаем фильты, если были.
				// Так как эжто список ВСЕХ товаров, то фильтры не нужны, они потребуются ниже
				oList.getBinding('items').filter([]);
      }, this);
			
			// если осуществляется преход по роуту "category" - список товаров определенной КАТЕГОРИИ (в примере - мониторы или клавиатуры)
			this.oRouter.getRoute('category').attachPatternMatched(function (oEvent) {
				// получаем значение категории
				// URL выглядит как #/catalog/keybord например, отсюда получим "keybord"
				// потому что в манифесте, в роуте "category"? прописан шаблон URL - ""pattern": "catalog/{category}","
				// в данном случае, значение в фигруных скобка к модели никакого отношения не имеет
				// это название параметра (переменной)
				// вместо него в реальном URL будет monitor или keybord
				let sCategory = oEvent.getParameter('arguments').category;
				
				//создаем фильтры
				// чтобы отфильтровать список так,
				// чтобы в нем остались товары только определенной категории
				var oFilter = new sap.ui.model.Filter("type", function (sText) {
					return sText.toLowerCase() == sCategory.toLowerCase();
				});
				
				// применяем фильтры к списку
				oList.getBinding('items').filter(oFilter);
      }, this);
    },
      
      
      
      
onPress: function(oEvent) {
			let cartData = oEvent.getSource().getBindingContext("main").getObject()
			let oModel = oEvent.getSource().getModel("main")
			let oData = oModel.getProperty("/busket")
			name = cartData.namenotebook
			photo = cartData.photo
			Cost = cartData.Cost
			Quantity = cartData.Quantity
			namenotebook = cartData.namenotebook
            type=cartData.type
			CurrencyCode = cartData.CurrencyCode;
			if (Array.isArray(oData)) {

			} else {
					oData = [];
			}

			let oBusketItem = oData.find((currentLine) => currentLine.name == name);
			if (oBusketItem) {
				let oBusketItemIndex = oData.findIndex((currentLine) => currentLine.name == name);
				let QuantityBusket = oBusketItem.Quantity;
				QuantityBusket ++;
				oModel.setProperty("/busket/"+oBusketItemIndex+"/Quantity", QuantityBusket)
			} else {
				oData.push({
						name: name,
						photo: photo,
						Cost: Cost,
						Quantity: 1,
						namenotebook: namenotebook,
                        type: type,
						CurrencyCode: CurrencyCode
				});
				oModel.setProperty("/busket", oData);
			}

		}
      
      

  });
});
