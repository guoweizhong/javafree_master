Ext.define("Ext.parse.symbol.Constant",{extend:"Ext.parse.Symbol",arity:"literal",isLiteral:true,defaultProperty:"value",constructor:function(b,a){this.callParent([b,a]);this._value=this.value;},nud:function(){var a=this;a.value=a._value;a.arity="literal";a.isLiteral=true;return a;}});