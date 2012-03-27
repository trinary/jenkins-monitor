var jenkinsDashboard = {
	addTimestampToBuild : function(elements){
		elements.each(function() {
		    var worker = $(this).attr("class");
		    var y = parseInt($(this).offset().top + $(this).height() / 2);
		    var x = parseInt($(this).offset().left + $(this).width() / 2);
		    var id = x + "-" + y;
		    var html = '<div class="job_disabled_or_aborted" id="' + id + '">' + worker + '</div>';
		    $("#content").append(html);
		    var new_element = $("#" + id);
		    new_element.css("top", parseInt(y - new_element.height() / 2)).css("left", parseInt(x - new_element.width() / 2));
			new_element.addClass('rotate');
			$(this).addClass('workon');
		});
	},
	composeHtmlFragement: function(jobs){
		var section = $("<section>");
		$.each(jobs, function(){
			if((jobs_to_be_filtered.length ==1 || $.inArray(this.name, jobs_to_be_filtered) != -1) && ($.inArray(this.name, jobs_to_be_excluded) == -1)){
        var article = $("<article>");
        article.addClass(this.color);
        article.addClass("job");
        article.append("<head>"+this.name+"</head>");
        section.append(article);
			}
		});
		dashboardLastUpdatedTime = new Date();
		$("#content").html(section);
	},
	updateBuildStatus : function(data) {
		jenkinsDashboard.composeHtmlFragement(data.jobs);
		jenkinsDashboard.addTimestampToBuild($(".disabled, .aborted"));		
	}
}

