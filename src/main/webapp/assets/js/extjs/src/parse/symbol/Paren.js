Ext.define("Ext.parse.symbol.Paren",{extend:"Ext.parse.Symbol",arity:"binary",isBinary:true,priority:80,led:function(d){var c=this,a=[],f=c.parser,e=d.id,b=d.arity;if(e!=="."&&e!=="["){if((b!=="unary"||e!=="function")&&b!=="ident"&&e!=="("&&e!=="&&"&&e!=="||"&&e!=="?"){f.syntaxError(d.at,"Expected a variable name.");
}}c.arity="invoke";c.isInvoke=true;c.operand=d;c.args=a;while(f.token.id!==")"){if(a.length){f.advance(",");}a.push(f.parseExpression());}f.advance(")");return c;},nud:function(){var b=this.parser,a=b.parseExpression();b.advance(")");return a;}});