student.controller('InfoController', function ($rootScope,$scope,$compile,$stateParams,ModalUtils,Upload, $location, $http, $q, $filter, $uibModal) {
$rootScope.infoFlag = false;
 $rootScope.active="test";
 $scope.changePwdFlag = false;
 $scope.uploadFlag =false;
 $scope.changePwd=function(){
 	$scope.changePwdFlag = !$scope.changePwdFlag;
 }
$scope.upload = function (file) {
        Upload.upload({
            url: 'data/cloud.json',
            data: {file: file, 'username': $scope.username}
        }).then(function (resp) {
          ModalUtils.alert("上传成功");
            console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
        }, function (resp) {
          ModalUtils.alert("上传失败");
            console.log('Error status: ' + resp.status);
        }, function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
           // ModalUtils.uploadFile(progressPercentage + '% ' + evt.config.data.file.name);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name,progressPercentage);
        });
};
 $scope.submitForm = function() {
           
            if ($scope.form.$invalid) {
                alert('请检查您的信息')
            } else {
                alert('注册成功！')
            }

        }
 $scope.submitForm = function(isValid) {

	// check to make sure the form is completely valid
	if (isValid) {
		alert('our form is amazing');
	}

};
 $scope.submitPwdForm = function(isValid) {

	// check to make sure the form is completely valid
	if (isValid) {
		alert('our form is amazing');
	}

};
// $scope.submit = function(){
// 	var reg = /^1[3|5|7|8|4][0-9]\d{4,8}$/;
// 	$scope.alerts=[];
// 	if($scope.phone){
// 		 if(!reg.test($scope.phone)){ 
// 	       $scope.alerts.push({"msg":"手机号码输入错误","type":"danger"}); 
// 	       return false; 
//     	} 
// 	}
// 	console.log("111:"+$scope.newPassword);
// 	if($scope.newPassword){
// 		console.log($scope.newPassword+"  1"+$scope.confirmPassword);
// 		if($scope.newPassword != $scope.confirmPassword){
// 			$scope.alerts.push({"msg":"两次输入密码不正确","type":"danger"}); 
// 	       return false; 
// 		}
// 	}
// }
 });
student.directive('compare', function() {

        var o = {};
        o.strict = 'AE';
        o.scope = {
            orgText: '=compare'
        }
        o.require = 'ngModel';
        o.link = function(scope, elem, att, con) {
            con.$validators.compare = function(v) {
                return v == scope.orgText;
            }
            scope.$watch('orgText', function() {
                con.$validate();
            });
        }
        return o;
    });


