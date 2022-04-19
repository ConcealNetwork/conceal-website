// JavaScript Document
$('#navBarTab').tabCollapse();
$('nav-tabs a').on('click',function(){
		$('nav-tabs a').removeClass('active');
    $(this).addClass('active');
})