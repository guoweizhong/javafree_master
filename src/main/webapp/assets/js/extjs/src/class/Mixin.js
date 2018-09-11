Ext.define("Ext.Mixin",function(a){return{statics:{addHook:function(h,e,c,d){var g=Ext.isFunction(h),f=function(){var j=arguments,k=g?h:d[h],i=this.callParent(j);k.apply(this,j);return i;},b=e.hasOwnProperty(c)&&e[c];if(g){h.$previous=Ext.emptyFn;}f.$name=c;f.$owner=e.self;if(b){f.$previous=b.$previous;
b.$previous=f;}else{e[c]=f;}}},onClassExtended:function(k,d){var f=d.mixinConfig,i=d.xhooks,h=k.superclass,e=d.onClassMixedIn,b,g,j,c;if(i){delete d.xhooks;(f||(d.mixinConfig=f={})).on=i;}if(f){b=h.mixinConfig;if(b){d.mixinConfig=f=Ext.merge({},b,f);}d.mixinId=f.id;if(f.beforeHooks){Ext.raise('Use of "beforeHooks" is deprecated - use "before" instead');
}if(f.hooks){Ext.raise('Use of "hooks" is deprecated - use "after" instead');}if(f.afterHooks){Ext.raise('Use of "afterHooks" is deprecated - use "after" instead');}g=f.before;j=f.after;i=f.on;c=f.extended;}if(g||j||i||c){d.onClassMixedIn=function(o){var l=this.prototype,n=o.prototype,m;if(g){Ext.Object.each(g,function(p,q){o.addMember(p,function(){if(l[q].apply(this,arguments)!==false){return this.callParent(arguments);
}});});}if(j){Ext.Object.each(j,function(p,q){o.addMember(p,function(){var r=this.callParent(arguments);l[q].apply(this,arguments);return r;});});}if(i){for(m in i){a.addHook(i[m],n,m,l);}}if(c){o.onExtended(function(){var p=Ext.Array.slice(arguments,0);p.unshift(o);return c.apply(this,p);},this);}if(e){e.apply(this,arguments);
}};}}};});