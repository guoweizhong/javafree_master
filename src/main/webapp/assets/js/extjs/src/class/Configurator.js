(function(){var b=Ext.Config,c=b.map,a=Ext.Object;Ext.Configurator=function(d){var f=this,e=d.prototype,g=d.superclass?d.superclass.self.$config:null;f.cls=d;f.superCfg=g;if(g){f.configs=a.chain(g.configs);f.cachedConfigs=a.chain(g.cachedConfigs);f.initMap=a.chain(g.initMap);f.values=a.chain(g.values);
f.needsFork=g.needsFork;f.deprecations=a.chain(g.deprecations);}else{f.configs={};f.cachedConfigs={};f.initMap={};f.values={};f.deprecations={};}e.config=e.defaultConfig=f.values;d.$config=f;};Ext.Configurator.prototype={self:Ext.Configurator,needsFork:false,initList:null,add:function(t,d){var u=this,h=u.cls,k=u.configs,v=u.cachedConfigs,m=u.initMap,p=h.prototype,w=d&&d.$config.configs,e=u.values,j,l,r,f,g,i,x,o,n,q;
for(x in t){q=t[x];j=q&&q.constructor===Object;l=j&&"$value" in q?q:null;r=false;if(l){r=!!l.cached;q=l.$value;j=q&&q.constructor===Object;}f=l&&l.merge;g=k[x];if(g){if(d){f=g.merge;if(!f){continue;}l=null;}else{f=f||g.merge;}if(!d&&r&&!v[x]){Ext.raise("Redefining config as cached: "+x+" in class: "+h.$className);
}i=e[x];if(f){q=f.call(g,q,i,h,d);}else{if(j){if(i&&i.constructor===Object){q=a.merge({},i,q);}}}}else{if(w){g=w[x];l=null;}else{g=b.get(x);}k[x]=g;if(g.cached||r){v[x]=true;}o=g.names;if(!p[n=o.get]){p[n]=g.getter||g.getGetter();}if(!p[n=o.set]){p[n]=(l&&l.evented)?(g.eventedSetter||g.getEventedSetter()):(g.setter||g.getSetter());
}}if(l){if(g.owner!==h){k[x]=g=Ext.Object.chain(g);g.owner=h;}Ext.apply(g,l);delete g.$value;}if(!u.needsFork&&q&&(q.constructor===Object||q instanceof Array)){u.needsFork=true;}if(q!==null){m[x]=true;}else{if(p.$configPrefixed){p[k[x].names.internal]=null;}else{p[k[x].name]=null;}if(x in m){m[x]=false;
}}e[x]=q;}},addDeprecations:function(j){var i=this,e=i.deprecations,g=(i.cls.$className||"")+"#",h,d,f;for(f in j){d=j[f];if(!d){h="This config has been removed.";}else{if(!(h=d.message)){h='This config has been renamed to "'+d+'"';}}e[f]=g+f+": "+h;}},configure:function(y,m){var A=this,l=A.configs,j=A.deprecations,n=A.initMap,p=A.initListMap,w=A.initList,q=A.cls.prototype,e=A.values,r=0,t=!w,f,g,h,v,u,k,o,B,s,z,x,d;
e=A.needsFork?a.fork(e):a.chain(e);y.isConfiguring=true;if(t){A.initList=w=[];A.initListMap=p={};y.isFirstInstance=true;for(B in n){g=l[B];z=g.cached;if(n[B]){o=g.names;s=e[B];if(!q[o.set].$isDefault||q[o.apply]||q[o.update]||typeof s==="object"){if(z){(f||(f=[])).push(g);}else{w.push(g);p[B]=true;}y[o.get]=g.initGetter||g.getInitGetter();
}else{q[g.getInternalName(q)]=s;}}else{if(z){q[g.getInternalName(q)]=undefined;}}}}k=f&&f.length;if(k){for(v=0;v<k;++v){u=f[v].getInternalName(q);y[u]=null;}for(v=0;v<k;++v){o=(g=f[v]).names;h=o.get;if(y.hasOwnProperty(h)){y[o.set](e[g.name]);delete y[h];}}for(v=0;v<k;++v){u=f[v].getInternalName(q);q[u]=y[u];
delete y[u];}}if(m&&m.platformConfig){m=A.resolvePlatformConfig(y,m);}if(t){if(y.afterCachedConfig&&!y.afterCachedConfig.$nullFn){y.afterCachedConfig(m);}}y.config=e;for(v=0,k=w.length;v<k;++v){g=w[v];y[g.names.get]=g.initGetter||g.getInitGetter();}if(y.transformInstanceConfig){m=y.transformInstanceConfig(m);
}if(m){for(B in m){s=m[B];g=l[B];if(j[B]){Ext.log.warn(j[B]);if(!g){continue;}}if(!g){d=y.self.prototype[B];if(y.$configStrict&&(typeof d==="function")&&!d.$nullFn){Ext.raise("Cannot override method "+B+" on "+y.$className+" instance.");}y[B]=s;}else{if(!g.lazy){++r;}if(!p[B]){y[g.names.get]=g.initGetter||g.getInitGetter();
}if(g.merge){s=g.merge(s,e[B],y);}else{if(s&&s.constructor===Object){x=e[B];if(x&&x.constructor===Object){s=a.merge(e[B],s);}else{s=Ext.clone(s,false);}}}}e[B]=s;}}if(y.beforeInitConfig&&!y.beforeInitConfig.$nullFn){if(y.beforeInitConfig(m)===false){return;}}if(m){for(B in m){if(!r){break;}g=l[B];if(g&&!g.lazy){--r;
o=g.names;h=o.get;if(y.hasOwnProperty(h)){y[o.set](e[B]);delete y[o.get];}}}}for(v=0,k=w.length;v<k;++v){g=w[v];o=g.names;h=o.get;if(!g.lazy&&y.hasOwnProperty(h)){y[o.set](e[g.name]);delete y[h];}}delete y.isConfiguring;},getCurrentConfig:function(e){var d=e.defaultConfig,g={},f;for(f in d){g[f]=e[c[f].names.get]();
}return g;},merge:function(d,i,g){var k=this.configs,f,j,h,e;for(f in g){j=g[f];e=k[f];if(e){if(e.merge){j=e.merge(j,i[f],d);}else{if(j&&j.constructor===Object){h=i[f];if(h&&h.constructor===Object){j=Ext.Object.merge(h,j);}else{j=Ext.clone(j,false);}}}}i[f]=j;}return i;},reconfigure:function(r,m,s){var h=r.config,j=[],q=r.$configStrict&&!(s&&s.strict===false),n=this.configs,f=s&&s.defaults,l,p,g,k,e,o,d;
for(e in m){l=n[e];if(f&&r.hasOwnProperty(l&&r.$configPrefixed?l.names.internal:e)){continue;}h[e]=m[e];if(this.deprecations[e]){Ext.log.warn(this.deprecations[e]);if(!l){continue;}}if(l){r[l.names.get]=l.initGetter||l.getInitGetter();}else{d=r.self.prototype[e];if(q){if((typeof d==="function")&&!d.$nullFn){Ext.Error.raise("Cannot override method "+e+" on "+r.$className+" instance.");
continue;}else{if(e!=="type"){Ext.log.warn('No such config "'+e+'" for class '+r.$className);}}}}j.push(e);}for(g=0,k=j.length;g<k;g++){e=j[g];l=n[e];if(l){o=l.names;p=o.get;if(r.hasOwnProperty(p)){r[o.set](m[e]);delete r[p];}}else{l=c[e]||Ext.Config.get(e);o=l.names;if(r[o.set]){r[o.set](m[e]);}else{r[e]=m[e];
}}}},resolvePlatformConfig:function(d,k){var h=k&&k.platformConfig,e=k,f,g,j;if(h){g=Ext.getPlatformConfigKeys(h);j=g.length;if(j){e=Ext.merge({},e);for(f=0,j=g.length;f<j;++f){this.merge(d,e,h[g[f]]);}}}return e;}};}());