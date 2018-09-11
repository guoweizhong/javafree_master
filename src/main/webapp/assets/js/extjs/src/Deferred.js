Ext.define("Ext.Deferred",function(c){var d,e,b,a;return{extend:"Ext.promise.Deferred",requires:["Ext.Promise"],statics:{_ready:function(){d=Ext.promise.Promise;a=Ext.Promise.resolve;},all:function(){return d.all.apply(d,arguments);},any:function(f){if(!(Ext.isArray(f)||d.is(f))){Ext.raise("Invalid parameter: expected an Array or Promise of an Array.");
}return c.some(f,1).then(function(g){return g[0];},function(g){if(g instanceof Error&&g.message==="Too few Promises were resolved."){Ext.raise("No Promises were resolved.");}else{throw g;}});},delay:function(f,h){var g;if(arguments.length===1){h=f;f=undefined;}h=Math.max(h,0);g=new c();g.timeoutId=setTimeout(function(){delete g.timeoutId;
g.resolve(f);},h);return g.promise;},getCachedRejected:function(){if(!e){e=Ext.Promise.reject();}return e;},getCachedResolved:function(){if(!b){b=Ext.Promise.resolve();}return b;},map:function(f,g){if(!(Ext.isArray(f)||d.is(f))){Ext.raise("Invalid parameter: expected an Array or Promise of an Array.");
}if(!Ext.isFunction(g)){Ext.raise("Invalid parameter: expected a function.");}return c.resolved(f).then(function(j){var q,o,h,m,p,k,l,n;m=j.length;k=new Array(j.length);q=new c();if(!m){q.resolve(k);}else{p=function(r,i){return c.resolved(r).then(function(s){return g(s,i,k);}).then(function(s){k[i]=s;
if(!--m){q.resolve(k);}return s;},function(s){return q.reject(s);});};for(o=l=0,n=j.length;l<n;o=++l){h=j[o];if(o in j){p(h,o);}else{m--;}}}return q.promise;});},memoize:function(i,h,f){var g=Ext.Function.memoize(i,h,f);return function(){return c.all(Ext.Array.slice(arguments)).then(function(j){return g.apply(h,j);
});};},parallel:function(g,h){if(h==null){h=null;}var f=Ext.Array.slice(arguments,2);return c.map(g,function(i){if(!Ext.isFunction(i)){throw new Error("Invalid parameter: expected a function.");}return i.apply(h,f);});},pipeline:function(g,f,h){if(h==null){h=null;}return c.reduce(g,function(j,i){if(!Ext.isFunction(i)){throw new Error("Invalid parameter: expected a function.");
}return i.call(h,j);},f);},race:function(){return d.race.apply(d,arguments);},reduce:function(g,h,f){if(!(Ext.isArray(g)||d.is(g))){Ext.raise("Invalid parameter: expected an Array or Promise of an Array.");}if(!Ext.isFunction(h)){Ext.raise("Invalid parameter: expected a function.");}var i=arguments.length===3;
return c.resolved(g).then(function(k){var j=[k,function(m,n,l){return c.resolved(m).then(function(o){return c.resolved(n).then(function(p){return h(o,p,l,k);});});}];if(i){j.push(f);}return Ext.Array.reduce.apply(Ext.Array,j);});},rejected:function(g){var f=new Ext.Deferred();f.reject(g);return f.promise;
},resolved:function(f){var g=new Ext.Deferred();g.resolve(f);return g.promise;},sequence:function(g,h){if(h==null){h=null;}var f=Ext.Array.slice(arguments,2);return c.reduce(g,function(i,j){if(!Ext.isFunction(j)){throw new Error("Invalid parameter: expected a function.");}return c.resolved(j.apply(h,f)).then(function(k){i.push(k);
return i;});},[]);},some:function(g,f){if(!(Ext.isArray(g)||d.is(g))){Ext.raise("Invalid parameter: expected an Array or Promise of an Array.");}if(!Ext.isNumeric(f)||f<=0){Ext.raise("Invalid parameter: expected a positive integer.");}return c.resolved(g).then(function(k){var s,o,q,r,j,h,m,p,l,n;p=[];
m=f;h=(k.length-m)+1;s=new c();if(k.length<f){s.reject(new Error("Too few Promises were resolved."));}else{r=function(i){if(m>0){p.push(i);}m--;if(m===0){s.resolve(p);}return i;};q=function(i){h--;if(h===0){s.reject(new Error("Too few Promises were resolved."));}return i;};for(o=l=0,n=k.length;l<n;o=++l){j=k[o];
if(o in k){c.resolved(j).then(r,q);}}}return s.promise;});},timeout:function(f,h){var g=new c(),i;i=setTimeout(function(){if(i){g.reject(new Error("Promise timed out."));}},h);c.resolved(f).then(function(j){clearTimeout(i);i=null;g.resolve(j);},function(j){clearTimeout(i);i=null;g.reject(j);});return g.promise;
}}};},function(a){a._ready();});