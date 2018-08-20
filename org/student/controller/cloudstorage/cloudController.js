student.controller('CloudController', function ($rootScope,$scope,$compile,$stateParams,ModalUtils,Upload, $location, $http, $q, $filter, $uibModal) {
  $(".collapse").removeClass("in");
  $rootScope.active="cloud";
  var h = $(window).height()-140;
  $scope.height = h;
  var w = $(".content-wrapper").width();
  if( w > 1000){
     $scope.showInfoFlag = true;//是否显示列表中的字段
  }else if(w>414 && w <= 768){
     $scope.showInfoFlag = false;
  }else if(w<=414 && w >= 375){
      $scope.showInfoFlag = false;
  }else{
      $scope.showInfoFlag = false;
  }

  //all:全部文件 document:文档 media:多媒体 img:图片 zip 压缩文件 other 其他  myshare :我的分享 othershare：他人的分享 
  $scope.documentType = "all";

  $scope.checkArr=[];//选中数组
  $scope.operateBtnFlag = false;//复制，删除，移除按钮
  $scope.myshareOperate = false;//取消分享按钮显示控制
  $scope.parentFileId = 0; //父目录 Id ；根节点
  $scope.parentFileText = "全部文件";

  $scope.cloudConf = {
                currentPage: 1,
                itemsPerPage: 10,
                pagesLength: 9,
                search: false,
                onChange: function() {
                 // url = "data/cloud.json";
                    var param = {
                        "pageNo": this.currentPage,
                        "pageSize": this.itemsPerPage,
                        "type":$scope.documentType,
                        "pId":$scope.parentFileId
                    };
                    $http.post("data/cloud.json",param).success(function (result) {
                        $scope.clouds = result.data;
                        $scope.pId = result.pId;
                        $scope.cloudConf.totalItems = result.total;
                    });
                }
            };
   
/**获取分享人**/
$http.get("data/users.json").success(function (result) {
    $scope.users = result.data;
});
/**获取复制目录**/
$http.get("data/copyData.json").success(function (result) {
    $scope.copyFileData = result.data;
});
/**获取移动目录**/
$http.get("data/copyData.json").success(function (result) {
    $scope.moveFileData = result.data;
});
/**加载文件
id:目录Id type:文档类型  
id=0，type=all加载所有的文件
id=0 type=document 加载所有文档
**/

$scope.loadData=function(id,type){
  angular.element('.location').html("");
  $scope.titleArr=[];
  $scope.operateBtnFlag = false;
  $scope.recycleOperate = false;
  $scope.myshareOperate = false;
  $scope.fileId=0;
  if(type=="recycle"){
    $scope.recycleFlag = true;
    $scope.storageFlag = false;
    $scope.myshareFlag = false;
    $scope.othershareFlag = false;
  }else if(type=="myshare"){
    $scope.recycleFlag = false;
    $scope.storageFlag = false;
    $scope.myshareFlag = true;
    $scope.othershareFlag = false;
  }else if(type=="othershare"){
    $scope.recycleFlag = false;
    $scope.storageFlag = false;
    $scope.myshareFlag = false;
    $scope.othershareFlag = true;
  }else{
    $scope.recycleFlag = false;
    $scope.storageFlag = true;
    $scope.myshareFlag = false;
    $scope.othershareFlag = false;
  }
  $scope.documentType = type;
  $scope.parentFileId =id;
  $scope.cloudConf.onChange();
}
$scope.refresh = function(){
  $scope.loadData($scope.parentFileId,$scope.documentType);
}
// $scope.loadData2=function(id,type){
//   $scope.documentType = type;
//   $scope.parentFileId =id;
//   $scope.cloudConf.onChange("data/cloud1.json");
// }
// $scope.loadData3=function(id,type){
//   $scope.documentType = type;
//   $scope.parentFileId =id;
//   $scope.cloudConf.onChange("data/cloud2.json");
// }
var showSecondTitle=function(){
  var arr = [];
  angular.forEach($scope.titleArr,function(data,index,arr){
      arr.push("<a ng-click='loadChildNode("+data.id+","+data.text+")'>"+data.text+"</a> ");
      arr.push("<i class='icon-arrow-right'></i>");
  })
  var html =arr.join("");
    var ele = $compile(html)($scope);
    angular.element('.location').html(ele);
}
$scope.loadData($scope.parentFileId ,$scope.documentType);
/*******加载目录下的子文件************/


$scope.loadChildNode=function(id,title){
  $scope.titleArr =[{"pId":0,"id":0,"text":"全部文件"}];
  $scope.loadData(id,$scope.documentType);
  var length = $scope.titleArr.length;
  angular.forEach($scope.titleArr,function(data,index,arr){
      if(id == data.id && $scope.pId!=0){
         var l =length-index;
          $scope.titleArr.splice(index,l);
      }
      // else if($scope.pId == data.pId){
      //   var l =length-index;
      //     $scope.titleArr.splice(index,l);
      // }
  });
 $scope.titleArr.push({"pId":$scope.pId,"id":id,"text":title});
   var html="";
   var len = $scope.titleArr.length;
    angular.forEach($scope.titleArr,function(data,index,arr){
        html+="<a ng-click='loadChildNode("+data.id+",&quot;"+data.text+"&quot;)'>"+data.text+"</a>";
        if(index<len-1){
          html+="<i class='icon-arrow-right'></i>";
        }
        
    })
    // console.log(html);
    var ele = $compile(html)($scope);
    angular.element('.location').html(ele);

}

$scope.selectAll=function(){
  var check = $scope.all;
  if(check){
    $(".check-box").addClass("item-active");
    $scope.operateBtnFlag = true;
  }else{
    $(".check-box").removeClass("item-active");
    $scope.operateBtnFlag = false;
  }
}
$scope.select=function(id){
  var check = $scope.checks[id];
  var index = $scope.checkArr.indexOf(id);

  if(check){
    $(".item-check"+id).addClass("item-active");
    if( index <0){
      $scope.checkArr.push(id);
    }
  }else{    
    if(index >= 0){
      $scope.checkArr.splice(index,1);
    }
    $(".item-check"+id).removeClass("item-active");
  }
  var len = $scope.checkArr.length;
  if(len ==0){
    $scope.operateBtnFlag = false;
    $scope.recycleOperate = false;
    $scope.myshareOperate = false;
  }else{
    $scope.operateBtnFlag = true;
    if($scope.documentType == "recycle"){
      $scope.recycleOperate = true;
    }
    if($scope.documentType == "myshare"){
      $scope.myshareOperate = true;
    }
  }      
}

// $scope.parent = $scope;
$scope.newFile = function(){
  var parent = $scope;
  $uibModal.open({
            templateUrl: 'org/student/view/cloudstorage/cloud-new.html',
            windowTemplateUrl: 'org/student/view/util/modal/window.html',
            backdrop: true,
            size: 'xs',
            controller: function ($scope, $uibModalInstance,$http) {
                $scope.alerts=[];
                
                $scope.close = function () {
                    $uibModalInstance.close();
                };
               
                $scope.ok = function () {
                 if(!$scope.fileName){
        
                    $scope.alerts.push({msg:"输入文件名",type:'danger'});
                    return;
                 }
                 $http.post("data/teacher.json",{id:parent.parentFileId,fileName:$scope.fileName}).success(function(res){
                 
                    $uibModalInstance.close();
                    parent.loadData(parent.parentFileId ,parent.documentType);
                 })
                };
         
            }
    });
}
//分享
$scope.fileId=0;
$scope.share = function(id){
  var parent = $scope;
  $scope.fileId=id;
  $uibModal.open({
            templateUrl: 'org/student/view/cloudstorage/cloud-share-users.html',
            windowTemplateUrl: 'org/student/view/util/modal/window.html',
            backdrop: true,
            size: 'xs',
            controller: function ($scope, $uibModalInstance,$http,$log) {
              $scope.alerts=[];
                var newId = 1;
                $scope.newNode = {};
                $scope.originalData = angular.fromJson(parent.users);
                $scope.treeData = [];
                angular.copy($scope.originalData,$scope.treeData);
                $scope.treeConfig = {
                    core : {
                        multiple : true,
                        animation: true,
                        error : function(error) {
                            $log.error('treeCtrl: error from js tree - ' + angular.toJson(error));
                        },
                        check_callback : true,
                        worker : true
                    },
                    types : {
                        default : {
                            icon : false
                        }
                    },
                    version : 1,
                    plugins : ['types','checkbox']
                };
                $scope.reCreateTree = function() {
                    $scope.ignoreChanges = true;
                    angular.copy($scope.originalData,$scope.treeData);
                    $scope.treeConfig.version++;
                };
                $scope.simulateAsyncData = function() {
                    vm.promise = $timeout(function(){
                        $scope.treeData.push({ id : (newId++).toString(), parent : $scope.treeData[0].id, text : 'Async Loaded' })
                    },3000);
                };
                $scope.addNewNode = function() {
                    $scope.treeData.push({ id : (newId++).toString(), parent : $scope.newNode.parent, text : $scope.newNode.text });
                };
                $scope.setNodeType = function() {
                    var item = _.findWhere(this.treeData, { id : this.selectedNode } );
                    item.type = $scope.newType;
                    toaster.pop('success', 'Node Type Changed', 'Changed the type of node ' + this.selectedNode);
                };
                $scope.readyCB = function() {
                    $timeout(function() {
                        $scope.ignoreChanges = false;
                        toaster.pop('success', 'JS Tree Ready', 'Js Tree issued the ready event')
                    });
                };
                $scope.createCB  = function(e,item) {
                    $timeout(function() {toaster.pop('success', 'Node Added', 'Added new node with the text ' + item.node.text)});
                };
                $scope.applyModelChanges = function() {
                    return !$scope.ignoreChanges;
                };
                 $scope.close = function () {
                   $uibModalInstance.close();
                };
                 $scope.ok = function () {
                  $scope.checkArray = $scope.treeInstance.jstree(true).get_selected();
                  console.log($scope.checkArray);
                  if($scope.checkArray.length == 0){
                    $scope.alerts.push({msg:"选择分享人",type:'danger'});
                    return false;
                  }
                  if(id){
                    var files = id; 
                  }else{
                    var files = parent.checkArr;
                  }
                  $http.post("data/cloud.json",{users:$scope.checkArray,files:files}).success(function(res){
                 
                    $uibModalInstance.close();
                     ModalUtils.alert("分享成功", "modal-success", "sm");
                   //  $(".cloud-table-box tr").removeClass("active");
                 })
                 // $uibModalInstance.close();
                 }
         
            }
    });
}
$scope.delete =function(id){
  var parent = $scope;
  $scope.fileId=id;
  if(id){
    var files = id;
  }else{
    var files = parent.checkArr;
  }
  ModalUtils.confirm("确定要删除吗？", "modal-warning", "xl", function () {
            $http.post("data/cloud.json", {files: files}).success(function (serviceStatus) {
                if (serviceStatus.status == '1') {
                    ModalUtils.alert("删除成功", "modal-success", "sm");
                }else {
                    ModalUtils.alert("删除失败", "modal-warning", "sm");
                }
            });
        });
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
// 复制
$scope.copy = function(id){
  var parent = $scope;
  $scope.fileId=id;
  $uibModal.open({
            templateUrl: 'org/student/view/cloudstorage/cloud-file-tree.html',
            windowTemplateUrl: 'org/student/view/util/modal/window.html',
            backdrop: true,
            size: 'xs',
            controller: function ($scope, $uibModalInstance,$http,$log) {
              $scope.alerts=[];
                var newId = 1;
                $scope.newNode = {};
                $scope.originalData = angular.fromJson(parent.copyFileData);
                $scope.treeData = [];
                angular.copy($scope.originalData,$scope.treeData);
                $scope.treeConfig = {
                    core : {
                        multiple : false,
                        animation: true,
                        error : function(error) {
                            $log.error('treeCtrl: error from js tree - ' + angular.toJson(error));
                        },
                        check_callback : true,
                        worker : true
                    },
                    types : {
                        default : {
                            icon : true
                        }
                    },
                    version : 1,
                    plugins : ['types','radio']
                };
                $scope.reCreateTree = function() {
                    $scope.ignoreChanges = true;
                    angular.copy($scope.originalData,$scope.treeData);
                    $scope.treeConfig.version++;
                };
                $scope.readyCB = function() {
                    $timeout(function() {
                        $scope.ignoreChanges = false;
                        toaster.pop('success', 'JS Tree Ready', 'Js Tree issued the ready event')
                    });
                };
                $scope.createCB  = function(e,item) {
                    $timeout(function() {toaster.pop('success', 'Node Added', 'Added new node with the text ' + item.node.text)});
                };
                $scope.applyModelChanges = function() {
                    return !$scope.ignoreChanges;
                };
                 $scope.close = function () {
                   $uibModalInstance.close();
                };
                 $scope.ok = function () {
                  $scope.checkArray = $scope.treeInstance.jstree(true).get_selected();
                  console.log($scope.checkArray);
                  if($scope.checkArray.length == 0){
                    $scope.alerts.push({msg:"选择复制到的目录",type:'danger'});
                    return false;
                  }
                  if(id){
                    var files = id; 
                  }else{
                    var files = parent.checkArr;
                  }
                  $http.post("data/cloud.json",{files:files}).success(function(res){
                 
                    $uibModalInstance.close();
                     ModalUtils.alert("复制成功", "modal-success", "sm");
                   //  $(".cloud-table-box tr").removeClass("active");
                 })
                 // $uibModalInstance.close();
                 }
         
            }
    });
};
//移动
$scope.move = function(id){
  var parent = $scope;
  $scope.fileId=id;
  $uibModal.open({
            templateUrl: 'org/student/view/cloudstorage/cloud-file-tree.html',
            windowTemplateUrl: 'org/student/view/util/modal/window.html',
            backdrop: true,
            size: 'xs',
            controller: function ($scope, $uibModalInstance,$http,$log) {
              $scope.alerts=[];
                var newId = 1;
                $scope.newNode = {};
                $scope.originalData = angular.fromJson(parent.moveFileData);
                $scope.treeData = [];
                angular.copy($scope.originalData,$scope.treeData);
                $scope.treeConfig = {
                    core : {
                        multiple : false,
                        animation: true,
                        error : function(error) {
                            $log.error('treeCtrl: error from js tree - ' + angular.toJson(error));
                        },
                        check_callback : true,
                        worker : true
                    },
                    types : {
                        default : {
                            icon : true
                        }
                    },
                    version : 1,
                    plugins : ['types','radio']
                };
                $scope.reCreateTree = function() {
                    $scope.ignoreChanges = true;
                    angular.copy($scope.originalData,$scope.treeData);
                    $scope.treeConfig.version++;
                };
                $scope.readyCB = function() {
                    $timeout(function() {
                        $scope.ignoreChanges = false;
                        toaster.pop('success', 'JS Tree Ready', 'Js Tree issued the ready event')
                    });
                };
                $scope.createCB  = function(e,item) {
                    $timeout(function() {toaster.pop('success', 'Node Added', 'Added new node with the text ' + item.node.text)});
                };
                $scope.applyModelChanges = function() {
                    return !$scope.ignoreChanges;
                };
                 $scope.close = function () {
                   $uibModalInstance.close();
                };
                 $scope.ok = function () {
                  $scope.checkArray = $scope.treeInstance.jstree(true).get_selected();
                  if($scope.checkArray.length == 0){
                    $scope.alerts.push({msg:"选择移动到的目录",type:'danger'});
                    return false;
                  }
                  if(id){
                    var files = id; 
                  }else{
                    var files = parent.checkArr;
                  }
                  $http.post("data/cloud.json",{files:files}).success(function(res){
                 
                    $uibModalInstance.close();
                     ModalUtils.alert("移动成功", "modal-success", "sm");
                   //  $(".cloud-table-box tr").removeClass("active");
                 })
                 // $uibModalInstance.close();
                 }
         
            }
    });
}
 })
student.filter('to_trusted', ['$sce', function ($sce) {
    return function (text) {
        return $sce.trustAsHtml(text);
    };
}]);
 