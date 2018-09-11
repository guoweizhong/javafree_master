Ext.define("Ext.data.Session",{requires:["Ext.data.schema.Schema","Ext.data.Batch","Ext.data.matrix.Matrix","Ext.data.session.ChangesVisitor","Ext.data.session.ChildChangesVisitor","Ext.data.session.BatchVisitor"],mixins:["Ext.mixin.Dirty","Ext.mixin.Observable"],isSession:true,config:{schema:"default",parent:null,autoDestroy:true,crudProperties:{create:"C",read:"R",update:"U",drop:"D"}},crudOperations:[{type:"R",entityMethod:"readEntities"},{type:"C",entityMethod:"createEntities"},{type:"U",entityMethod:"updateEntities"},{type:"D",entityMethod:"dropEntities"}],crudKeys:{C:1,R:1,U:1,D:1},statics:{nextId:1},constructor:function(a){var b=this;
b.data={};b.matrices={};b.id=Ext.data.Session.nextId++;b.identifierCache={};b.recordCreator=b.recordCreator.bind(b);b.mixins.observable.constructor.call(b,a);},destroy:function(){var d=this,b=d.matrices,e=d.data,c,f,a,g;for(g in b){b[g].destroy();}for(c in e){f=e[c];for(g in f){a=f[g].record;if(a){a.$source=null;
a.unjoin(d);}}}d.identifierCache=d.recordCreator=d.matrices=d.data=null;d.setSchema(null);d.callParent();},adopt:function(b){var d=this,c=b.associations,a;d.checkModelType(b.self);if(b.session&&b.session!==d){Ext.raise("Record already belongs to an existing session");}if(b.session!==d){b.session=d;d.add(b);
if(c){for(a in c){c[a].adoptAssociated(b,d);}}}},commit:function(){var d=this,e=d.data,b=d.matrices,c,f,g,a;for(c in e){f=e[c];for(g in f){a=f[g].record;if(a){a.commit();}}}for(g in b){b[g].commit();}d.clearRecordStates();},createRecord:function(b,c){this.checkModelType(b);var d=b.$isClass?b:this.getSchema().getEntity(b),a=this.getParent(),e;
if(c&&a){e=d.getIdFromData(c);if(a.peekRecord(d,e)){Ext.raise("A parent session already contains an entry for "+d.entityName+": "+e);}}return new d(c,this);},getChanges:function(){var a=new Ext.data.session.ChangesVisitor(this);this.visitData(a);return a.result;},getChangesForParent:function(){var a=new Ext.data.session.ChildChangesVisitor(this);
this.visitData(a);return a.result;},getRecord:function(h,a,c){var g=this,b=h.isModel,f,d,i,e;if(b){b=h;a=h.id;h=h.self;}f=g.peekRecord(h,a);if(!f){d=h.$isClass?h:g.getSchema().getEntity(h);i=g.getParent();if(i){e=i.peekRecord(d,a);}if(e){if(e.isLoading()){b=false;}else{f=e.copy(undefined,g);f.$source=e;
}}if(!f){if(b){f=b;g.adopt(f);}else{f=d.createWithId(a,null,g);if(c!==false){f.load(Ext.isObject(c)?c:undefined);}}}}return f;},getSaveBatch:function(a){var b=new Ext.data.session.BatchVisitor();this.visitData(b);return b.getBatch(a);},onInvalidAssociationEntity:function(a,b){Ext.raise("Unable to read association entity: "+this.getModelIdentifier(a,b));
},onInvalidEntityCreate:function(a,b){Ext.raise("Cannot create, record already not exists: "+this.getModelIdentifier(a,b));},onInvalidEntityDrop:function(a,b){Ext.raise("Cannot drop, record does not exist: "+this.getModelIdentifier(a,b));},onInvalidEntityRead:function(a,b){Ext.raise("Cannot read, record already not exists: "+this.getModelIdentifier(a,b));
},onInvalidEntityUpdate:function(a,c,b){if(b){Ext.raise("Cannot update, record dropped: "+this.getModelIdentifier(a,c));}else{Ext.raise("Cannot update, record does not exist: "+this.getModelIdentifier(a,c));}},peekRecord:function(e,h,a){this.checkModelType(e);var g=e.$isClass?e:this.getSchema().getEntity(e),c=g.entityName,f=this.data[c],b,d;
f=f&&f[h];b=f&&f.record;if(!b&&a){d=this.getParent();b=d&&d.peekRecord(e,h,a);}return b||null;},save:function(){var b=this,a=b.getParent(),c;if(a){c=new Ext.data.session.ChildChangesVisitor(b);b.visitData(c);a.update(c.result);b.commit();}else{Ext.raise("Cannot commit session, no parent exists");}},spawn:function(){return new this.self({schema:this.getSchema(),parent:this});
},update:function(j){var l=this,e=l.getSchema(),a=l.crudOperations,k=a.length,m=l.crudKeys,n,f,p,h,d,q,c,o,g,b;l.getSchema().processKeyChecks(true);for(n in j){f=e.getEntity(n);if(!f){Ext.raise("Invalid entity type: "+n);}p=j[n];for(h=0;h<k;++h){d=a[h];q=p[d.type];if(q){l[d.entityMethod](f,q);}}}for(n in j){f=e.getEntity(n);
c=f.associations;p=j[n];for(o in p){if(m[o]){continue;}g=c[o];if(!g){Ext.raise("Invalid association key for "+n+', "'+o+'"');}b=p[g.role];g.processUpdate(l,b);}}},afterCommit:function(a){this.trackRecordState(a);},afterDrop:function(a){this.trackRecordState(a);},afterEdit:function(a){this.trackRecordState(a);
},afterErase:function(a){this.evict(a);},privates:{add:function(b){var e=this,f=b.id,d=e.getEntry(b.self,f),c,a;if(d.record){Ext.raise("Duplicate id "+b.id+" for "+b.entityName);}d.record=b;e.trackRecordState(b,true);e.registerReferences(b);c=b.associations;for(a in c){c[a].checkMembership(e,b);}},applySchema:function(a){return Ext.data.schema.Schema.get(a);
},checkModelType:function(a){if(a.$isClass){a=a.entityName;}if(!a){Ext.raise("Unable to use anonymous models in a Session");}else{if(!this.getSchema().getEntity(a)){Ext.raise("Unknown entity type "+a);}}},createEntities:function(d,b){var a=b.length,c,e,f,g;for(c=0;c<a;++c){e=b[c];g=d.getIdFromData(e);
f=this.peekRecord(d,g);if(!f){f=this.createRecord(d,e);}else{this.onInvalidEntityCreate(d,g);}f.phantom=true;}},dropEntities:function(e,d){var b=d.length,c,f,g,a;if(b){a=Ext.isObject(d[0]);}for(c=0;c<b;++c){g=d[c];if(a){g=e.getIdFromData(g);}f=this.peekRecord(e,g);if(f){f.drop();}else{this.onInvalidEntityDrop(e,g);
}}},evict:function(a){var c=this,b=a.entityName,d=c.data[b],e=a.id;if(d&&d[e]){c.untrackRecordState(a);a.unjoin(c);delete d[e];}},getEntityList:function(d,c){var a=c.length,b,g,f,e;for(b=0;b<a;++b){g=c[b];f=this.peekRecord(d,g);if(f){c[b]=f;}else{e=true;c[b]=null;this.onInvalidAssociationEntity(d,g);
}}if(e){c=Ext.Array.clean(c);}return c;},getEntry:function(b,f){if(b.isModel){f=b.getId();b=b.self;}var d=b.$isClass?b:this.getSchema().getEntity(b),a=d.entityName,e=this.data,c;c=e[a]||(e[a]={});c=c[f]||(c[f]={});return c;},getRefs:function(d,c,h){var f=this.getEntry(d),e=f&&f.refs&&f.refs[c.role],g=h&&this.getParent(),i,a,b;
if(g){i=g.getRefs(d,c);if(i){for(a in i){b=i[a];if((!e||!e[a])){this.getRecord(b.self,b.id);}}e=f&&f.refs&&f.refs[c.role];}}return e||null;},getIdentifier:function(f){var e=this.getParent(),a,c,d,b;if(e){b=e.getIdentifier(f);}else{a=this.identifierCache;c=f.identifier;d=c.getId()||f.entityName;b=a[d];
if(!b){if(c.clone){b=c.clone({id:null});}else{b=c;}a[d]=b;}}return b;},getMatrix:function(a,e){var d=a.isManyToMany?a.name:a,c=this.matrices,b;b=c[d];if(!b&&!e){b=c[d]=new Ext.data.matrix.Matrix(this,a);}return b||null;},getMatrixSlice:function(d,c){var a=this.getMatrix(d.association),b=a[d.side];return b.get(c);
},getModelIdentifier:function(a,b){return b+"@"+a.entityName;},onIdChanged:function(f,l,h){var q=this,b=q.matrices,i=f.entityName,m=f.id,t=q.data[i],c=t[l],p=f.associations,d=c.refs,a=q._setNoRefs,g,e,o,j,s,k,n,r;if(t[h]){Ext.raise("Cannot change "+i+" id from "+l+" to "+h+" id already exists");}delete t[l];
t[h]=c;for(r in b){b[r].updateId(f,l,h);}if(d){for(k in d){n=d[k];s=p[k];g=s.association;if(!g.isManyToMany){e=g.field.name;for(j in n){n[j].set(e,m,a);}}}}q.registerReferences(f,l);},processManyBlock:function(d,e,g,b){var h=this,a,f,c,i;if(g){for(a in g){f=h.peekRecord(d,a);if(f){c=h.getEntityList(e.cls,g[a]);
i=e.getAssociatedItem(f);h[b](e,i,f,c);}else{h.onInvalidAssociationEntity(d,a);}}}},processManyCreate:function(d,c,a,b){if(c){c.add(b);}else{a[d.getterName](null,null,b);}},processManyDrop:function(d,c,a,b){if(c){c.remove(b);}},processManyRead:function(d,c,a,b){if(c){c.setRecords(b);}else{a[d.getterName](null,null,b);
}},readEntities:function(d,b){var a=b.length,c,e,f,g;for(c=0;c<a;++c){e=b[c];g=d.getIdFromData(e);f=this.peekRecord(d,g);if(!f){f=this.createRecord(d,e);}else{this.onInvalidEntityRead(d,g);}f.phantom=false;}},recordCreator:function(c,d){var b=this,e=d.getIdFromData(c),a=b.peekRecord(d,e,true);if(!a){a=new d(c,b);
}else{a=b.getRecord(d,e);a.mergeData(c);}return a;},registerReferences:function(h,c){var l=h.entityName,b=h.id,a=h.data,g=c||c===0,m,f,o,j,d,n,k,e;j=(n=h.references).length;for(f=0;f<j;++f){d=n[f];o=a[d.name];if(o||o===0){d=d.reference;l=d.type;e=d.inverse.role;m=this.getEntry(d.cls,o);k=m.refs||(m.refs={});
k=k[e]||(k[e]={});k[b]=h;if(g){delete k[c];}}}},updateEntities:function(e,b){var a=b.length,d,f,g,h,c;if(Ext.isArray(b)){for(d=0;d<a;++d){f=b[d];h=e.getIdFromData(f);g=this.peekRecord(e,h);if(g){g.set(f);}else{this.onInvalidEntityUpdate(e,h);}}}else{for(h in b){f=b[h];g=this.peekRecord(e,h);if(g&&!g.dropped){c=g.set(f);
}else{this.onInvalidEntityUpdate(e,h,!!g);}}}},updateReference:function(f,h,c,a){var d=h.reference,i=d.type,e=d.inverse.role,b=f.id,j,g;if(a||a===0){g=this.getEntry(i,a).refs[e];delete g[b];}if(c||c===0){j=this.getEntry(i,c);g=j.refs||(j.refs={});g=g[e]||(g[e]={});g[b]=f;}},visitData:function(g){var i=this,e=i.data,m=i.matrices,l,h,c,o,j,d,b,f,k,n,a;
i.getSchema().processKeyChecks(true);for(b in e){l=e[b];for(c in l){f=l[c].record;if(f){if(f.phantom||f.dirty||f.dropped){if(g.onDirtyRecord){g.onDirtyRecord(f);}}else{if(g.onCleanRecord){g.onCleanRecord(f);}}}}}if(g.onMatrixChange){for(b in m){j=m[b].left;n=j.slices;h=j.role.association;for(c in n){k=n[c];
d=k.members;for(o in d){a=(f=d[o])[2];if(a){g.onMatrixChange(h,f[0],f[1],a);}}}}}return g;},_setNoRefs:{refs:false}}});