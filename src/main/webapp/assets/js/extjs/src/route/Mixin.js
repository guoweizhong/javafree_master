Ext.define("Ext.route.Mixin",{extend:"Ext.Mixin",requires:["Ext.route.Router"],mixinConfig:{id:"routerable",before:{destroy:"destroyRouterable"}},config:{routes:null},destroyRouterable:function(){Ext.route.Router.disconnect(this);},updateRoutes:function(c,a){var f=this,b=Ext.route.Router,e,d,g;if(a){for(e in a){d=a[e];
if(Ext.isString(d)){d={action:d,name:e};}b.disconnect(f,d);}}if(c){for(e in c){d=c[e];if(Ext.isString(d)){d={action:d};}g=d.action;b.connect(e,d,f);}}},redirectTo:function(k,d){var o=this,h=Ext.util.History.getToken(),f=Ext.route.Router,b=f.getMultipleToken(),c,l,n,e,a,j,p,g,m;if(k===-1){return Ext.util.History.back();
}else{if(k===1){return Ext.util.History.forward();}else{if(k.isModel){k=k.toUrl();}else{if(Ext.isObject(k)){l=0;n=h?h.split(b):[];e=n.length;for(a in k){j=k[a];if(!Ext.isObject(j)){j={token:j};}if(e){p=f.getByName(a);if(p){l=0;m=false;for(;l<e;l++){g=n[l];if(p.matcherRegex.test(g)){m=true;if(j.token){if(j.fn&&j.fn.call(this,g,n,j)===false){continue;
}n[l]=j.token;if(j.force){p.lastToken=null;}}else{n.splice(l,1);l--;e--;p.lastToken=null;}}}if(j&&j.token&&!m){n.push(j.token);}}}else{if(j&&j.token){n.push(j.token);}}}k=n.join(b);}else{f.clearLastTokens();}}}}if(d===true){c=d;d=null;}if(c){l=0;if(e){for(;l<e;l++){g=n[l];p=f.getRoute(g);if(p){p.lastToken=null;
}}}}if(h===k){if(c){f.onStateChange(k);}return false;}if(d&&d.replace){Ext.util.History.replace(k);}else{Ext.util.History.add(k);}return true;},privates:{afterClassMixedIn:function(c){var b=c.prototype,a=b.routes;if(a){delete b.routes;c.getConfigurator().add({routes:a});}}}});