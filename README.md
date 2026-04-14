## Application Details
|               |
| ------------- |
|**Generation Date and Time**<br>Tue Apr 14 2026 07:45:34 GMT+0000 (Coordinated Universal Time)|
|**App Generator**<br>SAP Fiori Application Generator|
|**App Generator Version**<br>1.22.0|
|**Generation Platform**<br>SAP Business Application Studio|
|**Template Used**<br>List Report Page V2|
|**Service Type**<br>OData URL|
|**Service URL**<br>http://airdithanadev.airditsoftware.com:8010/sap/opu/odata/sap/ZP5FE_EMP_SRV|
|**Module Name**<br>p5felrsegw|
|**Application Title**<br>Employee Management List Report Application|
|**Namespace**<br>com.listreport|
|**UI5 Theme**<br>sap_horizon|
|**UI5 Version**<br>1.136.0|
|**Enable TypeScript**<br>False|
|**Add Eslint configuration**<br>True, see https://www.npmjs.com/package/@sap-ux/eslint-plugin-fiori-tools#rules for the eslint rules.|
|**Main Entity**<br>EmployeeSet|
|**Navigation Entity**<br>toProjects|

## p5felrsegw

An SAP Fiori application with list report.

### Starting the generated app

-   This app has been generated using the SAP Fiori tools - App Generator, as part of the SAP Fiori tools suite.  To launch the generated application, run the following from the generated application root folder:

```
    npm start
```

- It is also possible to run the application using mock data that reflects the OData Service URL supplied during application generation.  In order to run the application with Mock Data, run the following from the generated app root folder:

```
    npm run start-mock
```

#### Pre-requisites:

1. Active NodeJS LTS (Long Term Support) version and associated supported NPM version.  (See https://nodejs.org)



#### Fiori Element
Video 2
created SAPUI5 app with List Report Template

get started --> new project from template -->SAP Fiori
List Report Template --> connect to oData service('http://*****:8010/***/***/***SRV')

Main Event (Employee) --> Navaigation Entity (toProjects)
Module Name(p5 fe lr segw)
Application Title (Employee Management List Report Application)
Namespace(com.listreport)

## Two way to write annotations

1. webapp-->annotations-->annotation.xml

2. Right Click  Project-->Open Guided Development --> Add and edit table column
   start guide-->Entity Type(Employee)-->now add columns.
    





