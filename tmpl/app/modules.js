/*
    author:xinglie.lkf@taobao.com
 */
var Magix = require('magix');
module.exports = Magix.View.extend({
    tmpl: '@modules.html',
    render: function() {
        var me = this;
        me.setHTML(me.id, me.tmpl);
    }
});