Ext.define("Ext.data.ErrorCollection",{extend:"Ext.util.MixedCollection",alternateClassName:"Ext.data.Errors",requires:["Ext.data.Error"],init:function(f){var j=this,g=f.fields,d=f.data,l,k,m,e,h,c,b,a;for(e=0,h=g.length;e<h;++e){k=g[e];a=k.name;b=d[a];if(k.validate&&!k.validate.$nullFn){l=j.length;c=k.validate(b,null,j,f);
if(l===j.length&&c!==true){j.add(a,c);}}}return j;},add:function(b,d){var c=this,a=Ext.data.field.Field.defaultInvalidMessage,f=b,e;if(Ext.isString(b)){f=new Ext.data.Error({field:b,message:d||a});}else{if(!(f.isError)){f=new Ext.data.Error({field:f.field||f.name,message:f.error||f.message||f.msg||a});
}b=f.field;}e=c.get(b);if(e){if(Ext.isArray(e)){e.push(f);return e;}c.removeAtKey(b);f=[e,f];f.field=b;f=[f];}return c.callParent([f]);},getKey:function(a){return a.field;},isValid:function(){return this.length===0;},getByField:function(b){var a=this.get(b);if(a&&!Ext.isArray(a)){a=[a];}return a||[];
}});