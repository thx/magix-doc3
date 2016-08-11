/*
    author:xinglie.lkf@taobao.com
 */
var Magix = require('magix');
var Data = require('data');
var Zepto = require('zepto');
module.exports = Magix.View.extend({
    tmpl: '@default.html',
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