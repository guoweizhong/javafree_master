Ext.define("Ext.data.schema.Namer",{mixins:["Ext.mixin.Factoryable"],requires:["Ext.util.Inflector"],alias:"namer.default",isNamer:true,capitalize:function(a){return Ext.String.capitalize(a);},fieldRole:function(b){var a=b.match(this.endsWithIdRe,"");if(a){b=b.substr(0,b.length-(a[1]||a[2]).length);}return this.apply("uncapitalize",b);
},idField:function(a){return this.apply("uncapitalize,singularize",a)+"Id";},instanceName:function(a){return this.apply("underscore",a);},multiRole:function(a){return this.apply("undotted,uncapitalize,pluralize",a);},pluralize:function(a){return Ext.util.Inflector.pluralize(a);},readerRoot:function(a){return this.apply("uncapitalize",a);
},singularize:function(a){return Ext.util.Inflector.singularize(a);},storeName:function(a){return this.apply("underscore",a);},uncapitalize:function(a){return Ext.String.uncapitalize(a);},underscore:function(a){return"_"+a;},uniRole:function(a){return this.apply("undotted,uncapitalize,singularize",a);
},undotted:function(b){if(b.indexOf(".")<0){return b;}var c=b.split("."),a=c.length;while(a-->1){c[a]=this.apply("capitalize",c[a]);}return c.join("");},getterName:function(b){var a=b.role;if(b&&b.isMany){return a;}return"get"+this.apply("capitalize",a);},inverseFieldRole:function(g,h,e,b){var f=this,a=f.apply(h?"uniRole":"multiRole",g),d=f.apply("pluralize",e),c=f.apply("undotted,pluralize",b);
if(d.toLowerCase()!==c.toLowerCase()){a=e+f.apply("capitalize",a);}return a;},manyToMany:function(e,d,a){var c=this,b=c.apply("undotted,capitalize,singularize",d)+c.apply("undotted,capitalize,pluralize",a);if(e){b=c.apply("capitalize",e+b);}return b;},manyToOne:function(d,b,a,c){return this.apply("capitalize,singularize",a)+this.apply("capitalize",b);
},matrixRole:function(c,b){var a=this.apply(c?"multiRole,capitalize":"multiRole",b);return c?c+a:a;},oneToOne:function(d,b,a,c){return this.apply("undotted,capitalize,singularize",a)+this.apply("capitalize",b);},setterName:function(a){return"set"+this.apply("capitalize",a.role);},endsWithIdRe:/(?:(_id)|[^A-Z](Id))$/,cache:{},apply:function(e,c){var h=this,b=h.cache,j=b[c]||(b[c]={}),g=j[e],f,d,a;
if(!g){if(e.indexOf(",")<0){g=h[e](c);}else{d=(a=e.split(",")).length;g=c;for(f=0;f<d;++f){g=h.apply(a[f],g);}}j[e]=g;}return g;}});