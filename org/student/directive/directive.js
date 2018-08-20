/**
 * 章节插件
 * @date 2017-04-01
 * @author Peter
 */

student.directive('swiper',[function(){//自定义指令
    return {
        restrict: 'E',//仅限元素名调用
        template: '<div class="swiper-list clearfix">' +
        '<div ng-click="prevPage() " class="first"><a><</a></div>' +
        '<ul class="swiper clearfix" >' +
        
        '<li ng-repeat="item in currentArr track by $index" ' +
        '>' +
        '<a ng-click="conf.onChange(item.id)" ng-class="{active: item.id == conf.id }">{{ item.name }}</a>' +
        '</li>' +
       
        '</ul>' +
         '<div class="last" ng-class="{disabled: currentPage == totalPage}" ng-click="nextPage()"><a>></a></li>' +
       
        // '</div>' +
        // '<div class="no-items">数据加载中</div>' +
        '</div>',
        replace: true,
        // controller:function($scope,$stateParams,$http){
        //     $scope.courseId = $stateParams.id;
        //     console.log("courseId:"+$scope.courseId);
        //     $http.post("data/chapterNum.json",{"id":$scope.courseId}).success(function (result) {
        //         console.log(result);
        //          $scope.data = result;
        //         // $scope.examineNum.data = result;
        //      });
        // },
        scope: {
            conf: '='//双向绑定数据
        },
        link: function(scope, element, attrs){
           // scope.conf.id=scope.conf.id;
            // var total = scope.sides.length;//总记录
            // var w = $(".content-wrapper").width();
            // var pageSize = Math.floor(w/60);//每页显示的记录数

            var w = $(".content-wrapper").width();
            var pageSize = Math.floor((w-100)/110);
       
            scope.totalPage = 0;
            scope.currentPage =1;//当前页，默认为1。
               
            scope.nextPage=function(){
                if(scope.currentPage < scope.totalPage){
                    scope.currentPage+=1;
                   // scope.getCurrentPage(currentPage);
                }
               
            }
            scope.prevPage=function(){
                if(scope.currentPage > 1){
                    scope.currentPage--;
                   // scope.getCurrentPage(currentPage);
                }
               
            }
            function getCurrentPage(newValue, oldValue){

            var count = parseInt(scope.conf.total)?parseInt(scope.conf.total):0;
         
            ////记录条数  
           // var count = scope.data.length;
            
            scope.currentArr=[];
            if(count/pageSize > parseInt(count/pageSize)){   
                scope.totalPage=parseInt(count/pageSize)+1;   
            }else{   
                scope.totalPage=parseInt(count/pageSize);   
            }
           // scope.getCurrentPage(currentPage); 
        
           
                scope.currentArr=[];
                if(!scope.currentPage){
                    scope.currentPage = 1;
                }
            
                var startRow = (scope.currentPage - 1) * pageSize+1;//开始显示的行  31 
                var endRow = scope.currentPage * pageSize;//结束显示的行   40
                endRow = (endRow > count)? count : endRow; 
                for(var i=startRow;i<=endRow;i++){ 
                    scope.currentArr.push(scope.conf.data[i-1]);  
                } 
                //scope.conf.onChange(1); 
            }
             scope.$watch(function() {

                 var newValue = [scope.totalPage, scope.currentPage, pageSize,scope.conf.data];
                 return newValue;
            }, getCurrentPage, true);
            // 变更当前页
            // scope.changeCurrentPage = function(item) {
            //     if(item == '...'){
            //         return;
            //     }else{
            //         scope.conf.currentPage = item;
            //     }
            // };
            
            // 定义分页的长度必须为奇数 (default:5)
           

            // scope.$watch(function() {

            //     if(!scope.conf.totalItems) {
            //         scope.conf.totalItems = 0;
            //     }
            //     if(angular.isUndefined(scope.conf.search)) {
            //         scope.conf.search = false;
            //     }

            //     var newValue = [scope.conf.totalItems, scope.conf.currentPage, scope.conf.itemsPerPage, scope.conf.search];
            //     return newValue;
            // }, getPagination, true);
        }
    };
}]);


student.directive('star', function () {  
  return {  
    template: '<ul class="rating" ng-mouseleave="leave()">' +  
        '<li ng-repeat="star in stars" ng-class="star" ng-click="click($index + 1)" ng-mouseover="over($index + 1)">' +  
      //  '\u2605' +  
        '</li>' +  
        '</ul>',  
    scope: {  
      ratingValue: '=',  
      max: '=',  
      readonly: '@',  
      onHover: '=',  
      onLeave: '='  
    },  
    controller: function($scope){  
      $scope.ratingValue = $scope.ratingValue || 0;  
      $scope.max = $scope.max || 5;  
      $scope.click = function(val){  
        if ($scope.readonly && $scope.readonly === 'true') {  
          return;  
        }  
        $scope.ratingValue = val;  
      };  
      $scope.over = function(val){  
        $scope.onHover(val);  
      };  
      $scope.leave = function(){  
        $scope.onLeave();  
      }  
    },  
    link: function (scope, elem, attrs) {  
      elem.css("text-align", "center");  
      var updateStars = function () {  
        scope.stars = [];  
        for (var i = 0; i < scope.max; i++) {  
          scope.stars.push({  
            filled: i < scope.ratingValue  
          });  
        }  
      };  
      updateStars();  
   
      scope.$watch('ratingValue', function (oldVal, newVal) {  
        if (oldVal) {  
          updateStars();  
        }  
      });  
      scope.$watch('max', function (oldVal, newVal) {  
        if (newVal) {  
          updateStars();  
        }  
      });  
    }  
  };  
});


student.directive('discussList', function () {  
  return {
    restrict: 'E',  
    templateUrl:"./org/student/view/course/course-discuss-list.html",
    scope: {   
   
      conf: '=' 
    },  
    controller: function($scope,$http){    
      this.publish = function(content,id,level,data){  
          console.log(content+"  "+id);
          console.log(data);
          var param = {
            "content":content,
            "id":id
          }
          $scope.discussDetailConf={};
          $http.post("data/discussDetailReply.json",param).success(function (result) {
             // addReply(id,content,level,data);
              $scope.conf.data = result.data;
              // $scope.discussDetails = result;
              $scope.conf.totalItems = result.total;
          });
      }; 
      // var addReply = function(id,content,level,replyData){
      //   angular.forEach(replyData, function(data,index,array){
      //       console.log(data);
      //       console.log(index);
      //       console.log(array);
      //       if(level==1){
      //         angular.forEach(replyData.children,function(data1,index1,array1){
      //             if(data1.id == id){

      //             }
      //         })
      //       }
      //   })
      // } 
      $scope.cancel = function(){  
        $scope.show=false;  
      }  
    },  
    link: function (scope, elem, attrs,controller) {  
         scope.reply=function(id,level){
            elem.find(".publish-content").html("");
            var html =' <div class="piblish-content" ng-if="flag">'+
                   ' <textarea ng-model="content" class="form-control"></textarea>'+
                    '<div class="text-right">'+
                     ' <input type="button" class="btn btn-publish" ng-click="publish()" name="" value="发表">&nbsp;&nbsp;'+
                      '<input type="button"  class="btn btn-cancel" name="" value="取消">'+
                    '</div>'+
                 ' </div>';
            elem.find("#content"+level+id).html(html);
            elem.find(".btn-publish").on("click",function(){
              var content = elem.find("textarea").val();
              controller.publish(content,id,level,scope.conf.data);
            })
         }
      scope.$watch('show', function (oldVal, newVal) {  
        // if (oldVal) {  
        //   updateStars();  
        // }  
      });  
    
    }  
  };  

});

student.directive('compileHtml', function ($compile) {
  return {
    restrict: 'A',
    replace: true,
    link: function (scope, ele, attrs) {
      scope.$watch(function () {return scope.$eval(attrs.ngBindHtml);},
          function(html) {
            ele.html(html);
            $compile(ele.contents())(scope);
          });
    }
  };
});
