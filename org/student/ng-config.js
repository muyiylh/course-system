/**
 * Created by Peter on 2016/10/22.
 */


angular.module('student').config(['$stateProvider','$locationProvider','$urlRouterProvider', function ($stateProvider,$locationProvider,$urlRouterProvider) {
    $urlRouterProvider.otherwise( function($injector, $location) {
        var $state = $injector.get("$state");
        $state.go("course.list");
    });
 
// }]);
    $stateProvider       
        .state('course', {
            url: '/course',
            abstract: true,
            template: '<div ui-view></div>'
        })
        .state('course.list', {
            url: '/list',
            templateUrl: 'org/student/view/course/course.html',
            controller: 'CourseController'
        })
        .state('course.detail', {
            url: '/{id}',
            params: {id: null},
            templateUrl: 'org/student/view/course/course-detail.html',
            controller: 'CourseDetailController'
            // ,
            // resolve: {
            //         auth: ["$q", "AuthenticationSvc", function($q, AuthenticationSvc) {
            //           var userInfo = AuthenticationSvc.getUserInfo();
            //            var defer = $q.defer();
            //            console.log(defer);
            //           if (userInfo) {
            //            // return $q.when(userInfo);
            //             defer.resolve(userInfo);
            //           } else {
            //             console.log(userInfo);
            //            // return $q.reject({authenticated: false });
            //            defer.reject({authenticated: false });
            //           }
            //           return defer.promise;
            //         }]
            //       }
        })
        .state('teacher', {
            url: '/teacher',
            abstract: true,
            template: '<div ui-view></div>'
        })
        .state('teacher.list', {
            url: '/list',
            templateUrl: 'org/student/view/teacher/teacher-list.html',
            controller: 'TeacherController'
            // ,
            // resolve: {
            //         auth: ["$q", "AuthenticationSvc", function($q, AuthenticationSvc) {
            //           var userInfo = AuthenticationSvc.getUserInfo();
            //            var defer = $q.defer();
            //           if (userInfo) {
            //            // return $q.when(userInfo);
            //             defer.resolve(userInfo);
            //           } else {
            //             console.log(userInfo);

            //            // return $q.reject({authenticated: false });
            //            defer.reject({authenticated: false });
            //           }
            //           return defer.promise;
            //         }]
            //       }
        })
        .state('teacher.detail', {
            url: '/{id}',
            params: {id: null},
            templateUrl: 'org/student/view/teacher/teacher-detail.html',
            controller: 'TeacherDetailController'
        })
        .state('exam', {
            url: '/exam',
            abstract: true,
            template: '<div ui-view></div>'
        })
        .state('exam.detail', {
            url: '/{id}',
            templateUrl: 'exam.html',
            controller: function($scope){
               // $scope.
            }
        })
         .state('forum', {
            url: '/forum',
            abstract: true,
            template: '<div ui-view></div>'
        })
        .state('forum.list', {
            url: '/list',
            templateUrl: 'org/student/view/forum/forum.html',
            controller: 'ForumController'
        })
        .state('library', {
            url: '/library',
            templateUrl: 'org/student/view/library/library.html',
            controller: 'LibraryController'
        })
        .state('cloud', {
            url: '/cloud',
            templateUrl: 'org/student/view/cloudstorage/cloud.html',
            controller: 'CloudController'
        })
        .state('notice', {
            url: '/notice',
            templateUrl: 'org/student/view/infor/notice.html',
            controller: 'NoticeController'
        })
        .state('info', {
            url: '/info',
            templateUrl: 'org/student/view/infor/information.html',
            controller: 'InfoController'
        })
        .state('mycourse', {
            url: '/{type}',
            templateUrl: 'org/student/view/infor/course.html',
            controller: 'MycourseController'
        })
        .state('mygroup', {
            url: '/{type}',
            templateUrl: 'org/student/view/infor/course.html',
            controller: 'MycourseController'
        })
       
       
}]);

angular.module('student').factory('sessionHelper', ["$rootScope", function ($rootScope) {
    var sessionHelper = {
        responseError: function (response) {
            if (response.status == -1) {
                window.location.href = "/";
            } else {
                return response;
            }
        }
    };
    return sessionHelper;
}]);
// angular.module('student').factory('sessionInjector',["AuthenticationSvc",function(AuthenticationSvc){
//   var sessionInjector = {
//     request: function(config){
//       console.log(AuthenticationSvc);
//       var user = AuthenticationSvc.getUserInfo();

//       console.log(user);
//      // if(!SessionService.isAnonymous){
//         config.headers['x-session-token'] = "1212DSDSDFF";
//      // }
//       return config;
//     }
//   };
   
//   return sessionInjector;
// }])
angular.module('student').factory('HttpInterceptor', ['$q',
 
  function ($q) {
   return {
    // 请求发出之前，可以用于添加各种身份验证信息
    request: function(config){
   // console.log(localStorage.userInfo);
   var user = localStorage.userInfo;
     if(localStorage.token) {
      config.headers['x-token'] =localStorage.token;
     // console.log(config);
     }
     return config;
    },
    // 请求发出时出错
    requestError: function(err){
     return $q.reject(err);
    },
    // 成功返回了响应
    response: function(res){
     return res;
    },
    // 返回的响应出错，包括后端返回响应时，设置了非 200 的 http 状态码
    responseError: function(err){
    console.log(err);
     if(-1 === err.status) {
      // 远程服务器无响应
     } else if(401 === err.status) {
      // 401 错误一般是用于身份验证失败，具体要看后端对身份验证失败时抛出的错误
     } else if(404 === err.status) {
      // 服务器返回了 404
     }
     return $q.reject(err);
    }
   };
  }
]);
angular.module('student').config(function ($httpProvider) {
    $httpProvider.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded';
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

    // Override $http service's default transformRequest
    $httpProvider.defaults.transformRequest = [function (data) {
        /**
         * The workhorse; converts an object to x-www-form-urlencoded serialization.
         * @param {Object} obj
         * @return {String}
         */
        var param = function (obj) {
            var query = '';
            var name, value, fullSubName, subName, subValue, innerObj, i;

            for (name in obj) {
                value = obj[name];

                if (value instanceof Array) {
                    for (i = 0; i < value.length; ++i) {
                        subValue = value[i];
                        fullSubName = name + '[' + i + ']';
                        innerObj = {};
                        innerObj[fullSubName] = subValue;
                        query += param(innerObj) + '&';
                    }
                } else if (value instanceof Object) {
                    for (subName in value) {
                        subValue = value[subName];
                        fullSubName = name + '[' + subName + ']';
                        innerObj = {};
                        innerObj[fullSubName] = subValue;
                        query += param(innerObj) + '&';
                    }
                } else if (value !== undefined && value !== null) {
                    query += encodeURIComponent(name) + '='
                        + encodeURIComponent(value) + '&';
                }
            }

            return query.length ? query.substr(0, query.length - 1) : query;
        };

        return angular.isObject(data) && String(data) !== '[object File]'
            ? param(data)
            : data;
    }];
    $httpProvider.interceptors.push('sessionHelper');
   $httpProvider.interceptors.push('HttpInterceptor');
});
student.run(["$rootScope", "$location","$uibModal", function($rootScope, $location,$uibModal) {
      $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){//  routeChangeStart
        // if(toState.name=='login')return;// 如果是进入登录界面则允许
        //   // 如果用户不存在
        //   var user = localStorage.userInfo;
        //   if(!user || !localStorage.token){
        //    // event.preventDefault();// 取消默认跳转行为
        //     //$state.go("login",{from:fromState.name,w:'notLogin'});//跳转到登录界面
        //   }
      }); 
      $rootScope.$on("$routeChangeSuccess", function(userInfo) {
        console.log("success....");
        console.log(userInfo);
      });

      $rootScope.$on("$routeChangeError", function(event, current, previous, eventObj) {
        console.log("error...");
        console.log(eventObj);
        if (eventObj.authenticated === false) {
          // $location.path("/login");
           // $uibModal.open({
           //          templateUrl: 'org/student/view/login/login.html',
           //          windowTemplateUrl: 'org/student/view/util/modal/window.html',
           //          backdrop: true,
           //          size: 'xs',
           //          controller: function ($scope, $uibModalInstance,$http,$log,AuthenticationSvc) {
                      
                     
           //               $scope.close = function () {
           //                 $uibModalInstance.close();
           //              };
           //               $scope.ok = function () {
           //                  $scope.alerts=[];
           //                    if(!$scope.uname){
           //                      $scope.alerts.push({msg:"输入用户名",type:'danger'});
           //                      return false;
           //                     }
           //                     if(!$scope.password){
           //                      $scope.alerts.push({msg:"输入密码",type:'danger'});
           //                      return false;
           //                     }
           //                     var result = AuthenticationSvc.login($scope.uname,$scope.password);
           //                     console.log(result);
           //                      // $http.post("data/teacher.json",{uname:$scope.uname,password:$scope.password}).success(function(res){
                     
           //                      //     $uibModalInstance.close();
           //                      //     parent.loginFlag = true;
           //                      //     // parent.loadData(parent.parentFileId ,parent.documentType);
           //                      //  })
           //               };
                 
           //          }
           //  });
        }
  })
     }]);
