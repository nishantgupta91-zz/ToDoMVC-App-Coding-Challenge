/**
 * Created by Nishant on 11/13/2015.
 */
homeModule.service('ItemsStoreService', function ($http, $q) {
    'use strict';

    this.todoItems = [];
    this.getToDoItems = function () {
        var deferred = $q.defer();
        var url = "assets/data/sample.json";
        $http.get(url)
            .success(function (data, status) {
                deferred.resolve(data);
            })
            .error(function (data, status) {
                deferred.reject(data);
            });
        return deferred.promise;
    };

    this.putToDoItems = function (item) {
        var deferred = $q.defer();
        this.todoItems.push(item);
    }
});