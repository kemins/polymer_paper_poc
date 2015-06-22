function ForgotPasswordDirective($log) {

    function link(scope, element, attrs) {
        element.on('$destroy', function () {
            //perform clean up
        });
    }

    return {
        restrict: 'E',
        templateUrl: 'app/directives/forgot-password-view.html',
        controller: function ($scope, $element) {

            var self = this;
            self.email = "";

            self.validate = function () {
                return validatePaperInputDecorators($element);
            };

            self.submit = function () {

                if (self.validate()) {
                    $scope.showMessage('valid');
                } else {
                    $scope.showValidationWarning();
                }
            };

        },
        controllerAs: 'forgotPassViewCtrl',
        link: link
    }
}