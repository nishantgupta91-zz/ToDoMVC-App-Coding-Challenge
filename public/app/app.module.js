/**
 * Created by Nishant on 11/12/2015.
 */
'use strict';

var homeModule = angular.module('HomeModule', []);
var headerModule = angular.module('HeaderModule', []);
var footerModule = angular.module('FooterModule', []);

var app = angular.module('ToDoApp', ['ui.router', 'HomeModule', 'HeaderModule', 'FooterModule']);