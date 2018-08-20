student.controller('CourseController', function ($rootScope,$scope, $location, $http, $q, $filter, $uibModal) {
$rootScope.active="course";
$rootScope.loginFlag = true;
var w = $(".content-wrapper").width();
$(".collapse").removeClass("in");
var liW =0;
var liH = 0;
var lessonH =0;
if(w>1200){
liW = (w-15*4+8)/4;
liH = 140;
lessonH =180;
}else if(w<=1200 && w > 768){
    liW = (w-15*4-10)/4;
    console.log(liW);
    liH = 140;
    lessonH =180;
}else if(w>414 && w <= 768){
    liW = (w-15*3)/3;
    liH = 100;
    lessonH =220;
}else if(w<=414 && w >= 375){
    liW = (w-15*1+8);
    liH = 140;
    lessonH =190;
}else{
    liW = (w);
    liH = 150;
    lessonH =180;
}
$scope.width=liW;
$scope.height=liH;
$scope.liHeight=liH+lessonH;
$scope.infoHeight = lessonH;
 $("#course").css({
        'border-bottom':'4px solid #f3544c'
});
  $("#teacher").css({
        'border-bottom':'0px solid #f3544c'
});
    $http.get("data/course.json?t=" + Math.floor(Date.now() / 1000)).success(function (response) {
        $scope.majors = response;
    });
    $http.get("data/time.json?t=" + Math.floor(Date.now() / 1000)).success(function (response) {
        $scope.times = response;
    });
    // $http.get("data/courseInfo.json?t=" + Math.floor(Date.now() / 1000)).success(function (response) {
    //     $scope.courses = response.data;
    // });
      $scope.paginationConf = {
                currentPage: 1,
                itemsPerPage: 10,
                pagesLength: 9,
                search: false,
    
                onChange: function() {
                    var param = {
                        "pageNo": this.currentPage,
                        "pageSize": this.itemsPerPage,
                        "course":$scope.courseFlag,
                        "time":$scope.timeFlag
                    };
                    $http.post("data/courseInfo.json",param).success(function (result) {
	                    $scope.lists = result.pageList;
	                    $scope.courses = result.data;
	                    $scope.paginationConf.totalItems = result.total;
                    });
                }
            };
        $scope.courseFlag = 1;
        $scope.timeFlag = 1;
        $scope.paginationConf.onChange();
        $scope.loadCourseByMajor=function(id){
            $scope.courseFlag=id;
            var time = $scope.timeFlag;
          // $scope.paginationConf.onChange();
           var param = {
                        "pageNo": this.currentPage,
                        "pageSize": this.itemsPerPage,
                        "course":$scope.courseFlag,
                        "time":$scope.timeFlag
                    };
                    $http.post("data/courseInfo1.json",param).success(function (result) {
                        $scope.lists = result.pageList;
                        $scope.courses = result.data;
                        $scope.paginationConf.totalItems = result.total;
                    });

        }
        $scope.loadCourseByTime=function(id){
            $scope.timeFlag=id;
            var major=$scope.courseFlag;
            $scope.paginationConf.onChange();
            
        }
       


 })