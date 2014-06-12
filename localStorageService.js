/**
 * Created by divine touch on 6/7/14.
 * Copyright (c) 2014 Divine Touch
 
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

 */

angular.module('localStorageService',[]).factory('myAppLocalStorage', function($rootElement){

    var applicationName = $rootElement.attr('ng-app');
    var allTheItems = [];

    function appStorageExist(){
        return sessionStorage.getItem(applicationName) !== null ? true : false;
    }

    function convertToJSON(){
        return angular.toJson({"data":allTheItems});
    }

    function createNewStorage(){
        sessionStorage.setItem(applicationName, convertToJSON());
    }


    function updateStorage(){
        try{
            sessionStorage.setItem(applicationName, convertToJSON());
        }catch(e){
            console.log("Failed to convert item to JSON String");
        }
    }

    function setApplicationName(name){
        if(supportSessionStorage){
            applicationName = name;
            createNewStorage();
        }
    }

    function supportSessionStorage(){
        try {
            return 'sessionStorage' in window && window['sessionStorage'] != null;
        }catch (e){
            return false;
        }
    }

    function saveAnItem(key, item){
        var index = getIndex(key);
        if (index> -1){
            getAllItems()[index].item = item;
            updateStorage();
        }
        else{
            addToTheStorage(key, item);
        }
    }

    function getAnItem(key){
        var index = getIndex(key);
        if(index > -1){
            return getAllItems()[index].item;
        }
        return undefined;
    }

    function removeAnItem(key){
        var index = getIndex(key);
        if(index > -1){
            allTheItems.splice(index,1);
            updateStorage();
            return true;
        }
        return false;
    }

    function addToTheStorage(key, item){

        if (appStorageExist()){
            var index = getIndex(key)
            if(index > -1)
            {
                getAllItems()[index].item = item;
            }else{
                allTheItems.push({"key": key,"item": item});
            }
            updateStorage();
        }
        else{
            allTheItems.push({"key": key,"item": item});
            createNewStorage();
        }
    }

    function getAllItems(){
        if(appStorageExist()){
            allTheItems = getAllTheObjectsFromStorage();
        }
        return allTheItems;
    }

    function getAllTheObjectsFromStorage(){
        return JSON.parse(sessionStorage.getItem(applicationName)).data;
    }

    function getIndex(key){
        var index = -1;
        for(var i = 0, len = allTheItems.length; i < len; i++){
            if(allTheItems[i].key === key){
                index = i;
                break;
            }
        }
        return index;
    }

    function removeAllItems(){
        allTheItems = [];
        updateStorage();
    }

    function getApplicationName(){
        return applicationName;
    }

    return{

        supportSessionStorage: supportSessionStorage,
        saveAnItem: saveAnItem,
        getAnItem: getAnItem,
        removeAnItem: removeAnItem,
        getAllItems: getAllItems,
        removeAllItems: removeAllItems,
        setApplicationName: setApplicationName,
        getApplicationName: getApplicationName
    }
})