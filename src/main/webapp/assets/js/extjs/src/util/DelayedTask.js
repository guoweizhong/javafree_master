Ext.util=Ext.util||{};Ext.util.DelayedTask=function(f,h,d,c,g){var e=this,b,a=Ext.GlobalEvents,i=function(){e.id=null;if(!(h&&h.destroyed)){f.apply(h,d||[]);}if(g!==false&&a.hasListeners.idle){a.fireEvent("idle");}};if(f){i.$origFn=f.$origFn?f.$origFn:f;i.$skipTimerCheck=i.$origFn.$skipTimerCheck;}c=typeof c==="boolean"?c:true;
e.id=null;e.delay=function(k,m,l,j){if(c){e.cancel();}if(typeof k==="number"){b=k;}f=m||f;h=l||h;d=j||d;e.delayTime=b;if(f){i.$origFn=f.$origFn?f.$origFn:f;i.$skipTimerCheck=i.$origFn.$skipTimerCheck;}if(!e.id){if(b===-1){e.id=Ext.Function.requestAnimationFrame(i);}else{e.id=Ext.defer(i,b);}}return e.id;
};e.cancel=function(){if(e.id){if(e.delayTime===-1){Ext.Function.cancelAnimationFrame(e.id);}else{clearTimeout(e.id);}e.id=null;}};e.flush=function(){if(e.id){e.cancel();i();}};e.stop=function(k,j){if(k&&k===f&&(!j||j===h)){e.cancel();}};};