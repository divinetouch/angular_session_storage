angular_session_storage
=======================

This AngularJS module can be used to create a session storage. All the Objects will be converted to JSON string and save to the session storage. On retrieval, the objects are converted back from JSON string to javascript objects.

It can be used to store some data during the session so when the user refresh the page all the data can be retreived back from the session storage and display back to the user.

Instructions
=======================


Add this module to your project:

1 - Download and include localStorageService.js to your project

2 - Add localStorageService to your Application: 

            angular.module('myApp', [...,'localStorageService'])

3 - Start using the service by including myAppLocalStorage to your controllers or services: 


            angular.module('myApp').controller('MainCtrl', function ($scope, myAppLocalStorage){
            
            ....});

Usage
=========

- supportSessionStorage(): Return TRUE is brower supports session storage
- saveAnItem(key,item): Save an object to a session storage. The key will be used for updating and retrieving back the object
- getAnItem(key): Get the object back from the session storage. undefined will be return if the item was not found.
- removeAnItem(key): Remove an item with this specific key from the session storage
- getAllItems(): Get all the objects from session storage
- removeAllItems(): Remove all the objects from the session storage. FALSE will be return if an item does not exist.
- setApplicationName(name): This name is specifically used for identifying the storage name for the application. By default, the name of the root project is used.
- getApplicationName(): return the name of the application
