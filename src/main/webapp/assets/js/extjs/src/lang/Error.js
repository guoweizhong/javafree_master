(function(){function a(){var c=this,b=c.sourceClass,e=c.sourceMethod,d=c.msg;if(e){if(d){e+="(): ";e+=d;}else{e+="()";}}if(b){e=e?(b+"."+e):b;}return e||d||"";}Ext.Error=function(c){if(Ext.isString(c)){c={msg:c};}var b=new Error();Ext.apply(b,c);b.message=b.message||b.msg;b.toString=a;return b;};Ext.apply(Ext.Error,{ignore:false,raise:function(d){d=d||{};
if(Ext.isString(d)){d={msg:d};}var c=this,f=c.raise.caller,e,b;if(f===Ext.raise){f=f.caller;}if(f){if(!d.sourceMethod&&(b=f.$name)){d.sourceMethod=b;}if(!d.sourceClass&&(b=f.$owner)&&(b=b.$className)){d.sourceClass=b;}}if(c.handle(d)!==true){e=a.call(d);Ext.log({msg:e,level:"error",dump:d,stack:true});
throw new Ext.Error(d);}},handle:function(){return this.ignore;}});})();Ext.deprecated=function(b){if(!b){b="";}function a(){Ext.raise('The method "'+a.$owner.$className+"."+a.$name+'" has been removed. '+b);}return a;return Ext.emptyFn;};Ext.raise=function(){Ext.Error.raise.apply(Ext.Error,arguments);
};(function(){if(typeof window==="undefined"){return;}var b=0,a=function(){var c=Ext.log&&Ext.log.counters,e=c&&(c.error+c.warn+c.info+c.log),d;if(e&&b!==e){d=[];if(c.error){d.push("Errors: "+c.error);}if(c.warn){d.push("Warnings: "+c.warn);}if(c.info){d.push("Info: "+c.info);}if(c.log){d.push("Log: "+c.log);
}window.status="*** "+d.join(" -- ");b=e;}};a.$skipTimerCheck=true;setInterval(a,1000);}());