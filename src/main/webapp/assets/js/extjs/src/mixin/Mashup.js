Ext.define("Ext.mixin.Mashup",function(a){return{extend:"Ext.Mixin",mixinConfig:{id:"mashup",extended:function(c,b){a.process(b);}},statics:{process:function(l){var h=l.prototype,d=h.requiredScripts,m=l._classHooks,f=m.onCreated,e=l.prototype.xtypes,b=Ext.manifest.mashup||{},g,k,j,c;if(d){delete h.requiredScripts;
m.onCreated=function(){var o=this,i=[],n=Ext.Array.slice(arguments);d=i.concat(d);for(g=0;g<d.length;g++){j=d[g];if(b&&j.indexOf("{")>-1){for(k=0;k<e.length;k++){c=e[k];if(b[c]){j=new Ext.Template(j).apply(b[c]);break;}}}i.push(j);}Ext.Loader.loadScripts({url:i,cache:true,onError:function(q,p){l.scriptError=l.prototype.scriptError=p;
m.onCreated=f;m.onCreated.call(o,n);},onLoad:function(){m.onCreated=f;m.onCreated.call(o,n);}});};}}},onClassMixedIn:function(b){a.process(b);}};});