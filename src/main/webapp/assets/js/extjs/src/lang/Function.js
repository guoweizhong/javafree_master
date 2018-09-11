Ext.Function=(function(){var b=0,m,e=[],n=[],h=0,i={},l=Array.prototype.slice,g=window,d=Ext.global,f=!!(d.setImmediate&&d.clearImmediate),k=g.requestAnimationFrame||g.webkitRequestAnimationFrame||g.mozRequestAnimationFrame||g.oRequestAnimationFrame||function(s){var o=Ext.now(),q=Math.max(0,16-(o-b)),p=function(){s(o+q);
},r;p.$origFn=s.$origFn?s.$origFn:s;p.$skipTimerCheck=p.$origFn.$skipTimerCheck;r=g.setTimeout(p,q);b=o+q;return r;},c=function(){var o=e.length,r,p,q;m=null;for(p=0;p<o;p++){q=e[p];r=q[3];if(i[r]){q[0].apply(q[1]||d,q[2]||n);delete i[r];}}e=e.slice(o);},a=function(){Ext.elevateFunction(c);},j={flexSetter:function(o){return function(q,s){var p,r;
if(q!==null){if(typeof q!=="string"){for(p in q){if(q.hasOwnProperty(p)){o.call(this,p,q[p]);}}if(Ext.enumerables){for(r=Ext.enumerables.length;r--;){p=Ext.enumerables[r];if(q.hasOwnProperty(p)){o.call(this,p,q[p]);}}}}else{o.call(this,q,s);}}return this;};},bind:function(r,q,p,o){if(arguments.length<2){return r;
}else{if(arguments.length<3){return r.bind(q);}else{if(arguments.length<4){return Function.prototype.bind.apply(r,[].concat(q,p));}}}var s=r;return function(){var t=p||arguments;if(o===true){t=l.call(arguments,0);t=t.concat(p);}else{if(typeof o==="number"){t=l.call(arguments,0);Ext.Array.insert(t,o,p);
}}return s.apply(q||d,t);};},bindCallback:function(s,r,q,p,o){return function(){var t=l.call(arguments);return Ext.callback(s,r,q?q.concat(t):t,p,o);};},pass:function(q,o,p){if(!Ext.isArray(o)){if(Ext.isIterable(o)){o=Ext.Array.clone(o);}else{o=o!==undefined?[o]:[];}}return function(){var r=o.slice();
r.push.apply(r,arguments);return q.apply(p||this,r);};},alias:function(p,o){return function(){return p[o].apply(p,arguments);};},clone:function(q){var o,p;o=function(){return q.apply(this,arguments);};for(p in q){if(q.hasOwnProperty(p)){o[p]=q[p];}}return o;},createInterceptor:function(r,q,p,o){if(!Ext.isFunction(q)){return r;
}else{o=Ext.isDefined(o)?o:null;return function(){var t=this,s=arguments;return(q.apply(p||t||d,s)!==false)?r.apply(t||d,s):o;};}},createDelayed:function(t,q,s,p,o){var r=t;if(s||p){r=Ext.Function.bind(t,s,p,o);}return function(){var w=this,u=l.call(arguments),v;v=function(){if(Ext.elevateFunction){Ext.elevateFunction(r,w,u);
}else{r.apply(w,u);}};v.$origFn=t.$origFn?t.$origFn:t;v.$skipTimerCheck=v.$origFn.$skipTimerCheck;setTimeout(v,q);};},defer:function(t,q,s,p,o){var u,r;if(!s&&!p&&!o){r=t;}else{r=Ext.Function.bind(t,s,p,o);}if(q>0){u=function(){if(Ext.elevateFunction){Ext.elevateFunction(r);}else{r();}};u.$origFn=t.$origFn?t.$origFn:t;
u.$skipTimerCheck=u.$origFn.$skipTimerCheck;return setTimeout(u,q);}r();return 0;},interval:function(t,q,s,p,o){var u,r;r=Ext.Function.bind(t,s,p,o);u=function(){if(Ext.elevateFunction){Ext.elevateFunction(r);}else{r();}};u.$origFn=r.$origFn?r.$origFn:t;u.$skipTimerCheck=u.$origFn.$skipTimerCheck;return setInterval(u,q);
},createSequence:function(p,q,o){if(!q){return p;}else{return function(){var r=p.apply(this,arguments);q.apply(o||this,arguments);return r;};}},createBuffered:function(t,q,s,r){var p,o=function(){var w=r||l.call(arguments,0),v=s||this,u;if(p){clearTimeout(p);}u=function(){if(Ext.elevateFunction){Ext.elevateFunction(t,v,w);
}else{t.apply(v,w);}};u.$origFn=t.$origFn?t.$origFn:t;u.$skipTimerCheck=u.$origFn.$skipTimerCheck;p=o.timer=setTimeout(u,q);};return o;},createAnimationFrame:function(s,r,p,t){var q,o;t=t||3;q=function(){var u,v=p||l.call(arguments,0);r=r||this;if(t===3&&o){j.cancelAnimationFrame(o);}if((t&1)||!o){u=function(){o=q.timerId=null;
s.apply(r,v);};u.$origFn=s.$origFn?s.$origFn:s;u.$skipTimerCheck=u.$origFn.$skipTimerCheck;o=q.timerId=j.requestAnimationFrame(u);}};return q;},requestAnimationFrame:function(r,q,o){var s=++h,p=l.call(arguments,0);p[3]=s;i[s]=1;e.push(p);if(!m){m=k(Ext.elevateFunction?a:c);}return s;},cancelAnimationFrame:function(o){delete i[o];
},createThrottled:function(s,p,r){var t=0,o,q,v,u=function(){if(Ext.elevateFunction){Ext.elevateFunction(s,r,q);}else{s.apply(r,q);}t=Ext.now();v=null;};u.$origFn=s.$origFn?s.$origFn:s;u.$skipTimerCheck=u.$origFn.$skipTimerCheck;return function(){if(!r){r=this;}o=Ext.now()-t;q=arguments;if(o>=p){clearTimeout(v);
u();}else{if(!v){v=Ext.defer(u,p-o);}}};},createBarrier:function(r,p,o){var q=function(){if(!--r){p.apply(o,arguments);}};q.$origFn=p.$origFn?p.$origFn:p;q.$skipTimerCheck=q.$origFn.$skipTimerCheck;return q;},interceptBefore:function(p,o,r,q){var s=p[o]||Ext.emptyFn;return(p[o]=function(){var t=r.apply(q||this,arguments);
s.apply(this,arguments);return t;});},interceptAfter:function(p,o,r,q){var s=p[o]||Ext.emptyFn;return(p[o]=function(){s.apply(this,arguments);return r.apply(q||this,arguments);});},interceptAfterOnce:function(q,p,s,r){var t=q[p],o;o=function(){var u;if(t){t.apply(this,arguments);}u=s.apply(r||this,arguments);
q[p]=t;q=p=s=r=t=o=null;return u;};q[p]=o;return o;},makeCallback:function(p,o){if(!o[p]){if(o.$className){Ext.raise('No method "'+p+'" on '+o.$className);}Ext.raise('No method "'+p+'"');}return function(){return o[p].apply(o,arguments);};},memoize:function(r,q,o){var p={},s=o&&Ext.isFunction(o);return function(u){var t=s?o.apply(q,arguments):u;
if(!(t in p)){p[t]=r.apply(q,arguments);}return p[t];};},_stripCommentRe:/(\/\*([^*]|[\r\n]|(\*+([^*/]|[\r\n])))*\*+\/)|(\/\/.*)/g,toCode:function(p){var o=p?p.toString():"";o=o.replace(j._stripCommentRe,"");return o;}};Ext.asap=f?function(q,p,s){var o=q,r;if(p!=null||s!=null){o=j.bind(q,p,s);}r=function(){if(Ext.elevateFunction){Ext.elevateFunction(o);
}else{o();}};r.$origFn=q.$origFn?q.$origFn:q;r.$skipTimerCheck=r.$origFn.$skipTimerCheck;return setImmediate(r);}:function(q,p,s){var o=q,r;if(p!=null||s!=null){o=j.bind(q,p,s);}r=function(){if(Ext.elevateFunction){Ext.elevateFunction(o);}else{o();}};r.$origFn=q.$origFn?q.$origFn:q;r.$skipTimerCheck=r.$origFn.$skipTimerCheck;
return setTimeout(r,0,true);},Ext.asapCancel=f?function(o){clearImmediate(o);}:function(o){clearTimeout(o);};Ext.defer=j.defer;Ext.interval=j.interval;Ext.pass=j.pass;Ext.bind=j.bind;Ext.deferCallback=j.requestAnimationFrame;Ext.raf=function(){return j.requestAnimationFrame.apply(j,arguments);};return j;
})();