function LoginViewDirective($log) {

    function link(scope, element, attrs) {
        element.on('$destroy', function () {
            //perform clean up
        });
    }

    return {
        restrict: 'E',
        templateUrl: 'app/directives/login-view.html',
        controller: function ($scope, $element) {
            var self = this;

            self.userLogin = {};
            self.userLogin.email = '';
            self.confirmPassword =  '';

            self.validate = function () {
                return validatePaperInputDecorators($element);
            };

            self.init = function () {

                self.loginRememberMeCB = $('#loginRememberMeCB').on("change", function (event) {
                    $scope.userPreferences.rememberMe = this.checked;

                    if (!this.checked) {
                        $scope.userPreferences.email = "";
                        $scope.userPreferences.password = "";
                    }

                    $scope.$apply();
                    $scope.saveUserPreferences();
                })[0];

                $scope.$on('userPreferencesLoaded', function (event, preferences) {
                    self.userLogin.email = preferences.email;
                    self.userLogin.password = preferences.password;
                    self.loginRememberMeCB.checked = preferences.rememberMe;
                    $scope.$apply();
                });

            };


            self.submit = function (event) {
                if (self.validate()) {
                    $scope.showMessage('valid');

                    $scope.userPreferences.rememberMe = $scope.userPreferences.rememberMe;
                    if ($scope.userPreferences.rememberMe) {
                        $scope.userPreferences.email = self.userLogin.email;
                        $scope.userPreferences.password = self.userLogin.password;
                        $scope.saveUserPreferences();
                    } else {
                        $scope.userPreferences.email = "";
                        $scope.userPreferences.password = "";
                    }

                    $scope.$emit("signInUser", self.userLogin);
                    //$scope.signInUser(self.userLogin);
                } else {
                    $scope.showValidationWarning();
                }
            };

            self.forgotPassword = function (event) {
                $scope.$emit("forgotPassword");
            };

            self.init();
        },
        controllerAs: 'loginViewCtrl',
        link: link
    }
};