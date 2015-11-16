/**
 * Created by Nishant on 11/13/2015.
 */
homeModule.config(function ($stateProvider) {
    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'app/components/core/home/home.tpl.html',
            controller: 'HomeController'
        })
        .state('home.all', {
            url: "/all"
        })
        .state('home.active', {
            url: "/active"
        })
        .state('home.completed', {
            url: "/completed"
        });
});