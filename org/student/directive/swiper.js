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
        
        '<li ng-repeat="item in sides track by $index" ng-class="{active: item == conf.currentPage, separate: item == \'...\'}" ' +
        'ng-click="changeCurrentPage(item)">' +
        '<a>{{ item.name }}</a>' +
        '</li>' +
       
        '</ul>' +
         '<div class="last" ng-class="{disabled: conf.currentPage == conf.numberOfPages}" ng-click="nextPage()"><a>></a></li>' +
       
        // '</div>' +
        // '<div class="no-items">数据加载中</div>' +
        '</div>',
        replace: true,
        scope: {
            conf: '='//双向绑定数据
        },
        link: function(scope, element, attrs){
            scope.sides=[{
                "id":"1",
                "name":"第一章"
            },
            {
                "id":"2",
                "name":"第二章"
            },
            {
                "id":"3",
                "name":"第三章"
            },
            {
                "id":"4",
                "name":"第四章"
            } ,{
                "id":"2",
                "name":"第二章"
            },
            {
                "id":"3",
                "name":"第三章"
            },
            {
                "id":"4",
                "name":"第四章"
            }, {
                "id":"2",
                "name":"第二章"
            },
            {
                "id":"3",
                "name":"第三章"
            },
            {
                "id":"4",
                "name":"第四章"
            }
            ];
            var length = scope.sides.length;
            var w = $(".content-wrapper").width();
            scope.width = w-60;

            scope.nextPage=function(){
                
            }
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