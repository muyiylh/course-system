student.controller('TeacherController', function ($rootScope,$scope, $location, $http, $q, $filter, $uibModal) {
   $(".collapse").removeClass("in");
   $rootScope.active="teacher";
    var w = $(".content-wrapper").width();
    var liW =0;
    var liH = 0;
    if(w>1200){
    liW = (w-15*4+8)/4;
    liH=220;
    }else if(w<=1200 && w > 768){
        liW = (w-15*4-10)/4;
        liH=220;
    }else if(w>414 && w <= 768){
        liW = (w-15*3+5)/3;
        liH=180;
    }else if(w<=414 && w >= 375){
        liW = (w-15*1+8);
        liH=220;
    }else{
        liW = (w);
        liH=240;
    }
    $scope.width=liW;
    $scope.height=liH;
    $scope.paginationConf = {
                currentPage: 1,
                itemsPerPage: 10,
                pagesLength: 9,
                search: false,
                onChange: function() {
                    var param = {
                        "pageNo": this.currentPage,
                        "pageSize": this.itemsPerPage,

                    };
                    $http.post("data/teacher.json",param).success(function (result) {
	                    $scope.lists = result.pageList;
	                    $scope.teachers = result.data;
	                    $scope.paginationConf.totalItems = result.total;
                    });
                }
            };
    
        $scope.paginationConf.onChange();
       
       


 })