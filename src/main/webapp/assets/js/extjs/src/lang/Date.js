Ext.Date=(function(){var g,f=Date,m=/(\\.)/g,b=/([gGhHisucUOPZ]|MS)/,i=/([djzmnYycU]|MS)/,l=/\\/gi,d=/\{(\d+)\}/g,j=new RegExp("\\/Date\\(([-+])?(\\d+)(?:[+-]\\d{4})?\\)\\/"),e=Ext.String.leftPad,a={F:true,m:true,M:true,n:true},h={o:true,Y:true,y:true},c=["var me = this, dt, y, m, d, h, i, s, ms, o, O, z, zz, u, v, W, year, jan4, week1monday, daysInMonth, dayMatched,","def = me.defaults,","from = Ext.Number.from,","results = String(input).match(me.parseRegexes[{0}]);","if(results){","{1}","if(u != null){","v = new Date(u * 1000);","}else{","dt = me.clearTime(new Date);","y = from(y, from(def.y, dt.getFullYear()));","m = from(m, from(def.m - 1, dt.getMonth()));","dayMatched = d !== undefined;","d = from(d, from(def.d, dt.getDate()));","if (!dayMatched) {","dt.setDate(1);","dt.setMonth(m);","dt.setFullYear(y);","daysInMonth = me.getDaysInMonth(dt);","if (d > daysInMonth) {","d = daysInMonth;","}","}","h  = from(h, from(def.h, dt.getHours()));","i  = from(i, from(def.i, dt.getMinutes()));","s  = from(s, from(def.s, dt.getSeconds()));","ms = from(ms, from(def.ms, dt.getMilliseconds()));","if(z >= 0 && y >= 0){","v = me.add(new Date(y < 100 ? 100 : y, 0, 1, h, i, s, ms), me.YEAR, y < 100 ? y - 100 : 0);","v = !strict? v : (strict === true && (z <= 364 || (me.isLeapYear(v) && z <= 365))? me.add(v, me.DAY, z) : null);","}else if(strict === true && !me.isValid(y, m + 1, d, h, i, s, ms)){","v = null;","}else{","if (W) {","year = y || (new Date()).getFullYear();","jan4 = new Date(year, 0, 4, 0, 0, 0);","d = jan4.getDay();","week1monday = new Date(jan4.getTime() - ((d === 0 ? 6 : d - 1) * 86400000));","v = Ext.Date.clearTime(new Date(week1monday.getTime() + ((W - 1) * 604800000 + 43200000)));","} else {","v = me.add(new Date(y < 100 ? 100 : y, m, d, h, i, s, ms), me.YEAR, y < 100 ? y - 100 : 0);","}","}","}","}","if(v){","if(zz != null){","v = me.add(v, me.SECOND, -v.getTimezoneOffset() * 60 - zz);","}else if(o){","v = me.add(v, me.MINUTE, -v.getTimezoneOffset() + (sn == '+'? -1 : 1) * (hr * 60 + mn));","}","}","return (v != null) ? v : null;"].join("\n");
if(!Date.prototype.toISOString){Date.prototype.toISOString=function(){var n=this;return e(n.getUTCFullYear(),4,"0")+"-"+e(n.getUTCMonth()+1,2,"0")+"-"+e(n.getUTCDate(),2,"0")+"T"+e(n.getUTCHours(),2,"0")+":"+e(n.getUTCMinutes(),2,"0")+":"+e(n.getUTCSeconds(),2,"0")+"."+e(n.getUTCMilliseconds(),3,"0")+"Z";
};}function k(o){var n=Array.prototype.slice.call(arguments,1);return o.replace(d,function(p,q){return n[q];});}g={now:f.now,toString:function(n){if(!n){n=new f();}return n.getFullYear()+"-"+e(n.getMonth()+1,2,"0")+"-"+e(n.getDate(),2,"0")+"T"+e(n.getHours(),2,"0")+":"+e(n.getMinutes(),2,"0")+":"+e(n.getSeconds(),2,"0");
},getElapsed:function(o,n){return Math.abs(o-(n||g.now()));},useStrict:false,formatCodeToRegex:function(o,n){var q=g.parseCodes[o];if(q){q=typeof q==="function"?q():q;g.parseCodes[o]=q;}return q?Ext.applyIf({c:q.c?k(q.c,n||"{0}"):q.c},q):{g:0,c:null,s:Ext.String.escapeRegex(o)};},parseFunctions:{"MS":function(o,n){var p=(o||"").match(j);
return p?new f(((p[1]||"")+p[2])*1):null;},"time":function(o,n){var p=parseInt(o,10);if(p||p===0){return new f(p);}return null;},"timestamp":function(o,n){var p=parseInt(o,10);if(p||p===0){return new f(p*1000);}return null;}},parseRegexes:[],formatFunctions:{"MS":function(){return"\\/Date("+this.getTime()+")\\/";
},"time":function(){return this.getTime().toString();},"timestamp":function(){return g.format(this,"U");}},y2kYear:50,MILLI:"ms",SECOND:"s",MINUTE:"mi",HOUR:"h",DAY:"d",MONTH:"mo",YEAR:"y",DAYS_IN_WEEK:7,MONTHS_IN_YEAR:12,MAX_DAYS_IN_MONTH:31,SUNDAY:0,MONDAY:1,TUESDAY:2,WEDNESDAY:3,THURSDAY:4,FRIDAY:5,SATURDAY:6,defaults:{},dayNames:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],monthNames:["January","February","March","April","May","June","July","August","September","October","November","December"],monthNumbers:{January:0,Jan:0,February:1,Feb:1,March:2,Mar:2,April:3,Apr:3,May:4,June:5,Jun:5,July:6,Jul:6,August:7,Aug:7,September:8,Sep:8,October:9,Oct:9,November:10,Nov:10,December:11,Dec:11},defaultFormat:"m/d/Y",defaultTimeFormat:"h:i A",firstDayOfWeek:0,weekendDays:[0,6],getShortMonthName:function(n){return g.monthNames[n].substring(0,3);
},getShortDayName:function(n){return g.dayNames[n].substring(0,3);},getMonthNumber:function(n){return g.monthNumbers[n.substring(0,1).toUpperCase()+n.substring(1,3).toLowerCase()];},formatContainsHourInfo:function(n){return b.test(n.replace(m,""));},formatContainsDateInfo:function(n){return i.test(n.replace(m,""));
},isMonthFormat:function(n){return !!a[n];},isYearFormat:function(n){return !!h[n];},unescapeFormat:function(n){return n.replace(l,"");},formatCodes:{d:"Ext.String.leftPad(m.getDate(), 2, '0')",D:"Ext.Date.getShortDayName(m.getDay())",j:"m.getDate()",l:"Ext.Date.dayNames[m.getDay()]",N:"(m.getDay() ? m.getDay() : 7)",S:"Ext.Date.getSuffix(m)",w:"m.getDay()",z:"Ext.Date.getDayOfYear(m)",W:"Ext.String.leftPad(Ext.Date.getWeekOfYear(m), 2, '0')",F:"Ext.Date.monthNames[m.getMonth()]",m:"Ext.String.leftPad(m.getMonth() + 1, 2, '0')",M:"Ext.Date.getShortMonthName(m.getMonth())",n:"(m.getMonth() + 1)",t:"Ext.Date.getDaysInMonth(m)",L:"(Ext.Date.isLeapYear(m) ? 1 : 0)",o:"(m.getFullYear() + (Ext.Date.getWeekOfYear(m) == 1 && m.getMonth() > 0 ? +1 : (Ext.Date.getWeekOfYear(m) >= 52 && m.getMonth() < 11 ? -1 : 0)))",Y:"Ext.String.leftPad(m.getFullYear(), 4, '0')",y:"('' + m.getFullYear()).substring(2, 4)",a:"(m.getHours() < 12 ? 'am' : 'pm')",A:"(m.getHours() < 12 ? 'AM' : 'PM')",g:"((m.getHours() % 12) ? m.getHours() % 12 : 12)",G:"m.getHours()",h:"Ext.String.leftPad((m.getHours() % 12) ? m.getHours() % 12 : 12, 2, '0')",H:"Ext.String.leftPad(m.getHours(), 2, '0')",i:"Ext.String.leftPad(m.getMinutes(), 2, '0')",s:"Ext.String.leftPad(m.getSeconds(), 2, '0')",u:"Ext.String.leftPad(m.getMilliseconds(), 3, '0')",O:"Ext.Date.getGMTOffset(m)",P:"Ext.Date.getGMTOffset(m, true)",T:"Ext.Date.getTimezone(m)",Z:"(m.getTimezoneOffset() * -60)",c:function(){var r="Y-m-dTH:i:sP",p=[],o,n=r.length,q;
for(o=0;o<n;++o){q=r.charAt(o);p.push(q==="T"?"'T'":g.getFormatCode(q));}return p.join(" + ");},C:function(){return"m.toISOString()";},U:"Math.round(m.getTime() / 1000)"},isValid:function(q,t,o,n,u,p,s){n=n||0;u=u||0;p=p||0;s=s||0;var r=g.add(new f(q<100?100:q,t-1,o,n,u,p,s),g.YEAR,q<100?q-100:0);return q===r.getFullYear()&&t===r.getMonth()+1&&o===r.getDate()&&n===r.getHours()&&u===r.getMinutes()&&p===r.getSeconds()&&s===r.getMilliseconds();
},parse:function(o,r,n){var q=g.parseFunctions;if(q[r]==null){g.createParser(r);}return q[r].call(g,o,Ext.isDefined(n)?n:g.useStrict);},parseDate:function(o,p,n){return g.parse(o,p,n);},getFormatCode:function(o){var n=g.formatCodes[o];if(n){n=typeof n==="function"?n():n;g.formatCodes[o]=n;}return n||("'"+Ext.String.escape(o)+"'");
},createFormat:function(r){var q=[],n=false,p="",o;for(o=0;o<r.length;++o){p=r.charAt(o);if(!n&&p==="\\"){n=true;}else{if(n){n=false;q.push("'"+Ext.String.escape(p)+"'");}else{if(p==="\n"){q.push("'\\n'");}else{q.push(g.getFormatCode(p));}}}}g.formatFunctions[r]=Ext.functionFactory("var m=this;return "+q.join("+"));
},createParser:function(w){var o=g.parseRegexes.length,x=1,p=[],v=[],t=false,n="",r=0,s=w.length,u=[],q;for(;r<s;++r){n=w.charAt(r);if(!t&&n==="\\"){t=true;}else{if(t){t=false;v.push(Ext.String.escape(n));}else{q=g.formatCodeToRegex(n,x);x+=q.g;v.push(q.s);if(q.g&&q.c){if(q.calcAtEnd){u.push(q.c);}else{p.push(q.c);
}}}}}p=p.concat(u);g.parseRegexes[o]=new RegExp("^"+v.join("")+"$","i");g.parseFunctions[w]=Ext.functionFactory("input","strict",k(c,o,p.join("")));},parseCodes:{d:{g:1,c:"d = parseInt(results[{0}], 10);\n",s:"(3[0-1]|[1-2][0-9]|0[1-9])"},j:{g:1,c:"d = parseInt(results[{0}], 10);\n",s:"(3[0-1]|[1-2][0-9]|[1-9])"},D:function(){for(var n=[],o=0;
o<7;n.push(g.getShortDayName(o)),++o){}return{g:0,c:null,s:"(?:"+n.join("|")+")"};},l:function(){return{g:0,c:null,s:"(?:"+g.dayNames.join("|")+")"};},N:{g:0,c:null,s:"[1-7]"},S:{g:0,c:null,s:"(?:st|nd|rd|th)"},w:{g:0,c:null,s:"[0-6]"},z:{g:1,c:"z = parseInt(results[{0}], 10);\n",s:"(\\d{1,3})"},W:{g:1,c:"W = parseInt(results[{0}], 10);\n",s:"(\\d{2})"},F:function(){return{g:1,c:"m = parseInt(me.getMonthNumber(results[{0}]), 10);\n",s:"("+g.monthNames.join("|")+")"};
},M:function(){for(var n=[],o=0;o<12;n.push(g.getShortMonthName(o)),++o){}return Ext.applyIf({s:"("+n.join("|")+")"},g.formatCodeToRegex("F"));},m:{g:1,c:"m = parseInt(results[{0}], 10) - 1;\n",s:"(1[0-2]|0[1-9])"},n:{g:1,c:"m = parseInt(results[{0}], 10) - 1;\n",s:"(1[0-2]|[1-9])"},t:{g:0,c:null,s:"(?:\\d{2})"},L:{g:0,c:null,s:"(?:1|0)"},o:{g:1,c:"y = parseInt(results[{0}], 10);\n",s:"(\\d{4})"},Y:{g:1,c:"y = parseInt(results[{0}], 10);\n",s:"(\\d{4})"},y:{g:1,c:"var ty = parseInt(results[{0}], 10);\n"+"y = ty > me.y2kYear ? 1900 + ty : 2000 + ty;\n",s:"(\\d{2})"},a:{g:1,c:"if (/(am)/i.test(results[{0}])) {\n"+"if (!h || h == 12) { h = 0; }\n"+"} else { if (!h || h < 12) { h = (h || 0) + 12; }}",s:"(am|pm|AM|PM)",calcAtEnd:true},A:{g:1,c:"if (/(am)/i.test(results[{0}])) {\n"+"if (!h || h == 12) { h = 0; }\n"+"} else { if (!h || h < 12) { h = (h || 0) + 12; }}",s:"(AM|PM|am|pm)",calcAtEnd:true},g:{g:1,c:"h = parseInt(results[{0}], 10);\n",s:"(1[0-2]|[0-9])"},G:{g:1,c:"h = parseInt(results[{0}], 10);\n",s:"(2[0-3]|1[0-9]|[0-9])"},h:{g:1,c:"h = parseInt(results[{0}], 10);\n",s:"(1[0-2]|0[1-9])"},H:{g:1,c:"h = parseInt(results[{0}], 10);\n",s:"(2[0-3]|[0-1][0-9])"},i:{g:1,c:"i = parseInt(results[{0}], 10);\n",s:"([0-5][0-9])"},s:{g:1,c:"s = parseInt(results[{0}], 10);\n",s:"([0-5][0-9])"},u:{g:1,c:"ms = results[{0}]; ms = parseInt(ms, 10)/Math.pow(10, ms.length - 3);\n",s:"(\\d+)"},O:{g:1,c:["o = results[{0}];","var sn = o.substring(0,1),","hr = o.substring(1,3)*1 + Math.floor(o.substring(3,5) / 60),","mn = o.substring(3,5) % 60;","o = ((-12 <= (hr*60 + mn)/60) && ((hr*60 + mn)/60 <= 14))? (sn + Ext.String.leftPad(hr, 2, '0') + Ext.String.leftPad(mn, 2, '0')) : null;\n"].join("\n"),s:"([+-]\\d{4})"},P:{g:1,c:["o = results[{0}];","var sn = o.substring(0,1),","hr = o.substring(1,3)*1 + Math.floor(o.substring(4,6) / 60),","mn = o.substring(4,6) % 60;","o = ((-12 <= (hr*60 + mn)/60) && ((hr*60 + mn)/60 <= 14))? (sn + Ext.String.leftPad(hr, 2, '0') + Ext.String.leftPad(mn, 2, '0')) : null;\n"].join("\n"),s:"([+-]\\d{2}:\\d{2})"},T:{g:0,c:null,s:"[A-Z]{1,5}"},Z:{g:1,c:"zz = results[{0}] * 1;\n"+"zz = (-43200 <= zz && zz <= 50400)? zz : null;\n",s:"([+-]?\\d{1,5})"},c:function(){var p=[],n=[g.formatCodeToRegex("Y",1),g.formatCodeToRegex("m",2),g.formatCodeToRegex("d",3),g.formatCodeToRegex("H",4),g.formatCodeToRegex("i",5),g.formatCodeToRegex("s",6),{c:"ms = results[7] || '0'; ms = parseInt(ms, 10)/Math.pow(10, ms.length - 3);\n"},{c:["if(results[8]) {","if(results[8] == 'Z'){","zz = 0;","}else if (results[8].indexOf(':') > -1){",g.formatCodeToRegex("P",8).c,"}else{",g.formatCodeToRegex("O",8).c,"}","}"].join("\n")}],q,o;
for(q=0,o=n.length;q<o;++q){p.push(n[q].c);}return{g:1,c:p.join(""),s:[n[0].s,"(?:","-",n[1].s,"(?:","-",n[2].s,"(?:","(?:T| )?",n[3].s,":",n[4].s,"(?::",n[5].s,")?","(?:(?:\\.|,)(\\d+))?","(Z|(?:[-+]\\d{2}(?::)?\\d{2}))?",")?",")?",")?"].join("")};},U:{g:1,c:"u = parseInt(results[{0}], 10);\n",s:"(-?\\d+)"}},dateFormat:function(n,o){return g.format(n,o);
},isEqual:function(o,n){if(o&&n){return(o.getTime()===n.getTime());}return !(o||n);},format:function(o,p){var n=g.formatFunctions;if(!Ext.isDate(o)){return"";}if(n[p]==null){g.createFormat(p);}return n[p].call(o)+"";},getTimezone:function(n){return n.toString().replace(/^.* (?:\((.*)\)|([A-Z]{1,5})(?:[\-+][0-9]{4})?(?: -?\d+)?)$/,"$1$2").replace(/[^A-Z]/g,"");
},getGMTOffset:function(n,o){var p=n.getTimezoneOffset();return(p>0?"-":"+")+Ext.String.leftPad(Math.floor(Math.abs(p)/60),2,"0")+(o?":":"")+Ext.String.leftPad(Math.abs(p%60),2,"0");},getDayOfYear:function(p){var o=0,r=g.clone(p),n=p.getMonth(),q;for(q=0,r.setDate(1),r.setMonth(0);q<n;r.setMonth(++q)){o+=g.getDaysInMonth(r);
}return o+p.getDate()-1;},getWeekOfYear:(function(){var n=86400000,o=7*n;return function(q){var r=f.UTC(q.getFullYear(),q.getMonth(),q.getDate()+3)/n,p=Math.floor(r/7),s=new f(p*o).getUTCFullYear();return p-Math.floor(f.UTC(s,0,7)/o)+1;};}()),isLeapYear:function(n){var o=n.getFullYear();return !!((o&3)===0&&(o%100||(o%400===0&&o)));
},getFirstDayOfMonth:function(o){var n=(o.getDay()-(o.getDate()-1))%7;return(n<0)?(n+7):n;},getLastDayOfMonth:function(n){return g.getLastDateOfMonth(n).getDay();},getFirstDateOfMonth:function(n){return new f(n.getFullYear(),n.getMonth(),1);},getLastDateOfMonth:function(n){return new f(n.getFullYear(),n.getMonth(),g.getDaysInMonth(n));
},getDaysInMonth:(function(){var n=[31,28,31,30,31,30,31,31,30,31,30,31];return function(p){var o=p.getMonth();return o===1&&g.isLeapYear(p)?29:n[o];};}()),getSuffix:function(n){switch(n.getDate()){case 1:case 21:case 31:return"st";case 2:case 22:return"nd";case 3:case 23:return"rd";default:return"th";
}},clone:function(n){return new f(n.getTime());},isDST:function(n){return new f(n.getFullYear(),0,1).getTimezoneOffset()!==n.getTimezoneOffset();},clearTime:function(n,r){if(isNaN(n.getTime())){return n;}if(r){return g.clearTime(g.clone(n));}var p=n.getDate(),o,q;n.setHours(0);n.setMinutes(0);n.setSeconds(0);
n.setMilliseconds(0);if(n.getDate()!==p){for(o=1,q=g.add(n,g.HOUR,o);q.getDate()!==p;o++,q=g.add(n,g.HOUR,o)){}n.setDate(p);n.setHours(q.getHours());}return n;},add:function(p,o,t,q){var u=g.clone(p),s=0,n,r;if(!o||t===0){return u;}r=t-parseInt(t,10);t=parseInt(t,10);if(t){switch(o.toLowerCase()){case g.MILLI:if(q){u.setMilliseconds(u.getMilliseconds()+t);
}else{u.setTime(u.getTime()+t);}break;case g.SECOND:if(q){u.setSeconds(u.getSeconds()+t);}else{u.setTime(u.getTime()+t*1000);}break;case g.MINUTE:if(q){u.setMinutes(u.getMinutes()+t);}else{u.setTime(u.getTime()+t*60*1000);}break;case g.HOUR:if(q){u.setHours(u.getHours()+t);}else{u.setTime(u.getTime()+t*60*60*1000);
}break;case g.DAY:u.setDate(u.getDate()+t);break;case g.MONTH:n=p.getDate();if(n>28){n=Math.min(n,g.getLastDateOfMonth(g.add(g.getFirstDateOfMonth(p),g.MONTH,t)).getDate());}u.setDate(n);u.setMonth(p.getMonth()+t);break;case g.YEAR:n=p.getDate();if(n>28){n=Math.min(n,g.getLastDateOfMonth(g.add(g.getFirstDateOfMonth(p),g.YEAR,t)).getDate());
}u.setDate(n);u.setFullYear(p.getFullYear()+t);break;}}if(r){switch(o.toLowerCase()){case g.MILLI:s=1;break;case g.SECOND:s=1000;break;case g.MINUTE:s=1000*60;break;case g.HOUR:s=1000*60*60;break;case g.DAY:s=1000*60*60*24;break;case g.MONTH:n=g.getDaysInMonth(u);s=1000*60*60*24*n;break;case g.YEAR:n=(g.isLeapYear(u)?366:365);
s=1000*60*60*24*n;break;}if(s){u.setTime(u.getTime()+s*r);}}return u;},subtract:function(o,n,q,p){return g.add(o,n,-q,p);},between:function(o,q,n){var p=o.getTime();return q.getTime()<=p&&p<=n.getTime();},isWeekend:function(n){return Ext.Array.indexOf(this.weekendDays,n.getDay())>-1;},utcToLocal:function(n){return new Date(n.getUTCFullYear(),n.getUTCMonth(),n.getUTCDate(),n.getUTCHours(),n.getUTCMinutes(),n.getUTCSeconds(),n.getUTCMilliseconds());
},localToUtc:function(n){return g.utc(n.getFullYear(),n.getMonth(),n.getDate(),n.getHours(),n.getMinutes(),n.getSeconds(),n.getMilliseconds());},utc:function(t,u,o,n,q,r,p){return new Date(Date.UTC(t,u,o,n||0,q||0,r||0,p||0));},compat:function(){var v,w=["useStrict","formatCodeToRegex","parseFunctions","parseRegexes","formatFunctions","y2kYear","MILLI","SECOND","MINUTE","HOUR","DAY","MONTH","YEAR","defaults","dayNames","monthNames","monthNumbers","getShortMonthName","getShortDayName","getMonthNumber","formatCodes","isValid","parseDate","getFormatCode","createFormat","createParser","parseCodes"],u=["dateFormat","format","getTimezone","getGMTOffset","getDayOfYear","getWeekOfYear","isLeapYear","getFirstDayOfMonth","getLastDayOfMonth","getDaysInMonth","getSuffix","clone","isDST","clearTime","add","between"],o=w.length,n=u.length,r,t,q;
for(q=0;q<o;q++){r=w[q];f[r]=g[r];}for(v=0;v<n;v++){t=u[v];f.prototype[t]=function(){var p=Array.prototype.slice.call(arguments);p.unshift(this);return g[t].apply(g,p);};}},diff:function(o,n,q){var p,r=+n-o;switch(q){case g.MILLI:return r;case g.SECOND:return Math.floor(r/1000);case g.MINUTE:return Math.floor(r/60000);
case g.HOUR:return Math.floor(r/3600000);case g.DAY:return Math.floor(r/86400000);case"w":return Math.floor(r/604800000);case g.MONTH:p=(n.getFullYear()*12+n.getMonth())-(o.getFullYear()*12+o.getMonth());if(g.add(o,q,p)>n){return p-1;}return p;case g.YEAR:p=n.getFullYear()-o.getFullYear();if(g.add(o,q,p)>n){return p-1;
}else{return p;}}},align:function(o,q,p){var n=new f(+o);switch(q.toLowerCase()){case g.MILLI:return n;case g.SECOND:n.setUTCSeconds(n.getUTCSeconds()-n.getUTCSeconds()%p);n.setUTCMilliseconds(0);return n;case g.MINUTE:n.setUTCMinutes(n.getUTCMinutes()-n.getUTCMinutes()%p);n.setUTCSeconds(0);n.setUTCMilliseconds(0);
return n;case g.HOUR:n.setUTCHours(n.getUTCHours()-n.getUTCHours()%p);n.setUTCMinutes(0);n.setUTCSeconds(0);n.setUTCMilliseconds(0);return n;case g.DAY:if(p===7||p===14){n.setUTCDate(n.getUTCDate()-n.getUTCDay()+1);}n.setUTCHours(0);n.setUTCMinutes(0);n.setUTCSeconds(0);n.setUTCMilliseconds(0);return n;
case g.MONTH:n.setUTCMonth(n.getUTCMonth()-(n.getUTCMonth()-1)%p,1);n.setUTCHours(0);n.setUTCMinutes(0);n.setUTCSeconds(0);n.setUTCMilliseconds(0);return n;case g.YEAR:n.setUTCFullYear(n.getUTCFullYear()-n.getUTCFullYear()%p,1,1);n.setUTCHours(0);n.setUTCMinutes(0);n.setUTCSeconds(0);n.setUTCMilliseconds(0);
return o;}}};g.parseCodes.C=g.parseCodes.c;return g;}());