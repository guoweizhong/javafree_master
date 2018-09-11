/*!
* Ext JS Library
* Copyright(c) 2006-2015 Sencha Inc.
* licensing@sencha.com
* http://www.sencha.com/license
*/
Ext.define("Ext.ux.desktop.Video",{extend:"Ext.panel.Panel",alias:"widget.video",layout:"fit",autoplay:false,controls:true,bodyStyle:"background-color:#000;color:#fff",html:"",tpl:['<video id="{id}-video" autoPlay="{autoplay}" controls="{controls}" poster="{poster}" start="{start}" loopstart="{loopstart}" loopend="{loopend}" autobuffer="{autobuffer}" loop="{loop}" style="width:100%;height:100%">','<tpl for="src">','<source src="{src}" type="{type}"/>',"</tpl>","{html}","</video>"],initComponent:function(){var e=this,f,c,b,d;
if(e.fallbackHTML){f=e.fallbackHTML;}else{f="Your browser does not support HTML5 Video. ";if(Ext.isChrome){f+="Upgrade Chrome.";}else{if(Ext.isGecko){f+="Upgrade to Firefox 3.5 or newer.";}else{var a='<a href="http://www.google.com/chrome">Chrome</a>';f+='Please try <a href="http://www.mozilla.com">Firefox</a>';
if(Ext.isIE){f+=", "+a+' or <a href="http://www.apple.com/safari/">Safari</a>.';}else{f+=" or "+a+".";}}}}e.fallbackHTML=f;b=e.data=Ext.copyTo({tag:"video",html:f},e,"id,poster,start,loopstart,loopend,playcount,autobuffer,loop");if(e.autoplay){b.autoplay=1;}if(e.controls){b.controls=1;}if(Ext.isArray(e.src)){b.src=e.src;
}else{b.src=[{src:e.src}];}e.callParent();},afterRender:function(){var a=this;a.callParent();a.video=a.body.getById(a.id+"-video");el=a.video.dom;a.supported=(el&&el.tagName.toLowerCase()=="video");if(a.supported){a.video.on("error",a.onVideoError,a);}},getFallback:function(){return'<h1 style="background-color:#ff4f4f;padding: 10px;">'+this.fallbackHTML+"</h1>";
},onVideoError:function(){var a=this;a.video.remove();a.supported=false;a.body.createChild(a.getFallback());},doDestroy:function(){var c=this;var b=c.video;if(c.supported&&b){var a=b.dom;if(a&&a.pause){a.pause();}b.remove();c.video=null;}c.callParent();}});