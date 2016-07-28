/*
    author:xinglie.lkf@taobao.com
 */
var Magix = require('magix');
var Data = require('data');
var Zepto = require('zepto');
module.exports = Magix.View.extend({
    tmpl: '@default.html',
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