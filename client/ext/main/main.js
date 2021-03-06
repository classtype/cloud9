/**
 * Main Module for the Cloud9 IDE
 *
 * @copyright 2012, Ajax.org B.V.
 * @license GPLv3 <http://www.gnu.org/licenses/gpl.txt>
 */

define(function(require, exports, module) {

var ide = require("core/ide");
var ext = require("core/ext");
var markup = require("text!ext/main/main.xml");
var skin = require("text!ext/main/style/skins.xml");

//Clear Body
var nodes = document.body.childNodes;
for (var i = nodes.length - 1; i >= 0; i--)
    nodes[i].parentNode.removeChild(nodes[i]);

// #ifndef __SUPPORT_GWT
document.documentElement.style.display = "block";
document.body.style.display = "block"; //might wanna make this variable based on layout loading...
// #endif

//Start APF
apf.initialize('<a:application xmlns:a="http://ajax.org/2005/aml" />');

module.exports = ext.register("ext/main/main", {
    dev     : "Ajax.org",
    name    : "Main",
    alone   : true,
    type    : ext.GENERAL,
    markup  : markup,

    skin    : {
        data : skin,
        "media-path" : ide.staticPrefix + "/ext/main/style/images/",
        "icon-path" : ide.staticPrefix + "/ext/main/style/icons/"
    },

    deps    : [],
    nodes   : [],

    init : function(){
        
    },

    enable : function(){
        this.nodes.each(function(item){
            item.enable();
        });
    },

    disable : function(){
        this.nodes.each(function(item){
            item.disable();
        });
    },

    destroy : function(){
        this.nodes.each(function(item){
            item.destroy(true, true);
        });
        this.nodes = [];
    }
});

    }
);
