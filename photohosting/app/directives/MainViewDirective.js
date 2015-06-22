function MainViewDirective($log) {

    function link(scope, element, attrs) {
        element.on('$destroy', function () {
            //perform clean up
        });
    }

    return {
        restrict: 'E',
        templateUrl: 'app/directives/main-guest-view.html',
        controller: function ($scope, $timeout, commonServices) {

            var self = this;

            $($scope.getUserPreferencesLocalStorage()).on('core-localstorage-load', function (event) {
                $scope.loadUserPreferences();
            });

            $scope.$on('forgotPassword', function (event) {
                self.setCurrentViewIndex($('#forgotPassItemAction').data('index'));
            });

            self.setCurrentViewIndex = function (index, backAction) {
                if (!backAction) {
                    self.historyStack.push(self.pageStack.selected);
                }
                self.navMenu.selected = self.pageStack.selected = index;
            };

            self.init = function () {
                self.pageStack = $('core-animated-pages')[0];
                self.navMenu = $('#navMenu')[0];
                /* Log/history for user-page-navigation*/
                self.historyStack = [];
                self.drawwerPanel = $('#drawerPanel')[0];
            };

            self.menuItemClick = function (event) {
                var target = $(event.currentTarget);
                self.setCurrentViewIndex(target.data('index'));
                $log.info("Selected view index: " + self.pageStack.selected);
            };

            self.toggleMenu = function (event) {
                self.drawwerPanel.togglePanel();
            };

            self.backItemClick = function (event) {
                if (self.historyStack.length > 0) {
                    self.setCurrentViewIndex(self.historyStack.pop(), true);
                }
            };

            self.init();

        },

        controllerAs: 'mainViewCtrl',
        link: link

    }
};