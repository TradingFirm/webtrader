define(["jquery","jquery-ui","color-picker","ddslick"],function(a){function b(){a(this).dialog("close"),a(this).find("*").removeClass("ui-state-error")}function c(c,d){require(["css!charts/indicators/aroon/aroon.css"]);var e=function(a,b,c,d){this.level=a,this.stroke=b,this.strokeWidth=c,this.dashStyle=d},f=[new e(30,"red",1,"Dash"),new e(70,"red",1,"Dash")];require(["text!charts/indicators/aroon/aroon.html"],function(e){var g="#57a125",h="#cd0a0a";e=a(e),e.appendTo("body"),e.find("input[type='button']").button(),e.find("#aroon_up_stroke").colorpicker({part:{map:{size:128},bar:{size:128}},select:function(b,c){a("#aroon_up_stroke").css({background:"#"+c.formatted}).val(""),g="#"+c.formatted},ok:function(b,c){a("#aroon_up_stroke").css({background:"#"+c.formatted}).val(""),g="#"+c.formatted}}),e.find("#aroon_down_stroke").colorpicker({part:{map:{size:128},bar:{size:128}},select:function(b,c){a("#aroon_down_stroke").css({background:"#"+c.formatted}).val(""),h="#"+c.formatted},ok:function(b,c){a("#aroon_down_stroke").css({background:"#"+c.formatted}).val(""),h="#"+c.formatted}});var i="Solid";a("#aroon_dashStyle").ddslick({imagePosition:"left",width:118,background:"white",onSelected:function(b){a("#aroon_dashStyle .dd-selected-image").css("max-width","85px"),i=b.selectedData.value}}),a("#aroon_dashStyle .dd-option-image").css("max-width","85px");var j=e.find("#aroon_levels").DataTable({paging:!1,scrollY:100,autoWidth:!0,searching:!1,info:!1,columnDefs:[{className:"dt-center",targets:[0,1,2,3]}],aoColumnDefs:[{bSortable:!1,aTargets:[1,3]}]});a.each(f,function(b,c){a(j.row.add([c.level,'<div style="background-color: '+c.stroke+';width:100%;height:20px;"></div>',c.strokeWidth,'<div style="width:50px;overflow:hidden;"><img src="images/dashstyle/'+c.dashStyle+'.svg" /></div>']).draw().node()).data("level",c).on("click",function(){a(this).toggleClass("selected")})}),e.find("#aroon_level_delete").click(function(){j.rows(".selected").indexes().length<=0?require(["jquery","jquery-growl"],function(a){a.growl.error({message:"Select levels to delete!"})}):j.rows(".selected").remove().draw()}),e.find("#aroon_level_add").click(function(){require(["charts/indicators/aroon/aroon_level"],function(b){b.open(c,function(b){a.each(b,function(b,c){a(j.row.add([c.level,'<div style="background-color: '+c.stroke+';width:100%;height:20px;"></div>',c.strokeWidth,'<div style="width:50px;overflow:hidden;"><img src="images/dashstyle/'+c.dashStyle+'.svg" /></div>']).draw().node()).data("level",c).on("click",function(){a(this).toggleClass("selected")})})})})}),e.dialog({autoOpen:!1,resizable:!1,width:350,modal:!0,my:"center",at:"center",of:window,dialogClass:"aroon-ui-dialog",buttons:[{text:"OK",click:function(){if(!_.inRange(e.find(".aroon_input_width_for_period").val(),parseInt(e.find(".aroon_input_width_for_period").attr("min")),parseInt(e.find(".aroon_input_width_for_period").attr("max"))))return void require(["jquery","jquery-growl"],function(a){a.growl.error({message:"Only numbers between "+e.find(".aroon_input_width_for_period").attr("min")+" to "+e.find(".aroon_input_width_for_period").attr("max")+" is allowed for "+e.find(".aroon_input_width_for_period").closest("tr").find("td:first").text()+"!"})});var c=[];a.each(j.rows().nodes(),function(){var b=a(this).data("level");b&&c.push({color:b.stroke,dashStyle:b.dashStyle,width:b.strokeWidth,value:b.level,label:{text:b.level}})});var d={period:parseInt(e.find(".aroon_input_width_for_period").val()),aroonUpStroke:g,aroonDownStroke:h,strokeWidth:parseInt(e.find("#aroon_strokeWidth").val()),dashStyle:i,levels:c};a(a(".aroon").data("refererChartID")).highcharts().series[0].addIndicator("aroon",d),b.call(e)}},{text:"Cancel",click:function(){b.call(this)}}]}),e.find("select").selectmenu({width:120}),"function"==typeof d&&d(c)})}return{open:function(b){return 0==a(".aroon").length?void c(b,this.open):void a(".aroon").data("refererChartID",b).dialog("open")}}});