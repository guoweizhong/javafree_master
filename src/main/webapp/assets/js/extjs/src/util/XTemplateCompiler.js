Ext.define("Ext.util.XTemplateCompiler",{extend:"Ext.util.XTemplateParser",useEval:Ext.isGecko,useIndex:Ext.isIE8m,useFormat:true,propNameRe:/^[\w\d\$]*$/,compile:function(a){var c=this,b=c.generate(a);return c.useEval?c.evalTpl(b):(new Function("Ext",b))(Ext);},generate:function(a){var d=this,b="var fm=Ext.util.Format,ts=Object.prototype.toString;",c;
d.maxLevel=0;d.body=["var c0=values, a0="+d.createArrayTest(0)+", p0=parent, n0=xcount, i0=xindex, k0, v;\n"];if(d.definitions){if(typeof d.definitions==="string"){d.definitions=[d.definitions,b];}else{d.definitions.push(b);}}else{d.definitions=[b];}d.switches=[];d.parse(a);d.definitions.push((d.useEval?"$=":"return")+" function ("+d.fnArgs+") {",d.body.join(""),"}");
c=d.definitions.join("\n");d.definitions.length=d.body.length=d.switches.length=0;d.definitions=d.body=d.switches=0;return c;},doText:function(c){var b=this,a=b.body;c=c.replace(b.aposRe,"\\'").replace(b.newLineRe,"\\n");if(b.useIndex){a.push("out[out.length]='",c,"'\n");}else{a.push("out.push('",c,"')\n");
}},doExpr:function(b){var a=this.body;a.push("if ((v="+b+") != null) out");if(this.useIndex){a.push("[out.length]=v\n");}else{a.push(".push(v)\n");}},doTag:function(a){var b=this.parseTag(a);if(b){this.doExpr(b);}else{this.doText("{"+a+"}");}},doElse:function(){this.body.push("} else {\n");},doEval:function(a){this.body.push(a,"\n");
},doIf:function(b,c){var a=this;if(b==="."){a.body.push("if (values) {\n");}else{if(a.propNameRe.test(b)){a.body.push("if (",a.parseTag(b),") {\n");}else{a.body.push("if (",a.addFn(b),a.callFn,") {\n");}}if(c.exec){a.doExec(c.exec);}},doElseIf:function(b,c){var a=this;if(b==="."){a.body.push("else if (values) {\n");
}else{if(a.propNameRe.test(b)){a.body.push("} else if (",a.parseTag(b),") {\n");}else{a.body.push("} else if (",a.addFn(b),a.callFn,") {\n");}}if(c.exec){a.doExec(c.exec);}},doSwitch:function(c){var b=this,a;if(c==="."||c==="#"){a=c==="."?"values":"xindex";b.body.push("switch (",a,") {\n");}else{if(b.propNameRe.test(c)){b.body.push("switch (",b.parseTag(c),") {\n");
}else{b.body.push("switch (",b.addFn(c),b.callFn,") {\n");}}b.switches.push(0);},doCase:function(e){var d=this,c=Ext.isArray(e)?e:[e],f=d.switches.length-1,a,b;if(d.switches[f]){d.body.push("break;\n");}else{d.switches[f]++;}for(b=0,f=c.length;b<f;++b){a=d.intRe.exec(c[b]);c[b]=a?a[1]:("'"+c[b].replace(d.aposRe,"\\'")+"'");
}d.body.push("case ",c.join(": case "),":\n");},doDefault:function(){var a=this,b=a.switches.length-1;if(a.switches[b]){a.body.push("break;\n");}else{a.switches[b]++;}a.body.push("default:\n");},doEnd:function(b,d){var c=this,a=c.level-1;if(b=="for"||b=="foreach"){if(d.exec){c.doExec(d.exec);}c.body.push("}\n");
c.body.push("parent=p",a,";values=r",a+1,";xcount=n"+a+";xindex=i",a,"+1;xkey=k",a,";\n");}else{if(b=="if"||b=="switch"){c.body.push("}\n");}}},doFor:function(e,g){var d=this,c,b=d.level,a=b-1,f;if(e==="."){c="values";}else{if(d.propNameRe.test(e)){c=d.parseTag(e);}else{c=d.addFn(e)+d.callFn;}}if(d.maxLevel<b){d.maxLevel=b;
d.body.push("var ");}if(e=="."){f="c"+b;}else{f="a"+a+"?c"+a+"[i"+a+"]:c"+a;}d.body.push("i",b,"=0,n",b,"=0,c",b,"=",c,",a",b,"=",d.createArrayTest(b),",r",b,"=values,p",b,",k",b,";\n","p",b,"=parent=",f,"\n","if (c",b,"){if(a",b,"){n",b,"=c",b,".length;}else if (c",b,".isMixedCollection){c",b,"=c",b,".items;n",b,"=c",b,".length;}else if(c",b,".isStore){c",b,"=c",b,".data.items;n",b,"=c",b,".length;}else{c",b,"=[c",b,"];n",b,"=1;}}\n","for (xcount=n",b,";i",b,"<n"+b+";++i",b,"){\n","values=c",b,"[i",b,"]");
if(g.propName){d.body.push(".",g.propName);}d.body.push("\n","xindex=i",b,"+1\n");if(g.between){d.body.push('if(xindex>1){ out.push("',g.between,'"); } \n');}},doForEach:function(e,g){var d=this,c,b=d.level,a=b-1,f;if(e==="."){c="values";}else{if(d.propNameRe.test(e)){c=d.parseTag(e);}else{c=d.addFn(e)+d.callFn;
}}if(d.maxLevel<b){d.maxLevel=b;d.body.push("var ");}if(e=="."){f="c"+b;}else{f="a"+a+"?c"+a+"[i"+a+"]:c"+a;}d.body.push("i",b,"=-1,n",b,"=0,c",b,"=",c,",a",b,"=",d.createArrayTest(b),",r",b,"=values,p",b,",k",b,";\n","p",b,"=parent=",f,"\n","for(k",b," in c",b,"){\n","xindex=++i",b,"+1;\n","xkey=k",b,";\n","values=c",b,"[k",b,"];");
if(g.propName){d.body.push(".",g.propName);}if(g.between){d.body.push('if(xindex>1){ out.push("',g.between,'"); } \n');}},createArrayTest:("isArray" in Array)?function(a){return"Array.isArray(c"+a+")";}:function(a){return"ts.call(c"+a+')==="[object Array]"';},doExec:function(d,e){var c=this,a="f"+c.definitions.length,b=c.guards[c.strict?0:1];
c.definitions.push("function "+a+"("+c.fnArgs+") {",b.doTry," var $v = values; with($v) {","  "+d," }",b.doCatch,"}");c.body.push(a+c.callFn+"\n");},guards:[{doTry:"",doCatch:""},{doTry:"try { ",doCatch:" } catch(e) {\n"+'Ext.log.warn("XTemplate evaluation exception: " + e.message);\n'+"}"}],addFn:function(a){var d=this,b="f"+d.definitions.length,c=d.guards[d.strict?0:1];
if(a==="."){d.definitions.push("function "+b+"("+d.fnArgs+") {"," return values","}");}else{if(a===".."){d.definitions.push("function "+b+"("+d.fnArgs+") {"," return parent","}");}else{d.definitions.push("function "+b+"("+d.fnArgs+") {",c.doTry," var $v = values; with($v) {","  return("+a+")"," }",c.doCatch,"}");
}}return b;},parseTag:function(b){var g=this,a=g.tagRe.exec(b),e,h,d,f,c;if(!a){return null;}e=a[1];h=a[2];d=a[3];f=a[4];if(e=="."){if(!g.validTypes){g.definitions.push("var validTypes={string:1,number:1,boolean:1};");g.validTypes=true;}c='validTypes[typeof values] || ts.call(values) === "[object Date]" ? values : ""';
}else{if(e=="#"){c="xindex";}else{if(e=="$"){c="xkey";}else{if(e.substr(0,7)=="parent."){c=e;}else{if(isNaN(e)&&e.indexOf("-")==-1&&e.indexOf(".")!=-1){c="values."+e;}else{c="values['"+e+"']";}}}}}if(f){c="("+c+f+")";}if(h&&g.useFormat){d=d?","+d:"";if(h.substr(0,5)!="this."){h="fm."+h+"(";}else{h+="(";
}}else{return c;}return h+c+d+")";},evalTpl:function($){eval($);return $;},newLineRe:/\r\n|\r|\n/g,aposRe:/[']/g,intRe:/^\s*(\d+)\s*$/,tagRe:/^([\w-\.\#\$]+)(?:\:([\w\.]*)(?:\((.*?)?\))?)?(\s?[\+\-\*\/]\s?[\d\.\+\-\*\/\(\)]+)?$/},function(){var a=this.prototype;a.fnArgs="out,values,parent,xindex,xcount,xkey";
a.callFn=".call(this,"+a.fnArgs+")";});