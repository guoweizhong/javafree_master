var $jscomp={};$jscomp.scope={};$jscomp.defineProperty=typeof Object.defineProperties=="function"?Object.defineProperty:function(d,f,e){e=(e);if(e.get||e.set){throw new TypeError("ES3 does not support getters and setters.");}if(d==Array.prototype||d==Object.prototype){return;}d[f]=e.value;};$jscomp.getGlobal=function(b){return typeof window!="undefined"&&window===b?b:typeof global!="undefined"&&global!=null?global:b;
};$jscomp.global=$jscomp.getGlobal(this);$jscomp.polyfill=function(n,q,m,l){if(!q){return;}var v=$jscomp.global;var u=n.split(".");for(var r=0;r<u.length-1;r++){var s=u[r];if(!(s in v)){v[s]={};}v=v[s];}var p=u[u.length-1];var o=v[p];var t=q(o);if(t==o||t==null){return;}$jscomp.defineProperty(v,p,{configurable:!0,writable:!0,value:t});
};$jscomp.polyfill("Array.prototype.copyWithin",function(d){if(d){return d;}var c=function(h,e,f){var g=this.length;h=Number(h);e=Number(e);f=Number(f!=null?f:g);if(h<e){f=Math.min(f,g);while(e<f){if(e in this){this[h++]=this[e++];}else{delete this[h++];e++;}}}else{f=Math.min(f,g+e-h);h+=f-e;while(f>e){if(--f in this){this[--h]=this[f];
}else{delete this[h];}}}return this;};return c;},"es6-impl","es3");$jscomp.SYMBOL_PREFIX="jscomp_symbol_";$jscomp.initSymbol=function(){$jscomp.initSymbol=function(){};if(!$jscomp.global.Symbol){$jscomp.global.Symbol=$jscomp.Symbol;}};$jscomp.symbolCounter_=0;$jscomp.Symbol=function(b){return($jscomp.SYMBOL_PREFIX+(b||"")+$jscomp.symbolCounter_++);
};$jscomp.initSymbolIterator=function(){$jscomp.initSymbol();var b=$jscomp.global.Symbol.iterator;if(!b){b=$jscomp.global.Symbol.iterator=$jscomp.global.Symbol("iterator");}if(typeof Array.prototype[b]!="function"){$jscomp.defineProperty(Array.prototype,b,{configurable:!0,writable:!0,value:function(){return $jscomp.arrayIterator(this);
}});}$jscomp.initSymbolIterator=function(){};};$jscomp.arrayIterator=function(d){var c=0;return $jscomp.iteratorPrototype(function(){if(c<d.length){return{done:!1,value:d[c++]};}else{return{done:!0};}});};$jscomp.iteratorPrototype=function(c){$jscomp.initSymbolIterator();var d={next:c};d[$jscomp.global.Symbol.iterator]=function(){return this;
};return(d);};$jscomp.array=$jscomp.array||{};$jscomp.iteratorFromArray=function(f,g){$jscomp.initSymbolIterator();if(f instanceof String){f=f+"";}var h=0;var e={next:function(){if(h<f.length){var b=h++;return{value:g(b,f[b]),done:!1};}e.next=function(){return{done:!0,value:void 0};};return e.next();
}};e[Symbol.iterator]=function(){return e;};return e;};$jscomp.polyfill("Array.prototype.entries",function(d){if(d){return d;}var c=function(){return $jscomp.iteratorFromArray(this,function(f,e){return[f,e];});};return c;},"es6-impl","es3");$jscomp.polyfill("Array.prototype.fill",function(d){if(d){return d;
}var c=function(h,f,g){var j=this.length||0;if(f<0){f=Math.max(0,j+(f));}if(g==null||g>j){g=j;}g=Number(g);if(g<0){g=Math.max(0,j+g);}for(var i=Number(f||0);i<g;i++){this[i]=h;}return this;};return c;},"es6-impl","es3");$jscomp.findInternal=function(h,k,j){if(h instanceof String){h=(String(h));}var i=h.length;
for(var g=0;g<i;g++){var l=h[g];if(k.call(j,l,g,h)){return{i:g,v:l};}}return{i:-1,v:void 0};};$jscomp.polyfill("Array.prototype.find",function(d){if(d){return d;}var c=function(e,f){return $jscomp.findInternal(this,e,f).v;};return c;},"es6-impl","es3");$jscomp.polyfill("Array.prototype.findIndex",function(d){if(d){return d;
}var c=function(e,f){return $jscomp.findInternal(this,e,f).i;};return c;},"es6-impl","es3");$jscomp.polyfill("Array.from",function(d){if(d){return d;}var c=function(j,i,m){$jscomp.initSymbolIterator();i=i!=null?i:function(b){return b;};var p=[];var n=(j)[Symbol.iterator];if(typeof n=="function"){j=n.call(j);
var l;while(!(l=j.next()).done){p.push(i.call((m),l.value));}}else{var k=j.length;for(var o=0;o<k;o++){p.push(i.call((m),j[o]));}}return p;};return c;},"es6-impl","es3");$jscomp.polyfill("Array.prototype.keys",function(d){if(d){return d;}var c=function(){return $jscomp.iteratorFromArray(this,function(b){return b;
});};return c;},"es6-impl","es3");$jscomp.polyfill("Array.of",function(d){if(d){return d;}var c=function(b){return Array.from(arguments);};return c;},"es6-impl","es3");$jscomp.polyfill("Array.prototype.values",function(d){if(d){return d;}var c=function(){return $jscomp.iteratorFromArray(this,function(e,f){return f;
});};return c;},"es6","es3");$jscomp.executeAsyncGenerator=function(c){function b(e){return c.next(e);}function d(e){return c["throw"](e);}return new Promise(function(e,g){function f(h){if(h.done){e(h.value);}else{Promise.resolve(h.value).then(b,d).then(f,g);}}f(c.next());});};$jscomp.makeIterator=function(d){$jscomp.initSymbolIterator();
var c=(d)[Symbol.iterator];return c?c.call(d):$jscomp.arrayIterator((d));};$jscomp.owns=function(c,d){return Object.prototype.hasOwnProperty.call(c,d);};$jscomp.polyfill("WeakMap",function(k){function g(){if(!k||!Object.seal){return !1;}try{var c=Object.seal({});var n=Object.seal({});var l=new (k)([[c,2],[n,3]]);
if(l.get(c)!=2||l.get(n)!=3){return !1;}l["delete"](c);l.set(n,4);return !l.has(c)&&l.get(n)==4;}catch(m){return !1;}}if(g()){return k;}var f="$jscomp_hidden_"+Math.random().toString().substring(2);function h(d){if(!$jscomp.owns(d,f)){var l={};$jscomp.defineProperty(d,f,{value:l});}}function j(d){var c=Object[d];
if(c){Object[d]=function(b){h(b);return c(b);};}}j("freeze");j("preventExtensions");j("seal");var i=0;var e=function(l){this.id_=(i+=Math.random()+1).toString();if(l){$jscomp.initSymbol();$jscomp.initSymbolIterator();var m=$jscomp.makeIterator(l);var d;while(!(d=m.next()).done){var n=d.value;this.set((n[0]),(n[1]));
}}};e.prototype.set=function(d,l){h(d);if(!$jscomp.owns(d,f)){throw new Error("WeakMap key fail: "+d);}d[f][this.id_]=l;return this;};e.prototype.get=function(c){return $jscomp.owns(c,f)?c[f][this.id_]:undefined;};e.prototype.has=function(c){return $jscomp.owns(c,f)&&$jscomp.owns(c[f],this.id_);};e.prototype["delete"]=function(c){if(!$jscomp.owns(c,f)||!$jscomp.owns(c[f],this.id_)){return !1;
}return delete c[f][this.id_];};return e;},"es6-impl","es3");$jscomp.ASSUME_NO_NATIVE_MAP=!1;$jscomp.polyfill("Map",function(s){var m=!$jscomp.ASSUME_NO_NATIVE_MAP&&function(){if(!s||!s.prototype.entries||typeof Object.seal!="function"){return !1;}try{s=(s);var g=Object.seal({x:4});var i=new s($jscomp.makeIterator([[g,"s"]]));
if(i.get(g)!="s"||i.size!=1||i.get({x:4})||i.set({x:4},"t")!=i||i.size!=2){return !1;}var h=i.entries();var b=h.next();if(b.done||b.value[0]!=g||b.value[1]!="s"){return !1;}b=h.next();if(b.done||b.value[0].x!=4||b.value[1]!="t"||!h.next().done){return !1;}return !0;}catch(f){return !1;}}();if(m){return s;
}$jscomp.initSymbol();$jscomp.initSymbolIterator();var o=new WeakMap();var r=function(){};r.prototype.previous;r.prototype.next;r.prototype.head;r.prototype.key;r.prototype.value;var t=function(f){this.data_={};this.head_=n();this.size=0;if(f){var g=$jscomp.makeIterator(f);var e;while(!(e=g.next()).done){var h=(e).value;
this.set((h[0]),(h[1]));}}};t.prototype.set=function(f,d){var e=q(this,f);if(!e.list){e.list=this.data_[e.id]=[];}if(!e.entry){e.entry={next:this.head_,previous:this.head_.previous,head:this.head_,key:f,value:d};e.list.push(e.entry);this.head_.previous.next=e.entry;this.head_.previous=e.entry;this.size++;
}else{e.entry.value=d;}return this;};t.prototype["delete"]=function(c){var d=q(this,c);if(d.entry&&d.list){d.list.splice(d.index,1);if(!d.list.length){delete this.data_[d.id];}d.entry.previous.next=d.entry.next;d.entry.next.previous=d.entry.previous;d.entry.head=null;this.size--;return !0;}return !1;
};t.prototype.clear=function(){this.data_={};this.head_=this.head_.previous=n();this.size=0;};t.prototype.has=function(b){return !!q(this,b).entry;};t.prototype.get=function(c){var d=q(this,c).entry;return(d&&(d.value));};t.prototype.entries=function(){return p(this,function(b){return[b.key,b.value];
});};t.prototype.keys=function(){return p(this,function(b){return b.key;});};t.prototype.values=function(){return p(this,function(b){return b.value;});};t.prototype.forEach=function(i,j){var h=this.entries();var f;while(!(f=h.next()).done){var g=f.value;i.call((j),(g[1]),(g[0]),this);}};(t.prototype)[Symbol.iterator]=t.prototype.entries;
var q=function(i,u){var j=k(u);var h=i.data_[j];if(h&&$jscomp.owns(i.data_,j)){for(var v=0;v<h.length;v++){var g=h[v];if(u!==u&&g.key!==g.key||u===g.key){return{id:j,list:h,index:v,entry:g};}}}return{id:j,list:h,index:-1,entry:undefined};};var p=function(d,f){var e=d.head_;return $jscomp.iteratorPrototype(function(){if(e){while(e.head!=d.head_){e=e.previous;
}while(e.next!=e.head){e=e.next;return{done:!1,value:f(e)};}e=null;}return{done:!0,value:void 0};});};var n=function(){var b={};b.previous=b.next=b.head=b;return b;};var l=0;var k=function(e){var d=e&&typeof e;if(d=="object"||d=="function"){e=(e);if(!o.has(e)){var f=""+ ++l;o.set(e,f);return f;}return o.get(e);
}return"p_"+e;};return t;},"es6-impl","es3");$jscomp.polyfill("Math.acosh",function(d){if(d){return d;}var c=function(b){b=Number(b);return Math.log(b+Math.sqrt(b*b-1));};return c;},"es6-impl","es3");$jscomp.polyfill("Math.asinh",function(d){if(d){return d;}var c=function(f){f=Number(f);if(f===0){return f;
}var e=Math.log(Math.abs(f)+Math.sqrt(f*f+1));return f<0?-e:e;};return c;},"es6-impl","es3");$jscomp.polyfill("Math.log1p",function(d){if(d){return d;}var c=function(h){h=Number(h);if(h<0.25&&h>-0.25){var j=h;var i=1;var g=h;var l=0;var k=1;while(l!=g){j*=h;k*=-1;g=(l=g)+k*j/++i;}return g;}return Math.log(1+h);
};return c;},"es6-impl","es3");$jscomp.polyfill("Math.atanh",function(d){if(d){return d;}var e=Math.log1p;var f=function(c){c=Number(c);return(e(c)-e(-c))/2;};return f;},"es6-impl","es3");$jscomp.polyfill("Math.cbrt",function(d){if(d){return d;}var c=function(f){if(f===0){return f;}f=Number(f);var e=Math.pow(Math.abs(f),1/3);
return f<0?-e:e;};return c;},"es6-impl","es3");$jscomp.polyfill("Math.clz32",function(d){if(d){return d;}var c=function(f){f=Number(f)>>>0;if(f===0){return 32;}var e=0;if((f&4294901760)===0){f<<=16;e+=16;}if((f&4278190080)===0){f<<=8;e+=8;}if((f&4026531840)===0){f<<=4;e+=4;}if((f&3221225472)===0){f<<=2;
e+=2;}if((f&2147483648)===0){e++;}return e;};return c;},"es6-impl","es3");$jscomp.polyfill("Math.cosh",function(e){if(e){return e;}var d=Math.exp;var f=function(b){b=Number(b);return(d(b)+d(-b))/2;};return f;},"es6-impl","es3");$jscomp.polyfill("Math.expm1",function(d){if(d){return d;}var c=function(g){g=Number(g);
if(g<0.25&&g>-0.25){var i=g;var h=1;var f=g;var j=0;while(j!=f){i*=g/++h;f=(j=f)+i;}return f;}return Math.exp(g)-1;};return c;},"es6-impl","es3");$jscomp.polyfill("Math.hypot",function(d){if(d){return d;}var c=function(h,n,j){h=Number(h);n=Number(n);var i,k,l;var m=Math.max(Math.abs(h),Math.abs(n));for(i=2;
i<arguments.length;i++){m=Math.max(m,Math.abs(arguments[i]));}if(m>1e+100||m<1e-100){h=h/m;n=n/m;l=h*h+n*n;for(i=2;i<arguments.length;i++){k=Number(arguments[i])/m;l+=k*k;}return Math.sqrt(l)*m;}else{l=h*h+n*n;for(i=2;i<arguments.length;i++){k=Number(arguments[i]);l+=k*k;}return Math.sqrt(l);}};return c;
},"es6-impl","es3");$jscomp.polyfill("Math.imul",function(d){if(d){return d;}var c=function(i,h){i=Number(i);h=Number(h);var l=i>>>16&65535;var n=i&65535;var k=h>>>16&65535;var m=h&65535;var j=l*m+n*k<<16>>>0;return n*m+j|0;};return c;},"es6-impl","es3");$jscomp.polyfill("Math.log10",function(d){if(d){return d;
}var c=function(b){return Math.log(b)/Math.LN10;};return c;},"es6-impl","es3");$jscomp.polyfill("Math.log2",function(d){if(d){return d;}var c=function(b){return Math.log(b)/Math.LN2;};return c;},"es6-impl","es3");$jscomp.polyfill("Math.sign",function(d){if(d){return d;}var c=function(b){b=Number(b);return b===0||isNaN(b)?b:b>0?1:-1;
};return c;},"es6-impl","es3");$jscomp.polyfill("Math.sinh",function(e){if(e){return e;}var d=Math.exp;var f=function(b){b=Number(b);if(b===0){return b;}return(d(b)-d(-b))/2;};return f;},"es6-impl","es3");$jscomp.polyfill("Math.tanh",function(d){if(d){return d;}var c=function(f){f=Number(f);if(f===0){return f;
}var e=Math.exp(-2*Math.abs(f));var g=(1-e)/(1+e);return f<0?-g:g;};return c;},"es6-impl","es3");$jscomp.polyfill("Math.trunc",function(d){if(d){return d;}var c=function(f){f=Number(f);if(isNaN(f)||f===Infinity||f===-Infinity||f===0){return f;}var e=Math.floor(Math.abs(f));return f<0?-e:e;};return c;
},"es6-impl","es3");$jscomp.polyfill("Number.EPSILON",function(b){return Math.pow(2,-52);},"es6-impl","es3");$jscomp.polyfill("Number.MAX_SAFE_INTEGER",function(){return 9007199254740991;},"es6-impl","es3");$jscomp.polyfill("Number.MIN_SAFE_INTEGER",function(){return -9007199254740991;},"es6-impl","es3");
$jscomp.polyfill("Number.isFinite",function(d){if(d){return d;}var c=function(b){if(typeof b!=="number"){return !1;}return !isNaN(b)&&b!==Infinity&&b!==-Infinity;};return c;},"es6-impl","es3");$jscomp.polyfill("Number.isInteger",function(d){if(d){return d;}var c=function(b){if(!Number.isFinite(b)){return !1;
}return b===Math.floor(b);};return c;},"es6-impl","es3");$jscomp.polyfill("Number.isNaN",function(d){if(d){return d;}var c=function(b){return typeof b==="number"&&isNaN(b);};return c;},"es6-impl","es3");$jscomp.polyfill("Number.isSafeInteger",function(d){if(d){return d;}var c=function(b){return Number.isInteger(b)&&Math.abs(b)<=Number.MAX_SAFE_INTEGER;
};return c;},"es6-impl","es3");$jscomp.polyfill("Object.assign",function(d){if(d){return d;}var c=function(i,h){for(var j=1;j<arguments.length;j++){var g=arguments[j];if(!g){continue;}for(var f in g){if($jscomp.owns(g,f)){i[f]=g[f];}}}return i;};return c;},"es6-impl","es3");$jscomp.polyfill("Object.getOwnPropertySymbols",function(b){if(b){return b;
}return function(){return[];};},"es6-impl","es5");$jscomp.polyfill("Object.is",function(d){if(d){return d;}var c=function(f,e){if(f===e){return f!==0||1/f===1/(e);}else{return f!==f&&e!==e;}};return c;},"es6-impl","es3");$jscomp.polyfill("Object.setPrototypeOf",function(d){if(d){return d;}if(typeof"".__proto__!="object"){return null;
}var c=function(f,e){f.__proto__=e;if(f.__proto__!==e){throw new TypeError(f+" is not extensible");}return f;};return c;},"es6","es5");$jscomp.EXPOSE_ASYNC_EXECUTOR=!0;$jscomp.FORCE_POLYFILL_PROMISE=!1;$jscomp.polyfill("Promise",function(l){if(l&&!$jscomp.FORCE_POLYFILL_PROMISE){return l;}function i(){this.batch_=null;
}i.prototype.asyncExecute=function(b){if(this.batch_==null){this.batch_=[];this.asyncExecuteBatch_();}this.batch_.push(b);return this;};i.prototype.asyncExecuteBatch_=function(){var b=this;this.asyncExecuteFunction(function(){b.executeBatch_();});};var j=$jscomp.global["setTimeout"];i.prototype.asyncExecuteFunction=function(b){j(b,0);
};i.prototype.executeBatch_=function(){while(this.batch_&&this.batch_.length){var d=this.batch_;this.batch_=[];for(var e=0;e<d.length;++e){var n=d[e];delete d[e];try{n();}catch(m){this.asyncThrow_(m);}}}this.batch_=null;};i.prototype.asyncThrow_=function(b){this.asyncExecuteFunction(function(){throw b;
});};var g={PENDING:0,FULFILLED:1,REJECTED:2};var h=function(e){this.state_=g.PENDING;this.result_=undefined;this.onSettledCallbacks_=[];var b=this.createResolveAndReject_();try{e(b.resolve,b.reject);}catch(d){b.reject(d);}};h.prototype.createResolveAndReject_=function(){var c=this;var d=!1;function e(b){return function(m){if(!d){d=!0;
b.call(c,m);}};}return{resolve:e(this.resolveTo_),reject:e(this.reject_)};};h.prototype.resolveTo_=function(c){if(c===this){this.reject_(new TypeError("A Promise cannot resolve to itself"));}else{if(c instanceof h){this.settleSameAsPromise_((c));}else{if(f(c)){this.resolveToNonPromiseObj_((c));}else{this.fulfill_(c);
}}}};h.prototype.resolveToNonPromiseObj_=function(c){var d=undefined;try{d=c.then;}catch(e){this.reject_(e);return;}if(typeof d=="function"){this.settleSameAsThenable_(d,(c));}else{this.fulfill_(c);}};function f(b){switch(typeof b){case"object":return b!=null;case"function":return !0;default:return !1;
}}h.prototype.reject_=function(b){this.settle_(g.REJECTED,b);};h.prototype.fulfill_=function(b){this.settle_(g.FULFILLED,b);};h.prototype.settle_=function(d,b){if(this.state_!=g.PENDING){throw new Error("Cannot settle("+d+", "+b|"): Promise already settled in state"+this.state_);}this.state_=d;this.result_=b;
this.executeOnSettledCallbacks_();};h.prototype.executeOnSettledCallbacks_=function(){if(this.onSettledCallbacks_!=null){var c=this.onSettledCallbacks_;for(var d=0;d<c.length;++d){(c[d]).call();c[d]=null;}this.onSettledCallbacks_=null;}};var k=new i();h.prototype.settleSameAsPromise_=function(c){var d=this.createResolveAndReject_();
c.callWhenSettled_(d.resolve,d.reject);};h.prototype.settleSameAsThenable_=function(d,n){var e=this.createResolveAndReject_();try{d.call(n,e.resolve,e.reject);}catch(m){e.reject(m);}};h.prototype.then=function(p,o){var m;var r;var q=new h(function(b,c){m=b;r=c;});function n(b,c){if(typeof b=="function"){return function(s){try{m(b(s));
}catch(e){r(e);}};}else{return c;}}this.callWhenSettled_(n(p,m),n(o,r));return q;};h.prototype["catch"]=function(b){return this.then(undefined,b);};h.prototype.callWhenSettled_=function(n,d){var b=this;function m(){switch(b.state_){case g.FULFILLED:n(b.result_);break;case g.REJECTED:d(b.result_);break;
default:throw new Error("Unexpected state: "+b.state_);}}if(this.onSettledCallbacks_==null){k.asyncExecute(m);}else{this.onSettledCallbacks_.push(function(){k.asyncExecute(m);});}};h.resolve=function(c){if(c instanceof h){return c;}else{return new h(function(b,d){b(c);});}};h.reject=function(c){return new h(function(d,b){b(c);
});};h.race=function(c){return new h(function(m,b){var n=$jscomp.makeIterator(c);for(var o=n.next();!o.done;o=n.next()){h.resolve(o.value).callWhenSettled_(m,b);}});};h.all=function(m){var n=$jscomp.makeIterator(m);var e=n.next();if(e.done){return h.resolve([]);}else{return new h(function(c,b){var q=[];
var o=0;function p(d){return function(r){q[d]=r;o--;if(o==0){c(q);}};}do{q.push(undefined);o++;h.resolve(e.value).callWhenSettled_(p(q.length-1),b);e=n.next();}while(!e.done);});}};if($jscomp.EXPOSE_ASYNC_EXECUTOR){h["$jscomp$new$AsyncExecutor"]=function(){return new i();};}return h;},"es6-impl","es3");
$jscomp.polyfill("Reflect.apply",function(e){if(e){return e;}var f=Function.prototype.apply;var d=function(h,c,g){return f.call(h,c,g);};return d;},"es6","es3");$jscomp.polyfill("Reflect.construct",function(d){if(d){return d;}var c=function(g,k,h){if(h===undefined){h=g;}var j=h.prototype||Object.prototype;
var l=Object.create(j);var i=Reflect.apply(g,l,k);return i||l;};return c;},"es6","es5");$jscomp.polyfill("Reflect.defineProperty",function(d){if(d){return d;}var c=function(i,j,f){try{Object.defineProperty(i,j,f);var g=Object.getOwnPropertyDescriptor(i,j);if(!g){return !1;}return g.configurable===(f.configurable||!1)&&g.enumerable===(f.enumerable||!1)&&("value" in g?g.value===f.value&&g.writable===(f.writable||!1):g.get===f.get&&g.set===f.set);
}catch(h){return !1;}};return c;},"es6","es5");$jscomp.polyfill("Reflect.deleteProperty",function(d){if(d){return d;}var c=function(e,f){if(!$jscomp.owns(e,f)){return !0;}try{return delete e[f];}catch(g){return !1;}};return c;},"es6","es3");$jscomp.polyfill("Reflect.getOwnPropertyDescriptor",function(b){return b||Object.getOwnPropertyDescriptor;
},"es6","es5");$jscomp.polyfill("Reflect.getPrototypeOf",function(b){return b||Object.getPrototypeOf;},"es6","es5");$jscomp.findDescriptor=function(g,h){var f=g;while(f){var e=Reflect.getOwnPropertyDescriptor(f,h);if(e){return e;}f=Reflect.getPrototypeOf(f);}return undefined;};$jscomp.polyfill("Reflect.get",function(d){if(d){return d;
}var c=function(h,e,g){if(arguments.length<=2){return h[e];}var f=$jscomp.findDescriptor(h,e);if(f){return f.get?f.get.call(g):f.value;}return undefined;};return c;},"es6","es5");$jscomp.polyfill("Reflect.has",function(d){if(d){return d;}var c=function(e,f){return f in e;};return c;},"es6","es3");$jscomp.polyfill("Reflect.isExtensible",function(b){if(b){return b;
}if(typeof Object.isExtensible=="function"){return Object.isExtensible;}return function(){return !0;};},"es6","es3");$jscomp.polyfill("Reflect.ownKeys",function(d){if(d){return d;}var e="jscomp_symbol_";function f(c){return c.substring(0,e.length)==e;}var g=function(k){var j=[];var h=Object.getOwnPropertyNames(k);
var l=Object.getOwnPropertySymbols(k);for(var i=0;i<h.length;i++){(f(h[i])?l:j).push(h[i]);}return j.concat(l);};return g;},"es6","es5");$jscomp.polyfill("Reflect.preventExtensions",function(d){if(d){return d;}if(typeof Object.preventExtensions!="function"){return function(){return !1;};}var c=function(b){Object.preventExtensions(b);
return !Object.isExtensible(b);};return c;},"es6","es3");$jscomp.polyfill("Reflect.set",function(d){if(d){return d;}var c=function(g,j,i,h){var f=$jscomp.findDescriptor(g,j);if(!f){if(Reflect.isExtensible(g)){g[j]=i;return !0;}return !1;}if(f.set){f.set.call(arguments.length>3?h:g,i);return !0;}else{if(f.writable&&!Object.isFrozen(g)){g[j]=i;
return !0;}}return !1;};return c;},"es6","es5");$jscomp.polyfill("Reflect.setPrototypeOf",function(d){if(d){return d;}if(typeof"".__proto__!="object"){return null;}var c=function(f,e){try{f.__proto__=e;return f.__proto__===e;}catch(g){return !1;}};return c;},"es6","es5");$jscomp.ASSUME_NO_NATIVE_SET=!1;
$jscomp.polyfill("Set",function(d){var f=!$jscomp.ASSUME_NO_NATIVE_SET&&function(){if(!d||!d.prototype.entries||typeof Object.seal!="function"){return !1;}try{d=(d);var i=Object.seal({x:4});var j=new d($jscomp.makeIterator([i]));if(!j.has(i)||j.size!=1||j.add(i)!=j||j.size!=1||j.add({x:4})!=j||j.size!=2){return !1;
}var h=j.entries();var b=h.next();if(b.done||b.value[0]!=i||b.value[1]!=i){return !1;}b=h.next();if(b.done||b.value[0]==i||b.value[0].x!=4||b.value[1]!=b.value[0]){return !1;}return h.next().done;}catch(g){return !1;}}();if(f){return d;}$jscomp.initSymbol();$jscomp.initSymbolIterator();var e=function(h){this.map_=new Map();
if(h){var i=$jscomp.makeIterator(h);var g;while(!(g=i.next()).done){var j=(g).value;this.add(j);}}this.size=this.map_.size;};e.prototype.add=function(b){this.map_.set(b,b);this.size=this.map_.size;return this;};e.prototype["delete"]=function(c){var g=this.map_["delete"](c);this.size=this.map_.size;return g;
};e.prototype.clear=function(){this.map_.clear();this.size=0;};e.prototype.has=function(b){return this.map_.has(b);};e.prototype.entries=function(){return this.map_.entries();};e.prototype.values=function(){return this.map_.values();};(e.prototype)[Symbol.iterator]=e.prototype.values;e.prototype.forEach=function(g,h){var i=this;
this.map_.forEach(function(b){return g.call((h),b,b,i);});};return e;},"es6-impl","es3");$jscomp.checkStringArgs=function(e,f,d){if(e==null){throw new TypeError("The 'this' value for String.prototype."+d+" must not be null or undefined");}if(f instanceof RegExp){throw new TypeError("First argument to String.prototype."+d+" must not be a regular expression");
}return e+"";};$jscomp.polyfill("String.prototype.codePointAt",function(d){if(d){return d;}var c=function(g){var i=$jscomp.checkStringArgs(this,null,"codePointAt");var h=i.length;g=Number(g)||0;if(!(g>=0&&g<h)){return void 0;}g=g|0;var f=i.charCodeAt(g);if(f<55296||f>56319||g+1===h){return f;}var j=i.charCodeAt(g+1);
if(j<56320||j>57343){return f;}return(f-55296)*1024+j+9216;};return c;},"es6-impl","es3");$jscomp.polyfill("String.prototype.endsWith",function(d){if(d){return d;}var c=function(g,f){var j=$jscomp.checkStringArgs(this,g,"endsWith");g=g+"";if(f===void 0){f=j.length;}var h=Math.max(0,Math.min(f|0,j.length));
var i=g.length;while(i>0&&h>0){if(j[--h]!=g[--i]){return !1;}}return i<=0;};return c;},"es6-impl","es3");$jscomp.polyfill("String.fromCodePoint",function(d){if(d){return d;}var c=function(g){var e="";for(var h=0;h<arguments.length;h++){var f=Number(arguments[h]);if(f<0||f>1114111||f!==Math.floor(f)){throw new RangeError("invalid_code_point "+f);
}if(f<=65535){e+=String.fromCharCode(f);}else{f-=65536;e+=String.fromCharCode(f>>>10&1023|55296);e+=String.fromCharCode(f&1023|56320);}}return e;};return c;},"es6-impl","es3");$jscomp.polyfill("String.prototype.includes",function(d){if(d){return d;}var c=function(f,e){var g=$jscomp.checkStringArgs(this,f,"includes");
return g.indexOf(f,e||0)!==-1;};return c;},"es6-impl","es3");$jscomp.polyfill("String.prototype.repeat",function(d){if(d){return d;}var c=function(f){var e=$jscomp.checkStringArgs(this,null,"repeat");if(f<0||f>1342177279){throw new RangeError("Invalid count value");}f=f|0;var g="";while(f){if(f&1){g+=e;
}if(f>>>=1){e+=e;}}return g;};return c;},"es6-impl","es3");$jscomp.polyfill("String.prototype.startsWith",function(d){if(d){return d;}var c=function(i,k){var h=$jscomp.checkStringArgs(this,i,"startsWith");i=i+"";var j=h.length;var m=i.length;var l=Math.max(0,Math.min((k)|0,h.length));var n=0;while(n<m&&l<j){if(h[l++]!=i[n++]){return !1;
}}return n>=m;};return c;},"es6-impl","es3");$jscomp.arrayFromIterator=function(f){var d;var e=[];while(!(d=f.next()).done){e.push(d.value);}return e;};$jscomp.arrayFromIterable=function(b){if(b instanceof Array){return b;}else{return $jscomp.arrayFromIterator($jscomp.makeIterator(b));}};$jscomp.inherits=function(f,e){function g(){}g.prototype=e.prototype;
f.prototype=new g();f.prototype.constructor=f;for(var i in e){if(Object.defineProperties){var h=Object.getOwnPropertyDescriptor(e,i);if(h){Object.defineProperty(f,i,h);}}else{f[i]=e[i];}}};$jscomp.polyfill("WeakSet",function(c){function e(){if(!c||!Object.seal){return !1;}try{var h=Object.seal({});var g=Object.seal({});
var b=new (c)([h]);if(!b.has(h)||b.has(g)){return !1;}b["delete"](h);b.add(g);return !b.has(h)&&b.has(g);}catch(f){return !1;}}if(e()){return c;}var d=function(g){this.map_=new WeakMap();if(g){$jscomp.initSymbol();$jscomp.initSymbolIterator();var h=$jscomp.makeIterator(g);var f;while(!(f=h.next()).done){var i=f.value;
this.add(i);}}};d.prototype.add=function(b){this.map_.set(b,!0);return this;};d.prototype.has=function(b){return this.map_.has(b);};d.prototype["delete"]=function(b){return this.map_["delete"](b);};return d;},"es6-impl","es3");try{if(Array.prototype.values.toString().indexOf("[native code]")==-1){delete Array.prototype.values;
}}catch(a){}Ext.define("Ext.theme.neptune.Component",{override:"Ext.Component",initComponent:function(){this.callParent();if(this.dock&&this.border===undefined){this.border=!1;}},privates:{initStyles:function(){var e=this,d=e.hasOwnProperty("border"),f=e.border;if(e.dock){e.border=null;}e.callParent(arguments);
if(d){e.border=f;}else{delete e.border;}}}},function(){Ext.namespace("Ext.theme.is").Neptune=!0;Ext.theme.name="Neptune";});Ext.define("Ext.theme.crisp.Component",{override:"Ext.Component"},function(){Ext.namespace("Ext.theme.is").Crisp=!0;Ext.theme.name="Crisp";});Ext.define("Ext.theme.neptune.resizer.Splitter",{override:"Ext.resizer.Splitter",size:8});
Ext.define("Ext.theme.neptune.toolbar.Toolbar",{override:"Ext.toolbar.Toolbar",usePlainButtons:!1,border:!1});Ext.define("Ext.theme.neptune.layout.component.Dock",{override:"Ext.layout.component.Dock",noBorderClassTable:[0,Ext.baseCSSPrefix+"noborder-l",Ext.baseCSSPrefix+"noborder-b",Ext.baseCSSPrefix+"noborder-bl",Ext.baseCSSPrefix+"noborder-r",Ext.baseCSSPrefix+"noborder-rl",Ext.baseCSSPrefix+"noborder-rb",Ext.baseCSSPrefix+"noborder-rbl",Ext.baseCSSPrefix+"noborder-t",Ext.baseCSSPrefix+"noborder-tl",Ext.baseCSSPrefix+"noborder-tb",Ext.baseCSSPrefix+"noborder-tbl",Ext.baseCSSPrefix+"noborder-tr",Ext.baseCSSPrefix+"noborder-trl",Ext.baseCSSPrefix+"noborder-trb",Ext.baseCSSPrefix+"noborder-trbl"],edgeMasks:{top:8,right:4,bottom:2,left:1},handleItemBorders:function(){var U=this,P=0,J=8,K=4,M=2,L=1,G=U.owner,F=G.bodyBorder,O=G.border,A=U.collapsed,z=U.edgeMasks,N=U.noBorderClassTable,C=G.dockedItems.generation,X,H,D,W,E,B,R,I,Q,V,S,T;
if(U.initializedBorders===C){return;}S=[];T=[];H=U.getBorderCollapseTable();N=U.getBorderClassTable?U.getBorderClassTable():N;U.initializedBorders=C;U.collapsed=!1;D=U.getDockedItems("visual");U.collapsed=A;for(E=0,B=D.length;E<B;E++){R=D[E];if(R.ignoreBorderManagement){continue;}I=R.dock;V=W=0;S.length=0;
T.length=0;if(I!=="bottom"){if(P&J){X=R.border;}else{X=O;if(X!==!1){W+=J;}}if(X===!1){V+=J;}}if(I!=="left"){if(P&K){X=R.border;}else{X=O;if(X!==!1){W+=K;}}if(X===!1){V+=K;}}if(I!=="top"){if(P&M){X=R.border;}else{X=O;if(X!==!1){W+=M;}}if(X===!1){V+=M;}}if(I!=="right"){if(P&L){X=R.border;}else{X=O;if(X!==!1){W+=L;
}}if(X===!1){V+=L;}}if((Q=R.lastBorderMask)!==V){R.lastBorderMask=V;if(Q){T[0]=N[Q];}if(V){S[0]=N[V];}}if((Q=R.lastBorderCollapse)!==W){R.lastBorderCollapse=W;if(Q){T[T.length]=H[Q];}if(W){S[S.length]=H[W];}}if(T.length){R.removeCls(T);}if(S.length){R.addCls(S);}P|=z[I];}V=W=0;S.length=0;T.length=0;if(P&J){X=F;
}else{X=O;if(X!==!1){W+=J;}}if(X===!1){V+=J;}if(P&K){X=F;}else{X=O;if(X!==!1){W+=K;}}if(X===!1){V+=K;}if(P&M){X=F;}else{X=O;if(X!==!1){W+=M;}}if(X===!1){V+=M;}if(P&L){X=F;}else{X=O;if(X!==!1){W+=L;}}if(X===!1){V+=L;}if((Q=U.lastBodyBorderMask)!==V){U.lastBodyBorderMask=V;if(Q){T[0]=N[Q];}if(V){S[0]=N[V];
}}if((Q=U.lastBodyBorderCollapse)!==W){U.lastBodyBorderCollapse=W;if(Q){T[T.length]=H[Q];}if(W){S[S.length]=H[W];}}if(T.length){G.removeBodyCls(T);}if(S.length){G.addBodyCls(S);}},onRemove:function(f){var e=this,g=f.lastBorderMask,h=f.lastBorderCollapse;if(!f.destroyed&&!f.ignoreBorderManagement){if(g){f.lastBorderMask=0;
f.removeCls(e.noBorderClassTable[g]);}if(h){f.lastBorderCollapse=0;f.removeCls(e.getBorderCollapseTable()[h]);}}e.callParent([f]);}});Ext.define("Ext.theme.neptune.panel.Panel",{override:"Ext.panel.Panel",border:!1,bodyBorder:!1,initBorderProps:Ext.emptyFn,initBodyBorder:function(){if(this.bodyBorder!==!0){this.callParent();
}}});Ext.define("Ext.theme.neptune.container.ButtonGroup",{override:"Ext.container.ButtonGroup",usePlainButtons:!1});Ext.define("Ext.theme.neptune.toolbar.Paging",{override:"Ext.toolbar.Paging",defaultButtonUI:"plain-toolbar",inputItemWidth:40});Ext.define("Ext.theme.neptune.picker.Month",{override:"Ext.picker.Month",measureMaxHeight:36});
Ext.define("Ext.theme.neptune.form.field.HtmlEditor",{override:"Ext.form.field.HtmlEditor",defaultButtonUI:"plain-toolbar"});Ext.define("Ext.theme.neptune.panel.Table",{override:"Ext.panel.Table",lockableBodyBorder:!0,initComponent:function(){var b=this;b.callParent();if(!b.hasOwnProperty("bodyBorder")&&!b.hideHeaders&&(b.lockableBodyBorder||!b.lockable)){b.bodyBorder=!0;
}}});Ext.define("Ext.theme.crisp.view.Table",{override:"Ext.view.Table",stripeRows:!1});Ext.define("Ext.theme.neptune.grid.RowEditor",{override:"Ext.grid.RowEditor",buttonUI:"default-toolbar"});Ext.define("Ext.theme.neptune.grid.column.RowNumberer",{override:"Ext.grid.column.RowNumberer",width:25});Ext.define("Ext.theme.neptune.menu.Separator",{override:"Ext.menu.Separator",border:!0});
Ext.define("Ext.theme.neptune.menu.Menu",{override:"Ext.menu.Menu",showSeparator:!1});