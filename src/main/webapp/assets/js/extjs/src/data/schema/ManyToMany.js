Ext.define("Ext.data.schema.ManyToMany",{extend:"Ext.data.schema.Association",isManyToMany:true,isToMany:true,kind:"many-to-many",Left:Ext.define(null,{extend:"Ext.data.schema.Role",isMany:true,digitRe:/^\d+$/,findRecords:function(k,l,d){var m=k.getMatrixSlice(this.inverse,l.id),e=m.members,j=[],n=this.cls,a,g,h,b,f,c;
if(d){a={};for(g=0,h=d.length;g<h;++g){c=d[g];b=c.id;f=e[b];if(!(f&&f[2]===-1)){j.push(c);}a[b]=true;}}for(b in e){f=e[b];if(!a||!a[b]&&(f&&f[2]!==-1)){c=k.peekRecord(n,b);if(c){j.push(c);}}}return j;},onIdChanged:function(a,d,c){var b=this.getAssociatedItem(a);if(b){b.getFilters().get(this.$roleFilterId).setValue(c);
}},processLoad:function(b,a,e,d){var c=e;if(d){c=this.findRecords(d,a,e);this.onAddToMany(b,c,true);}return c;},processUpdate:function(f,b){var g=this,d=g.inverse.cls,e=b.R,a,h,i,c;if(e){for(a in e){h=f.peekRecord(d,a);if(h){c=f.getEntityList(g.cls,e[a]);i=g.getAssociatedItem(h);if(i){i.loadData(c);i.complete=true;
}else{h[g.getterName](null,null,c);}}else{f.onInvalidAssociationEntity(d,a);}}}g.processMatrixBlock(f,b.C,1);g.processMatrixBlock(f,b.D,-1);},checkMembership:function(h,i){var j=h.getMatrix(this.association,true),g,d,e,l,m,a,c,f,b,k;if(!j){return;}g=this.left?j.right:j.left;d=g.inverse.role.cls;e=this.inverse;
m=g.slices;if(m){l=m[i.id];if(l){c=l.members;for(a in c){f=c[a];if(f[2]!==-1){b=h.peekRecord(d,a);if(b){k=e.getAssociatedItem(b);if(k){k.matrixUpdate=1;k.add(i);k.matrixUpdate=0;}}}}}}},onStoreCreate:function(b,d,e){var c=this,a;if(d){a=d.getMatrixSlice(c.inverse,e);a.attach(b);a.notify=c.onMatrixUpdate;
a.scope=c;}},processMatrixBlock:function(e,d,c){var a=this.inverse,b=this.digitRe,f,g;if(d){for(g in d){if(b.test(g)){g=parseInt(g,10);}f=e.getMatrixSlice(a,g);f.update(d[g],c);}}},createGetter:function(){var a=this;return function(b,c,d){return a.getAssociatedStore(this,b,c,d,false);};},onAddToMany:function(a,c,b){if(!a.matrixUpdate){a.matrixUpdate=1;
a.matrix.update(c,b===true?0:1);a.matrixUpdate=0;}},onRemoveFromMany:function(b,a){if(!b.matrixUpdate){b.matrixUpdate=1;b.matrix.update(a,-1);b.matrixUpdate=0;}},read:function(a,d,b,e){var c=this,f=c.callParent([a,d,b,e]);if(f){a[c.getterName](null,null,f);delete a.data[c.role];}},onMatrixUpdate:function(e,g,d){var a=e.store,b,f,c;
if(a&&!a.loading&&!a.matrixUpdate){a.matrixUpdate=1;b=a.indexOfId(g);if(d<0){if(b>=0){a.remove([b]);}}else{if(b<0){c=a.getSession().getEntry(this.type,g);f=c&&c.record;if(f){a.add(f);}}}a.matrixUpdate=0;}},adoptAssociated:function(b,f){var d=this.getAssociatedItem(b),c,e,a;if(d){d.setSession(f);this.onStoreCreate(d,f,b.getId());
c=d.getData().items;for(e=0,a=c.length;e<a;++e){f.adopt(c[e]);}}}},function(){var a=this;Ext.ClassManager.onCreated(function(){Ext.data.schema.ManyToMany.prototype.Right=Ext.define(null,{extend:a,left:false,side:"right"});},null,"Ext.data.schema.ManyToMany");})});