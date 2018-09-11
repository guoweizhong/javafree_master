Ext.define("Ext.ux.colorpick.SelectorController",{extend:"Ext.app.ViewController",alias:"controller.colorpick-selectorcontroller",requires:["Ext.ux.colorpick.ColorUtils"],destroy:function(){var c=this,b=c.getView(),a=b.childViewModel;if(a){a.destroy();b.childViewModel=null;}c.callParent();},changeHSV:function(d){var a=this.getView(),b=a.getColor(),c;
Ext.applyIf(d,b);c=Ext.ux.colorpick.ColorUtils.hsv2rgb(d.h,d.s,d.v);Ext.apply(d,c);a.setColor(d);},onColorMapHandleDrag:function(b,a){this.changeHSV({s:b,v:1-a});},onValueSliderHandleDrag:function(a){this.changeHSV({v:1-a});},onSaturationSliderHandleDrag:function(a){this.changeHSV({s:1-a});},onHueSliderHandleDrag:function(a){this.changeHSV({h:1-a});
},onAlphaSliderHandleDrag:function(c){var a=this.getView(),b=a.getColor(),d=Ext.applyIf({a:1-c},b);a.setColor(d);a.el.repaint();},onPreviousColorSelected:function(c,b){var a=this.getView();a.setColor(b);},onOK:function(){var b=this,a=b.getView();a.fireEvent("ok",a,a.getValue());},onCancel:function(){this.fireViewEvent("cancel",this.getView());
},onResize:function(){var j=this,c=j.getView(),i=c.childViewModel,e=j.getReferences(),g,f,d,b;if(!j.hasResizedOnce){j.hasResizedOnce=true;return;}g=i.get("hue");f=i.get("saturation");d=i.get("value");b=i.get("alpha");e.colorMap.setPosition(i.getData());e.hueSlider.setHue(g);e.satSlider.setSaturation(f);
e.valueSlider.setValue(d);e.alphaSlider.setAlpha(b);}});