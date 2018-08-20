/**
 * Created by yfyuan on 2016/8/26.
 */

student.service('ModalUtils', function ($uibModal, $filter) {

  // var translate = $filter('translate');

    this.alert = function (content, style, size, callback) {
        $uibModal.open({
            templateUrl: 'org/student/view/util/modal/alert.html',
            windowTemplateUrl: 'org/student/view/util/modal/window.html',
            backdrop: true,
            windowClass: style,
            size: size,
            controller: function ($scope, $uibModalInstance) {
                content ? $scope.content = content : $scope.content = "发生异常";
                $scope.ok = function () {
                    $uibModalInstance.close();
                    if (callback) {
                        callback();
                    }
                };
            }
        });
    };

    this.confirm = function (content, style, size, ok, close) {
        $uibModal.open({
            templateUrl: 'org/student/view/util/modal/confirm.html',
            windowTemplateUrl: 'org/student/view/util/modal/window.html',
            backdrop: true,
            windowClass: style,
            size: size,
            controller: function ($scope, $uibModalInstance) {
                content ? $scope.content = content : $scope.content = "错误";
                $scope.ok = function () {
                    $uibModalInstance.close();
                    if (ok) {
                        ok();
                    }
                };
                $scope.close = function () {
                    $uibModalInstance.close();
                    if (close) {
                        close();
                    }
                };
            }
        });
    };
    this.uploadFile = function (content, num,style, size) {
        $uibModal.open({
            templateUrl: 'org/student/view/util/modal/uploadTip.html',
            windowTemplateUrl: 'org/student/view/util/modal/window.html',
            backdrop: false,
            windowClass: style,
            size: size,
            controller: function ($scope, $uibModalInstance) {
                content ? $scope.content = content : $scope.content = "错误";
                if(num==100){
                    $uibModalInstance.close();
                }
                // $scope.ok = function () {
                //     $uibModalInstance.close();
                //     if (ok) {
                //         ok();
                //     }
                // };
                // $scope.close = function () {
                //     $uibModalInstance.close();
                //     if (close) {
                //         close();
                //     }
                // };
            }
        });
    };
});