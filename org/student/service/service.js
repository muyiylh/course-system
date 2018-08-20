student.factory("AuthenticationSvc", function($http, $q, $window,$rootScope) {
  var userInfo;
   function getUserInfo() {
    return userInfo;
    }
  function login(userName, password) {

    var deferred = $q.defer();

    $http.post("data/login.json", {
      userName: userName,
      password: password
    }).then(function(result) {

      userInfo = {
        accessToken: result.data.access_token,
        userName: result.data.userName,
        notice:result.data.notice,
        avatar:result.data.avatar
      };

      $window.localStorage["userInfo"] = JSON.stringify(userInfo);
    $window.localStorage["token"] = result.data.access_token;
      deferred.resolve(userInfo);
    }, function(error) {
      deferred.reject(error);
    });

    return deferred.promise;
  };


  return {
    login: login,
    getUserInfo:getUserInfo
  };
});