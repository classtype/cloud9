"use strict";

module.exports = function startup(options, imports, register) {
//console.dir(options.plugins)

options.plugins["livecoffee"] = "H:\\Chromium\\cloud9\\ext.livecoffee"
    for (var name in options.plugins) {
        imports.static.addStatics([{
            path: options.plugins[name],
            mount: "/ext/" + name
        }]);
    }
    
    register(null, {
        "client-plugins": {}
    });
};