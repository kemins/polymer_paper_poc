function ContactUsDirective($log) {

    function link(scope, element, attrs) {
        element.on('$destroy', function() {
            //perform clean up
        });
    }

    return {
        restrict: 'E',
        templateUrl: 'app/directives/contact-us-view.html',
        controller: function ($scope, $element) {
            var self = this;

            self.message = {};


            self.validate = function() {
                return validatePaperInputDecorators($element);
            };

            self.init = function() {
                self.view =  $('#contactUsView');
            };

            self.submit = function(event) {
                if (self.validate()) {
                    $scope.$emit("sendContactMessage", self.message);
                }else {
                    $scope.showValidationWarning();
                }
            };

        },
        controllerAs: 'contactUsViewCtrl',
        link: link
    }
}