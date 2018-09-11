Ext.define("Ext.util.Filter",{isFilter:true,config:{property:null,value:null,filterFn:null,id:null,anyMatch:false,exactMatch:false,caseSensitive:false,disabled:false,disableOnEmpty:false,operator:null,root:null,serializer:null,convert:null},scope:null,$configStrict:false,generation:0,statics:{createFilterFn:function(a){if(!a){return Ext.returnTrue;
}return function(f){var b=a.isCollection?a.items:a,g=b.length,c=true,d,e;for(d=0;c&&d<g;d++){e=b[d];if(!e.getDisabled()){c=e.filter(f);}}return c;};},isEqual:function(b,a){if(b.getProperty()!==a.getProperty()){return false;}if(b.getOperator()!==a.getOperator()){return false;}if(b.getValue()===a.getValue()){return true;
}else{if(Ext.isArray(b)&&Ext.isArray(a)&&Ext.Array.equals(b,a)){return true;}}return false;},isInvalid:function(a){if(!a.filterFn){if(!a.property){return"A Filter requires either a property or a filterFn to be set";}if(!a.hasOwnProperty("value")&&!a.operator){return"A Filter requires either a property and value, or a filterFn to be set";
}}return false;}},constructor:function(a){var b=Ext.util.Filter.isInvalid(a);if(b){Ext.log.warn(b);}this.initConfig(a);},preventConvert:{"in":1,notin:1},filter:function(b){var a=this,e=a._filterFn||a.getFilterFn(),d=a.getConvert(),c=a._value;a._filterValue=c;a.isDateValue=Ext.isDate(c);if(a.isDateValue){a.dateValue=c.getTime();
}if(d&&!a.preventConvert[a.getOperator()]){a._filterValue=d.call(a.scope||a,c);}return e.call(a.scope||a,b);},getId:function(){var a=this._id;if(!a){a=this.getProperty();if(!a){a=Ext.id(null,"ext-filter-");}this._id=a;}return a;},getFilterFn:function(){var b=this,c=b._filterFn,a;if(!c){a=b.getOperator();
if(a){c=b.operatorFns[a];}else{c=b.createRegexFilter();}b._filterFn=c;b.generatedFilterFn=true;}return c;},createRegexFilter:function(){var b=this,e=!!b.getAnyMatch(),a=!!b.getExactMatch(),c=b.getValue(),d=Ext.String.createRegex(c,!e,!e&&a,!b.getCaseSensitive());return function(f){var g=b.getPropertyValue(f);
return d?d.test(g):(g==null);};},getPropertyValue:function(b){var a=this._root,c=(a==null)?b:b[a];return c[this._property];},getState:function(){var c=this.getInitialConfig(),a={},b;for(b in c){if(c.hasOwnProperty(b)){a[b]=c[b];}}delete a.root;a.value=this.getValue();return a;},getScope:function(){return this.scope;
},serialize:function(){var a=this.getState(),b=this.getSerializer(),c;delete a.id;delete a.serializer;if(b){c=b.call(this,a);if(c){a=c;}}return a;},updateDisabled:function(){this.generation++;},updateOperator:function(){this.onConfigMutation();},updateConvert:function(){this.onConfigMutation();},updateProperty:function(){this.onConfigMutation();
},updateAnyMatch:function(){this.onConfigMutation();},updateExactMatch:function(){this.onConfigMutation();},updateCaseSensitive:function(){this.onConfigMutation();},updateValue:function(a){this.onConfigMutation();if(this.getDisableOnEmpty()){this.setDisabled(Ext.isEmpty(a));}},updateFilterFn:function(a){delete this.generatedFilterFn;
},onConfigMutation:function(){this.generation++;if(this.generatedFilterFn){this._filterFn=null;}},updateDisableOnEmpty:function(a){if(a){this.setDisabled(Ext.isEmpty(this.getValue()));}},privates:{getCandidateValue:function(c,b,e){var d=this,f=d._convert,a=d.getPropertyValue(c);if(f){a=f.call(d.scope||d,a);
}else{if(!e){a=Ext.coerce(a,b);}}return a;}}},function(){var a=this.prototype,b=(a.operatorFns={"<":function(d){var c=this._filterValue;return this.getCandidateValue(d,c)<c;},"<=":function(d){var c=this._filterValue;return this.getCandidateValue(d,c)<=c;},"=":function(d){var e=this,c=e._filterValue;d=e.getCandidateValue(d,c);
if(e.isDateValue&&d instanceof Date){d=d.getTime();c=e.dateValue;}return d==c;},"===":function(d){var e=this,c=e._filterValue;d=e.getCandidateValue(d,c,true);if(e.isDateValue&&d instanceof Date){d=d.getTime();c=e.dateValue;}return d===c;},">=":function(d){var c=this._filterValue;return this.getCandidateValue(d,c)>=c;
},">":function(d){var c=this._filterValue;return this.getCandidateValue(d,c)>c;},"!=":function(d){var e=this,c=e._filterValue;d=e.getCandidateValue(d,c);if(e.isDateValue&&d instanceof Date){d=d.getTime();c=e.dateValue;}return d!=c;},"!==":function(d){var e=this,c=e._filterValue;d=e.getCandidateValue(d,c,true);
if(e.isDateValue&&d instanceof Date){d=d.getTime();c=e.dateValue;}return d!==c;},"in":function(d){var c=this._filterValue;return Ext.Array.contains(c,this.getCandidateValue(d,c));},notin:function(d){var c=this._filterValue;return !Ext.Array.contains(c,this.getCandidateValue(d,c));},like:function(d){var c=this._filterValue;
return c&&this.getCandidateValue(d,c).toLowerCase().indexOf(c.toLowerCase())>-1;},"/=":function(d){var f=this,c=f._filterValue;d=f.getCandidateValue(d,c);if(c!==f.lastRegExpSource){f.lastRegExpSource=c;try{f.regex=new RegExp(c,"i");}catch(g){f.regex=null;}}return f.regex?f.regex.test(d):false;}});b["=="]=b["="];
b.gt=b[">"];b.ge=b[">="];b.lt=b["<"];b.le=b["<="];b.eq=b["="];b.ne=b["!="];});