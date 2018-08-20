
/**
Created by Dio on 17-9.
http://inhu.net
 */

(function() {
  "use strict";
  (function() {
    var NGUeditor;
    NGUeditor = angular.module("ng.ueditor", []);
    NGUeditor.directive("ueditor", [
      function() {
        return {
          restrict: "C",
          require: "ngModel",
          scope: {
            config: "=",
            ready: "="
          },
          link: function($S, element, attr, ctrl) {
            var _NGUeditor, _updateByRender;
            _updateByRender = false;
            _NGUeditor = (function() {
              function _NGUeditor() {
                this.bindRender();
                this.initEditor();
                return;
              }


              /**
               * 初始化编辑器
               * @return {[type]} [description]
               */

              _NGUeditor.prototype.initEditor = function() {
                var _UEConfig, _editorId, _self;
                _self = this;
                if (typeof UE === 'undefined') {
                  console.error("Please import the local resources of ueditor!");
                  return;
                }
                _UEConfig = $S.config ? $S.config : {};
                _editorId = attr.id ? attr.id : "_editor" + (Date.now());

                element[0].id = _editorId;
                this.editor = new UE.ui.Editor(_UEConfig);
                this.editor.render(_editorId);
                var ue =this.editor ;
                UE.registerUI('kityformula', function(editor, uiname){
                // 创建dialog
                  var kfDialog = new UE.ui.Dialog({
                          // 指定弹出层路径
                          iframeUrl: editor.options.UEDITOR_HOME_URL + 'equation-editor-master/EquationEditor.html',
                          // 编辑器实例
                          editor: editor,
                          // dialog 名称
                          name: uiname,
                          // dialog 标题
                          title: '插入公式',

                          // dialog 外围 css
                          cssRules: 'width:783px; height: 386px;',

                          //如果给出了buttons就代表dialog有确定和取消
                          buttons:[
                              {
                                  className:'edui-okbutton',
                                  label:'确定',
                                  onclick:function () {
                                      kfDialog.close(true);
                                  }
                              },
                              {
                                  className:'edui-cancelbutton',
                                  label:'取消',
                                  onclick:function () {
                                      kfDialog.close(false);
                                  }
                              }
                    ]});
                    editor.ready(function(){
                        UE.utils.cssRule('kfformula', 'img.kfformula{vertical-align: middle;}', editor.document);
                    });
                      var iconUrl = editor.options.UEDITOR_HOME_URL + 'equation-editor-master/kf-icon.png';
                      var tmpLink = document.createElement('a');
                      tmpLink.href = iconUrl;
                      tmpLink.href = tmpLink.href;
                      iconUrl = tmpLink.href;

                      var kfBtn = new UE.ui.Button({
                          name:'插入' + uiname,
                          title:'插入公式-' + uiname,
                          //需要添加的额外样式，指定icon图标
                          cssRules :'background: url("' + iconUrl + '") !important',
                          onclick:function () {
                  
                              ue.focus();
                              var focusNode = ue.selection.getStart();
                              if(kfDialog.iframeUrl.indexOf("?")>-1){
                                  var urls = kfDialog.iframeUrl.split("?");
                                  kfDialog.iframeUrl = urls[0]+"?id="+focusNode.id;
                              }else{
                                  kfDialog.iframeUrl = kfDialog.iframeUrl+"?id="+focusNode.id;
                              }
                              
                              //渲染dialog
                              kfDialog.render();
                              kfDialog.open();
                          }
                      });

                      //当点到编辑内容上时，按钮要做的状态反射
                      editor.addListener('selectionchange', function () {
                          var state = editor.queryCommandState(uiname);
                          if (state == -1) {
                              kfBtn.setDisabled(true);
                              kfBtn.setChecked(false);
                          } else {
                              kfBtn.setDisabled(false);
                              kfBtn.setChecked(state);
                          }
                      });

                      return kfBtn;


                  });
                
                return this.editor.ready(function() {
                  _self.editorReady = true;
                  _self.editor.addListener("contentChange", function() {
                    ctrl.$setViewValue(_self.editor.getContent());
                    if (!_updateByRender) {
                      if (!$S.$$phase) {
                        $S.$apply();
                      }
                    }
                    _updateByRender = false;
                  });
                  if (_self.modelContent && _self.modelContent.length > 0) {
                    _self.setEditorContent();
                  }
                  if (typeof $S.ready === "function") {
                    $S.ready(_self.editor);
                  }
                  $S.$on("$destroy", function() {
                    if (!attr.id && UE.delEditor) {
                      UE.delEditor(_editorId);
                    }
                  });
                });
                // console.log(attr.id);
                // $("#"+attr.id).addClass("data-ueditor-zxjy");
              };

              _NGUeditor.prototype.setEditorContent = function(content) {
                if (content == null) {
                  content = this.modelContent;
                }
                if (this.editor && this.editorReady) {
                  this.editor.setContent(content);
                }
              };

              _NGUeditor.prototype.bindRender = function() {
                var _self;
                _self = this;
                ctrl.$render = function() {
                  _self.modelContent = (ctrl.$isEmpty(ctrl.$viewValue) ? "" : ctrl.$viewValue);
                  _updateByRender = true;
                  _self.setEditorContent();
                };
              };

              return _NGUeditor;

            })();
            new _NGUeditor();
          }
        };
      }
    ]);
  })();

}).call(this);

//# sourceMappingURL=angular-ueditor.js.map
