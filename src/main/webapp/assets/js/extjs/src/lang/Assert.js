Ext.Assert={falsey:function(a,c){if(a){Ext.raise(c||("Expected a falsey value but was "+a));}},falseyProp:function(c,d){Ext.Assert.truthy(c);var a=c[d];if(a){if(c.$className){d=c.$className+"#"+d;}Ext.raise("Expected a falsey value for "+d+" but was "+a);}},truthy:function(a,c){if(!a){Ext.raise(c||("Expected a truthy value but was "+typeof a));
}},truthyProp:function(c,d){Ext.Assert.truthy(c);var a=c[d];if(!a){if(c.$className){d=c.$className+"#"+d;}Ext.raise("Expected a truthy value for "+d+" but was "+typeof a);}}};(function(){function b(g,h){var j=Ext[g],i;return function(k,l){if(!j(k)){Ext.raise(l||i||(i="Expected value to be "+h));}};}function e(g,h){var j=Ext[g],i;
return function(k,l){Ext.Assert.truthy(k);if(!j(k[l])){Ext.raise(i||(i="Expected "+(k.$className?k.$className+"#":"")+l+" to be "+h));}};}function f(g,h){var j=Ext[g],i;return function(k,l){if(j(k)){Ext.raise(l||i||(i="Expected value to NOT be "+h));}};}function a(g,h){var j=Ext[g],i;return function(k,l){Ext.Assert.truthy(k);
if(j(k[l])){Ext.raise(i||(i="Expected "+(k.$className?k.$className+"#":"")+l+" to NOT be "+h));}};}for(var c in Ext){if(c.substring(0,2)=="is"&&Ext.isFunction(Ext[c])){var d=c.substring(2);Ext.Assert[c]=b(c,d);Ext.Assert[c+"Prop"]=e(c,d);Ext.Assert["isNot"+d]=f(c,d);Ext.Assert["isNot"+d+"Prop"]=a(c,d);
}}}());