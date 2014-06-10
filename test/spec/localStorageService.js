/**
 * Created by divinetouch on 6/9/14.
 */

'use strict';

describe('localStorageService: myAppLocalStorage', function () {

    // load the controller's module
    beforeEach(module('webStoreTestApp'));

    it('should have name as webStoreTest', inject(['myAppLocalStorage', function(myAppLocalStorage){
        myAppLocalStorage.setApplicationName("webStoreTest");
        expect(myAppLocalStorage.getApplicationName()).toBe('webStoreTest');
    }]));

    it('should store a key and an item', inject(['myAppLocalStorage', function(myAppLocalStorage){
        myAppLocalStorage.saveAnItem('key','item');
        expect(myAppLocalStorage.getAnItem('key')).toBe('item');

        myAppLocalStorage.saveAnItem('key','item1');
        expect(myAppLocalStorage.getAnItem('key')).toBe('item1');
    }]));

    it('should return false if no item to remove', inject(['myAppLocalStorage', function(myAppLocalStorage){
        myAppLocalStorage.saveAnItem('key','item');
        expect(myAppLocalStorage.removeAnItem('key1')).toBe(false);

    }]));

    it('should return true if an item was removed', inject(['myAppLocalStorage', function(myAppLocalStorage){
        myAppLocalStorage.saveAnItem('key','item');
        expect(myAppLocalStorage.removeAnItem('key')).toBe(true);

    }]));

    it('should store a key and an item', inject(['myAppLocalStorage', function(myAppLocalStorage){
        myAppLocalStorage.saveAnItem('key1',{object:"savedItem"});
        expect(JSON.stringify(myAppLocalStorage.getAnItem('key1'))).toBe(JSON.stringify({object:"savedItem"}));
    }]));

    it('should have 3 items after saving three different keys and items', inject(['myAppLocalStorage', function(myAppLocalStorage){
        myAppLocalStorage.saveAnItem('key0',{object:"savedItem"});
        myAppLocalStorage.saveAnItem('key1',{object:"savedItem"});
        myAppLocalStorage.saveAnItem('key2',{object:"savedItem"});
        expect(myAppLocalStorage.getAllItems().length).toBe(3);
    }]));

    it('should update an item if key is the same', inject(['myAppLocalStorage', function(myAppLocalStorage){
        myAppLocalStorage.saveAnItem('key','item');
        expect(myAppLocalStorage.getAnItem('key')).toBe('item');

        myAppLocalStorage.saveAnItem('key','item1');
        expect(myAppLocalStorage.getAnItem('key')).toBe('item1');
    }]));

    it('should remove All the Items', inject(['myAppLocalStorage', function(myAppLocalStorage){
        myAppLocalStorage.saveAnItem('key0',{object:"savedItem"});
        myAppLocalStorage.saveAnItem('key1',{object:"savedItem"});
        myAppLocalStorage.saveAnItem('key2',{object:"savedItem"});
        expect(myAppLocalStorage.getAllItems().length).toBe(3);

        myAppLocalStorage.removeAllItems();
        expect(myAppLocalStorage.getAllItems().length).toBe(0);

    }]));

    it('should remove a second item', inject(['myAppLocalStorage', function(myAppLocalStorage){
        myAppLocalStorage.saveAnItem('key0',{object:"savedItem0"});
        myAppLocalStorage.saveAnItem('key1',{object:"savedItem1"});
        myAppLocalStorage.saveAnItem('key2',{object:"savedItem2"});
        expect(myAppLocalStorage.getAllItems().length).toBe(3);

        myAppLocalStorage.removeAnItem('key1');
        expect(myAppLocalStorage.getAllItems().length).toBe(2);

        expect(myAppLocalStorage.getAnItem('key1')).toBe(undefined);
        expect(myAppLocalStorage.getAnItem('key0').object).toBe("savedItem0");

    }]));

});
