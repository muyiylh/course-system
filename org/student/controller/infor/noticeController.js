student.controller('NoticeController', function ($rootScope,$scope,$compile,$stateParams,ModalUtils,Upload, $location, $http, $q, $filter, $uibModal) {
  // $(".dropdown-toggle").click();
  $rootScope.infoFlag = false;
  $rootScope.active="test";
  $scope.noticeConf = {
                currentPage: 1,
                itemsPerPage: 10,
                pagesLength: 9,
                search: true,
                onChange: function() {
                 // url = "data/cloud.json";
                    var param = {
                        "pageNo": this.currentPage,
                        "pageSize": this.itemsPerPage
                    };
                    $http.post("data/notice.json",param).success(function (result) {
                        $scope.notices = result.data;

                        $scope.noticeConf.totalItems = result.totalCounts;
                    });
                }
            };
   
 
 })


 