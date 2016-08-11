define('app/default',['magix','data','zepto'],function(require,exports,module){
/*Magix ,Data ,Zepto */
/*
    author:xinglie.lkf@taobao.com
 */
var Magix = require('magix');
var Data = require('data');
var Zepto = require('zepto');
module.exports = Magix.View.extend({
    tmpl: "<div id=\"sidebar\">Magix<span style=\"font-size:10px\">(3.x)</span><ul class=\"toc_section\"><li><a href=\"#!/index\" mx-click=\"to({to:'download'})\">项目地址</a></li><li><a href=\"#!/index\" mx-click=\"to({to:'modules'})\">定制Magix</a></li><li><a href=\"https://github.com/thx/magix-project\" target=\"_blank\">示例项目</a></li><li><a href=\"https://github.com/thx/magix-combine\" target=\"_blank\">编译工具</a></li><li><a href=\"#!/index\" mx-click=\"to({to:'vom'})\">调试插件</a></li><li><a href=\"#!/index\" mx-click=\"to({to:'explain'})\">文档说明</a></li></ul><hr/> <%for(var i=0;i<list.length;i++){%> <%var o=list[i]%> <div mx-vframe=\"true\" mx-view=\"app/menu?name=<%=o.name%>\"></div> <%}%> </div><div class=\"container\" id=\"container\"><div mx-vframe=\"true\" mx-view=\"app/modules\"></div> <%for(var i=0;i<list.length;i++){%> <%var o=list[i]%> <div mx-vframe=\"true\" mx-view=\"app/class?name=<%=o.name%>\"></div> <%}%> </div>",
    init: function() {
        var me = this;
        var win = Zepto(window);
        win.on('resize', function() {
            me.adjust();
        });
        me.owner.on('created', function() {
            me.owner.off('created');
            var loc = Magix.parseUrl(location.href);
            var to = loc.params.to;
            if (to) {
                var id = me.search(to);
                if (id) {
                    setTimeout(function() {
                        me.highlight(id);
                    }, 500);
                }
            }
        });
    },
    search: function(name) {
        for (var p in Data) {
            var methods = Data[p].methods;
            if (methods) {
                for (var i = 0; i < methods.length; i++) {
                    var m = methods[i];
                    if (m.name == name) {
                        return m.id;
                    }
                }
            }
        }
    },
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
        var list = [];
        var keys = ['Magix', 'Cache', 'Event', 'Vframe', 'Tmpl', 'Updater', 'View', 'Base', 'Router', 'Service', 'Bag'];
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
    highlight: function(id) {
        var node = Zepto('#' + id);
        if (node) {
            Zepto(window).scrollTop(node.offset().top - 50);
            console.log(node, node.parent());
            var cnt = node.parents('.list');
            cnt.addClass('twinkling');
            console.log(cnt, cnt.hasClass('twinkling'));
            setTimeout(function() {
                cnt.removeClass('twinkling');
            }, 1200);
        }
    }
});
});