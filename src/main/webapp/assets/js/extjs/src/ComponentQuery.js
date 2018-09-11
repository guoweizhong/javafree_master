Ext.define("Ext.ComponentQuery",{singleton:true,requires:["Ext.ComponentManager","Ext.util.Operators","Ext.util.LruCache"]},function(){var f=this,r=Ext.util.Operators,j=/(\d*)n\+?(\d*)/,e=/\D/,l=/^(\s)+/,k=/\\(.)/g,m=new Ext.util.LruCache({maxSize:100}),n=["var r = [],","i = 0,","it = items,","l = it.length,","c;","for (; i < l; i++) {","c = it[i];","if (c.{0}) {","r.push(c);","}","}","return r;"].join(""),o=function(t,s){return s.method.apply(this,[t].concat(s.args));
},a=function(u,y){var s=[],v=0,x=u.length,w,t=y!==">";for(;v<x;v++){w=u[v];if(w.getRefItems){s=s.concat(w.getRefItems(t));}}return s;},g=function(t){var s=[],u=0,w=t.length,v;for(;u<w;u++){v=t[u];while(!!(v=v.getRefOwner())){s.push(v);}}return s;},d=function(t,y,x){if(y==="*"){return t.slice();}else{var s=[],u=0,w=t.length,v;
for(;u<w;u++){v=t[u];if(!v.destroyed&&v.isXType(y,x)){s.push(v);}}return s;}},b=function(B,C,v,u){var F=[],A=0,t=B.length,E,x,D,s,z,y,w;if(C.charAt(0)==="@"){E=true;C=C.substr(1);}if(C.charAt(0)==="?"){E=true;x=true;C=C.substr(1);}for(;A<t;A++){D=B[A];w=D.self&&D.self.getConfigurator&&D.self.$config.configs[C];
if(w){s=D[w.names.get]();}else{if(E&&!D.hasOwnProperty(C)){continue;}else{s=D[C];}}if(x){F.push(D);}else{if(v==="~="){if(s){if(!Ext.isArray(s)){s=s.split(" ");}for(z=0,y=s.length;z<y;z++){if(r[v](Ext.coerce(s[z],u),u)){F.push(D);break;}}}}else{if(v==="/="){if(s!=null&&u.test(s)){F.push(D);}}else{if(!u?!!D[C]:r[v](Ext.coerce(s,u),u)){F.push(D);
}}}}}return F;},h=function(v,z,u){var s=[],w=0,y=v.length,x,t;for(;w<y;w++){x=v[w];t=u?x.id:x.getItemId();if(t===z){s.push(x);}}return s;},q=function(s,t,u){return f.pseudos[t](s,u);},i=/^(\s?([>\^])\s?|\s|$)/,p=/^(#)?((?:\\\.|[\w\-])+|\*)(?:\((true|false)\))?/,c=[{re:/^\.((?:\\\.|[\w\-])+)(?:\((true|false)\))?/,method:d,argTransform:function(t){var s=t[0];
Ext.log.warn('"'+s+'" ComponentQuery selector style is deprecated,'+' use "'+s.replace(/^\./,"")+'" without the leading dot instead');if(t[1]!==undefined){t[1]=t[1].replace(k,"$1");}return t.slice(1);}},{re:/^(?:\[((?:[@?$])?[\w\-]*)\s*(?:([\^$*~%!\/]?=)\s*(['"])?((?:\\\]|.)*?)\3)?(?!\\)\])/,method:b,argTransform:function(y){var w=y[0],A=y[1],t=y[2],s=y[4],v;
if(s!==undefined){s=s.replace(k,"$1");var z=Ext.String.format,u="ComponentQuery selector '{0}' has an unescaped ({1}) character at the {2} "+"of the attribute value pattern. Usually that indicates an error "+"where the opening quote is not followed by the closing quote. "+"If you need to match a ({1}) character at the {2} of the attribute "+"value, escape the quote character in your pattern: (\\{1})",x;
if(x=/^(['"]).*?[^'"]$/.exec(s)){Ext.log.warn(z(u,w,x[1],"beginning"));}else{if(x=/^[^'"].*?(['"])$/.exec(s)){Ext.log.warn(z(u,w,x[1],"end"));}}}if(t==="/="){v=m.get(s);if(v){s=v;}else{s=m.add(s,new RegExp(s));}}return[A,t,s];}},{re:/^#((?:\\\.|[\w\-])+)/,method:h},{re:/^\:([\w\-]+)(?:\(((?:\{[^\}]+\})|(?:(?!\{)[^\s>\/]*?(?!\})))\))?/,method:q,argTransform:function(s){if(s[2]!==undefined){s[2]=s[2].replace(k,"$1");
}return s.slice(1);}},{re:/^(?:\{([^\}]+)\})/,method:n}];f.Query=Ext.extend(Object,{constructor:function(s){s=s||{};Ext.apply(this,s);},execute:function(u){var v=this.operations,t=[],x,w,s;for(w=0,s=v.length;w<s;w++){x=v[w];t=t.concat(this._execute(u,x));}return t;},_execute:function(t,v){var w=0,x=v.length,u,s;
if(!t){s=Ext.ComponentManager.getAll();}else{if(Ext.isIterable(t)){s=t;}else{if(t.isMixedCollection){s=t.items;}}}for(;w<x;w++){u=v[w];if(u.mode==="^"){s=g(s||[t]);}else{if(u.mode){s=a(s||[t],u.mode);}else{s=o(s||a([t]),u);}}if(w===x-1){return s;}}return[];},is:function(w,u){var v=this.operations,t=false,s=v.length,y,x;
if(s===0){return true;}for(x=0;x<s;x++){y=v[x];t=this._is(w,u,y);if(t){return t;}}return false;},_is:function(A,B,s){var y=s.length,t=[A],u,w,v,x,z,C;for(w=y-1;w>=0;--w){u=s[w];x=u.mode;if(x){if(x==="^"){t=a(t," ");}else{if(x===">"){z=[];for(v=0,y=t.length;v<y;++v){C=t[v].getRefOwner();if(C){z.push(C);
}}t=z;}else{t=g(t);}}}else{t=o(t,u);}if(t.length===0){return false;}}if(B){if(!x){t=g(t);}if(t.length>0){t=o(t,{method:h,args:[B.id,true]});}if(t.length===0){return false;}}return true;},getMatches:function(v,t){var s=t.length,u;for(u=0;u<s;++u){v=o(v,t[u]);if(v.length===0){break;}}return v;},isMultiMatch:function(){return this.operations.length>1;
}});Ext.apply(f,{cache:new Ext.util.LruCache({maxSize:100}),pseudos:{not:function(y,s){var w=0,x=y.length,v=[],u=-1,t;for(;w<x;++w){t=y[w];if(!f.is(t,s)){v[++u]=t;}}return v;},first:function(t){var s=[];if(t.length>0){s.push(t[0]);}return s;},last:function(u){var s=u.length,t=[];if(s>0){t.push(u[s-1]);
}return t;},focusable:function(t){var s=t.length,v=[],u=0,w;for(;u<s;u++){w=t[u];if(w.isFocusable&&w.isFocusable()){v.push(w);}}return v;},canfocus:function(t,w){var s=t.length,v=[],u=0,x;for(;u<s;u++){x=t[u];if(x.canFocus&&x.canFocus(false,w)){v.push(x);}}return v;},"nth-child":function(y,z){var A=[],t=j.exec(z==="even"&&"2n"||z==="odd"&&"2n+1"||!e.test(z)&&"n+"+z||z),w=(t[1]||1)-0,x=t[2]-0,v,s,u;
for(v=0;s=y[v];v++){u=v+1;if(w===1){if(x===0||u===x){A.push(s);}}else{if((u+x)%w===0){A.push(s);}}}return A;},scrollable:function(t){var s=t.length,v=[],u=0,w;for(;u<s;u++){w=t[u];if(w.scrollable||w._scrollable){v.push(w);}}return v;},visible:function(u,t){t=t==="true";var s=u.length,w=[],v=0,x;for(;
v<s;v++){x=u[v];if(x.isVisible(t)){w.push(x);}}return w;}},query:function(s,z){if(!s){return Ext.ComponentManager.getAll();}var u=[],A=[],x={},w=f.cache.get(s),v,y,t;if(!w){w=f.cache.add(s,f.parse(s));}u=w.execute(z);if(w.isMultiMatch()){v=u.length;for(t=0;t<v;t++){y=u[t];if(!x[y.id]){A.push(y);x[y.id]=true;
}}u=A;}return u;},visitPreOrder:function(s,u,w,v,t){f._visit(true,s,u,w,v,t);},visitPostOrder:function(s,u,w,v,t){f._visit(false,s,u,w,v,t);},_visit:function(C,t,B,A,D,x){var z=f.cache.get(t),w=[B],s,y=0,v,u;if(!z){z=f.cache.add(t,f.parse(t));}u=z.is(B);if(B.getRefItems){s=B.getRefItems();y=s.length;
}if(x){Ext.Array.push(w,x);}if(C){if(u){if(A.apply(D||B,w)===false){return false;}}}for(v=0;v<y;v++){if(f._visit.call(f,C,t,s[v],A,D,x)===false){return false;}}if(!C){if(u){if(A.apply(D||B,w)===false){return false;}}}},is:function(u,s,t){if(!s){return true;}if(typeof s==="function"){return s(u);}else{var v=f.cache.get(s);
if(!v){v=f.cache.add(s,f.parse(s));}return v.is(u,t);}},parse:function(t){var u=[],w,x,v,s;w=Ext.splitAndUnescape(t,",");for(v=0,s=w.length;v<s;v++){x=Ext.String.trim(w[v]);if(x===""){Ext.raise('Invalid ComponentQuery selector: ""');}u.push(f._parse(x));}return new f.Query({operations:u});},_parse:function(y){var t=[],w=Ext.String.trim,u=c.length,D,z,x,E,F,G,v,A,B,s,C;
while(y&&D!==y){D=y;z=y.match(p);if(z){E=z[1];x=w(z[2]).replace(k,"$1");if(E==="#"){t.push({method:h,args:[x]});}else{t.push({method:d,args:[x,Boolean(z[3])]});}y=y.replace(z[0],"").replace(l,"$1");}while(!(F=y.match(i))){for(A=0;y&&A<u;A++){B=c[A];G=y.match(B.re);s=B.method;v=B.argTransform;if(G){if(v){C=v(G);
}else{C=G.slice(1);}t.push({method:Ext.isString(B.method)?Ext.functionFactory("items",Ext.String.format.apply(Ext.String,[s].concat(G.slice(1)))):B.method,args:C});y=y.replace(G[0],"").replace(l,"$1");break;}if(A===(u-1)){Ext.raise('Invalid ComponentQuery selector: "'+arguments[0]+'"');}}}if(F[1]){t.push({mode:F[2]||F[1]});
y=y.replace(F[0],"").replace(l,"");}}return t;}});Ext.all=function(){return f.query.apply(f,arguments);};Ext.first=function(){var s=f.query.apply(f,arguments);return(s&&s[0])||null;};});