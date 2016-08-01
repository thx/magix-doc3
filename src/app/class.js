define('app/class',['magix','data','zepto'],function(require,exports,module){
/*Magix ,Data ,Zepto */
/*
    author:xinglie.lkf@taobao.com
 */
var Magix = require('magix');
var Data = require('data');
var Zepto = require('zepto');
var FindParent = function(name, map, inner) {
    var a = [];
    if (!inner) {
        a.push({
            name: name
        });
    }
    var info = map[name];
    if (info) {
        var temp = info.inherits && info.inherits[0];
        if (temp) {
            temp = temp.alias.split('.')[0];
            a.push({
                type: 'mix',
                name: temp
            });
            temp = FindParent(temp, map, true);
            if (temp.length) {
                a = a.concat(temp);
            }
        } else {
            temp = info.inheritsFrom && info.inheritsFrom[0];
            if (temp) {
                a.push({
                    name: temp
                });
                temp = FindParent(temp, map, true);
                if (temp.length) {
                    a = a.concat(temp);
                }
            }
        }
    }
    return a;
};
module.exports = Magix.View.extend({
    tmpl: "<div class=\"content\"><div class=\"clearfix\"><h2 id=\"<%=entity.id%>\"> <%if(entity.isClass){%> <a href=\"#!/index\" mx-click=\"toggleMoreInfos()\"><i class=\"tree plus\"></i> <%}%> <%=entity.name%> <%if(entity.isClass){%> </a>(<%=getParams(entity.params)%>) <%}%> <%if(entity.needModule){%><sup class=\"mark\" title=\"需要编译模块\"><%=entity.needModule%></sup><%}%> <small style=\"margin-left:10px\"><%=entity.desc%></small></h2> <%=getInherits(entity.name)%> </div> <%if(entity.properties&&entity.properties.length){%> <h3>属性</h3> <%for(var i=0;i<entity.properties.length;i++){%> <%var val=entity.properties[i]%> <div class=\"list\"><i class=\"tree plus\" style=\"background:none\"></i> <span class=\"item\" id=\"<%=val.id%>\"><%=val.name%></span><small style=\"margin-left:10px\">&#123;<%=val.type%>&#125;</small><div class=\"desc\"><%=val.desc%></div></div> <%}%> <%}%> <%if(entity.methods&&entity.methods.length){%> <h3>方法</h3> <%for(var i=0;i<entity.methods.length;i++){%> <%var val=entity.methods[i]%> <div class=\"list\"><a href=\"#!/index\" mx-click=\"toggleMoreInfos({id:'<%=val.id%>',type:'methods'})\"><i class=\"tree plus\"></i> <span class=\"item\" id=\"<%=val.id%>\"><%=val.name%>(<%=getParams(val.params)%>)</span> </a> <%if(val.memberOf!=entity.name){%><sup class=\"mark\" title=\"继承来的\">I</sup><%}%> <%if(val.isStatic&&entity.isClass){%><sup class=\"mark\" title=\"静态方法\">S</sup><%}%> <%if(val.needModule){%><sup class=\"mark\" title=\"可选的模块\"><%=val.needModule%></sup><%}%> <div class=\"desc\"><%=val.desc%></div></div> <%}%> <%}%> <%if(entity.events&&entity.events.length){%> <h3>事件</h3> <%for(var i=0;i<entity.events.length;i++){%> <%var val=entity.events[i]%> <div class=\"list\"><a href=\"#!/index\" mx-click=\"toggleMoreInfos({id:'<%=val.id%>',type:'events'})\"><i class=\"tree plus\"></i><span class=\"item\" id=\"<%=val.id%>\"><%=val.name%></span><%if(val.isStatic&&entity.isClass){%><sup class=\"mark\" title=\"对象事件\">S</sup><%}%></a><div class=\"desc\"><%=val.desc%></div></div> <%}%> <%}%> </div>",
    inheritsTmpl: "<div class=\"ihrt-outer\">继承关系：<div class=\"ihrt\"><div class=\"ihrt-t\">Object</div> <%for(var i=0;i<list.length;i++){%> <%var val=list[i]%> <div class=\"ihrt-list\"> <%=val.name%><%if(val.type){%>&lt;<%=val.type%>&gt;<%}%> <%}%> <%for(var i=0;i<list.length;i++){%> </div> <%}%> </div></div><div class=\"cb\"></div>",
    methodTmpl: "<%var content=false%> <%if(info.params&&info.params.length){%> <%content=true%> <h4>参数：</h4><div class=\"callout\"> <%for(var i=0;i<info.params.length;i++){%> <%var val=info.params[i]%> <%=val.name%> &#123;<%=val.type%>&#125; <%if(val.isOptional){%>[可选参数] <%}%> <%if(val.desc){%><%=val.desc%><%}%> <%if(i<info.params.length-1){%><br/><br/><%}%> <%}%> </div> <%}%> <%if(info.returns){%> <%content=true%> <h4>返回值：</h4><div class=\"callout\"> <%=info.returns%> </div> <%}%> <%if(info.example){%> <%content=true%> <h4>示例：</h4><pre class=\"example\"> <%=info.example%> </pre> <%}%> <%if(!content){%> 无 <%}%>",
    ctor: function(extra) {
        this.$name = extra.name;
    },
    render: function() {
        var me = this;
        var html = me.toHTML(me.tmpl, {
            entity: Data[me.$name],
            getInherits: function(name) {
                var ir = FindParent(name, Data);
                var html = me.toHTML(me.inheritsTmpl, {
                    list: ir.reverse()
                });
                return html;
            },
            getParams: function(params) {
                var a = [];
                if (params) {
                    for (var i = 0, name, info; i < params.length; i++) {
                        info = params[i];
                        name = info.name;
                        if (name.indexOf('.') == -1) {
                            a.push(name);
                        }
                    }
                }
                return a;
            }
        });
        me.setHTML(me.id, html);
    },
    'toggleMoreInfos<click>': function(e) {
        e.preventDefault();
        var me = this;
        var cntId = me.id + '_method_details';
        var cnt = Zepto('#' + cntId);
        if (!cnt.size()) {
            cnt = document.createElement('div');
            cnt.id = cntId;
            document.body.appendChild(cnt);
            cnt = Zepto(cnt);
        }
        var current = Zepto(e.current);
        var icon = current.find('i');
        if (icon != me.$lastIcon && me.$lastIcon) {
            me.$lastIcon.removeClass('minus').addClass('plus');
        }
        var currentDD = current.parents('div').eq(0);
        if (Zepto.contains(currentDD[0], cnt[0])) {
            var none = cnt.css('display') == 'none';
            cnt.css({
                display: none ? '' : 'none'
            });
            if (none) {
                icon.removeClass('plus').addClass('minus');
            } else {
                icon.removeClass('minus').addClass('plus');
            }
        } else {
            cnt.css({
                display: '',
                paddingLeft: 24
            });
            currentDD.append(cnt);
            icon.removeClass('plus').addClass('minus');
        }
        me.$lastIcon = icon;
        var info = Data[me.$name];
        if (e.params.id) {
            var list = Data[me.$name][e.params.type];
            console.log(list);

            for (var i = list.length - 1; i >= 0; i--) {
                if (list[i].id == e.params.id) info = list[i];
            }
        }
        var html = me.toHTML(me.methodTmpl, {
            info: info //,
                // formatExample: function(example) {
                //     console.log();
                //     return example.replace(/ /g, '&nbsp;').replace(/\b(?:function|var|if|else|this|return|true|false|null)\b/g, '<span style="color:blue">$&</span>').replace(/(^|[^:])(\/{2}[\s\S]*?)(?:[\r\n]|$)/mg, '$1<span style="color:green">$2</span><br />').replace(/\r\n|\r|\n/g, '<br />').replace(/(?:<br\s+\/>)+/gi, '<br />');
                // }
        });
        var top = icon.offset().top;
        if (top < Zepto(window).scrollTop()) {
            Zepto(window).scrollTop(top - 50);
        }
        cnt.html(html);
        var example = Zepto('#' + me.id + ' .example');
        example.each(function(i,b){
            hljs.highlightBlock(b);
        });
    }
});
});