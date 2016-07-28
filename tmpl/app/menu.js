/*
    author:xinglie.lkf@taobao.com
 */
var Magix = require('magix');
var Data = require('data');
var Zepto = require('zepto');
module.exports = Magix.View.extend({
    tmpl: '@menu.html',
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