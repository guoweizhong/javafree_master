Ext.Number=(new function(){var d=this,c=(0.9).toFixed()!=="1",b=Math,a={count:false,inclusive:false,wrap:true};Ext.apply(d,{MIN_SAFE_INTEGER:Number.MIN_SAFE_INTEGER||-(b.pow(2,53)-1),MAX_SAFE_INTEGER:Number.MAX_SAFE_INTEGER||b.pow(2,53)-1,Clip:{DEFAULT:a,COUNT:Ext.applyIf({count:true},a),INCLUSIVE:Ext.applyIf({inclusive:true},a),NOWRAP:Ext.applyIf({wrap:false},a)},binarySearch:function(j,h,g,e){if(g===undefined){g=0;
}if(e===undefined){e=j.length;}--e;var f,i;while(g<=e){f=(g+e)>>>1;i=j[f];if(h===i){return f;}if(i<h){g=f+1;}else{e=f-1;}}return g;},bisectTuples:function(k,i,g,h,e){if(h===undefined){h=0;}if(e===undefined){e=k.length;}--e;var f,j;while(h<=e){f=(h+e)>>>1;j=k[f][g];if(i===j){return f;}if(j<i){h=f+1;}else{e=f-1;
}}return h;},clipIndices:function(l,m,g){g=g||a;var f=0,k=g.wrap,j,e,h;m=m||[];for(h=0;h<2;++h){j=e;e=m[h];if(e==null){e=f;}else{if(h&&g.count){e+=j;e=(e>l)?l:e;}else{if(k){e=(e<0)?(l+e):e;}if(h&&g.inclusive){++e;}e=(e<0)?0:((e>l)?l:e);}}f=l;}m[0]=j;m[1]=(e<j)?j:e;return m;},constrain:function(h,g,f){var e=parseFloat(h);
if(g===null){g=h;}if(f===null){f=h;}return(e<g)?g:((e>f)?f:e);},snap:function(h,f,g,i){var e;if(h===undefined||h<g){return g||0;}if(f){e=h%f;if(e!==0){h-=e;if(e*2>=f){h+=f;}else{if(e*2<-f){h-=f;}}}}return d.constrain(h,g,i);},snapInRange:function(h,e,g,i){var f;g=(g||0);if(h===undefined||h<g){return g;
}if(e&&(f=((h-g)%e))){h-=f;f*=2;if(f>=e){h+=e;}}if(i!==undefined){if(h>(i=d.snapInRange(i,e,g))){h=i;}}return h;},roundToNearest:function(f,e){e=e||1;return e*b.round(f/e);},roundToPrecision:function(g,e){var f=b.pow(10,e||1);return b.round(g*f)/f;},sign:b.sign||function(e){e=+e;if(e===0||isNaN(e)){return e;
}return(e>0)?1:-1;},log10:b.log10||function(e){return b.log(e)*b.LOG10E;},isEqual:function(f,e,g){if(!(typeof f==="number"&&typeof e==="number"&&typeof g==="number")){Ext.raise("All parameters should be valid numbers.");}return b.abs(f-e)<g;},isFinite:Number.isFinite||function(e){return typeof e==="number"&&isFinite(e);
},isInteger:Number.isInteger||function(e){return ~~(e+0)===e;},toFixed:c?function(g,e){e=e||0;var f=b.pow(10,e);return(b.round(g*f)/f).toFixed(e);}:function(f,e){return f.toFixed(e);},from:function(f,e){if(isFinite(f)){f=parseFloat(f);}return !isNaN(f)?f:e;},randomInt:function(f,e){return b.floor(b.random()*(e-f+1)+f);
},correctFloat:function(e){return parseFloat(e.toPrecision(14));}});Ext.num=function(){return d.from.apply(this,arguments);};}());