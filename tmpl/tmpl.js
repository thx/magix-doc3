//     Zepto.js
//     (c) 2010-2015 Thomas Fuchs
//     Zepto.js may be freely distributed under the MIT license.

;(function($){
  // underscore tmpl

  var tmpl = function( text, data ){
    var settings, render, noMatch, matcher, index, source, escaper, escapes, template;

    settings = { evaluate: /<%([\s\S]+?)%>/g, interpolate: /<%=([\s\S]+?)%>/g };
    noMatch = /(.)^/;

    matcher = new RegExp( [
        ( settings.interpolate || noMatch ).source,
        ( settings.evaluate || noMatch ).source
    ].join('|') + '|$', 'g' );

    index = 0;
    source = "__p+='";
    escaper = /\\|'|\r|\n|\t|\u2028|\u2029/g;
    escapes = {
        "'": "'", '\\': '\\', '\r': 'r', '\n': 'n', '\t': 't', '\u2028': 'u2028',
        '\u2029': 'u2029'
    };

    text.replace( matcher, function( match, interpolate, evaluate, offset ){
        source += text.slice( index, offset ).replace( escaper, function( match ){
            return '\\' + escapes[ match ];
        } );

        if( interpolate )
            source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";

        if( evaluate )
            source += "';\n" + evaluate + "\n__p+='";

        index = offset + match.length;
        return match;
    } );

    source += "';\n";
    source = 'with(obj||{}){\n' + source + '}\n';
    source = "var __t,__p='',__j=Array.prototype.join," +
        "print=function(){__p+=__j.call(arguments,'');};\n" + source + "return __p;\n";

    try{
        render = new Function( 'obj', source );
    }catch( e ){
        e.source = source;
        throw e;
    }

    if( data )
        return render( data );

    template = function( data ) {
        return render.call( this, data );
    };

    template.source = 'function(obj){\n' + source + '}';

    return template;
  }
  $.tmpl = tmpl;
})(Zepto)