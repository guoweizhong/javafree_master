Ext.String=(function(){var h=/^[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u2028\u2029\u202f\u205f\u3000]+|[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u2028\u2029\u202f\u205f\u3000]+$/g,m=/('|\\)/g,b=/([-.*+?\^${}()|\[\]\/\\])/g,o=/^\s+|\s+$/g,i=/\s+/,k=/(^[^a-z]*|[^\w])/gi,e,a,g,d,f=function(q,p){return e[p];
},j=function(q,p){return(p in a)?a[p]:String.fromCharCode(parseInt(p.substr(2),10));},c=function(q,p){if(q===null||q===undefined||p===null||p===undefined){return false;}return p.length<=q.length;},l=String.fromCharCode,n;return n={fromCodePoint:String.fromCodePoint||function(){var r,p="",s=[],q=-1,t=arguments.length;
while(++q<t){r=Number(arguments[q]);if(!isFinite(r)||r<0||r>1114111||Math.floor(r)!==r){Ext.raise("Invalid code point: "+r);}if(r<=65535){s.push(r);}else{r-=65536;s.push((r>>10)+55296,(r%1024)+56320);}if(q+1===t){p+=l(s);s.length=0;}}return p;},insert:function(r,t,q){if(!r){return t;}if(!t){return r;
}var p=r.length;if(!q&&q!==0){q=p;}if(q<0){q*=-1;if(q>=p){q=0;}else{q=p-q;}}if(q===0){r=t+r;}else{if(q>=r.length){r+=t;}else{r=r.substr(0,q)+t+r.substr(q);}}return r;},startsWith:function(r,t,q){var p=c(r,t);if(p){if(q){r=r.toLowerCase();t=t.toLowerCase();}p=r.lastIndexOf(t,0)===0;}return p;},endsWith:function(t,q,r){var p=c(t,q);
if(p){if(r){t=t.toLowerCase();q=q.toLowerCase();}p=t.indexOf(q,t.length-q.length)!==-1;}return p;},createVarName:function(p){return p.replace(k,"");},htmlEncode:function(p){return(!p)?p:String(p).replace(g,f);},htmlDecode:function(p){return(!p)?p:String(p).replace(d,j);},hasHtmlCharacters:function(p){return g.test(p);
},addCharacterEntities:function(q){var p=[],t=[],r,s;for(r in q){s=q[r];a[r]=s;e[s]=r;p.push(s);t.push(r);}g=new RegExp("("+p.join("|")+")","g");d=new RegExp("("+t.join("|")+"|&#[0-9]{1,5};"+")","g");},resetCharacterEntities:function(){e={};a={};this.addCharacterEntities({"&amp;":"&","&gt;":">","&lt;":"<","&quot;":'"',"&#39;":"'"});
},urlAppend:function(q,p){if(!Ext.isEmpty(p)){return q+(q.indexOf("?")===-1?"?":"&")+p;}return q;},trim:function(p){if(p){p=p.replace(h,"");}return p||"";},capitalize:function(p){if(p){p=p.charAt(0).toUpperCase()+p.substr(1);}return p||"";},uncapitalize:function(p){if(p){p=p.charAt(0).toLowerCase()+p.substr(1);
}return p||"";},ellipsis:function(r,q,s){if(r&&r.length>q){if(s){var t=r.substr(0,q-2),p=Math.max(t.lastIndexOf(" "),t.lastIndexOf("."),t.lastIndexOf("!"),t.lastIndexOf("?"));if(p!==-1&&p>=(q-15)){return t.substr(0,p)+"...";}}return r.substr(0,q-3)+"...";}return r;},escapeRegex:function(p){return p.replace(b,"\\$1");
},createRegex:function(t,s,q,p){var r=t;if(t!=null&&!t.exec){r=n.escapeRegex(String(t));if(s!==false){r="^"+r;}if(q!==false){r+="$";}r=new RegExp(r,(p!==false)?"i":"");}return r;},escape:function(p){return p.replace(m,"\\$1");},toggle:function(q,r,p){return q===r?p:r;},leftPad:function(q,r,s){var p=String(q);
s=s||" ";while(p.length<r){p=s+p;}return p;},repeat:function(t,s,q){if(s<1){s=0;}for(var p=[],r=s;r--;){p.push(t);}return p.join(q||"");},splitWords:function(p){if(p&&typeof p=="string"){return p.replace(o,"").split(i);}return p||[];}};}());Ext.String.resetCharacterEntities();Ext.htmlEncode=Ext.String.htmlEncode;
Ext.htmlDecode=Ext.String.htmlDecode;Ext.urlAppend=Ext.String.urlAppend;