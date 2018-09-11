Ext.define("Ext.mixin.Queryable",{mixinId:"queryable",isQueryable:true,query:function(a){a=a||"*";return Ext.ComponentQuery.query(a,this.getQueryRoot());},queryBy:function(f,e){var c=[],b=this.getQueryRoot().getRefItems(true),d=0,a=b.length,g;for(;d<a;++d){g=b[d];if(f.call(e||g,g)!==false){c.push(g);
}}return c;},queryById:function(a){return this.down(Ext.makeIdSelector(a));},child:function(a){var b=this.getQueryRoot().getRefItems();if(a&&a.isComponent){return this.matchById(b,a.getItemId());}if(a){b=Ext.ComponentQuery.query(a,b);}if(b.length){return b[0];}return null;},down:function(a){if(a&&a.isComponent){return this.matchById(this.getRefItems(true),a.getItemId());
}a=a||"";return this.query(a)[0]||null;},visitPreOrder:function(a,d,c,b){Ext.ComponentQuery._visit(true,a,this.getQueryRoot(),d,c,b);},visitPostOrder:function(a,d,c,b){Ext.ComponentQuery._visit(false,a,this.getQueryRoot(),d,c,b);},getRefItems:function(){return[];},getQueryRoot:function(){return this;
},privates:{matchById:function(b,e){var a=b.length,c,d;for(c=0;c<a;++c){d=b[c];if(d.getItemId()===e){return d;}}return null;}}});