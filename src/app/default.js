define("app/default",['magix','data','zepto'],function(require){
/*Magix ,Data ,Zepto */
/*
    author:xinglie.lkf@taobao.com
 */
var Magix = require('magix');
var Data = require('data');
var Zepto = require('zepto');
return Magix.View.extend({
    tmpl: "<div id=\"sidebar\">\n    Magix<span style=\"font-size:10px\">(3.x)</span>\n    <ul class=\"toc_section\">\n        <li><a href=\"#!/index\" mx-click=\"to({to:'download'})\">项目地址</a></li>\n        <li><a href=\"#!/index\" mx-click=\"to({to:'modules'})\">定制Magix</a></li>\n        <li><a href=\"https://github.com/thx/magix-project\" target=\"_blank\">示例项目</a></li>\n        <li><a href=\"https://github.com/thx/magix-combine\" target=\"_blank\">编译工具</a></li>\n        <li><a href=\"#!/index\" mx-click=\"to({to:'vom'})\">调试插件</a></li>\n        <li><a href=\"#!/index\" mx-click=\"to({to:'explain'})\">文档说明</a></li>\n    </ul>\n    <hr>\n    <%for(var i=0;i<list.length;i++){%>\n    <%var o=list[i]%>\n    <div mx-vframe=\"true\" mx-view=\"app/menu?name=<%=o.name%>\"></div>\n    <%}%>\n</div>\n<div class=\"container\" id=\"container\">\n    <div mx-vframe=\"true\" mx-view=\"app/modules\"></div>\n    <%for(var i=0;i<list.length;i++){%>\n    <%var o=list[i]%>\n    <div mx-vframe=\"true\" mx-view=\"app/class?name=<%=o.name%>\"></div>\n    <%}%>\n</div>",
    adjust: function() {
        var width = Zepto(window).width();
        if (width < 1020) {
            Zepto('#sidebar').hide();
            Zepto('#container').css('margin-left', 0);
        } else {
            Zepto('#sidebar').show();
            Zepto('#container').css('margin-left', 260);
        }
    },
    render: function() {
        var me = this;
        console.log(me);
        var list = [];
        var keys = ['Magix', 'Cache', 'Event', 'Vframe', 'View', 'Base', 'Router', 'Service', 'Bag'];
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            if (Data[key]) list.push(Data[key]);
        }
        me.setHTML(me.id, me.toHTML(me.tmpl, {
            list: list,
            cssNames: me.cssNames
        }));
        me.adjust();
    },
    'to<click>': function(e) {
        var node = Zepto('#' + e.params.to);
        e.preventDefault();
        if (node) {
            Zepto(window).scrollTop(node.offset().top - 50);
        }
    },
    '$win<resize>': function() {
        this.adjust();
    }
});
});