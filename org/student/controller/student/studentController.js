student.controller('StudentController', function ($rootScope,$scope, $location, $http, $q, $filter, $uibModal) {
 	var height = $(window).height()-50-30;
	$scope.style = {"height":height}
   // $scope.user=localStorage.userInfo;
    console.log($scope.user);
   $rootScope.active="course";
    $scope.login = function(){
      var parent = $scope;
      $uibModal.open({
                templateUrl: 'org/student/view/login/login.html',
                windowTemplateUrl: 'org/student/view/util/modal/window.html',
                backdrop: true,
                size: 'xs',
                controller: function ($scope, $rootScope,$uibModalInstance,$http,$log,AuthenticationSvc) {
                  
                 
                     $scope.close = function () {
                       $uibModalInstance.close();
                    };
                     $scope.ok = function () {
                        $scope.alerts=[];
                          if(!$scope.uname){
                            $scope.alerts.push({msg:"输入用户名",type:'danger'});
                            return false;
                           }
                           if(!$scope.password){
                            $scope.alerts.push({msg:"输入密码",type:'danger'});
                            return false;
                           }
                           var promise = AuthenticationSvc.login($scope.uname,$scope.password);
                            promise.then(function(result) {
                              parent.user = result;
                              $rootScope.loginFlag=true;
                              $uibModalInstance.close();
                            }, function(reason) {
                                console.error('Failed: ' + reason);
                                $scope.alerts.push({msg:reason,type:'danger'});
                            }, function(update) {
                                console.error('Got notification: ' + update);
                                $scope.alerts.push({msg:update,type:'danger'});

                            });
                          // $scope.user= result;
                     };
             
                }
        });
    };
    $rootScope.infoFlag = false;
    $scope.toggleInfo=function(){
       $rootScope.infoFlag =!$rootScope.infoFlag;
        // console.log($scope.infoFlag);
    }

    
 })
student.filter('cut', function () {
        return function (value, wordwise, max, tail) {
            if (!value) return '';

            max = parseInt(max, 10);
            if (!max) return value;
            if (value.length <= max) return value;

            value = value.substr(0, max);
            if (wordwise) {
                var lastspace = value.lastIndexOf(' ');
                if (lastspace != -1) {
                    value = value.substr(0, lastspace);
                }
            }

            return value + (tail || ' …');
        };
    });
