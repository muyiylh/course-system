student.controller('ForumController', function ($rootScope,$scope,$stateParams, $location, $http, $q, $filter, $uibModal) {
  var h = $(window).height()-140;
  $rootScope.active="forum";
  $scope.height = h;
  $(".collapse").removeClass("in");
   $("#course").css({
        'border-bottom':'0px solid #f3544c'
    });
      $("#teacher").css({
            'border-bottom':'0px solid #f3544c'
    });
//1 西安印象 2：热点新闻 3:学术交流4:娱乐播报5:体坛快讯 6:铁血军事 7：健康养生
  $scope.forumType = 1;
  $scope.discussConf = {
                currentPage: 1,
                itemsPerPage: 10,
                pagesLength: 9,
                search: false,
                onChange: function() {
                    var param = {
                        "pageNo": this.currentPage,
                        "pageSize": this.itemsPerPage,
                        "type":$scope.forumType
                    };
                    $http.post("data/discuss.json",param).success(function (result) {
                        $scope.discusses = result.data;
                        $scope.discussConf.totalItems = result.total;
                    });
                }
            };
   
   // 
   $scope.type ="forum-list";
   $scope.add=function(){
    $scope.type ="forum-add";
   }
   $scope.detail=function(id){
    $scope.type ="forum-detail";
    $scope.discussDetailConf.onChange(id);
   }
   $scope.getView=function(){
      return 'org/student/view/forum/'+$scope.type+'.html';
    }

    $scope.changeType=function(type){
       $scope.type ="forum-list";
      $scope.forumType = type;
      $scope.discussConf.onChange();
    }
    $scope.changeType($scope.forumType);

    $scope.discussDetailConf = {
            currentPage: 1,
            itemsPerPage: 10,
            pagesLength: 9,
            search: false,
            data:{},
            onChange: function(discussId) {
                var param = {
                    "pageNo": this.currentPage,
                    "pageSize": this.itemsPerPage,
                    "type":$scope.forumType,
                    "discussId":discussId
                };
                $http.post("data/discussDetail.json",param).success(function (result) {
                    $scope.discussDetailConf.data = result.data;
                    $scope.discussDetails = result;
                    $scope.discussDetailConf.totalItems = result.total;
                });
            }
    };
 })
 