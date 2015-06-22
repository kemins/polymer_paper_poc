/**
 * Created by andriy_kemin on 12/3/2014.
 */
function CommonServices($log, $http) {
    var self = this;
    self.config = null;
    self.baseUrl = '';
    self.ACTIVE_COUNT = 0;

    self.loadConfigData = function (onSuccess, onFault) {
        $http.get('app/config/config.json').
            success(function (data, status, headers, config) {
                onSuccess(data, status, headers, config);
                self.config = data;

                self.constructBaseURL();
                $log.debug('Config data loaded');
            }).
            error(function (data, status, headers, config) {
                $log.debug('Fail to load config data');
                onFault(data, status, headers, config);
            });
    };

    self.call = function(serviceName, method, data, successHandler, faultHandler){
        var req = {
            method: method,
            url: self.getServiceURL(serviceName),
            data: data
        };

        self.ACTIVE_COUNT++;
        var promise = $http(req);

        promise.success(function (data, status, headers, config) {
            if (successHandler){
                successHandler(data, status, headers, config);
            }
            self.ACTIVE_COUNT--;
            $log.debug("SERVICE: " + serviceName + " SUCCESS.");
        }).
        error(function (data, status, headers, config) {

            if (faultHandler) {
                faultHandler(data, status, headers, config);
            }
            self.ACTIVE_COUNT--;
            $log.debug("SERVICE: " + serviceName + " FAULT.");
        });

        return promise;
    };

    self.constructBaseURL = function () {
        var template = "{protocol}://{host}:{port}/{contextPath}/";
        template = template.replace("{protocol}", self.config.APP_PROTOCOL);
        template = template.replace("{host}", self.config.APP_SERVER);
        template = template.replace("{port}", self.config.APP_PORT);
        template = template.replace("{contextPath}", self.config.APP_CONTEXT_PATH);
        self.baseUrl = template;
    };

    self.getServiceURL = function(serviceName){
        return self.baseUrl + serviceName;
    }

    return {
        loadConfigData: self.loadConfigData,
        activeCount: self.ACTIVE_COUNT,
        call: self.call
    }

}