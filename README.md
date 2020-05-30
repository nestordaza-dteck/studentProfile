# *Student Profile - REST Service*

## Directory Structure
    .   
	├── client                       # Modules, Routes, Component, Services & Shared files   
    ├── screenshots                  # Screenshots of UI
    ├── server                       # API End points(Router), In-Memory JSON file, CORS
    └── README.md

## List of tools required :

### Node JS

https://nodejs.org/en/download/

### Angular

https://angular.io/guide/setup-local

## Steps to run the application

1. **Client Development Server** - Move to path "client/" and run `npm install` to install all dependencies followed by `ng serve` for hosting the client locally. Navigate to `http://localhost:4200/`. The app will automatically reload if any changes are made in the source files.

2. **Node/ Express Server** - Move to path "server/" and run `npm install` to install all dependencies followed by `npm start` to fire up the express server. Navigate to `http://localhost:3000`. Express Server serves all the REST API calls from client.

## Structure

1. Applied SOLID principles to all components, services, models & routers. This helps make the app cleaner, easier to read and maintain.

## Validation

1. Created a Reactive Model driven forms that supports real time validation (i.e) validation performed by manipulating DOM using touched, pristine, dirty..

Find the screenshot below.

![Student Profile Form](https://github.com/charles-augustin/studentProfile/blob/master/screenshots/Forms.PNG)

2. Created HttpErrorResponse handler - to handle the errors from Express Server

3. In Create Form popup, Validation in place to limit the characters of student id field to a maximum of 8 digits and Email validation to check the e-mail format.

## Reusability

1. Created reusable view-profile component to handle all individual profile view request from profile table

2. Created a reusable readFile() function in profileRouter since it is common functionality for all HTTP requests.

## Coding Standard

1. Files are named with dashes to separate words in the descriptive name.

2. Component, Service & Model classes are named with the first letter of each internal word capitalized.

3. Variables, Methods & Routers(Server) are named in camelCase format.

## UI Screens

![Student Profile](https://github.com/charles-augustin/studentProfile/blob/master/screenshots/Student_Profile.PNG)

![Profile Detail](https://github.com/charles-augustin/studentProfile/blob/master/screenshots/Profile_Detail.PNG)