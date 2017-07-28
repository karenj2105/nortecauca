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

	if ($('body').hasClass('interna')) {
		$('header .navbar').css('background-color', "rgba(41, 58, 125, 1)");
		$('header .navbar').css('padding', "17.5px");
		$('.navbar-inverse .navbar-nav .nav-link').css('color', '#fff');
		$('.navbar-brand img').show().css('width', '200px');
		$('.navbar-brand img.scroll').hide();
		$('.info').css('color', '#fff').css('border-bottom', 'none');
		$('.info h5').hide();
		$('.ico-carrito').removeClass('active');
		$('header .info span').hide();
		$('.carrito span').show();
		$('header .info .container > div').css('margin-top', '39px');
		$('a.lupa').css('display', 'inline-block');
		$('header .info').css('height', '22px');
		$('header .navbar a.lupa').addClass('blanco');
		$('header .info .carrito span.ico-carrito').css('border-left', '1px solid rgba(255, 255, 255, 1)');
	} else {
		$(window).scroll(function() {
			var posicion = $(window).scrollTop();
			//console.log(posicion);
			if(posicion > 0) {
				$('header .navbar').css('background-color', "#fff");
				$('header .navbar').css('padding', "17.5px");
				$('.navbar-inverse .navbar-nav .nav-link').css('color', 'rgba(42, 59, 125, 1)');
				$('.navbar-brand img').hide();
				$('.navbar-brand img.scroll').show();
				$('.info').css('color', 'rgba(42, 59, 125, 1)');
				$('.info h5').hide();
				$('.ico-carrito').addClass('active');
				$('header .info span').hide();
				$('.carrito span').show();
				$('header .info .container > div').css('margin-top', '39px');
				$('a.lupa').css('display', 'inline-block');
				$('header .info').css('height', '22px');
				$('header .navbar a.lupa').removeClass('blanco');
				$('header .info .carrito span.ico-carrito').css('border-left', '1px solid rgba(42, 59, 125, 1)');
				$('header .navbar a.lupa .ico-buscador').addClass('addcolor');
				$('header .navbar-inverse .navbar-toggler-icon').addClass('home');
			} else {
				$('header .navbar').css('background-color', "transparent");
				$('header .navbar').css('padding', "43px 17.5px 17.5px");
				$('.navbar-inverse .navbar-nav .nav-link').css('color', 'rgba(255, 255, 255, 1)');
				$('.navbar-brand img').show();
				$('.navbar-brand img.scroll').hide();
				$('.info').css('color', 'rgba(255, 255, 255, 1)');
				$('.info h5').show();
				$('.ico-carrito').removeClass('active');
				$('header .info span').show();
				$('.carrito span.punto').hide();
				$('header .info .container > div').css('margin-top', '7px');
				$('a.lupa').css('display', 'none');
				$('header .info').css('height', '37px');
				$('header .info .carrito span.ico-carrito').css('border-left', '1px solid rgba(255, 255, 255, 0.2)');
				$('header .navbar a.lupa .ico-buscador').removeClass('addcolor');
				$('header .navbar-inverse .navbar-toggler-icon').removeClass('home');
			}
		});
	}

	hoverRedes("facebook");
	hoverRedes("twitter");
	hoverRedes("google");
	
	/*Envio y validacion formulario de contacto */
	/*var valiEmailReg = /^[a-zA-Z0-9_\.\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-\.]+$/;
	$("#formContacto").submit( function() {
		var valid = true;
		var nombre = $.trim($("#nombre").val());
			email = $.trim($("#email").val());
			asunto = $.trim($("#asunto").val());
			mensaje = $.trim($("#mensaje").val());

		$("#formContacto .error").remove();
		if( nombre == "" ) {
			valid = false;
			$("#nombre").focus().before("<span class='error nombre'>Ingrese su nombre</span>");
			$("#nombre").css('border', '1px solid red');
		}
		if( email == "" || !valiEmailReg.test(email) ) {
			valid = false;
			$("#email").focus().before("<span class='error email'>Ingrese un correo electrónico válido</span>");
			$("#email").css('border', '1px solid red');
		} 
		if( mensaje == "" ) {
			valid = false;
			$("#mensaje").focus().before("<span class='error mensaje'>Ingrese un mensaje</span>");
			$("#mensaje").css('border', '1px solid red');
		}

		if(!valid) {
			return false;
		} else {
			var $btn = $("#enviarMensaje").button('loading');
			var datos = 'nombre='+ nombre + '&email=' + email + '&asunto=' + asunto + '&mensaje=' + mensaje;
			$.ajax({
				type: "POST",
				url: "contacto-enviado.php",
				data: datos,
				success: function(data) {
					var respuesta = JSON.parse(data);
					console.log(respuesta);
					$btn.button('reset');
					if (respuesta.status == 'success'){
						$('.msg').text('Mensaje enviado').addClass('msg-ok').fadeIn(300);
						$('.msg').css("display", "inline-block");
						$("#formContacto")[0].reset();
						$("#email").css('border','1px solid rgba(186, 186, 186, 1)');
						setTimeout(function() {
							$('.msg').fadeOut(300);
						}, 2000);
					} else if (respuesta.status == 'error') {
						$('.msg').text('Hubo un error').addClass('msg-error').fadeIn(300);
						$('.msg').css("display", "inline-block");
						setTimeout(function() {
							$('.msg').fadeOut(300);
						}, 2000);
					}
				},
				error: function() {
					$btn.button('reset');
					$('.msg').text('Hubo un error').addClass('msg-error').fadeIn(300);
					setTimeout(function() {
						$('.msg').fadeOut(300);
					}, 2000);
				}
			});
			return false;
		}
	});

	$("#nombre").keyup( function() {
		if( $.trim($(this).val()) != "" ) {
			$(".error.nombre").fadeOut();
			$("#nombre").css('border','1px solid rgba(186, 186, 186, 1)');
		}
	});

	$("#nombre").change( function() {
		if( $.trim($(this).val()) == "" ) {
			$(".error.nombre").hide();
			$("#nombre").focus().before("<span class='error nombre'>Ingrese su nombre</span>");
			$("#nombre").css('border', '1px solid red');
		}
	});

	$("#mensaje").keyup( function() {
		if( $.trim($(this).val()) != "" ) {
			$(".error.mensaje").fadeOut();
			$("#mensaje").css('border','1px solid rgba(186, 186, 186, 1)');
		}
	});

	$("#mensaje").change( function() {
		if( $.trim($(this).val()) == "" ) {
			$(".error.mensaje").hide();
			$("#mensaje").focus().before("<span class='error comentario'>Ingrese un mensaje</span>");
			$("#mensaje").css('border', '1px solid red');
		}
	});

	$("#email").keyup( function() {
		if( $.trim($(this).val()) != "" && valiEmailReg.test($.trim($(this).val()))) {
			$(".error.email").fadeOut();
			$("#email").css('border','1px solid rgba(186, 186, 186, 1)');
		}
	});

	$("#email").change( function() {
		if( $.trim($(this).val()) == "" && !valiEmailReg.test($.trim($(this).val()))) {
			$(".error.email").hide();
			$("#email").focus().before("<span class='error email'>Ingrese un correo electrónico válido</span>");
			$("#email").css('border', '1px solid red');
		}
	});*/
})(jQuery);

function hoverRedes($red) {
	$(".redes-int ul li." + $red + "").mouseover(function() {
		$(this).transition({ y: '-10px', opacity: 1 }, 600, 'ease');
	});
	$(".redes-int ul li." + $red + "").mouseleave(function() {
		$(this).transition({ y: '0px', opacity: 1 }, 600, 'ease');
	});
}