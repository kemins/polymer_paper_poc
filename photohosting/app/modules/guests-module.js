(function () {
    var app = angular.module('guests-module', [], function($httpProvider) {
        // Use x-www-form-urlencoded Content-Type
        //$httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    });

    app.factory('commonServices', ['$log', '$http', CommonServices]);

    app.controller('AppController', ['$scope', '$log', 'commonServices', AppController]);

    app.directive('mainGuestView', ['$log', '$timeout', 'commonServices',  MainViewDirective]);
    app.directive('loginView', ['$log', LoginViewDirective]);
    app.directive('forgotPassView', ['$log', ForgotPasswordDirective]);
    app.directive('registrationView', ['$log', RegistrationViewDirective]);
    app.directive('contactUsView', ['$log', ContactUsDirective]);

})();