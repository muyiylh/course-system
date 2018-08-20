<!-- 配置文件 -->
<script type="text/javascript" src="/teacher/static/js/ueditor-jh/ueditor.config.js"></script>
<!-- 编辑器源码文件 -->
<script type="text/javascript" src="/teacher/static/js/ueditor-jh/ueditor.all.js"></script>
<script type="text/javascript" charset="utf-8" src="/teacher/static/js/ueditor-jh/equation-editor-master/addKityFormulaDialog.js"></script>
<script type="text/javascript" charset="utf-8" src="/teacher/static/js/ueditor-jh/equation-editor-master/getKfContent.js"></script>
<script type="text/javascript" charset="utf-8" src="/teacher/static/js/ueditor-jh/equation-editor-master/defaultFilterFix.js"></script>
<!-- 实例化编辑器 -->
<script type="text/javascript">
	var ue = UE.getEditor('container', {
      	toolbars: [[
          'fullscreen', 'source', '|',
          'bold', 'italic', 'underline', '|', 'fontsize', '|', 'kityformula', 'preview'
      	]]
  	});
</script>
