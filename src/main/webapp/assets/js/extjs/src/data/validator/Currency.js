Ext.define("Ext.data.validator.Currency",{extend:"Ext.data.validator.Number",alias:"data.validator.currency",type:"currency",config:{symbolAtEnd:undefined,spacer:undefined,symbol:undefined},message:"Is not a valid currency amount",applySymbolAtEnd:function(a){return a===undefined?Ext.util.Format.currencyAtEnd:a;
},updateSymbolAtEnd:function(){this.rebuildMatcher();},applySpacer:function(a){return a===undefined?Ext.util.Format.currencySpacer:a;},updateSpacer:function(){this.rebuildMatcher();},applySymbol:function(a){return a===undefined?Ext.util.Format.currencySign:a;},updateSymbol:function(){this.rebuildMatcher();
},privates:{getMatcherText:function(){var d=this,c=d.callParent([true]),e=Ext.String.escapeRegex(d.getSymbol()),b=Ext.String.escapeRegex(d.getSpacer()||""),a=d.getSymbolAtEnd();if(a){c+="("+b+e+")?";}else{c="("+e+b+")?"+c;}return d.getSignPart()+c;}}});