Ext.define("Ext.mixin.Observable",function(b){var e=Ext.emptyFn,d=[],f=Array.prototype,g=f.slice,c=function(h){if(h instanceof c){return h;}this.observable=h;if(arguments[1].isObservable){this.managedListeners=true;}this.args=g.call(arguments,1);},a=["events","hasListeners","managedListeners","eventedBeforeEventNames"];
c.prototype.destroy=function(){this.destroy=Ext.emptyFn;var h=this.observable;if(!h.destroyed){h[this.managedListeners?"mun":"un"].apply(h,this.args);}};return{extend:"Ext.Mixin",mixinConfig:{id:"observable",after:{destroy:"destroyObservable"}},requires:["Ext.util.Event"],mixins:["Ext.mixin.Identifiable"],statics:{releaseCapture:function(h){h.fireEventArgs=this.prototype.fireEventArgs;
},capture:function(k,i,h){var j=function(l,m){return i.apply(h,[l].concat(m));};this.captureArgs(k,j,h);},captureArgs:function(j,i,h){j.fireEventArgs=Ext.Function.createInterceptor(j.fireEventArgs,i,h);},observe:function(h,i){if(h){if(!h.isObservable){Ext.applyIf(h,new this());this.captureArgs(h.prototype,h.fireEventArgs,h);
}if(Ext.isObject(i)){h.on(i);}}return h;},prepareClass:function(m,u,o){var t=m.listeners=[],r=o||m.prototype,h=r.listeners,l=u?u.listeners:m.superclass.self.listeners,j,v,s,n,q;if(l){t.push(l);}if(h){v=h.scope;if(!v){h.scope="self";}else{s=Ext._namedScopes[v];if(s&&s.isController){h.scope="self.controller";
}}t.push(h);r.listeners=null;}if(!m.HasListeners){var p=function(){},k=m.superclass.HasListeners||(u&&u.HasListeners)||b.HasListeners;m.prototype.HasListeners=m.HasListeners=p;p.prototype=m.hasListeners=new k();}v=m.prototype.$noClearOnDestroy||{};for(n=0,q=a.length;n<q;n++){v[a[n]]=true;}m.prototype.$noClearOnDestroy=v;
}},isObservable:true,$vetoClearingPrototypeOnDestroy:true,eventsSuspended:0,constructor:function(l){var o=this,k=o.self,j,n,p,h,m;if(o.$observableInitialized){return;}o.$observableInitialized=true;o.hasListeners=o.hasListeners=new o.HasListeners();o.eventedBeforeEventNames={};o.events=o.events||{};j=k.listeners;
if(j&&!o._addDeclaredListeners(j)){k.listeners=null;}n=(l&&l.listeners)||o.listeners;if(n){if(n instanceof Array){for(m=0,h=n.length;m<h;++m){o.addListener(n[m]);}}else{o.addListener(n);}}p=(l&&l.bubbleEvents)||o.bubbleEvents;if(p){o.enableBubble(p);}if(o.$applyConfigs){if(l){Ext.apply(o,l);}}else{o.initConfig(l);
}if(n){o.listeners=null;}},onClassExtended:function(h,i){if(!h.HasListeners){b.prepareClass(h,h.prototype.$observableMixedIn?undefined:i);}},$eventOptions:{scope:1,delay:1,buffer:1,onFrame:1,single:1,args:1,destroyable:1,priority:1,order:1},$orderToPriority:{before:100,current:0,after:-100},_addDeclaredListeners:function(h){var i=this;
if(h instanceof Array){Ext.each(h,i._addDeclaredListeners,i);}else{i._addedDeclaredListeners=true;i.addListener(h);}return i._addedDeclaredListeners;},addManagedListener:function(o,k,m,p,q,j){var l=this,n=l.managedListeners=l.managedListeners||[],i,h;if(typeof k!=="string"){h=arguments.length>4?q:k;q=k;
for(k in q){if(q.hasOwnProperty(k)){i=q[k];if(!o.$eventOptions[k]){l.addManagedListener(o,k,i.fn||i,i.scope||q.scope||p,i.fn?i:h,true);}}}if(q&&q.destroyable){return new c(l,o,q);}}else{if(m!==e){o.doAddListener(k,m,p,q,null,l,l);if(!j&&q&&q.destroyable){return new c(l,o,k,m,p);}}}},removeManagedListener:function(p,k,n,q){var m=this,r,j,o,h,l;
if(p.$observableDestroyed){return;}if(typeof k!=="string"){r=k;for(k in r){if(r.hasOwnProperty(k)){j=r[k];if(!p.$eventOptions[k]){m.removeManagedListener(p,k,j.fn||j,j.scope||r.scope||q);}}}}else{o=m.managedListeners?m.managedListeners.slice():[];k=Ext.canonicalEventName(k);for(l=0,h=o.length;l<h;l++){m.removeManagedListenerItem(false,o[l],p,k,n,q);
}}},fireEvent:function(h){return this.fireEventArgs(h,g.call(arguments,1));},resolveListenerScope:function(i){var h=Ext._namedScopes[i];if(h){if(h.isController){Ext.raise('scope: "controller" can only be specified on classes that derive from Ext.Component or Ext.Widget');}if(h.isSelf||h.isThis){i=null;
}}return i||this;},fireEventArgs:function(h,j){h=Ext.canonicalEventName(h);var m=this,k=m.events,l=k&&k[h],i=true;if(m.hasListeners[h]){i=m.doFireEvent(h,j||d,l?l.bubble:false);}return i;},fireAction:function(i,k,m,l,j,h){if(typeof m==="string"&&!l){m=this[m];}j=j?Ext.Object.chain(j):{};j.single=true;
j.priority=((h==="after")?-99.5:99.5);this.doAddListener(i,m,l,j);this.fireEventArgs(i,k);},$eventedController:{_paused:1,pause:function(){++this._paused;},resume:function(){var m=this,l=m.fn,k=m.scope,n=m.fnArgs,h=m.owner,j,i;if(!--m._paused){if(l){j=Ext.Array.slice(n||m.args);if(n===false){j.shift();
}m.fn=null;j.push(m);if(Ext.isFunction(l)){i=l.apply(k,j);}else{if(k&&Ext.isString(l)&&Ext.isFunction(k[l])){i=k[l].apply(k,j);}}if(i===false){return false;}}if(!m._paused){return m.owner.fireEventArgs(m.eventName,m.args);}}}},fireEventedAction:function(i,k,n,q,m){var l=this,p=l.eventedBeforeEventNames,j=p[i]||(p[i]="before"+i),h=Ext.apply({owner:l,eventName:i,fn:n,scope:q,fnArgs:m,args:k},l.$eventedController),o;
k.push(h);o=l.fireEventArgs(j,k);k.pop();if(o===false){return false;}return h.resume();},doFireEvent:function(j,l,i){var n=this,h,m,k=true;do{if(n.eventsSuspended){if((h=n.eventQueue)){h.push([j,l]);}return k;}else{m=n.events&&n.events[j];if(m&&m!==true){if((k=m.fire.apply(m,l))===false){break;}}}}while(i&&(n=n.getBubbleParent()));
return k;},getBubbleParent:function(){var i=this,h=i.getBubbleTarget&&i.getBubbleTarget();if(h&&h.isObservable){return h;}return null;},addListener:function(l,r,s,t,j,h){var q=this,m=Ext._namedScopes,i,p,n,o,k;if(typeof l!=="string"){t=l;s=t.scope;p=s&&m[s];n=p&&p.isSelf;k=((q.isComponent||q.isWidget)&&t.element)?q.$elementEventOptions:q.$eventOptions;
for(l in t){i=t[l];if(!k[l]){o=i.scope;if(o&&n){p=m[o];if(p&&p.isController){o="self.controller";}}q.doAddListener(l,i.fn||i,o||s,i.fn?i:t,j,h);}}if(t&&t.destroyable){return new c(q,t);}}else{q.doAddListener(l,r,s,t,j,h);if(t&&t.destroyable){return new c(q,l,r,s,t);}}return q;},removeListener:function(i,m,l,h){var n=this,k,j;
if(typeof i!=="string"){j=i;h=h||n.$eventOptions;for(i in j){if(j.hasOwnProperty(i)){k=j[i];if(!n.$eventOptions[i]){n.doRemoveListener(i,k.fn||k,k.scope||j.scope);}}}}else{n.doRemoveListener(i,m,l);}return n;},onBefore:function(h,k,j,i){return this.addListener(h,k,j,i,"before");},onAfter:function(h,k,j,i){return this.addListener(h,k,j,i,"after");
},unBefore:function(h,k,j,i){return this.removeListener(h,k,j,i,"before");},unAfter:function(h,k,j,i){return this.removeListener(h,k,j,i,"after");},addBeforeListener:function(){return this.onBefore.apply(this,arguments);},addAfterListener:function(){return this.onAfter.apply(this,arguments);},removeBeforeListener:function(){return this.unBefore.apply(this,arguments);
},removeAfterListener:function(){return this.unAfter.apply(this,arguments);},clearListeners:function(){var l=this,j=l.events,h=l.hasListeners,k,i;if(j){for(i in j){if(j.hasOwnProperty(i)){k=j[i];if(k.isEvent){delete h[i];k.clearListeners();}}}l.events=null;}l.clearManagedListeners();},purgeListeners:function(){if(Ext.global.console){Ext.global.console.warn("Observable: purgeListeners has been deprecated. Please use clearListeners.");
}return this.clearListeners.apply(this,arguments);},clearManagedListeners:function(){var l=this,j=l.managedListeners,k,h;if(j){l.managedListeners=null;for(k=0,h=j.length;k<h;k++){l.removeManagedListenerItem(true,j[k]);}j.length=0;}l.managedListeners=j;},removeManagedListenerItem:function(i,h,m,j,l,k){if(i||(h.item===m&&h.ename===j&&(!l||h.fn===l)&&(!k||h.scope===k))){if(!h.item.destroyed){h.item.doRemoveListener(h.ename,h.fn,h.scope,h.options);
}if(!i){Ext.Array.remove(this.managedListeners,h);}}},purgeManagedListeners:function(){if(Ext.global.console){Ext.global.console.warn("Observable: purgeManagedListeners has been deprecated. Please use clearManagedListeners.");}return this.clearManagedListeners.apply(this,arguments);},hasListener:function(h){h=Ext.canonicalEventName(h);
return !!this.hasListeners[h];},isSuspended:function(j){var i=this.eventsSuspended>0,h=this.events;if(!i&&j&&h){j=h[j];if(j&&j.isEvent){return j.isSuspended();}}return i;},suspendEvents:function(h){++this.eventsSuspended;if(h&&!this.eventQueue){this.eventQueue=[];}},suspendEvent:function(){var n=this,l=n.events,h=arguments.length,k,m,j;
for(k=0;k<h;k++){j=arguments[k];j=Ext.canonicalEventName(j);m=l[j];if(!m||!m.isEvent){m=n._initEvent(j);}m.suspend();}},resumeEvent:function(){var l=this.events||0,h=l&&arguments.length,k,m,j;for(k=0;k<h;k++){j=Ext.canonicalEventName(arguments[k]);m=l[j];if(m&&m.resume){m.resume();}}},resumeEvents:function(h){var i=this,l=i.eventQueue,k,j;
if(i.eventsSuspended&&!--i.eventsSuspended){delete i.eventQueue;if(!h&&l){k=l.length;for(j=0;j<k;j++){i.fireEventArgs.apply(i,l[j]);}}}},relayEvents:function(p,q,k){var o=this,l=q.length,j=0,h,m,n={};if(Ext.isObject(q)){for(j in q){m=q[j];n[j]=o.createRelayer(m);}}else{for(;j<l;j++){h=q[j];n[h]=o.createRelayer(k?k+h:h);
}}o.mon(p,n,null,null,undefined);return new c(o,p,n);},createRelayer:function(h,i){var j=this;return function(){return j.fireEventArgs.call(j,h,i?g.apply(arguments,i):arguments);};},enableBubble:function(p){if(p){var n=this,o=(typeof p=="string")?arguments:p,k=n.events,m=k&&o.length,j,l,h;for(h=0;h<m;
++h){j=o[h];j=Ext.canonicalEventName(j);l=k[j];if(!l||!l.isEvent){l=n._initEvent(j);}n.hasListeners._incr_(j);l.bubble=true;}}},destroy:function(){this.clearListeners();this.callParent();this.destroyObservable(true);},destroyObservable:function(j){var i=this,h=i.clearPropertiesOnDestroy;if(i.$observableDestroyed){return;
}if(!j){i.clearListeners();}if(i.destroyed){if(h){if(h===true&&!i.$nulled){i.$reap();}if(!i.clearPrototypeOnDestroy){i.fireEvent=i.fireEventArgs=i.fireAction=i.fireEventedAction=Ext.emptyFn;}i.events=i.managedListeners=i.eventedBeforeEventNames=null;i.$observableDestroyed=true;}if(i.clearPrototypeOnDestroy&&Object.setPrototypeOf&&!i.$alreadyNulled){Object.setPrototypeOf(i,null);
i.$alreadyNulled=true;}}},privates:{doAddListener:function(k,o,q,r,j,i,l){var n=this,m=false,h,p;j=j||(r&&r.order);if(j){p=(r&&r.priority);if(!p){r=r?Ext.Object.chain(r):{};r.priority=n.$orderToPriority[j];}}k=Ext.canonicalEventName(k);if(!o){Ext.raise("Cannot add '"+k+"' listener to "+n.$className+" instance.  No function specified.");
}h=(n.events||(n.events={}))[k];if(!h||!h.isEvent){h=n._initEvent(k);}if(o!==e){if(!l&&(q&&q.isObservable&&(q!==n))){l=q;}if(h.addListener(o,q,r,i,l)){n.hasListeners._incr_(k);m=true;}}return m;},doRemoveListener:function(j,l,k){var n=this,h=false,i=n.events,m;j=Ext.canonicalEventName(j);m=i&&i[j];if(!l){Ext.raise("Cannot remove '"+j+"' listener to "+n.$className+" instance.  No function specified.");
}if(m&&m.isEvent){if(m.removeListener(l,k)){n.hasListeners._decr_(j);h=true;}}return h;},_initEvent:function(h){return(this.events[h]=new Ext.util.Event(this,h));}},deprecated:{"5.0":{methods:{addEvents:null}}}};},function(){var b=this,e=b.prototype,c=function(){},f=function(g){if(!g.HasListeners){var h=g.prototype;
h.$observableMixedIn=1;b.prepareClass(g,this);g.onExtended(function(i,j){Ext.classSystemMonitor&&Ext.classSystemMonitor("extend mixin",arguments);b.prepareClass(i,null,j);});if(h.onClassMixedIn){Ext.override(g,{onClassMixedIn:function(i){f.call(this,i);this.callParent(arguments);}});}else{h.onClassMixedIn=function(i){f.call(this,i);
};}}a.call(this,g);},a=e.onClassMixedIn;c.prototype={_decr_:function(h,g){if(g==null){g=1;}if(!(this[h]-=g)){delete this[h];}},_incr_:function(g){if(this.hasOwnProperty(g)){++this[g];}else{this[g]=1;}}};e.HasListeners=b.HasListeners=c;b.createAlias({on:"addListener",un:"removeListener",mon:"addManagedListener",mun:"removeManagedListener",setListeners:"addListener"});
b.observeClass=b.observe;function d(m){var l=(this.methodEvents=this.methodEvents||{})[m],i,h,k,j=this,g;if(!l){j.methodEvents[m]=l={};l.originalFn=j[m];l.methodName=m;l.before=[];l.after=[];g=function(p,o,n){o=o||j;if(typeof p==="string"){p=o[p];}if((h=p.apply(o,n))!==undefined){if(typeof h=="object"){if(h.returnValue!==undefined){i=h.returnValue;
}else{i=h;}k=!!h.cancel;}else{if(h===false){k=true;}else{i=h;}}}};j[m]=function(){var q=Array.prototype.slice.call(arguments,0),p=q.length,o,r,n;i=h=undefined;k=false;for(r=0,n=l.before.length;r<n;r++){o=l.before[r];if(o.extraArgs){q.push.apply(q,o.extraArgs);}g(o.fn,o.scope,q);q.length=p;if(k||o.preventDefault){return i;
}}if((h=l.originalFn.apply(j,q))!==undefined){i=h;}for(r=0,n=l.after.length;r<n;r++){o=l.after[r];if(o.extraArgs){q.push.apply(q,o.extraArgs);}g(o.fn,o.scope,q);q.length=p;if(k||o.preventDefault){return i;}}return i;};}return l;}Ext.apply(e,{onClassMixedIn:f,beforeMethod:function(k,j,i,h,g){d.call(this,k).before.push({fn:j,scope:i,extraArgs:g,preventDefault:h});
},afterMethod:function(k,j,i,h,g){d.call(this,k).after.push({fn:j,scope:i,extraArgs:g,preventDefault:h});},removeMethodListener:function(m,k,j){var l=d.call(this,m),h,g;for(h=0,g=l.before.length;h<g;h++){if(l.before[h].fn==k&&l.before[h].scope==j){Ext.Array.erase(l.before,h,1);return;}}for(h=0,g=l.after.length;
h<g;h++){if(l.after[h].fn==k&&l.after[h].scope==j){Ext.Array.erase(l.after,h,1);return;}}},toggleEventLogging:function(g){Ext.util.Observable[g?"capture":"releaseCapture"](this,function(h){if(Ext.isDefined(Ext.global.console)){Ext.global.console.log(h,arguments);}});}});});