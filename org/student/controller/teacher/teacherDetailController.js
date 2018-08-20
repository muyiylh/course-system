student.controller('TeacherDetailController', function ($rootScope,$scope,$stateParams, $location, $http, $q, $filter, $uibModal) {
    $(".collapse").removeClass("in");
   $rootScope.active="teacher";
   $scope.teacherId = $stateParams.id;
  // console.log("$scope.teacherId :"+$scope.teacherId);
   if($scope.teacherId){
         $http.post("data/teacherDetail.json",{"id":$scope.teacherId}).success(function (result) {
            $scope.details = result;
           
        });
   }else{
    console.error("error");
   }

 })