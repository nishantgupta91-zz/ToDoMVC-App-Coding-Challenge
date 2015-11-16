/**
 * Created by Nishant on 11/12/2015.
 */
'use strict';

app.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider
        .otherwise('/home');
});