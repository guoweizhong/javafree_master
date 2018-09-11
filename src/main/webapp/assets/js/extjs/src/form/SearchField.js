Ext.define("Ext.ux.form.SearchField",{extend:"Ext.form.field.Text",alias:"widget.searchfield",triggers:{clear:{weight:0,cls:Ext.baseCSSPrefix+"form-clear-trigger",hidden:true,handler:"onClearClick",scope:"this"},search:{weight:1,cls:Ext.baseCSSPrefix+"form-search-trigger",handler:"onSearchClick",scope:"this"}},hasSearch:false,paramName:"query",initComponent:function(){var c=this,a=c.store,b;
c.callParent(arguments);c.on("specialkey",function(d,g){if(g.getKey()==g.ENTER){c.onSearchClick();}});if(!a||!a.isStore){a=c.store=Ext.data.StoreManager.lookup(a);}a.setRemoteFilter(true);b=c.store.getProxy();b.setFilterParam(c.paramName);b.encodeFilters=function(d){return d[0].getValue();};},onClearClick:function(){var b=this,a=b.activeFilter;
if(a){b.setValue("");b.store.getFilters().remove(a);b.activeFilter=null;b.getTrigger("clear").hide();b.updateLayout();}},onSearchClick:function(){var a=this,b=a.getValue();if(b.length>0){a.activeFilter=new Ext.util.Filter({property:a.paramName,value:b});a.store.getFilters().add(a.activeFilter);a.getTrigger("clear").show();
a.updateLayout();}}});