/**
 * Created by Nishant on 11/12/2015.
 */
homeModule.controller('HomeController', function ($scope, $stateParams, ItemsStoreService) {
    'use strict';

    $scope.newItem = '';
    $scope.todoItems = [];
    $scope.completedItems = [];
    $scope.filterType = '';
    $scope.displayCompletedFlag = '';
    $scope.editableItem = '';

    /**
     * Fetches the items from sample.json file using service called "ItemsStoreService"
     */
    $scope.fetchInitialItems = function () {
        var promise = ItemsStoreService.getToDoItems();
        promise.then(function (data) {
            // Put all the items into todoItems array
            $scope.todoItems = data;
            // Put all items with "done: true" into completedItems array
            data.forEach(function (item) {
                if (item.done) {
                    $scope.completedItems.push(item);
                }
            })
        });
    };

    /**
     * Generates a random number of 6 digits and ensures the first digit will never be 0
     *
     * @returns {number}
     *      random number generated
     */
    $scope.generateRandomId = function () {
        return Math.floor(100000 + Math.random() * 900000);
    };

    /**
     * finds index of an object in array of objects
     *
     * @param objArray
     *      array of objects
     * @param obj
     *      object whose index has to be found
     * @returns {number}
     *      index number
     */
    $scope.findIndexInObjectArray = function (objArray, obj) {
        for (var i = 0; i < objArray.length; i++) {
            console.log(objArray[i]);
            if (objArray[i].id == obj.id) {
                return i;
            }
        }
    };

    /**
     * This is called every time when the state (routing) transition is completed.
     */
    $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
        var stateName = [];

        // check filter type from $toState params
        if (toState.name.indexOf(".") > -1) {
            var stateName = toState.name.split(".");
        }

        // for cases with state - "home.all", "home.active" or "home.completed"
        if (stateName.length > 1) {
            $scope.filterType = stateName[1];
        } else {
            // for state - "home"
            $scope.filterType = toState.name;
        }

        // set display option for filter
        if ($scope.filterType === 'completed') {
            // for displaying only those items where "done" is set to false. Means setting displayCompletedFlag to true
            $scope.displayCompletedFlag = true;
        } else if ($scope.filterType === 'active') {
            // for displaying only those items where "done" is set to true. Means setting displayCompletedFlag to false
            $scope.displayCompletedFlag = false;
        } else {
            // for displaying all items
            $scope.displayCompletedFlag = '';
        }
    });

    /**
     * Adds a new item to list of TODOs
     */
    $scope.addNewItem = function () {
        // check if at least 1 character is entered
        if ($scope.newItem.trim().length < 1) {
            return;
        }

        // 6 digit random number assigned as Id to the new item
        var randomId = $scope.generateRandomId();
        var newItem = {
            id: randomId,
            title: $scope.newItem,
            done: false
        };
        $scope.todoItems.push(newItem);

        // clear the input box after the new item is added successfully to todoItems array
        $scope.newItem = '';
        console.log($scope.todoItems);
    };

    /**
     * Deletes an item from list of TODOs
     *
     * @param item
     *      item which has to be deleted
     */
    $scope.deleteItem = function (item) {
        // find index of item in totoItems array
        var itemIndexInMainList = $scope.findIndexInObjectArray($scope.todoItems, item);

        // if found, remove item
        if (itemIndexInMainList > -1) {
            $scope.todoItems.splice(itemIndexInMainList, 1);
        }

        // remove the item from completedItems array also (if present)
        var itemIndexInCompletedList = $scope.findIndexInObjectArray($scope.completedItems, item);
        if (itemIndexInCompletedList > -1) {
            $scope.completedItems.splice(itemIndexInCompletedList, 1);
        }
    };

    /**
     * Makes the item editable. Can be used further to update item's title in case result is being stored in a file
     *
     * @param item
     *      item which has to be made editable
     */
    $scope.editItem = function (item) {
        // make an item editable if it's not completed
        if (!item.done) {
            $scope.editableItem = item;
        }
    };

    /**
     * Makes the item uneditable again. Can be used further to update permanent storage of items
     *
     * @param item
     *      item which hsa to be made uneditable again
     */
    $scope.saveEdittedItem = function (item) {
        if (!item.done) {
            $scope.editableItem = '';
        }
    };

    /**
     * Toggles the "done" status of an item in the todoItems array.
     *
     * @param item
     *      item whose "done" status is toggled
     */
    $scope.toggleDoneStatus = function (item) {
        var itemIndex = $scope.findIndexInObjectArray($scope.todoItems, item);
        console.log(itemIndex);
        // if "done" status after toggling is true, then add the item to completedItems array
        if ($scope.todoItems[itemIndex].done) {
            $scope.completedItems.push(item);
        } else {
            // if "done" status after toggling is false, then item is removed from completedItems array
            var index = $scope.findIndexInObjectArray($scope.completedItems, item);
            if (index != undefined)
                $scope.completedItems.splice(index, 1);
        }
        console.log($scope.todoItems);
        console.log($scope.completedItems);
    };

    /**
     * Marks all the items in todoItems array as complete. If all items are already complete, mark them as incomplete
     */
    $scope.markAllAsComplete = function () {
        // toggle all if completedItems array has all the items
        if ($scope.completedItems.length == $scope.todoItems.length) {
            $scope.todoItems.forEach(function (item) {
                item.done = false;
            });
            // remove all items from completedItems array
            $scope.completedItems = [];
        } else {
            // toggle each incomplete item in todoItems array and add to completedItems array
            $scope.todoItems.forEach(function (item) {
                if (!item.done) {
                    item.done = true;
                    $scope.toggleDoneStatus(item);
                }
            });
        }
    };

    /**
     * Delete all the completed items
     */
    $scope.clearAllCompleted = function () {
        // remove completed items from todoItems array
        $scope.completedItems.forEach(function (item) {
            var itemIndex = $scope.findIndexInObjectArray($scope.todoItems, item);
            $scope.todoItems.splice(itemIndex, 1);
        });
        // clear all items from completedItems array
        $scope.completedItems = [];
    };

    // As the application starts, fetch the initial todoItems from sample.json file
    $scope.fetchInitialItems();
});