Ext.ns("Ext.util").Operators={"=":function(b,c){return b==c;},"!=":function(b,c){return b!=c;},"^=":function(b,c){return b&&b.substr(0,c.length)==c;},"$=":function(b,c){return b&&b.substr(b.length-c.length)==c;},"*=":function(b,c){return b&&b.indexOf(c)!==-1;},"%=":function(b,c){return(b%c)===0;},"|=":function(b,c){return b&&(b==c||b.substr(0,c.length+1)==c+"-");
},"~=":function(b,c){return b&&(" "+b+" ").indexOf(" "+c+" ")!=-1;}};