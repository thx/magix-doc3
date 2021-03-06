define('app/modules',['magix'],function(require,exports,module){
/*Magix */
/*
    author:xinglie.lkf@taobao.com
 */
var Magix = require('magix');
module.exports = Magix.View.extend({
    tmpl: "<div class=\"content\"><div class=\"clearfix\"><h2 id=\"download\">项目地址</h2></div><div class=\"list\"><a href=\"https://github.com/thx/magix\">https://github.com/thx/magix</a></div></div><div class=\"content\"><div class=\"clearfix\"><h2 id=\"explain\">文档说明</h2></div><div class=\"list\">名称后带 p 标识的，如 pId<sup class=\"xmark\">p</sup>，则表示 pId 是一个属性<br/>名称后带 x 标识的，如 each<sup class=\"xmark\">x</sup>，则表示 each 是可选的，在详细说明里会告诉该可选项在有哪些模块时才存在<br/>名称后带 s 标识的，如 root<sup class=\"xmark\">s</sup>，则表示 root 是一个静态方法，该标识只在宿主对象是函数时才会出现<br/>名称后带 i 标识的，如 off<sup class=\"xmark\">i</sup>，则表示 off 是继承来的<br/>名称后带 e 标识的，如 add<sup class=\"xmark\">e</sup>，则表示 add 是一个事件<br/><br/>以上标识可能会叠加存在某一个上，如 fire<sup class=\"xmark\">i</sup><sup class=\"xmark\">s</sup>是一个继承来的静态方法<br/><br/>名称后带具体名称的，如 keys<sup class=\"xmark\" title=\"可选的模块\">linkage|router</sup> 则当 linkage 或 router 模块启用时，该属性或方法才存在</div></div>",
    render: function() {
        var me = this;
        me.setHTML(me.id, me.tmpl);
    }
});
});