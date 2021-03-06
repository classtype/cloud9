/**
 * Refactor Module for the Cloud9 IDE
 *
 * @copyright 2010, Ajax.org B.V.
 * @license GPLv3 <http://www.gnu.org/licenses/gpl.txt>
 */

define(function(require, exports, module) {

var ide = require("core/ide");
var ext = require("core/ext");
var menus = require("ext/menus/menus");
var fs = require("ext/filesystem/filesystem");
var markup = require("text!ext/newresource/newresource.xml");

module.exports = ext.register("ext/newresource/newresource", {
    dev     : "Ajax.org",
    name    : "New Resource",
    alone   : true,
    offline : false,
    type    : ext.GENERAL,
    markup  : markup,
    deps    : [fs],
    commands : {
        "newfile": {
            hint: "create a new file resource",
            msg: "New file created."
        },
        "newfolder": {
            hint: "create a new directory resource",
            msg: "New directory created."
        },
        "newfiletemplate": {hint: "open the new file template dialog"}
    },
    hotitems: {},

    nodes   : [],

    hook : function(amlNode){
        var _self = this;

        this.nodes.push(
            menus.addItemByPath("File/New File", new apf.item({
                onclick : function(){
                    _self.newfile();
                }
            }), 100),
            menus.addItemByPath("File/New From Template...", new apf.item({
                onclick : function(){
                    _self.newfiletemplate();
                }
            }), 200),
            menus.addItemByPath("File/New Folder", new apf.item({
                onclick : function(){
                    _self.newfolder();
                }
            }), 300),
            menus.addItemByPath("File/~", new apf.divider(), 400)
        );

        this.hotitems.newfile = [this.nodes[0]];
        this.hotitems.newfiletemplate = [this.nodes[1]];
        this.hotitems.newfolder = [this.nodes[2]];
    },
    
    init : function(){
        
    },

    newfile: function(type, value, path) {
        if (!type) type = "";

        var node = apf.getXml("<file />");
        
        if (!path && self.trFiles) {
            var sel = trFiles.selected;
    
            if (!sel) {
                trFiles.select(trFiles.$model.queryNode('folder'));
                sel = trFiles.selected;
            }
    
            if (sel) {
                path = sel.getAttribute("path");
                if (trFiles.selected.getAttribute("type") == "file" || trFiles.selected.tagName == "file")
                    path = path.replace(/\/[^\/]*$/, "/");
                else
                    path = path + "/";
            }
        }
        if (!path)
            path = ide.davPrefix + "/";

        var name = "Untitled", count = 1;
        while (tabEditors.getPage(path + name + count + type))
            count++;

        node.setAttribute("name", name + count + type);
        node.setAttribute("path", path + name + count + type);
        node.setAttribute("changed", "1");
        node.setAttribute("newfile", "1");

        var doc = ide.createDocument(node);
        if (value)
            doc.cachedValue = value;

        ide.dispatchEvent("openfile", {
            doc: doc,
            type: "newfile"
        });
        ide.dispatchEvent("track_action", {type: "template", template: type});
    },

    newfiletemplate : function(){
        ext.initExtension(this);
        
        winNewFileTemplate.show();
    },

    newfolder: function() {
        fs.createFolder();
        return false;
    },

    enable : function(){
        if (!this.disabled) return;

        this.nodes.each(function(item){
            item.enable();
        });
        this.disabled = false;
    },

    disable : function(){
        if (this.disabled) return;

        this.nodes.each(function(item){
            item.disable();
        });
        this.disabled = true;
    },

    destroy : function(){
        this.nodes.each(function(item){
            item.destroy(true, true);
        });
        this.nodes = [];

        tabEditors.removeEventListener("close", this.$close);
    }
});

    }
);
