var examApp = angular.module('exam', ['ui.bootstrap','ng.ueditor']);
examApp.config(['$locationProvider', function($locationProvider) {
  $locationProvider.html5Mode({
  enabled: true,
  requireBase: false
});

}]);
// examApp.directive('ngIcheck', function($compile,$parse) {
//   return {
//     restrict : 'A',
//     require : '?ngModel',
//     link : function($scope, $element, $attrs, $ngModel) {
//     	var ngModelGetter, value;
//           ngModelGetter = $parse($attrs['ngModel']);
//           value = $parse($attrs['ngValue'])($scope);
//       if (!$ngModel) {
//         return;
//       }
//       //using iCheck
//       $($element).iCheck({
//         labelHover : false,
//         cursor : true,
//         checkboxClass : 'icheckbox_square-blue',
//         radioClass : 'iradio_square-blue',
//         increaseArea : '20%'
//       }).on('ifClicked', function(event) {
//       	if ($($element).attr('type') === 'checkbox' && $attrs['ngModel']) {
//               $scope.$apply(function() {
//                 return ngModelGetter.assign($scope, event.target.checked);
//               });
//             }
//             if ($($element).attr('type') === 'radio' && $attrs['ngModel']) {
//               return $scope.$apply(function() {
//                 return ngModelGetter.assign($scope, value);
//               });
//             }
//         // if ($attrs.type == "checkbox") {
//         //   //checkbox, $ViewValue = true/false/undefined
//         //   $(".number_"+$attrs.name).addClass("active");
//         //   $scope.$apply(function() {
//         //   	var flag = !($ngModel.$modelValue == undefined ? false : $ngModel.$modelValue);
//         //    $ngModel.$setViewValue(flag);
//         //   });
//         // } else {
//         //   // radio, $ViewValue = $attrs.value
//         //   $(".number_"+$attrs.name).addClass("active");
//         //   $scope.$apply(function() {

         	
//         //     $ngModel.$setViewValue($attrs.value);
//         //   });
//         // }
//       });
//     },
//   };
// });
examApp.directive('onFinishRenderFilters', function ($timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            if (scope.$last === true) {
                $timeout(function () {
                    scope.$emit('ngRepeatFinished');
                });
            }
        }
    }
});
examApp.controller("ExamController",function($scope, $location,$http,ModalUtils,$anchorScroll){
	 if ($location.search()) {
    	$scope.id = $location.search().id;
    	$scope.courseId = $location.search().courseId;
    	$scope.type = $location.search().type;
    	$scope.chapter = $location.search().chapter;
  	 }
      $scope.link = function (type,id,exam) {
            var ids = type+"_"+id+"_"+"box"+exam;
            console.log(ids);
            $location.hash(ids);
            $anchorScroll();
            //移动到锚点
        };
  	 var width = $(".content-wrapper").width();
  	 $scope.sideStyle={"width":width/5+"px"};
  	 $scope.contentStyle={"margin-left":width/5+"px"};
     $scope.examStatus = "";
  // 	 $('input[type="checkbox"]').iCheck({
  // 	 	checkboxClass: 'icheckbox_square-blue',
		// radioClass: 'iradio_square-blue'//,
		// //increaseArea: '10%' // optional
  // 	 });
  // 	 $('input[type="radio"]').iCheck({
  // 	 	checkboxClass: 'icheckbox_square-blue',
		// radioClass: 'iradio_square-blue'//,
		// //increaseArea: '10%' // optional
  // 	 });
  	 //获得试题
  	$http.post("data/exam.json",{"id":$scope.id,"courseId":$scope.courseId,"type":$scope.type,"chapter":$scope.chapter}).success(function (result) {
        $scope.examines = result;
        if(result.status ==1){//已经参加考试 0：未考试
            $scope.loadData();
        }else{
            $scope.examStatus = "exam";
        }
       // $scope.examineConf.totalItems = result.total;
    });
    $scope.checkboxArr=[];
    $scope.isSelected=function(type,id,optionId){
    	// $scope.selected={"type":type,"id":id,"data":[]};
    	// $scope.selectedArr.push($scope.selected);
    	var data = $scope.getCheckbox(type,id);
    //	console.log(data);
    	if(data && data.type==type && data.id==id && data.data.indexOf(optionId) >= 0){
    		return true;
    	}else if(data && data.type==type && data.id==id && data.data.indexOf(optionId) < 0){
    		return false;
    	}
    }
     $scope.updateSelection = function($event,type,id,optionId){  
        var checkbox = $event.target ;  
        var checked = checkbox.checked ; 
        var checkObj = $scope.getCheckbox(type,id);
        if(checked){        	
        	if(!checkObj){
        		$scope.checkboxArr.push({"type":type,"id":id,"data":[optionId]}) ; 
        	}else{
        		$scope.addCheckbox(type,id,optionId);
        	}            
        }else{ 
        	 $scope.delCheckbox(type,id,optionId);
        } 
        var obj = $scope.getCheckbox(type,id);
        if(obj){
        	if(obj.data.length>0){
        		$(".number_"+type+"_"+id).addClass("active");
        	}else{
        		$(".number_"+type+"_"+id).removeClass("active");
        	}
        }
    } ; 
    $scope.getCheckbox=function(type,id){
    	var checkObj = null;
    	var keepGoing = true;  
    	angular.forEach($scope.checkboxArr,function(data,index,array){
    		if(keepGoing){
    			if(data.type==type && data.id==id){
					checkObj = data;
					keepGoing = false;  
    			}else{
    				checkObj=null;
    			}
    		}
    		
    	})
    	return checkObj;
    }
    $scope.delCheckbox=function(type,id,optionId){
    	var checkObj = {};
    	var keepGoing = true;  
    	angular.forEach($scope.checkboxArr,function(data,index,array){
    		if(keepGoing){
    			if(data.type==type && data.id==id){
    				
    				var idx = data.data.indexOf(optionId);
    				var d = data.data.splice(idx,1);
					var index = $scope.checkboxArr.indexOf(data);
					$scope.checkboxArr.splice(index,1);
					$scope.checkboxArr.push(data);
					keepGoing = false;  
    			}
    		}
    		
    	})
    }
    $scope.addCheckbox=function(type,id,optionId){
    	var checkObj = {};
    	var keepGoing = true;  
    	angular.forEach($scope.checkboxArr,function(data,index,array){
    		if(keepGoing){
    			if(data.type==type && data.id==id){
    				var idx = data.data.indexOf(optionId);
    				var d = data.data.push(optionId);
					var index = $scope.checkboxArr.indexOf(data);
					$scope.checkboxArr.splice(index,1);
					$scope.checkboxArr.push(data);
					keepGoing = false;  
    			}
    		}
    		
    	})
    }
    var radioArr = [];
    $scope.checkRadio=function(type,id){
    	$(".number_"+type+"_"+id).addClass("active");
    	var name = type+"_"+id;
    	if(radioArr.indexOf(name)<0){
    		radioArr.push(name);
    	}
    	//var check = $("input[name='"+type+"_"+id+"']:checked").val();
    	//console.log("test"+check);

    }
    $scope.submit=function(){
        var singleArray=[];
        var tfngArray= [];
        for(var i = 0,len=radioArr.length;i < len;i++){
            var check =  $("input[name='"+radioArr[i]+"']:checked").val();
            var type = radioArr[i].split("_")[0];
            var id = radioArr[i].split("_")[1];
            if(type=="sigle"){
                singleArray.push({"type":type,"id":id,"data":[check]});
            }else{
                tfngArray.push({"type":type,"id":id,"data":[check]});
            }
        }
        ModalUtils.confirm("确定要提交吗？", "modal-warning", "xl", function () {
            $http.post("data/examResult.json", {"id":$scope.id,"courseId":$scope.courseId,"type":$scope.type,"chapter":$scope.chapter,singleArray:singleArray,tfngArray:tfngArray,checkboxAr:$scope.checkboxAr,filling:$scope.filling}).success(function (result) {
                if (result.respCode == '1') {
                  //  ModalUtils.alert("提交成功", "modal-success", "sm");
                    $scope.examStatus = "result";
                    $scope.examines = result;
                    console.log($scope.examines);

                }else {
                    ModalUtils.alert("提交失败", "modal-warning", "sm");
                }
            });
        });
    
    	console.log(singleArray);
    	console.log(tfngArray);
    	//console.log($scope.formData);
    	console.log($scope.checkboxArr);
    	console.log($scope.filling);
    	//console.log(JSON.stringify($scope.formData));
    }
    $scope.ready = function(editor){
      $scope.content = "test....";

    }
    $scope.loadData=function(){
        $http.post("data/examResult.json", {"id":$scope.id,"courseId":$scope.courseId,"type":$scope.type,"chapter":$scope.chapter}).success(function (result) {
                if (result.respCode == '1') {
                  //  ModalUtils.alert("提交成功", "modal-success", "sm");
                    $scope.examStatus = "result";
                    $scope.examines = result;
                   // console.log($scope.examines);

                }else {
                    ModalUtils.alert("获取失败", "modal-warning", "sm");
                }
            });
    }
})