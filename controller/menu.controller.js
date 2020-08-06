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

  return Controller.extend('namespace.controller.menu', {

    onInit: function onInit () {
			// Подцепляем роутер, чтобы использовать его события и методы
      this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
    },
		/**
		* Обработчик события нажатия на пункт меню
		* @param {objext} oEvent - объект с параметрами события (в данном случае события нажатия на пункт меню)
		*/
		omMenuItemPress: function(oEvent){
			// получаем данные части модели, которая связана с пунктом меню
			let oContext = oEvent.getSource().getBindingContext("main").getObject();
			//let sId = oContext.id;
			// из полученных данных извлекаем част ьпро навигацию/роутинг (сами добавили в модели в json файле)
			let oNavData = oContext.nav;
			// получаем имя роута, куда будум переходить
			let sRoutName = oNavData.rout;
			// пролучаем параметры для роута, если они есть.
			let aParams = oNavData.params;
			// переходим по роуту
			this.oRouter.navTo(sRoutName, aParams);
		}
  });
});
