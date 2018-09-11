Ext.define("Ext.event.publisher.Focus",{extend:"Ext.event.publisher.Dom",requires:["Ext.dom.Element","Ext.GlobalEvents"],type:"focus",handledEvents:["focusenter","focusleave","focusmove"],handledDomEvents:["focusin","focusout"],publishDelegatedDomEvent:function(c){var b=this,a=c.relatedTarget;if(b.$suppressEvents){return;
}if(c.type==="focusout"){if(a==null){b.processFocusIn(c,c.target,document.body);}}else{if(a==null||!a.tagName){a=document.body;}b.processFocusIn(c,a,c.target);}},processFocusIn:function(h,i,c){var j=this,l,b,f=[],g=j.focusFly,k,a,d;if((i&&g.attach(i).isFocusSuspended())||(c&&g.attach(c).isFocusSuspended())){return;
}if(c.compareDocumentPosition){k=!!(c.compareDocumentPosition(i)&4);}for(b=i,l=Ext.dom.Element.getCommonAncestor(c,i,true);b&&b!==l;b=b.parentNode){f.push(b);}if(f.length){a=j.createSyntheticEvent("focusleave",h,i,c,i,c,k);j.publish(a,f);if(a.stopped){return;}}f.length=0;for(b=c;b&&b!==l;b=b.parentNode){f.push(b);
}d=j.createSyntheticEvent("focusenter",h,c,i,i,c,k);if(f.length){j.publish(d,f);if(d.stopped){return;}}f=j.getPropagatingTargets(l);if(f.length){a=j.createSyntheticEvent("focusmove",h,c,i,i,c,k);j.publish(a,f);if(a.stopped){return;}}if(Ext.GlobalEvents.hasListeners.focus){Ext.GlobalEvents.fireEvent("focus",{event:d,toElement:c,fromElement:i,backwards:k});
}},createSyntheticEvent:function(d,h,f,c,g,b,a){var e=new Ext.event.Event(h);e.type=d;e.relatedTarget=c;e.target=f;e.fromElement=g;e.toElement=b;e.backwards=a;return e;}},function(b){var a;b.prototype.focusFly=new Ext.dom.Fly();b.instance=new b();if(!Ext.supports.FocusinFocusoutEvents){this.override({handledDomEvents:["focus","blur"],publishDelegatedDomEvent:function(d){var c=this,f;
c.callSuper([d]);f=d.target!==window&&d.target!==document;if(d.type==="blur"){if(!f){if(d.explicitOriginalTarget===b.previousActiveElement){if(d.target===window){clearTimeout(a);a=0;c.processFocusIn(d,b.previousActiveElement,document.body);b.previousActiveElement=null;}}}else{a=setTimeout(function(){a=0;
c.processFocusIn(d,d.target,document.body);b.previousActiveElement=null;},0);if(f&&Ext.cache[d.target.id]){Ext.cache[d.target.id].focusinTimeout=a;}}b.previousActiveElement=f?d.target:null;}else{clearTimeout(a);a=0;c.processFocusIn(d,b.previousActiveElement||document.body,f?d.target:document.body);}}});
Ext.define(null,{override:"Ext.dom.Element",destroy:function(){if(this.focusinTimeout){clearTimeout(this.focusinTimeout);this.focusinTimeout=null;}this.callParent();}});}});