(function ($) {
	$('#carousel').carousel({
		interval: 5000,
		pause: false
	});
	
	$('.select').click(function() {
		$('select.form-control').css("color", "rgba(68, 68, 68, 1)");
		$('select.municipios').change(function() {
			if ($(this).children('option:first-child').is(':selected')) {
				$(this).addClass('placeholder');
			} else {
				$(this).removeClass('placeholder');
			}
		});
	});

	$(window).scroll(function() {
		var posicion = $(window).scrollTop();
		console.log(posicion);
		if(posicion > 0) {			
			$('.navbar').css('background-color', "#fff");
			$('.navbar').css('padding', "17.5px");
			$('.navbar-inverse .navbar-nav .nav-link').css('color', 'rgba(42, 59, 125, 1)');
			$('.navbar-brand img').hide();
			$('.navbar-brand img.scroll').show();
			$('.info').css('color', 'rgba(42, 59, 125, 1)');
			$('.info h5').hide();
			$('.ico-carrito').addClass('active');
			$('.info span').hide();
			$('.carrito span').show();
			$('header .info .container > div').css('margin-top', '49px');
			$('a.lupa').css('display', 'inline-block');
			$('header .info').css('height', '22px');
		} else {
			$('.navbar').css('background-color', "transparent");
			$('.navbar').css('padding', "43px 17.5px 17.5px");
			$('.navbar-inverse .navbar-nav .nav-link').css('color', 'rgba(255, 255, 255, 1)');
			$('.navbar-brand img').show();
			$('.navbar-brand img.scroll').hide();
			$('.info').css('color', 'rgba(255, 255, 255, 1)');
			$('.info h5').show();
			$('.ico-carrito').removeClass('active');
			$('.info span').show();
			$('.carrito span.punto').hide();
			$('header .info .container > div').css('margin-top', '7px');
			$('a.lupa').css('display', 'none');
			$('header .info').css('height', '37px');
		}
	});
	
})(jQuery);