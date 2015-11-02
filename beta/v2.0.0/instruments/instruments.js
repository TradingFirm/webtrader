define(["jquery","jquery-ui","websockets/binary_websockets","common/menu","jquery-growl","common/util"],function(a,b,c,d){"use strict";function e(b){require(["validation/validation","charts/chartWindow"],function(c,d){if(!c.validateIfNoOfChartsCrossingThreshold(d.totalWindows()))return void a.growl.error({message:"No more charts allowed!"});var e=a("#instrumentsDialog").dialog("option","title"),g=a("#instrumentsDialog").data("symbol"),h=a("#instrumentsDialog").data("delay_amount"),i=convertToTimeperiodObject(b),j=null;i?c.validateNumericBetween(i.intValue(),parseInt(a("#timePeriod").attr("min")),parseInt(a("#timePeriod").attr("max")))?h<=i.timeInSeconds()/60?(d.addNewWindow(g,e,b,null,isTick(b)?"line":"candlestick"),f.call(a("#instrumentsDialog"))):j="Charts of less than "+convertToTimeperiodObject(h+"m").humanReadableString()+" are not available for the "+e+".":j="Only numbers between "+a("#timePeriod").attr("min")+" to "+a("#timePeriod").attr("max")+" is allowed for "+a("#units option:selected").text()+"!":j="Only numbers between 1 to 100 is allowed!",j&&(a("#timePeriod").addClass("ui-state-error"),a.growl.error({message:"Only numbers between 1 to 100 is allowed!"}))})}function f(){a(this).dialog("close"),a(this).find("*").removeClass("ui-state-error")}function g(b){var c=function(){a("#instrumentsDialog").dialog("option","title",b.find("a").text()).data("symbol",b.data("symbol")).data("delay_amount",b.data("delay_amount")).dialog("open"),a("#instrumentSelectionMenuDIV").hide()};0==a("#instrumentsDialog").length?a.get("instruments/instruments.html",function(b){a(b).css("display","none").appendTo("body"),a("#standardPeriodsButtonContainer").find("button").click(function(){e(a(this).attr("id"))}).button(),a("#units").change(function(){if("t"==a(this).val())a("#timePeriod").val("1").attr("disabled","disabled").attr("min",1).attr("max",1);else{a("#timePeriod").removeAttr("disabled");var b=a("#units").val(),c={m:59,h:23,d:3}[b]||120;a("#timePeriod").attr("max",c)}}),a("#units").trigger("change"),a("#instrumentsDialog").dialog({autoOpen:!1,resizable:!1,width:260,my:"center",at:"center",of:window,buttons:[{text:"Ok",click:function(){e(a("#timePeriod").val()+a("#units").val())}},{text:"Cancel",click:function(){f.call(this)}}]}),c()}):c(),a(document).click()}var h=[];return{init:function(){a.isEmptyObject(h)&&(loadCSS("instruments/instruments.css"),c.cached.send({trading_times:(new Date).toISOString().slice(0,10)}).then(function(b){var c=a("<ul>").appendTo(a("#nav-menu").find(".instruments"));h=d.extractMenu(b,{filter:function(a){return"realtime"!==a.feed_license}}),h=d.sortMenu(h),d.refreshMenu(c,h,g)})["catch"](void 0))},getMarketData:function(){return h},isMarketDataPresent:function(b,c){var d=!1;c||(c=h);var e=this;return a.each(c,function(c,f){return f.submarkets||f.instruments?d=e.isMarketDataPresent(b,f.submarkets||f.instruments):a.trim(f.display_name)==a.trim(b)&&(d=!0),!d}),d},getSpecificMarketData:function(b,c){var d={};c||(c=h);var e=this;return a.each(c,function(c,f){return f.submarkets||f.instruments?d=e.getSpecificMarketData(b,f.submarkets||f.instruments):a.trim(f.display_name)==a.trim(b)&&(d=f),a.isEmptyObject(d)}),d}}});