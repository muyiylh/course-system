student.controller('CourseDetailController', function ($rootScope,$scope,$stateParams, $location, $http, $q, $filter, $uibModal) {
	$rootScope.active="course";
    $scope.courseFlag = true;
    $(".collapse").removeClass("in");
	 // $("#course").css({
  //       'border-bottom':'4px solid #f3544c'
  //   });
    //   $("#teacher").css({
    //         'border-bottom':'0px solid #f3544c'
    // });
	$scope.type = "course-chapter";
	$scope.courseId = $stateParams.id;
    $scope.discussId =0;//讨论ID
    $scope.chapterNum ={};
    $scope.examineNum ={};
     $http.post("data/chapterNum.json",{"id":$scope.courseId}).success(function (result) {
        $scope.chapterNum.data = result;
        $scope.chapterNum.total = result.length;
        $scope.examineNum.data = result;
        $scope.examineNum.total = result.length;
        //$scope.chapterNumData=result;
     });
     $scope.testType="1";
	$scope.tabs=function(str){
		$scope.type = "";
		if(str=="chapter"){//章节
			$scope.type = "course-chapter";
            $scope.chapterNum.onChange(1);
            $("#discussTab").css({"background": "#E9F8FF","color": "#333"});
		}else if(str=="examine"){//考核
			$scope.type = "course-examine";
            $scope.examineNum.onChange("1");
         //  $scope.examineNum.onChange(1);
        $("#discussTab").css({"background": "#E9F8FF","color": "#333"});
		}else if(str=="grade"){//成绩
			$scope.type = "course-grade";
            $scope.gradeConf.onChange();
            $("#discussTab").css({"background": "#E9F8FF","color": "#333"});
		}else if(str=="evaluate"){//评价
			$scope.type = "course-evaluate";
           $scope.evaluateConf.onChange();
          $("#discussTab").css({"background": "#E9F8FF","color": "#333"});
		}else if(str=="discuss"){//讨论
			$scope.type = "course-discuss";
             $scope.discussConf.onChange();
             $("#discussTab").css({"background": "#7CCFF9","color": "#fff"});
		}else if(str=="addDiscuss"){//讨论
            $scope.type = "course-discuss-add";
            $("#discussTab").css({"background": "#7CCFF9","color": "#fff"});
        }else{
            // console.log("str:"+str);
            $scope.discussId = str;
            $scope.type = "course-discuss-detail";
            $scope.discussDetailConf.onChange();
            $("#discussTab").css({"background": "#7CCFF9","color": "#fff"});
        }
	}
	$scope.getView=function(){
 		return 'org/student/view/course/'+$scope.type+'.html';
	}
	/*章节内容***/
	// $scope.chapterNum.id=1;
    $scope.chapterNum.onChange=function(id) {
     	$scope.chapterNum.id=id;
     	if(!id){
     		id=1;
     	}
        var param = {
            "id": id
        };
        $http.post("data/chapter.json",param).success(function (result) {
            $scope.chapters = result.data;
            $scope.chapterTitle =result.title;

        });   
     };
     $scope.chapterNum.onChange(1);
     /*******考核*********/
 
	$scope.examineNum.id=1;
    
    $scope.examineNum.onChange=function(id) {
     	
     	if(!id){
     		id=1;
     	}
        $scope.examineNum.id=id;
        var currentPage=1,
        itemsPerPage=10,
        pagesLength=9,
        search=true,
        type=1;
               // onChange: function(type) {
                    var param = {
                        "pageNo": currentPage,
                        "pageSize": itemsPerPage,
                        "courseId":$scope.courseId,
                        "chapterId":$scope.examineNum.id,
                        "type":type
                    };
                    $scope.testType = type;
                    $scope.examineConf.onChange(1);
           
     };
 
	/**** 获得考试课程 

    type 1:课后作业 2：随堂测试 3：课程实验 4：研究报告 5：课程考试*********/
    $scope.examType=1;
	  $scope.examineConf = {
                currentPage: 1,
                itemsPerPage: 10,
                pagesLength: 9,
                search: false,
                type:1,
              
                onChange: function(type) {
                    console.log("type:"+type);
                    $scope.examType = type;
                    var param = {
                        "pageNo": this.currentPage,
                        "pageSize": this.itemsPerPage,
                        "courseId":$scope.courseId,
                        "id":$scope.courseId,
                        "chapterId":$scope.examineNum.id,
                        "type":type
                    };
                    $scope.testType = type;
                    console.log( $scope.testType );
                    $http.post("data/suitangTest.json",param).success(function (result) {
	                    $scope.examines = result.data;
	                    $scope.examineConf.totalItems = result.total;
                    });
                }
            };
	

   
    /***********课程成绩*********/
    $scope.gradeConf = {
                currentPage: 1,
                itemsPerPage: 10,
                pagesLength: 9,
                search: false,
                onChange: function() {
                    var param = {
                        "pageNo": this.currentPage,
                        "pageSize": this.itemsPerPage,
                        "courseId":$scope.courseId,
                        "id":$scope.courseId,
                        "chapterId":$scope.examineNum.id
                    };
                    $http.post("data/grade.json",param).success(function (result) {
                        $scope.grades = result.data;
                        $scope.gradeConf.totalItems = result.total;
                    });
                }
            };
    
    /****课程评价****/
     $scope.ready = function(editor){
        //alert(editor.getContent());
    }
    /*****内容使用*******/
    // $scope.max1 = 5;  
    // $scope.ratingVal1 = 0;  
    $scope.readonly1 = false;  
    $scope.onHover1 = function(val){  
        $scope.hoverVal1 = val;  
    };  
    $scope.onLeave1 = function(){  
        $scope.hoverVal1 = null;  
    }  
    $scope.onChange1 = function(val){  
        $scope.ratingVal1 = val;  
    }  
    /*****简洁易懂*******/
    // $scope.max2 = 5;  
    // $scope.ratingVal2 = 0;  
    $scope.readonly2 = false;  
    $scope.onHover2 = function(val){  
        $scope.hoverVal2 = val;  
    };  
    $scope.onLeave2 = function(){  
        $scope.hoverVal2 = null;  
    }  
    $scope.onChange2 = function(val){  
        $scope.ratingVal2 = val;  
    } 
    /*****逻辑清晰*******/
    // $scope.max3 = 5;  
    // $scope.ratingVal3 = 0;  
    $scope.readonly3 = false;  
    $scope.onHover3 = function(val){  
        $scope.hoverVal3 = val;  
    };  
    $scope.onLeave3 = function(){  
        $scope.hoverVal3 = null;  
    }  
    $scope.onChange3 = function(val){  
        $scope.ratingVal3 = val;  
    } 

    //   /*****逻辑清晰*******/
    // $scope.max = 5;  
    // $scope.ratingVal = 3;  
    // $scope.readonly = true;  

    /************课程评价 分页**************/
    $scope.evaluateConf = {
                currentPage: 1,
                itemsPerPage: 10,
                pagesLength: 9,
                search: false,
                onChange: function() {
                    var param = {
                        "pageNo": this.currentPage,
                        "pageSize": this.itemsPerPage,
                        "courseId":$scope.courseId,
                        "id":$scope.courseId
                    };
                    $http.post("data/pingjia.json",param).success(function (result) {
                        $scope.evaluates = result.data;
                        $scope.evaluateConf.totalItems = result.total;
                    });
                }
            };
    
    /************课程讨论 分页**************/
    $scope.discussConf = {
                currentPage: 1,
                itemsPerPage: 10,
                pagesLength: 9,
                search: false,
                onChange: function() {
                    var param = {
                        "pageNo": this.currentPage,
                        "pageSize": this.itemsPerPage,
                        "courseId":$scope.courseId
                    };
                    $http.post("data/discuss.json",param).success(function (result) {
                        $scope.discusses = result.data;
                        $scope.discussConf.totalItems = result.total;
                    });
                }
            };
   


        /***********课程讨论详情 分页*********/
    $scope.discussDetailConf = {
                currentPage: 1,
                itemsPerPage: 10,
                pagesLength: 9,
                search: false,
                data:{},
                onChange: function() {
                    var param = {
                        "pageNo": this.currentPage,
                        "pageSize": this.itemsPerPage,
                        "courseId":$scope.courseId,
                        "discussId":$scope.discussId
                    };
                    $http.post("data/discussDetail.json",param).success(function (result) {
                        $scope.discussDetailConf.data = result.data;
                        $scope.discussDetails = result;
                        $scope.discussDetailConf.totalItems = result.total;
                    });
                }
            };
    // $scope.disucssListConf = {
    //     discussDetailConf :$scope.discussDetailConf
    // }
    /*******回复事件************/
    // $scope.showPublish=false;
    // $scope.reply=function(id,level){
    // console.log(id+" "+level);
    // console.log("reply..");
    // // $scope.showPublish=true;
    //     var html = ' <div class="piblish-content">'+
    //        ' <textarea ng-model="publisContent" class="form-control"></textarea>'+
    //         '<div class="text-right">'+
    //          ' <input type="button" ng-click="onPublish()" class="btn btn-publish" name="" value="发表">&nbsp;&nbsp;'+
    //           '<input type="button"  class="btn btn-cancel" name="" value="取消">'+
    //         '</div>'+
    //      ' </div>';
    //      $("#discussLevel"+level+id).append(html);
    // }
    // $scope.onPublish=function(){
    //     console.log("onPublish.."+$scope.publisContent);
    // }    
})
