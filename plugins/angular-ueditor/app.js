 var ROUTE = angular.module('APP.route', ['ngRoute']);

 ROUTE.config(['$routeProvider', function($routeProvider) {
   $routeProvider
     .when('/', {
       templateUrl: 'views/index.html',
       controller: 'CTRL'
     })
     .when('/index2', {
       templateUrl: 'views/index2.html',
       controller: 'CTRL'
     })
     .otherwise({
       redirectTo: '/'
     });
 }]);


 var APP = angular.module('UeditorApp', ["ng.ueditor", 'APP.route']);

 APP.controller("CTRL", ["$scope", function($S) {
	var URL = window.UEDITOR_HOME_URL || getUEBasePath();
    console.log("UEL:"+URL);
   // $S._simpleConfig = {
	  //     //为编辑器实例添加一个路径，这个不能被注释
   //    UEDITOR_HOME_URL: URL ,

   //      // 服务器统一请求接口路径
   //   serverUrl: URL + "jsp/controller.jsp",
   //   //这里可以选择自己需要的工具按钮名称,此处仅选择如下五个
   //   toolbars: [
   //     ['FullScreen', 'Source', 'Undo', 'Redo', 'Bold', 'test']
   //   ],
   //   //focus时自动清空初始化时的内容
   //   autoClearinitialContent: true,
   //   //关闭字数统计
   //   wordCount: false,
   //   //关闭elementPath
   //   elementPathEnabled: false
   // };
   // $S.content1 = 'Hello Ueditor12121212';
   // $S.content2 = 'Hello Ueditor Content2';
   
 }]);
 
 function getUEBasePath(docUrl, confUrl) {

        return getBasePath(docUrl || self.document.URL || self.location.href, confUrl || getConfigFilePath());

    }

    function getConfigFilePath() {

        var configPath = document.getElementsByTagName('script');

        return configPath[ configPath.length - 1 ].src;

    }

    function getBasePath(docUrl, confUrl) {

        var basePath = confUrl;


        if (/^(\/|\\\\)/.test(confUrl)) {

            basePath = /^.+?\w(\/|\\\\)/.exec(docUrl)[0] + confUrl.replace(/^(\/|\\\\)/, '');

        } else if (!/^[a-z]+:/i.test(confUrl)) {

            docUrl = docUrl.split("#")[0].split("?")[0].replace(/[^\\\/]+$/, '');

            basePath = docUrl + "" + confUrl;

        }

        return optimizationPath(basePath);

    }

    function optimizationPath(path) {

        var protocol = /^[a-z]+:\/\//.exec(path)[ 0 ],
            tmp = null,
            res = [];

        path = path.replace(protocol, "").split("?")[0].split("#")[0];

        path = path.replace(/\\/g, '/').split(/\//);

        path[ path.length - 1 ] = "";

        while (path.length) {

            if (( tmp = path.shift() ) === "..") {
                res.pop();
            } else if (tmp !== ".") {
                res.push(tmp);
            }

        }

        return protocol + res.join("/");

    }
