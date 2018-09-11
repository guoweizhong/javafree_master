Ext.define("Ext.ux.colorpick.ColorUtils",function(a){var b=Ext.isIE&&Ext.ieVersion<10;return{singleton:true,constructor:function(){a=this;},backgroundTpl:b?"filter: progid:DXImageTransform.Microsoft.gradient(GradientType=0, "+"startColorstr='#{alpha}{hex}', endColorstr='#{alpha}{hex}');":"background: {rgba};",setBackground:b?function(e,c){if(e){var d=Ext.XTemplate.getTpl(a,"backgroundTpl"),f={hex:a.rgb2hex(c.r,c.g,c.b),alpha:Math.floor(c.a*255).toString(16)},g=d.apply(f);
e.applyStyles(g);}}:function(e,c){if(e){var d=Ext.XTemplate.getTpl(a,"backgroundTpl"),f={rgba:a.getRGBAString(c)},g=d.apply(f);e.applyStyles(g);}},formats:{HEX6:function(c){return a.rgb2hex(c.r,c.g,c.b);},HEX8:function(c){var e=a.rgb2hex(c.r,c.g,c.b),d=Math.round(c.a*255).toString(16);if(d.length<2){e+="0";
}e+=d.toUpperCase();return e;}},hexRe:/#?([0-9a-f]{3,8})/i,rgbaAltRe:/rgba\(\s*([\w#\d]+)\s*,\s*([\d\.]+)\s*\)/,rgbaRe:/rgba\(\s*([\d\.]+)\s*,\s*([\d\.]+)\s*,\s*([\d\.]+)\s*,\s*([\d\.]+)\s*\)/,rgbRe:/rgb\(\s*([\d\.]+)\s*,\s*([\d\.]+)\s*,\s*([\d\.]+)\s*\)/,parseColor:function(c){if(!c){return null;}var h=this,g=h.colorMap[c],f,e,d;
if(g){e={r:g[0],g:g[1],b:g[2],a:1};}else{if(c==="transparent"){e={r:0,g:0,b:0,a:0};}else{f=h.hexRe.exec(c);if(f){f=f[1];switch(f.length){default:return null;case 3:e={r:parseInt(f[0]+f[0],16),g:parseInt(f[1]+f[1],16),b:parseInt(f[2]+f[2],16),a:1};break;case 6:case 8:e={r:parseInt(f.substr(0,2),16),g:parseInt(f.substr(2,2),16),b:parseInt(f.substr(4,2),16),a:parseInt(f.substr(6,2)||"ff",16)/255};
break;}}else{f=h.rgbaRe.exec(c);if(f){e={r:parseFloat(f[1]),g:parseFloat(f[2]),b:parseFloat(f[3]),a:parseFloat(f[4])};}else{f=h.rgbaAltRe.exec(c);if(f){e=h.parseColor(f[1]);e.a=parseFloat(f[2]);return e;}f=h.rgbRe.exec(c);if(f){e={r:parseFloat(f[1]),g:parseFloat(f[2]),b:parseFloat(f[3]),a:1};}else{return null;
}}}}}d=this.rgb2hsv(e.r,e.g,e.b);return Ext.apply(e,d);},getRGBAString:function(c){return"rgba("+c.r+","+c.g+","+c.b+","+c.a+")";},getRGBString:function(c){return"rgb("+c.r+","+c.g+","+c.b+")";},hsv2rgb:function(k,j,g){k=k*360;if(k===360){k=0;}var l=g*j;var f=k/60;var e=l*(1-Math.abs(f%2-1));var i=[0,0,0];
switch(Math.floor(f)){case 0:i=[l,e,0];break;case 1:i=[e,l,0];break;case 2:i=[0,l,e];break;case 3:i=[0,e,l];break;case 4:i=[e,0,l];break;case 5:i=[l,0,e];break;default:console.error("unknown color "+k+" "+j+" "+g);break;}var d=g-l;i[0]+=d;i[1]+=d;i[2]+=d;i[0]=Math.round(i[0]*255);i[1]=Math.round(i[1]*255);
i[2]=Math.round(i[2]*255);return{r:i[0],g:i[1],b:i[2]};},rgb2hsv:function(d,i,l){d=d/255;i=i/255;l=l/255;var j=Math.max(d,i,l);var e=Math.min(d,i,l);var k=j-e;var o=0;if(k!==0){if(j===d){o=((i-l)/k)%6;}else{if(j===i){o=((l-d)/k)+2;}else{if(j===l){o=((d-i)/k)+4;}}}}var f=o*60;if(f===360){f=0;}var n=j;
var p=0;if(k!==0){p=k/n;}f=f/360;if(f<0){f=f+1;}return{h:f,s:p,v:n};},rgb2hex:function(e,d,c){e=e.toString(16);d=d.toString(16);c=c.toString(16);if(e.length<2){e="0"+e;}if(d.length<2){d="0"+d;}if(c.length<2){c="0"+c;}return(e+d+c).toUpperCase();},colorMap:{aliceblue:[240,248,255],antiquewhite:[250,235,215],aqua:[0,255,255],aquamarine:[127,255,212],azure:[240,255,255],beige:[245,245,220],bisque:[255,228,196],black:[0,0,0],blanchedalmond:[255,235,205],blue:[0,0,255],blueviolet:[138,43,226],brown:[165,42,42],burlywood:[222,184,135],cadetblue:[95,158,160],chartreuse:[127,255,0],chocolate:[210,105,30],coral:[255,127,80],cornflowerblue:[100,149,237],cornsilk:[255,248,220],crimson:[220,20,60],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgoldenrod:[184,132,11],darkgray:[169,169,169],darkgreen:[0,100,0],darkgrey:[169,169,169],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkseagreen:[143,188,143],darkslateblue:[72,61,139],darkslategray:[47,79,79],darkslategrey:[47,79,79],darkturquoise:[0,206,209],darkviolet:[148,0,211],deeppink:[255,20,147],deepskyblue:[0,191,255],dimgray:[105,105,105],dimgrey:[105,105,105],dodgerblue:[30,144,255],firebrick:[178,34,34],floralwhite:[255,255,240],forestgreen:[34,139,34],fuchsia:[255,0,255],gainsboro:[220,220,220],ghostwhite:[248,248,255],gold:[255,215,0],goldenrod:[218,165,32],gray:[128,128,128],green:[0,128,0],greenyellow:[173,255,47],grey:[128,128,128],honeydew:[240,255,240],hotpink:[255,105,180],indianred:[205,92,92],indigo:[75,0,130],ivory:[255,255,240],khaki:[240,230,140],lavender:[230,230,250],lavenderblush:[255,240,245],lawngreen:[124,252,0],lemonchiffon:[255,250,205],lightblue:[173,216,230],lightcoral:[240,128,128],lightcyan:[224,255,255],lightgoldenrodyellow:[250,250,210],lightgray:[211,211,211],lightgreen:[144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightsalmon:[255,160,122],lightseagreen:[32,178,170],lightskyblue:[135,206,250],lightslategray:[119,136,153],lightslategrey:[119,136,153],lightsteelblue:[176,196,222],lightyellow:[255,255,224],lime:[0,255,0],limegreen:[50,205,50],linen:[250,240,230],magenta:[255,0,255],maroon:[128,0,0],mediumaquamarine:[102,205,170],mediumblue:[0,0,205],mediumorchid:[186,85,211],mediumpurple:[147,112,219],mediumseagreen:[60,179,113],mediumslateblue:[123,104,238],mediumspringgreen:[0,250,154],mediumturquoise:[72,209,204],mediumvioletred:[199,21,133],midnightblue:[25,25,112],mintcream:[245,255,250],mistyrose:[255,228,225],moccasin:[255,228,181],navajowhite:[255,222,173],navy:[0,0,128],oldlace:[253,245,230],olive:[128,128,0],olivedrab:[107,142,35],orange:[255,165,0],orangered:[255,69,0],orchid:[218,112,214],palegoldenrod:[238,232,170],palegreen:[152,251,152],paleturquoise:[175,238,238],palevioletred:[219,112,147],papayawhip:[255,239,213],peachpuff:[255,218,185],peru:[205,133,63],pink:[255,192,203],plum:[221,160,203],powderblue:[176,224,230],purple:[128,0,128],red:[255,0,0],rosybrown:[188,143,143],royalblue:[65,105,225],saddlebrown:[139,69,19],salmon:[250,128,114],sandybrown:[244,164,96],seagreen:[46,139,87],seashell:[255,245,238],sienna:[160,82,45],silver:[192,192,192],skyblue:[135,206,235],slateblue:[106,90,205],slategray:[119,128,144],slategrey:[119,128,144],snow:[255,255,250],springgreen:[0,255,127],steelblue:[70,130,180],tan:[210,180,140],teal:[0,128,128],thistle:[216,191,216],tomato:[255,99,71],turquoise:[64,224,208],violet:[238,130,238],wheat:[245,222,179],white:[255,255,255],whitesmoke:[245,245,245],yellow:[255,255,0],yellowgreen:[154,205,5]}};
},function(c){var a=c.formats,b={};a["#HEX6"]=function(d){return"#"+a.HEX6(d);};a["#HEX8"]=function(d){return"#"+a.HEX8(d);};Ext.Object.each(a,function(d,e){b[d.toLowerCase()]=function(f){var g=e(f);return g.toLowerCase();};});Ext.apply(a,b);});