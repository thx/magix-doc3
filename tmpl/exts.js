/*
    author:xinglie.lkf@taobao.com
 */
var Magix = require('magix');
var TmplCache = new Magix.Cache();
var Zepto = require('zepto');
var VP = Magix.View.prototype;
VP.toHTML = function(tmpl, data) {
    var fn = TmplCache.get(tmpl);
    if (!fn) {
        fn = Zepto.tmpl(tmpl);
        TmplCache.set(tmpl, fn);
    }
    return fn(data);
};