angular.module('app').factory('uploadService', ['$http', function($http) {
    return function(file, url ,successCb, errorCb) {

        var url = url;

        var fd = new FormData();

        fd.append("file", file);

        $http.post(url, fd, {

                withCredentials: false,

                headers: {
                    'Content-Type': undefined
                },
                transformRequest: angular.identity

            })
            .success( successCb )
            .error( errorCb );
    }
}]);