Ext.define("Ext.Progress",{extend:"Ext.Gadget",xtype:["progress","progressbarwidget"],alternateClassName:"Ext.ProgressBarWidget",mixins:["Ext.ProgressBase"],config:{text:null,animate:false},cachedConfig:{textCls:Ext.baseCSSPrefix+"progress-text",cls:null},baseCls:Ext.baseCSSPrefix+"progress",template:[{reference:"backgroundEl"},{reference:"barEl",cls:Ext.baseCSSPrefix+"progress-bar",children:[{reference:"textEl"}]}],defaultBindProperty:"value",updateCls:function(a,c){var b=this.element;
if(c){b.removeCls(c);}if(a){b.addCls(a);}},updateUi:function(e,d){var c=this.element,a=this.barEl,b=this.baseCls+"-";this.callParent([e,d]);if(d){c.removeCls(b+d);a.removeCls(b+"bar-"+d);}c.addCls(b+e);a.addCls(b+"bar-"+e);},updateTextCls:function(a){this.backgroundEl.addCls(a+" "+a+"-back");this.textEl.addCls(a);
},updateValue:function(d,a){var c=this,b=c.getTextTpl();if(b){c.setText(b.apply({value:d,percent:Math.round(d*100)}));}if(!c.isConfiguring&&c.getAnimate()){c.stopBarAnimation();c.startBarAnimation(Ext.apply({from:{width:(a*100)+"%"},to:{width:(d*100)+"%"}},c.animate));}else{c.barEl.setStyle("width",(d*100)+"%");
}},updateText:function(a){this.backgroundEl.setHtml(a);this.textEl.setHtml(a);},doDestroy:function(){this.stopBarAnimation();this.callParent();},privates:{startBarAnimation:Ext.privateFn,stopBarAnimation:Ext.privateFn}});