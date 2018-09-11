Ext.define("Ext.data.proxy.Server",{extend:"Ext.data.proxy.Proxy",alias:"proxy.server",alternateClassName:"Ext.data.ServerProxy",uses:["Ext.data.Request"],isRemote:true,config:{url:"",pageParam:"page",startParam:"start",limitParam:"limit",groupParam:"group",groupDirectionParam:"groupDir",sortParam:"sort",filterParam:"filter",directionParam:"dir",idParam:"id",simpleSortMode:false,simpleGroupMode:false,noCache:true,cacheString:"_dc",timeout:30000,api:{create:undefined,read:undefined,update:undefined,destroy:undefined},extraParams:{}},primitiveRe:/string|number|boolean/,create:function(){return this.doRequest.apply(this,arguments);
},read:function(){return this.doRequest.apply(this,arguments);},update:function(){return this.doRequest.apply(this,arguments);},erase:function(){return this.doRequest.apply(this,arguments);},setExtraParam:function(a,b){var c=this.getExtraParams();c[a]=b;this.fireEvent("extraparamschanged",c);},updateExtraParams:function(b,a){this.fireEvent("extraparamschanged",b);
},buildRequest:function(a){var f=this,b=Ext.apply({},a.getParams()),g=Ext.applyIf(b,f.getExtraParams()||{}),e,d,c;Ext.applyIf(g,f.getParams(a));d=a.getId();c=f.getIdParam();if(d!==undefined&&g[c]===undefined){g[c]=d;}e=new Ext.data.Request({params:g,action:a.getAction(),records:a.getRecords(),url:a.getUrl(),operation:a,proxy:f});
e.setUrl(f.buildUrl(e));a.setRequest(e);return e;},processResponse:function(h,b,d,c){var f=this,a,e,g,i;if(f.destroying||f.destroyed){return;}f.fireEvent("beginprocessresponse",f,c,b);if(h===true){e=f.getReader();if(c.status===204){g=e.getNullResultSet();}else{g=e.read(f.extractResponseData(c),{recordCreator:b.getRecordCreator()});
}b.process(g,d,c);a=!b.wasSuccessful();}else{f.setException(b,c);a=true;}if(f.destroyed){return;}if(a){f.fireEvent("exception",f,c,b);}else{i=g.getMetadata();if(i){f.onMetaChange(i);}}if(f.destroyed){return;}f.afterRequest(d,h);f.fireEvent("endprocessresponse",f,c,b);},setException:function(b,a){b.setException({status:a.status,statusText:a.statusText,response:a});
},extractResponseData:Ext.identityFn,applyEncoding:function(a){return Ext.encode(a);},encodeSorters:function(e,c){var a=[],d=e.length,b;for(b=0;b<d;b++){a[b]=e[b].serialize();}return this.applyEncoding(c?a[0]:a);},encodeFilters:function(f){var a=[],e=f.length,g,c,d,b;for(c=0;c<e;c++){d=f[c];d.getFilterFn();
if(d.generatedFilterFn){b=d.serialize();g|=!this.primitiveRe.test(typeof b);a.push(b);}}return g?this.applyEncoding(a):a;},getParams:function(o){if(!o.isReadOperation){return{};}var u=this,t={},r=o.getGrouper(),a=o.getSorters(),m=o.getFilters(),h=o.getPage(),g=o.getStart(),s=o.getLimit(),k=u.getSimpleSortMode(),d=u.getSimpleGroupMode(),q=u.getPageParam(),e=u.getStartParam(),b=u.getLimitParam(),c=u.getGroupParam(),l=u.getGroupDirectionParam(),f=u.getSortParam(),p=u.getFilterParam(),n=u.getDirectionParam(),j,i;
if(q&&h){t[q]=h;}if(e&&(g||g===0)){t[e]=g;}if(b&&s){t[b]=s;}j=c&&r;if(j){if(d){t[c]=r.getProperty();if(l===c){t[c]+=" "+r.getDirection();}else{t[l]=r.getDirection();}}else{t[c]=u.encodeSorters([r],true);}}if(f&&a&&a.length>0){if(k){for(i=(a.length>1&&j)?1:0;i<a.length;i++){if(n===f){t[f]=Ext.Array.push(t[f]||[],a[i].getProperty()+" "+a[i].getDirection());
}else{t[f]=Ext.Array.push(t[f]||[],a[i].getProperty());t[n]=Ext.Array.push(t[n]||[],a[i].getDirection());}}}else{t[f]=u.encodeSorters(a);}}if(p&&m&&m.length>0){t[p]=u.encodeFilters(m);}return t;},buildUrl:function(c){var b=this,a=b.getUrl(c);if(!a){Ext.raise("You are using a ServerProxy but have not supplied it with a url.");
}if(b.getNoCache()){a=Ext.urlAppend(a,Ext.String.format("{0}={1}",b.getCacheString(),Ext.Date.now()));}return a;},getUrl:function(b){var a;if(b){a=b.getUrl()||this.getApi()[b.getAction()];}return a?a:this.callParent();},doRequest:function(a){Ext.raise("The doRequest function has not been implemented on your Ext.data.proxy.Server subclass. See src/data/ServerProxy.js for details");
},afterRequest:Ext.emptyFn,destroy:function(){var a=this;a.destroying=true;a.reader=a.writer=Ext.destroy(a.reader,a.writer);a.callParent();a.destroying=false;a.destroyed=true;}});