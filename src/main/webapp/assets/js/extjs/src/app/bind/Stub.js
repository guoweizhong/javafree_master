Ext.define("Ext.app.bind.Stub",{extend:"Ext.app.bind.AbstractStub",requires:["Ext.app.bind.Binding"],isStub:true,dirty:true,formula:null,validationKey:"validation",constructor:function(a,b,c){var d=this,e=b;d.callParent([a,b]);d.boundValue=null;if(c){c.add(d);if(!c.isRootStub){e=c.path+"."+b;}d.checkHadValue();
}d.path=e;},destroy:function(){var b=this,c=b.formula,a=b.storeBinding;if(c){c.destroy();}if(a){a.destroy();}b.detachBound();b.callParent();},bindValidation:function(c,b){var a=this.parent;return a&&a.descend([this.validationKey,this.name]).bind(c,b);},bindValidationField:function(f,d){var c=this.parent,b=this.name,e=typeof f==="string",a;
if(c){a=c.bind(function(g){var h=null;if(g&&g.isModel){h=g.getField(b);}if(e){d[f](h,g,this);}else{f.call(d,h,g,this);}});}return a||null;},descend:function(f,c){var e=this,d=e.children||(e.children={}),g=c||0,b=f[g++],a;if(!(a=d[b])){a=new Ext.app.bind.Stub(e.owner,b,e);}if(g<f.length){a=a.descend(f,g);
}return a;},getChildValue:function(a){var g=this,e=g.name,d=g.bindMappings,f=d.store,c=d.model,b;if(!a&&!Ext.isString(a)){b=g.hadValue?null:undefined;}else{b=g.inspectValue(a);if(!b){if(a.isEntity){if(c[e]){b=a[c[e]]();}else{b=a.data[e];}}else{if(a.isStore&&f[e]){b=a[f[e]]();}else{b=a[e];if(b===undefined&&g.hadValue){b=null;
}}}}}return b;},getDataObject:function(){var e=this,a=e.parent.getDataObject(),c=e.name,b=a?a[c]:null,d;if(!b&&a&&a.isEntity){d=a.associations;if(d&&c in d){b=a[d[c].getterName]();}}if(!b||!(b.$className||Ext.isObject(b))){a[c]=b={};e.hadValue=true;e.invalidate(true,true);}return b;},getRawValue:function(){return this.getChildValue(this.getParentValue());
},graft:function(f){var g=this,e=g.parent,d=g.children,b=g.name,c,a;f.parent=e;f.children=d;if(e){e.children[b]=f;}if(d){for(c in d){d[c].parent=f;}}g.children=null;f.checkHadValue();a=g.callParent([f]);a.invalidate(true,true);return a;},isAvailable:function(){return this.checkAvailability();},isLoading:function(){return !this.checkAvailability(true);
},invalidate:function(b,a){var e=this,d=e.children,c;e.dirty=true;e.checkHadValue();if(!a&&e.isAvailable()){if(!e.scheduled){e.schedule();}}if(b&&d){for(c in d){d[c].invalidate(b,a);}}},isReadOnly:function(){var a=this.formula;return !!(a&&!a.set);},set:function(j,f){var i=this,k=i.parent,a=i.name,g=i.formula,h,c,b,d,e;
if(g&&!g.settingValue&&g.set){g.setValue(j);return;}else{if(i.isLinkStub){d=i.getLinkFormulaStub();g=d?d.formula:null;if(g){if(d.isReadOnly()){Ext.raise("Cannot setValue on a readonly formula");}g.setValue(j);return;}}}h=k.getDataObject();if(h.isEntity){c=h.associations;if(c&&(a in c)){b=c[a];e=b.setterName;
if(e){h[e](j);}i.invalidate(true);}else{h.set(a,j);}}else{if((j&&j.constructor===Object)||!(j===h[a]&&h.hasOwnProperty(a))){if(f||!i.setByLink(j)){if(j===undefined){delete h[a];}else{h[a]=j;}i.inspectValue(h);i.invalidate(true);}}}},onStoreDataChanged:function(){this.invalidate(true);},afterLoad:function(a){this.invalidate(true);
},afterCommit:function(a){this.afterEdit(a,null);},afterEdit:function(f,d){var b=this.children,g=d&&d.length,c=f.associations,h=this.bindMappings.model,j,e,a;if(b){if(g){for(e=0;e<g;++e){a=b[d[e]];if(a){a.invalidate();}}}else{for(j in b){if(!(c&&j in c)){b[j].invalidate();}}}for(j in h){a=b[j];if(a){a.invalidate();
}}}this.invalidate();},afterReject:function(a){this.afterEdit(a,null);},afterAssociatedRecordSet:function(a,d,e){var c=this.children,b=e.role;if(c&&b in c){c[b].invalidate(true);}},setByLink:function(j){var f=this,b=0,e=false,d,h,k,c,g,a;for(c=f;c;c=c.parent){if(c.isLinkStub){h=c;if(b){for(k=[],d=0,c=f;
c!==h;c=c.parent){++d;k[b-d]=c.name;}}break;}++b;}c=null;if(h){g=h.parent;a=h.name;if(!g.shouldClimb(a)){c=g.insertChild(a);}else{c=h.getTargetStub();}}if(c){if(k){c=c.descend(k);}c.set(j);e=true;}return e;},setFormula:function(c){var a=this,b=a.formula;if(b){b.destroy();}a.formula=new Ext.app.bind.Formula(a,c);
},react:function(){var c=this,b=this.boundValue,a=c.children,d;if(b){if(b.isValidation){b.refresh();d=b.generation;if(c.lastValidationGeneration===d){return;}c.lastValidationGeneration=d;}else{if(b.isModel){if(a&&a[c.validationKey]){b.isValid();}}}}this.callParent();},privates:{bindMappings:{store:{count:"getCount",first:"first",last:"last",loading:"hasPendingLoad",totalCount:"getTotalCount"},model:{dirty:"isDirty",phantom:"isPhantom",valid:"isValid"}},checkAvailability:function(e){var h=this,k=h.parent,i=h.bindMappings,a=h.name,b=!!(k&&k.checkAvailability(e)),d,g,j,f,c;
if(b){g=h.getParentValue();j=h.inspectValue(g);if(j){if(e){b=!j.hasPendingLoad();}else{if(j.isStore){b=true;}else{b=!j.isLoading()||j.loadCount>0;}}}else{if(g){if(g.isModel){if(i.model[a]){b=!k.isLoading();f=true;}else{d=g.associations;if(!(d&&a in d)){b=true;f=true;}}}else{if(g.isStore&&i.store[a]&&a!=="loading"){b=!k.isLoading();
f=true;}}}if(!f){b=h.hadValue||h.getRawValue()!==undefined;}}}return b;},checkHadValue:function(){if(!this.hadValue){this.hadValue=this.getRawValue()!==undefined;}},collect:function(){var c=this,a=c.callParent(),b=c.storeBinding?1:0,d=c.formula?1:0;return a+b+d;},getLinkFormulaStub:function(){var a=this;
while(a.isLinkStub){a=a.binding.stub;}return a.formula?a:null;},getParentValue:function(){var a=this;if(a.dirty){a.parentValue=a.parent.getValue();a.dirty=false;}return a.parentValue;},setStore:function(a){this.storeBinding=a;},inspectValue:function(g){var h=this,a=h.name,e=h.boundValue,b=null,c,i,d,f;
if(g&&g.isEntity){c=g.associations;if(c&&(a in c)){b=g[c[a].getterName]();}else{if(a===h.validationKey){b=g.getValidation();h.lastValidationGeneration=null;}}}else{if(g){i=g[a];if(i&&(i.isModel||i.isStore)){b=i;}}}d=e!==b;if(d){if(e){h.detachBound();}if(b){if(b.isModel){b.join(h);}else{f=b.associatedEntity;
if(f&&b.autoLoad!==false&&!b.complete&&!b.hasPendingLoad()){b.load();}b.on({scope:h,beforeload:"onStoreDataChanged",load:"onStoreDataChanged",datachanged:"onStoreDataChanged",destroy:"onDestroyBound"});}}h.boundValue=b;}return b;},detachBound:function(){var a=this,b=a.boundValue;if(b&&!b.destroyed){if(b.isModel){b.unjoin(a);
}else{b.un({scope:a,beforeload:"onStoreDataChanged",load:"onStoreDataChanged",datachanged:"onStoreDataChanged",destroy:"onDestroyBound"});}}},onDestroyBound:function(){if(!this.owner.destroying){this.set(null);}},sort:function(){var c=this,d=c.formula,a=c.scheduler,b=c.storeBinding;c.callParent();if(b){a.sortItem(b);
}if(d){a.sortItem(d);}}}});