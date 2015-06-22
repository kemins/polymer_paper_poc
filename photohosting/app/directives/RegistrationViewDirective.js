function RegistrationViewDirective($log) {

    function link(scope, element, attrs) {
        element.on('$destroy', function () {
            //Perform clean up
        });
    };

    return {
        restrict: 'E',
        templateUrl: 'app/directives/registration-view.html',
        controller: function ($scope, $element) {
            var self = this;

            self.user = {};
            self.user.password = '';
            self.user.email = '';
            self.user.firstName = '';
            self.user.lastName = '';
            self.user.gender = 'male';
            self.confirmPassword = '';

            self.validate = function () {
                var confirmPassValid = self.user.password === self.confirmPassword;
                self.confirmPassInput.isInvalid = confirmPassValid;
                return validatePaperInputDecorators($element) && confirmPassValid;
            };

            self.submit = function (event) {

                if (self.validate()) {
                    $scope.showMessage('valid');
                } else {
                    $scope.showValidationWarning();
                }
            };

            self.init = function () {
                self.confirmPassInput = $('#regConfirmPasswordInput')[0];

                self.genderRadioButtonGroup = $('#genderRadioButtonGroup').on('core-select', function ($event) {
                    self.user.gender = this.selected;
                    $log.debug('Gender Selected: ' + self.user.gender);
                })[0];
            };

            self.init();
        },
        controllerAs: 'registerViewCtrl',
        link: link
    }
}