
function AppController($scope, $log, commonServices) {
    var self = this;

    this.storageID = "#userPreferencesLocalStorage";

    //One email format for all inputs
    //So far we are using default html built in email validator
    //$scope.emailRegExp = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$";


    $scope.validaionFaultGenericMessage = 'Please enter required fields marked in red.';

    // Reference to user preferences storage
    $scope.getUserPreferencesLocalStorage = function () {
        return $(self.storageID)[0];
    };

    // Show feedback for user
    $scope.showMessage = function (message) {
        var paperToast = $('#paperToast')[0];
        paperToast.text = message;
        paperToast.show();
    }

    $scope.showValidationWarning = function () {
        $scope.showMessage($scope.validaionFaultGenericMessage);
    }

    $scope.showProgress = function () {
        var progressOverlay = $('#progressOverlay')[0];
        progressOverlay.active = true;
        $(progressOverlay).removeClass('hidden');
    };

    $scope.hideProgress = function () {
        var progressOverlay = $('#progressOverlay')[0];
        progressOverlay.active = false;
        $(progressOverlay).addClass('hidden');
    };

    $scope.toggleProgress = function () {
        var progressOverlay = $('#progressOverlay')[0];
        progressOverlay.active = !progressOverlay.active;
        $(progressOverlay).toggleClass('hidden');
    };

    // Default init
    $scope.userPreferences = new UserPreferences();

    // Save User Preferences in local storage
    $scope.saveUserPreferences = function () {
        var ls = $scope.getUserPreferencesLocalStorage();
        ls.value = $scope.userPreferences;
        ls.save();
    }

    // Load User Preferences from local storage
    $scope.loadUserPreferences = function () {
        var ls = $scope.getUserPreferencesLocalStorage();

        if (!ls.value) {
            $scope.userPreferences = new UserPreferences();
            $log.info("No User Preferences in local storage!");
        } else {
            $scope.userPreferences = $scope.getUserPreferencesLocalStorage().value;
            $log.info("User Preferences are present in local storage!");
        }

        $scope.$broadcast("userPreferencesLoaded", $scope.userPreferences);
    }

    $scope.signInUser = function (user) {
        $scope.callService('login', 'POST', user);
    };

    $scope.contactUs = function (message) {
        $scope.callService('contactUs', 'POST', message);
    };

    $scope.callService = function (name, method, data) {
        if (commonServices.activeCount == 0) {
            $scope.showProgress();
        }

        var promise = commonServices.call(name, method, data);
        promise.then($scope.checkProgress, $scope.checkProgress);
        return promise;
    }
    ;

    $scope.checkProgress = function () {
        if (commonServices.activeCount == 0) {
            $scope.hideProgress();
        }
    }

    function init() {
        commonServices.loadConfigData(function (data) {
            $scope.config = data;
        }, function (data, status) {
            $scope.showMessage('Error Loading config data');
        });

        $('#versionBtn').click(function (event) {
            $scope.toggleProgress();
        });

        $scope.$on('signInUser', function (event, user) {
            $scope.signInUser(user);
        });

        $scope.$on('sendContactMessage', function (event, message) {
            $scope.contactUs(message);
        });

    }

    init();

}
