window.digitalspaghetti=window.digitalspaghetti||{};digitalspaghetti.password={"defaults":{"displayMinChar":true,"minChar":6,"minCharText":"长度必须最少包 %d 个字符","colors":["#f00","#c06","#f60","#3c0","#3f0"],"scores":[20,30,43,50],"verdicts":["弱","一般","较好","很好","极佳"],"raisePower":1.4,"debug":false},"ruleScores":{"length":0,"lowercase":1,"uppercase":3,"one_number":3,"three_numbers":5,"one_special_char":3,"two_special_char":5,"upper_lower_combo":2,"letter_number_combo":2,"letter_number_char_combo":2},"rules":{"length":true,"lowercase":true,"uppercase":true,"one_number":true,"three_numbers":true,"one_special_char":true,"two_special_char":true,"upper_lower_combo":true,"letter_number_combo":true,"letter_number_char_combo":true},"validationRules":{"length":function(c,d){digitalspaghetti.password.tooShort=false;
var a=c.length;var b=Math.pow(a,digitalspaghetti.password.options.raisePower);if(a<digitalspaghetti.password.options.minChar){b=(b-100);digitalspaghetti.password.tooShort=true;}return b;},"lowercase":function(a,b){return a.match(/[a-z]/)&&b;},"uppercase":function(a,b){return a.match(/[A-Z]/)&&b;},"one_number":function(a,b){return a.match(/\d+/)&&b;
},"three_numbers":function(a,b){return a.match(/(.*[0-9].*[0-9].*[0-9])/)&&b;},"one_special_char":function(a,b){return a.match(/.[!,@,#,$,%,\^,&,*,?,_,~]/)&&b;},"two_special_char":function(a,b){return a.match(/(.*[!,@,#,$,%,\^,&,*,?,_,~].*[!,@,#,$,%,\^,&,*,?,_,~])/)&&b;},"upper_lower_combo":function(a,b){return a.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)&&b;
},"letter_number_combo":function(a,b){return a.match(/([a-zA-Z])/)&&a.match(/([0-9])/)&&b;},"letter_number_char_combo":function(a,b){return a.match(/([a-zA-Z0-9].*[!,@,#,$,%,\^,&,*,?,_,~])|([!,@,#,$,%,\^,&,*,?,_,~].*[a-zA-Z0-9])/)&&b;}},"attachWidget":function(b){var a=['<div id="password-strength">'];
if(digitalspaghetti.password.options.displayMinChar&&!digitalspaghetti.password.tooShort){a.push('<span class="password-min-char">'+digitalspaghetti.password.options.minCharText.replace("%d",digitalspaghetti.password.options.minChar)+"</span>");}a.push('<span class="password-strength-bar"></span>');a.push("</div>");
a=a.join("");jQuery(b).after(a);},"debugOutput":function(a){if(typeof console.log==="function"){console.log(digitalspaghetti.password);}else{alert(digitalspaghetti.password);}},"addRule":function(a,d,c,b){digitalspaghetti.password.rules[a]=b;digitalspaghetti.password.ruleScores[a]=c;digitalspaghetti.password.validationRules[a]=d;
return true;},"init":function(b,a){digitalspaghetti.password.options=jQuery.extend({},digitalspaghetti.password.defaults,a);digitalspaghetti.password.attachWidget(b);jQuery(b).keyup(function(){digitalspaghetti.password.calculateScore(jQuery(this).val());});if(digitalspaghetti.password.options.debug){digitalspaghetti.password.debugOutput();
}},"calculateScore":function(c){digitalspaghetti.password.totalscore=0;digitalspaghetti.password.width=0;for(var b in digitalspaghetti.password.rules){if(digitalspaghetti.password.rules.hasOwnProperty(b)){if(digitalspaghetti.password.rules[b]===true){var d=digitalspaghetti.password.ruleScores[b];var a=digitalspaghetti.password.validationRules[b](c,d);
if(a){digitalspaghetti.password.totalscore+=a;}}if(digitalspaghetti.password.totalscore<=digitalspaghetti.password.options.scores[0]){digitalspaghetti.password.strColor=digitalspaghetti.password.options.colors[0];digitalspaghetti.password.strText=digitalspaghetti.password.options.verdicts[0];digitalspaghetti.password.width="1";
}else{if(digitalspaghetti.password.totalscore>digitalspaghetti.password.options.scores[0]&&digitalspaghetti.password.totalscore<=digitalspaghetti.password.options.scores[1]){digitalspaghetti.password.strColor=digitalspaghetti.password.options.colors[1];digitalspaghetti.password.strText=digitalspaghetti.password.options.verdicts[1];
digitalspaghetti.password.width="25";}else{if(digitalspaghetti.password.totalscore>digitalspaghetti.password.options.scores[1]&&digitalspaghetti.password.totalscore<=digitalspaghetti.password.options.scores[2]){digitalspaghetti.password.strColor=digitalspaghetti.password.options.colors[2];digitalspaghetti.password.strText=digitalspaghetti.password.options.verdicts[2];
digitalspaghetti.password.width="50";}else{if(digitalspaghetti.password.totalscore>digitalspaghetti.password.options.scores[2]&&digitalspaghetti.password.totalscore<=digitalspaghetti.password.options.scores[3]){digitalspaghetti.password.strColor=digitalspaghetti.password.options.colors[3];digitalspaghetti.password.strText=digitalspaghetti.password.options.verdicts[3];
digitalspaghetti.password.width="75";}else{digitalspaghetti.password.strColor=digitalspaghetti.password.options.colors[4];digitalspaghetti.password.strText=digitalspaghetti.password.options.verdicts[4];digitalspaghetti.password.width="99";}}}}jQuery(".password-strength-bar").stop();if(digitalspaghetti.password.options.displayMinChar&&!digitalspaghetti.password.tooShort){jQuery(".password-min-char").hide();
}else{jQuery(".password-min-char").show();}jQuery(".password-strength-bar").animate({opacity:0.5},"fast","linear",function(){jQuery(this).css({"display":"block","background-color":digitalspaghetti.password.strColor,"width":digitalspaghetti.password.width+"%"}).text(digitalspaghetti.password.strText);
jQuery(this).animate({opacity:1},"fast","linear");});}}}};jQuery.extend(jQuery.fn,{"pstrength":function(a){return this.each(function(){digitalspaghetti.password.init(this,a);});}});jQuery.extend(jQuery.fn.pstrength,{"addRule":function(a,d,c,b){digitalspaghetti.password.addRule(a,d,c,b);return true;},"changeScore":function(a,b){digitalspaghetti.password.ruleScores[a]=b;
return true;},"ruleActive":function(b,a){digitalspaghetti.password.rules[b]=a;return true;}});