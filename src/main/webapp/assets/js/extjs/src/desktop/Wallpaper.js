/*!
 * Ext JS Library
 * Copyright(c) 2006-2014 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */
Ext.define("Ext.ux.desktop.Wallpaper",{extend:"Ext.Component",alias:"widget.wallpaper",cls:"ux-wallpaper",html:'<img src="'+Ext.BLANK_IMAGE_URL+'">',stretch:false,wallpaper:null,stateful:true,stateId:"desk-wallpaper",afterRender:function(){var a=this;
a.callParent();a.setWallpaper(a.wallpaper,a.stretch);},applyState:function(){var b=this,a=b.wallpaper;b.callParent(arguments);if(a!=b.wallpaper){b.setWallpaper(b.wallpaper);}},getState:function(){return this.wallpaper&&{wallpaper:this.wallpaper};},setWallpaper:function(b,a){var c=this,e,d;c.stretch=(a!==false);
c.wallpaper=b;if(c.rendered){e=c.el.dom.firstChild;if(!b||b==Ext.BLANK_IMAGE_URL){Ext.fly(e).hide();}else{if(c.stretch){e.src=b;c.el.removeCls("ux-wallpaper-tiled");Ext.fly(e).setStyle({width:"100%",height:"100%"}).show();}else{Ext.fly(e).hide();d="url("+b+")";c.el.addCls("ux-wallpaper-tiled");}}c.el.setStyle({backgroundImage:d||""});
if(c.stateful){c.saveState();}}return c;}});