Ext.define("Ext.field.InputMask",function(a){return{requires:["Ext.util.LRU"],cachedConfig:{blank:"_",characters:{"*":"[A-Za-z0-9]","a":"[a-z]","A":"[A-Z]","0":"[0-9]","9":"[0-9]"},ignoreCase:true},config:{pattern:null},_cached:false,_lastEditablePos:null,_mask:null,statics:{active:{},from:function(d,c){var e=a.active,b;
if(d===null){b=null;}else{if(typeof d!=="string"){if(c&&!c._cached){b=c;b.setConfig(d);}else{b=new a(d);}}else{if(!(b=e[d])){if(!(b=a.cache.remove(d))){b=new a({pattern:d});}e[d]=b;b._cached=1;}else{++b._cached;}}}return b;}},constructor:function(b){this.initConfig(b);},release:function(){var d=this,b=a.cache,c;
if(d._cached&&!--d._cached){c=d.getPattern();if(a.active[c]!==d){Ext.raise("Invalid call to InputMask#release (not active)");}if(b.map[c]){Ext.raise("Invalid call to InputMask#release (already cached)");}delete a.active[c];b.add(c,d);b.trim(b.maxSize);}else{if(d._cached===0){Ext.raise("Invalid call to InputMask#release (already released)");
}}},clearRange:function(k,b,h){var j=this,g=j.getBlank(),e=b+h,c=k.length,m="",f,l,d;if(!g){d=j._prefix.length;for(f=0;f<c;++f){if(f<d||f<b||f>=e){m+=k[f];}}m=j.formatValue(m);}else{l=j.getPattern();for(f=0;f<c;++f){if(f<b||f>=e){m+=k[f];}else{if(j.isFixedChar(f)){m+=l[f];}else{m+=g;}}}}return m;},formatValue:function(h){var f=this,j=f.getBlank(),c,e,b,g,d;
if(!j){g=f._prefix;e=g.length;d=this.insertRange("",h,0);for(c=d.length;c>e&&f.isFixedChar(c-1);){--c;}d=(c<e)?g:d.slice(0,c-1);}else{if(h){d=f.formatValue("");d=f.insertRange(d,h,0);}else{b=f.getPattern();d="";for(c=0,e=b.length;c<e;++c){if(f.isFixedChar(c)){d+=b[c];}else{d+=j;}}}}return d;},getEditPosLeft:function(c){for(var b=c;
b>=0;--b){if(!this.isFixedChar(b)){return b;}}return null;},getEditPosRight:function(e){var c=this._mask,b=c.length,d;for(d=e;d<b;++d){if(!this.isFixedChar(d)){return d;}}return null;},getFilledLength:function(e){var d=this,g=d.getBlank(),f,b;if(!g){return e.length;}for(b=e&&e.length;b-->0;){f=e[b];if(!d.isFixedChar(b)&&d.isAllowedChar(f,b)){break;
}}return ++b||d._prefix.length;},getSubLength:function(j,c,h){var g=this,l=g.getPattern(),d=0,f=l.length,b=c.length,e;for(e=h;e<f&&d<b;){if(!g.isFixedChar(e)||l[e]===c[d]){if(g.isAllowedChar(c[d++],e,true)){++e;}}else{++e;}}return e-h;},insertRange:function(o,d,n){var m=this,r=m.getPattern(),j=m.getBlank(),q=m.isFilled(o),e=m._prefix.length,l=r.length,c=d.length,p=o,b,g,h,f;
if(!j&&n>p.length){p+=r.slice(p.length,n);}for(h=n,f=0;h<l&&f<c;){g=m.isFixedChar(h);if(!g||r[h]===d[f]){b=d[f++];if(m.isAllowedChar(b,h,true)){if(h<p.length){if(j||q||h<e){p=p.slice(0,h)+b+p.slice(h+1);}else{p=m.formatValue(p.substr(0,h)+b+p.substr(h));}}else{if(!j){p+=b;}}++h;}}else{if(!j&&h>=p.length){p+=r[h];
}else{if(j&&g&&d[f]===j){++f;}}++h;}}return p;},isAllowedChar:function(g,j,e){var f=this,d=f.getPattern(),i,b,h;if(f.isFixedChar(j)){return d[j]===g;}i=d[j];b=f.getCharacters();h=b[i];return !h||h.test(g||"")||(e&&g===f.getBlank());},isEmpty:function(d){for(var c=0,b=d.length;c<b;++c){if(!this.isFixedChar(c)&&this.isAllowedChar(d[c],c)){return false;
}}return true;},isFilled:function(b){return this.getFilledLength(b)===this._mask.length;},isFixedChar:function(b){return this._fixedCharPositions.indexOf(b)>-1;},setCaretToEnd:function(d,c){var b=this.getFilledLength(c),e=this.getEditPosRight(b);if(e!==null){Ext.raf(function(){if(!d.destroyed){d.setCaretPos(e);
Ext.raf(function(){if(!d.destroyed){d.setCaretPos(e);}});}});}},onBlur:function(c,b){if(c.getAutoHideInputMask()!==false){if(this.isEmpty(b)){c.maskProcessed=true;c.setValue("");}}},onFocus:function(c,b){if(c.getAutoHideInputMask()!==false){if(!b){c.maskProcessed=true;c.setValue(this._mask);}}this.setCaretToEnd(c,b);
},onChange:function(f,e,b){var d=this,c;if(f.maskProcessed||e===b){f.maskProcessed=false;return true;}if(e){c=d.formatValue(e);f.maskProcessed=true;f.setValue(c);}},processAutocomplete:function(e,d){var c=this,b;if(d){if(d.length>c._mask.length){d=d.substr(0,c._mask.length);}b=c.formatValue(d);e.maskProcessed=true;
e.inputElement.dom.value=b;e.setValue(b);this.setCaretToEnd(e,d);}},showEmptyMask:function(d,c){var b=this.formatValue();d.maskProcessed=true;d.setValue(b);if(c){this.setCaretToEnd(d);}},onKeyDown:function(i,j,b){if(b.ctrlKey||b.metaKey){return;}var h=this,k=b.keyCode===b.DELETE,l=k==="Delete",f=l||(b.keyCode===b.BACKSPACE),o=j,g,n,e,d,m,c;
if(f){g=i.getCaretPos();d=h._prefix.length;m=i.getTextSelection();c=m[0];e=m[1]-c;if(e){o=h.clearRange(j,c,e);}else{if(g<d||(!l&&g===d)){g=d;}else{n=l?h.getEditPosRight(g):h.getEditPosLeft(g-1);if(n!==null){o=h.clearRange(j,n,1);g=n;}}}if(o!==j){i.maskProcessed=true;i.setValue(o);}b.preventDefault();
i.setCaretPos(g);}},onKeyPress:function(i,j,c){var g=this,k=c.keyCode,b=c.getChar(),n=g.getPattern(),e=g._prefix.length,m=j,f,h,d,l;if(k===c.ENTER||c.ctrlKey||c.metaKey){return;}f=i.getCaretPos();l=i.getTextSelection();if(g.isFixedChar(f)&&n[f]===b){m=g.insertRange(m,b,f);++f;}else{h=g.getEditPosRight(f);
if(h!==null&&g.isAllowedChar(b,h)){d=l[0];m=g.clearRange(m,d,l[1]-d);m=g.insertRange(m,b,h);f=h+1;}}if(m!==j){i.maskProcessed=true;i.setValue(m);}c.preventDefault();if(f<g._lastEditablePos&&f>e){f=g.getEditPosRight(f);}i.setCaretPos(f);},onPaste:function(e,d,c){var f,b=c.browserEvent.clipboardData;if(b&&b.getData){f=b.getData("text/plain");
}else{if(Ext.global.clipboardData&&clipboardData.getData){f=clipboardData.getData("Text");}}if(f){this.paste(e,d,f,e.getTextSelection());}c.preventDefault();},paste:function(e,f,i,g){var d=this,b=g[0],c=g[1]-b,j=c?d.clearRange(f,b,c):f,h=d.getSubLength(j,i,b);j=d.insertRange(j,i,b);b+=h;b=d.getEditPosRight(b)||b;
if(j!==f){e.maskProcessed=true;e.setValue(j);}e.setCaretPos(b);},syncPattern:function(d){var c=d.getValue(),b;if(d.getAutoHideInputMask()===false){if(!c){this.showEmptyMask(d);}else{b=this.formatValue(c);d.maskProcessed=true;d.setValue(b);}}else{if(c){b=this.formatValue(c);d.maskProcessed=true;d.setValue(b);
}}},applyCharacters:function(f){var e={},b=this.getIgnoreCase()?"i":"",g,d;for(g in f){d=f[g];if(typeof d==="string"){d=new RegExp(d,b);}e[g]=d;}return e;},updatePattern:function(o){var l=this,d=l.getCharacters(),f=0,b=o&&o.length,g=l.getBlank(),m=[],h="",k="",j,e;for(e=0;e<b;++e){j=o[e];if(!d[j]){m.push(k.length);
k+=j;}else{f=k.length+1;k+=g;}}l._lastEditablePos=f;l._mask=k;l._fixedCharPositions=m;for(e=0;e<k.length&&l.isFixedChar(e);++e){h+=k[e];}l._prefix=h;}};},function(a){a.cache=new Ext.util.LRU();a.cache.maxSize=100;});