$(document).ready(function () {
    $(".accordion a").on("click", function() {
		$(this).toggleClass('active');
		$(this).next().toggleClass('active');		
	});
})