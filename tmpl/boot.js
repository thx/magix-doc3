(function() {
    var Magix = require('magix');
    Magix.config({
        defaultView: 'app/default',
        exts: ['exts']
    });
    Magix.boot();
})();