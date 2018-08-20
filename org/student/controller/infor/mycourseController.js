student.controller('MycourseController', function ($rootScope,$scope,$compile,$stateParams,ModalUtils,Upload, $location, $http, $q, $filter, $uibModal) {
$rootScope.infoFlag = false;
$rootScope.active="test";
$scope.type = $stateParams.type;
var w = $(".content-wrapper").width();
$(".collapse").removeClass("in");
var liW =0;
var liH = 0;
var lessonH =0;
if(w>1000){
liW = (w-15*4+8-180)/4;
liH = 110;
lessonH =180;
}else if(w<=1000 && w > 768){
    liW = (w-15*3-10-180)/3;
    console.log(liW);
    liH = 140;
    lessonH =200;
}else if(w>414 && w <= 768){
    liW = (w-15*3-180)/2;
    liH = 90;
    lessonH =200;
}else if(w<=414 && w >= 375){
    liW = (w-15*1+8-180);
    liH = 140;
    lessonH =180;
}else{
    liW = (w);
    liH = 160;
    lessonH =180;
}
console.log(liW);
$scope.width=liW;
$scope.height=liH;
$scope.liHeight=liH+lessonH;
$scope.infoHeight = lessonH;
$scope.groupInfoHeight =lessonH-40;
$scope.groupLiHeight=liH+lessonH-40;
$scope.w = w-160;

$scope.paginationConf = {
            currentPage: 1,
            itemsPerPage: 10,
            pagesLength: 9,
            search: true,

            onChange: function() {
                var param = {
                    "pageNo": this.currentPage,
                    "pageSize": this.itemsPerPage,
                    "type":$scope.type
                };
                $http.post("data/courseInfo.json",param).success(function (result) {
                    $scope.lists = result.pageList;
                    $scope.courses = result.data;
                    $scope.paginationConf.totalItems = result.total;
                });
            }
        };

 $scope.getView=function(){
 	return 'org/student/view/infor/'+$scope.type+'.html';
 }
 $scope.loadData=function(type){
 	$scope.type = type;
 	$scope.paginationConf.onChange();
 }

 })