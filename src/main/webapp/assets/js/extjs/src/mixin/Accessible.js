Ext.define("Ext.mixin.Accessible",{extend:"Ext.Mixin",mixinConfig:{id:"accessible"},config:{ariaAttributes:{$value:null,lazy:true}},ariaEl:"el",privates:{getAriaLabelEl:function(c){var e=[],g,d,b,f,a;if(c){if(Ext.isFunction(c)){return c.call(this);}else{if(!Ext.isArray(c)){c=[c];}g=this.lookupReferenceHolder();
if(g){for(d=0,b=c.length;d<b;d++){f=g.lookupReference(c[d]);if(f){e.push(f.ariaEl.id);}}}}}return e.length?e.join(" "):null;}}});