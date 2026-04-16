sap.ui.define([
    "sap/ui/model/Filter",
    "sap/ui/comp/smartfilterbar/SmartFilterBar",
    "sap/m/MultiComboBox",
    "sap/m/MessageBox",
   "sap/ui/unified/FileUploaderParameter"
], function (Filter, SmartFilterBar, MultiComboBox, MessageBox,FileUploaderParameter) {
    "use strict";
    return {

        onAfterRendering(){
            var oSmartFilterBar = this.byId("listReportFilter");
          var oDesigFilter =  oSmartFilterBar.getAllFilterItems()[2].getControl();
          oDesigFilter.setTokens([new sap.m.Token({
            key:'MANAGER',
            text:"=MANAGER"
          })]);
        },
        getCustomAppStateDataExtension: function (oCustomData) {
            //the content of the custom field will be stored in the app state, so that it can be restored later, for example after a back navigation.
            //The developer has to ensure that the content of the field is stored in the object that is passed to this method.
            if (oCustomData) {
                var oCustomField1 = this.oView.byId("Status");
                if (oCustomField1) {
                    oCustomData.Status = oCustomField1.getSelectedKeys();
                }
            }
        },
        restoreCustomAppStateDataExtension: function (oCustomData) {
            //in order to restore the content of the custom field in the filter bar, for example after a back navigation,
            //an object with the content is handed over to this method. Now the developer has to ensure that the content of the custom filter is set to the control
            if (oCustomData) {
                if (oCustomData.Status) {
                    var oComboBox = this.oView.byId("Status");
                    oComboBox.setSelectedKeys(
                        oCustomData.Status
                    );
                }
            }
        },
        onBeforeRebindTableExtension: function (oEvent) {
            var oBindingParams = oEvent.getParameter("bindingParams");
            oBindingParams.parameters = oBindingParams.parameters || {};
            var oSmartTable = oEvent.getSource();
            var oSmartFilterBar = this.byId(oSmartTable.getSmartFilterId());
            if (oSmartFilterBar instanceof SmartFilterBar) {
                var oCustomControl = oSmartFilterBar.getControlByKey("Status");

                // var desigFilter = oSmartFilterBar.getControlByKey("Desig");
                // if (desigFilter.getTokens().length === 0) {
                //     MessageBox.error("Designation filter is mandatory")
                //     oBindingParams.preventTableBind = true
                // }
                // else {
                    if (oCustomControl instanceof MultiComboBox) {
                        var aStatus = oCustomControl.getSelectedKeys();
                        if (aStatus.length > 0) {
                            var aStatusFilters = []
                            for (var i = 0; i < aStatus.length; i++) {
                                aStatusFilters.push(new Filter("Status", "EQ", aStatus[i]))
                            }

                            oBindingParams.filters.push(new Filter(aStatusFilters, false))
                        }
                        // if (oBindingParams.filters.length === 0) {
                        //     MessageBox.error("Please select atleast one filter and Click Go Button")
                        //     oBindingParams.preventTableBind = true
                        // }

                        // if(status!==""){
                        //     oBindingParams.filters.push(new Filter("Status","EQ",status))
                        // }
                        // switch (vCategory) {
                        //     // case "0" :
                        //     // 	oBindingParams.filters.push(new Filter("Supplier", "EQ", "SAP"));
                        //     // 	break;
                        //     // case "1" :
                        //     // 	oBindingParams.filters.push(new Filter("Supplier", "EQ", "OTHERS"));
                        //     // 	break;
                        //     default:
                        //         break;
                        // }
                    }

                // }


            }    
        },
        sendNoticeToEmp: function(oEvent) {
            var extensionAPI = this.extensionAPI;
            var aSelectContexts = extensionAPI.getSelectedContexts();
            var aEmails =[]
            for(var i=0;i<aSelectContexts.length;i++){
                aEmails.push(aSelectContexts[i].getProperty('Email'))
            }
            var toList = aEmails.toString();
            var subject = "Warning Notice on your Performance"
            var body = "Hi ,\n We have noticed your performance is not up to the mark ! \nThanks\n HR"

           sap.m.URLHelper.triggerEmail(toList,subject,body);


            MessageBox.show("Custom handler invoked.");
        },
        onPressUploadPhoto: function(oEvent) {
            if(!this.dialog){
                this.dialog = sap.ui.xmlfragment(this.getView().getId(),"com.listreport.p5felrsegw.UploadPhoto",this)
                this.getView().addDependent(this.dialog)

            }
            this.dialog.open()
       
        },
        onCloseDialog(){
            this.dialog.close()
        },
        onFileSelect(oEvent){
            this.fileName =oEvent.getParameter('files')[0].name
            this.fileType =oEvent.getParameter('files')[0].type

        },
        onUploadComplete(oEvent){
            var status = oEvent.getParameter("status")
            if(status===201){
                MessageBox.success("Employee Photo Uploded Successfully")
            }else{
                MessageBox.error("OOps error on upload")
            }

        },
        uploadPhoto(){
             var oFileUploader = this.getView().byId('idFileupload')
            var empId = this.extensionAPI.getSelectedContexts()[0].getProperty("Empid")
            var slug = empId + "," + this.fileName

            // oFileUploader.destroyHeaderParameters();
            //1. add slug parameter
            oFileUploader.addHeaderParameter(new FileUploaderParameter({
                name: "slug",
                value: slug
            }))
            //2 add the file types parameter
            oFileUploader.addHeaderParameter(new FileUploaderParameter({
                name: "Content-Type",
                value: this.fileType
            }))
            //3. add X-CSRF token
            this.getOwnerComponent().getModel().refreshSecurityToken();
            oFileUploader.addHeaderParameter(new FileUploaderParameter({
                name: "x-csrf-token",
                value: this.getOwnerComponent().getModel().getHeaders()['x-csrf-token']
            }))
            oFileUploader.upload()

        }
    };
});