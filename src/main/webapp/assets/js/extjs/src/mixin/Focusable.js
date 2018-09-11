Ext.define("Ext.mixin.Focusable",{mixinId:"focusable",$isFocusableEntity:true,focusable:false,hasFocus:false,containsFocus:false,focusCls:Ext.baseCSSPrefix+"focused",focusEl:"el",getFocusEl:function(){var a=this.focusEl;return a&&a.dom?a:null;},getFocusClsEl:function(){return this.getFocusEl();},initFocusable:Ext.emptyFn,initFocusableEvents:function(a){this.initFocusableElement(a);
},enableFocusable:Ext.emptyFn,disableFocusable:function(){var a=this;if(a.hasFocus){a.revertFocus();}a.removeFocusCls();},destroyFocusable:function(){var a=this;Ext.destroy(a.focusListeners);a.focusListeners=a.focusEnterEvent=a.focusTask=null;a.focusEl=a.ariaEl=null;},isFocusable:function(a){var c=this,b;
if(!c.focusable&&(!c.isContainer||!a)){return false;}b=c.getFocusEl();if(b&&c.canFocus()){return b&&!b.destroyed&&b.isFocusable(a);}return false;},isDestructing:function(){for(var a=this;a;a=a.getRefOwner()){if(a.destroying||a.destroyed){return true;}}return false;},canFocus:function(d,f){var e=this,c=e.ownerFocusableContainer,b=c&&c.allowFocusingDisabledChildren,a;
a=!e.destroyed&&e.rendered&&!e.isDestructing()&&(e.isContainer||e.focusable)&&(!e.isDisabled()||b)&&(d||e.isVisible(true));return a||(f&&!!e.findFocusTarget());},focus:function(c){var b=this,a,d;if((!b.focusable&&!b.isContainer)||b.destroyed||b.destroying){return false;}if(b.canFocus()&&(a=b.getFocusEl())){if(a.$isFocusableEntity){return a.focus.apply(a,arguments);
}d=a.dom;if(d){a.focus();if(c&&(b.selectText||d.select)){if(b.selectText){if(Ext.isArray(c)){b.selectText.apply(b,c);}else{b.selectText();}}else{d.select();}}}else{if(a.focus){a.focus();}else{return false;}}}else{a=b.findFocusTarget();if(a&&a!=b){return a.focus.apply(a,arguments);}else{return false;}}return true;
},onBlur:function(c){var b=this,a=b.ownerFocusableContainer;b.hasFocus=false;if(b.beforeBlur&&!b.beforeBlur.$emptyFn){b.beforeBlur(c);}if(a){a.beforeFocusableChildBlur(b,c);}b.removeFocusCls(c);if(b.hasListeners.blur){b.fireEvent("blur",b,c);}if(b.postBlur&&!b.postBlur.$emptyFn){b.postBlur(c);}if(a){a.afterFocusableChildBlur(b,c);
}},onFocus:function(c){var b=this,a=b.ownerFocusableContainer;if(b.canFocus()){if(b.beforeFocus&&!b.beforeFocus.$emptyFn){b.beforeFocus(c);}if(a){a.beforeFocusableChildFocus(b,c);}b.addFocusCls(c);if(!b.hasFocus){b.hasFocus=true;b.fireEvent("focus",b,c);}if(b.postFocus&&!b.postFocus.$emptyFn){b.postFocus(c);
}if(a){a.afterFocusableChildFocus(b,c);}}},getTabIndex:function(){var c=this,b,a;if(!c.focusable){return;}b=c.getFocusEl();if(b){if(b.$isFocusableEntity){a=b.getTabIndex();}else{if(b.isElement&&b.dom){a=b.dom.getAttribute("tabIndex");if(a!==null){a-=0;}}else{return;}}}if(typeof a!=="number"){a=c.tabIndex;
}return a;},setTabIndex:function(f,a){var e=this,d=e.ownerFocusableContainer,b=d&&d.allowFocusingDisabledChildren,c;if(!e.focusable){return;}e.tabIndex=f;if(e.destroying||e.destroyed||(e.isDisabled()&&!b)){return;}c=a||e.getFocusEl();if(c){if(c.$isFocusableEntity){c.setTabIndex(f);}else{if(c.isElement&&c.dom){c.setTabIndex(f);
}}}},onFocusEnter:function(b){var a=this;if(a.destroying||a.destroyed){return;}a.focusEnterEvent=b;a.containsFocus=true;if(a.hasListeners.focusenter){a.fireEvent("focusenter",a,b);}},onFocusLeave:function(b){var a=this;if(a.destroying||a.destroyed){return;}a.focusEnterEvent=null;a.containsFocus=false;
if(a.hasListeners.focusleave){a.fireEvent("focusleave",a,b);}},onFocusMove:Ext.emptyFn,privates:{revertFocus:function(){var g=this,c=g.focusEnterEvent,f=Ext.Element.getActiveElement(),b,a,e,d;if(c&&!g.preventRefocus&&g.el.contains(f)){a=c.fromComponent;if(a&&(a.destroyed||a.isDestructing())){b=document.body;
}else{b=c.relatedTarget;}if(b===document.body){e=g.findFocusTarget();if(e){b=e.getFocusEl();}}if(Ext.getDoc().contains(b)&&Ext.fly(b).isFocusable()){b.focus();}else{if(c.fromComponent&&c.fromComponent.focus){d=c.fromComponent.focus();if(!d){f.blur();}}}}},findFocusTarget:function(){var d=this,g,c,a,b,e,f;
if(d.preventRefocus){return null;}for(g=[],c=d.getRefOwner();c;c=c.getRefOwner()){if(!c.isDisabled()){g.unshift(c);}}for(b=0,a=g.length;b<a;b++){c=g[b];if(c.destroying||!c.isVisible()){g.length=b;break;}}for(b=g.length-1;b>=0;b--){c=g[b];e=Ext.ComponentQuery.query(":canfocus()",c);if(e.length){f=Ext.Array.indexOf(e,Ext.ComponentManager.getActiveComponent());
return e[f+1]||e[f-1]||e[0];}if(c.isFocusable&&c.isFocusable()){return c;}}},initFocusableElement:function(d){var c=this,a=c.getTabIndex(),b=c.getFocusEl();if(b&&!b.$isFocusableEntity){if(a!=null&&(d||c.canFocus(true))){c.setTabIndex(a,b);}b.dom.setAttribute("data-componentid",c.id);}},addFocusCls:function(c){var b=this.focusCls,a;
a=this.getFocusClsEl();if(b){a=this.getFocusClsEl(c);if(a){a.addCls(b);}}},removeFocusCls:function(c){var b=this.focusCls,a;if(b){a=this.getFocusClsEl(c);if(a){a.removeCls(b);}}},handleFocusEvent:function(c){var b=this,a;if(!b.focusable||b.destroying||b.destroyed){return;}if(b.isFocusing(c)){a=new Ext.event.Event(c.event);
a.type="focus";a.relatedTarget=c.fromElement;a.target=c.toElement;b.onFocus(a);}},handleBlurEvent:function(c){var b=this,a;if(!b.focusable||b.destroying||b.destroyed){return;}if(c.toElement===document.body||b.isBlurring(c)){a=new Ext.event.Event(c.event);a.type="blur";a.target=c.fromElement;a.relatedTarget=c.toElement;
b.onBlur(a);}},isFocusing:function(b){var a=this.getFocusEl();if(a){if(a.isFocusing){return a.isFocusing(b);}else{return a.dom===document.activeElement&&b.toElement===a.dom&&b.fromElement!==b.toElement;}}return false;},isBlurring:function(b){var a=this.getFocusEl();if(a){if(a.isFocusing){return a.isBlurring(b);
}else{return a.dom!==document.activeElement&&b.fromElement===a.dom&&b.fromElement!==b.toElement;}}return false;},blur:function(){var b=this,a;if(!b.focusable||!b.canFocus()){return;}a=b.getFocusEl();if(a){b.blurring=true;a.blur();delete b.blurring;}},isTabbable:function(){var b=this,a;if(b.focusable){a=b.getFocusEl();
if(a&&a.isTabbable()){return a.isTabbable();}}return false;},disableTabbing:function(){var c=this,b=c.el,a;if(c.destroying||c.destroyed){return;}if(b){b.saveTabbableState();}a=c.getFocusEl();if(a){if(a.$isFocusableEntity){a.disableTabbing();}else{if(a.isElement&&b&&!b.contains(a)){a.saveTabbableState();
}}}},enableTabbing:function(d){var c=this,b=c.el,a;if(c.destroying||c.destroyed){return;}a=c.getFocusEl();if(a){if(a.$isFocusableEntity){a.enableTabbing();}else{if(a.isElement&&b&&!b.contains(a)){a.restoreTabbableState();}}}if(b){b.restoreTabbableState({reset:d});}}}},function(){var a=Ext.baseCSSPrefix+"keyboard-mode",c=false;
Ext.setKeyboardMode=Ext.setKeyboardMode||function(d){Ext.getBody().toggleCls(a,d);};function b(f){var d=f.type;if(d==="pointermove"){c=false;}else{c=(d==="keydown");Ext.setKeyboardMode(c);}}Ext.onReady(function(){Ext.getWin().on({pointerdown:b,pointermove:b,keydown:b,capture:true,delegated:false});Ext.on("focus",function(){if(c!==Ext.getBody().hasCls(a)){Ext.setKeyboardMode(c);
}});});});