define("app/menu",['magix','data','zepto'],function(require){
/*Magix ,Data ,Zepto */
/*
    author:xinglie.lkf@taobao.com
 */
var Magix = require('magix');
var Data = require('data');
var Zepto = require('zepto');
return Magix.View.extend({
    tmpl: "<a href=\"#!/index\" mx-click=\"to({to:'<%=data.id%>'})\" class=\"toc_title\">\n  <%=data.name%>\n<%if(data.isOptional){%><sup title=\"可选模块\" class=\"xmark\">x</sup><%}%>\n</a>\n<ul class=\"toc_section\">\n    <%if(data.properties){%>\n    <%for(var i=0;i<data.properties.length;i++){%>\n    <%var one=data.properties[i]%>\n    <li>&ndash; <a href=\"#!/index\" mx-click=\"to({to:'<%=one.id%>'})\"><%=one.name%></a><sup title=\"属性\" class=\"xmark\">p</sup></li>\n    <%}%>\n    <%}%>\n\n\n    <%if(data.methods){%>\n    <%for(var i=0;i<data.methods.length;i++){%>\n    <%var one=data.methods[i]%>\n    <li>&ndash; <a href=\"#!/index\" mx-click=\"to({to:'<%=one.id%>'})\"><%=one.name%></a><%if(one.memberOf!=data.name||(data.inheritsMap&&data.inheritsMap[one.alias])){%><sup class=\"xmark\" title=\"继承来的\">i</sup><%}%><%if(one.isStatic&&data.isClass){%><sup title=\"静态方法\" class=\"xmark\">s</sup><%}%><%if(one.isOptional){%><sup title=\"可选模块\" class=\"xmark\">x</sup><%}%></li>\n    <%}%>\n    <%}%>\n\n\n    <%if(data.events){%>\n    <%for(var i=0;i<data.events.length;i++){%>\n    <%var one=data.events[i]%>\n    <li>&ndash; <a href=\"#!/index\" mx-click=\"to({to:'<%=one.id%>'})\"><%=one.name%></a><sup title=\"事件\" class=\"xmark\">e</sup><%if(one.memberOf!=data.name){%><sup title=\"继承来的\" class=\"xmark\">i</sup><%}%><%if(one.isStatic&&data.isClass){%><sup title=\"对象事件\" class=\"xmark\">s</sup><%}%></li>\n    <%}%>\n    <%}%>\n</ul>",
    ctor: function(extra) {
        this.$name = extra.name;
    },
    render: function() {
        var me = this;
        var data = Data[me.$name];
        var html = me.toHTML(me.tmpl, {
            data: data
        });
        me.setHTML(me.id, html);
    },
    'to<click>': function(e) {
        var node = Zepto('#' + e.params.to);
        e.preventDefault();
        if (node) {
            Zepto(window).scrollTop(node.offset().top - 50);
            console.log(node,node.parent());
            var cnt = node.parents('.list');
            cnt.addClass('twinkling');
            console.log(cnt,cnt.hasClass('twinkling'));
            setTimeout(function() {
                cnt.removeClass('twinkling');
            }, 1200);
        }
    }
});
});