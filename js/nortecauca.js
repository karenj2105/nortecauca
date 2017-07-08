(function ($) {
	$('.carousel').carousel({
		interval: 5000,
		pause: false
	});
	$('body').scrollspy({target: ".navbar", offset: 50});
})(jQuery);