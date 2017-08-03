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
		//console.log(posicion);
		if(posicion > 0 && !$('body').hasClass('interna')) {
			$('body').addClass('home');
		} else {
			$('body').removeClass('home');
		}
	});

	// lleva al buscador
	$('header a.lupa').bind('click', function(event) {
		var $anchor = $(this);
		$('html, body').stop().animate({
			scrollTop: ($($anchor.attr('href')).offset().top - 150)
		}, 1250, 'easeInOutExpo');
		event.preventDefault();
	});

	$top = 190;
	if($(window).width() <= 991) $top = 210;

	// Hace scroll en el submenu de la vista de municipios
	$('#sidebar .list-group-item a').bind('click', function(event) {
		var $anchor = $(this);
		$('html, body').stop().animate({
			scrollTop: ($($anchor.attr('href')).offset().top - $top)
		}, 1250, 'easeInOutExpo');
		event.preventDefault();
	});

	$(".navbar-nav .nav-item").mouseover(function() {
		$(this).children("ul").css("display", "block");
	});
	$(".navbar-nav .nav-item").mouseleave(function() {
		$(this).children("ul").css("display", "none");
	});

	/*Envio y validacion formulario de contacto */
	var valiEmailReg = /^[a-zA-Z0-9_\.\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-\.]+$/;
	$("#formContacto").submit( function() {
		var valid = true;
		var nombre = $.trim($("#nombre").val());
			email = $.trim($("#email").val());
			asunto = $.trim($("#asunto").val());
			mensaje = $.trim($("#mensaje").val());

		$("#formContacto .error").remove();
		if( nombre == "" ) {
			valid = false;
			$("#nombre").focus().after("<div class='error nombre'><span>Ingrese su nombre</span></div>");
			$("#nombre").css('border', '2px solid #fe7485');
		}
		if( email == "" || !valiEmailReg.test(email) ) {
			valid = false;
			$("#email").focus().after("<div class='error email'><span>Ingrese un correo electrónico válido</span></div>");
			$("#email").css('border', '2px solid #fe7485');
		} 
		if( mensaje == "" ) {
			valid = false;
			$("#mensaje").focus().after("<div class='error mensaje'><span>Ingrese un mensaje</span></div>");
			$("#mensaje").css('border', '2px solid #fe7485');
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
						$('.msg').css("display", "block");
						$("#formContacto")[0].reset();
						$("#email").css('border','1px solid rgba(186, 186, 186, 1)');
						setTimeout(function() {
							$('.msg').fadeOut(300);
						}, 2000);
					} else if (respuesta.status == 'error') {
						$('.msg').text('Hubo un error').addClass('msg-error').fadeIn(1500);
						$('.msg').css("display", "block");
						setTimeout(function() {
							$('.msg').fadeOut(300);
						}, 2000);
					}
				},
				error: function() {
					$btn.button('reset');
					$('.msg').text('Hubo un error').addClass('msg-error').fadeIn(1500);
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
			$("#nombre").css('border', '2px solid #cad4d6');
		}
	});

	$("#nombre").change( function() {
		if( $.trim($(this).val()) == "" ) {
			$(".error.nombre").hide();
			$("#nombre").focus().after("<div class='error nombre'><span>Ingrese su nombre</span></div>");
			$("#nombre").css('border', '2px solid #fe7485');
		}
	});

	$("#mensaje").keyup( function() {
		if( $.trim($(this).val()) != "" ) {
			$(".error.mensaje").fadeOut();
			$("#mensaje").css('border','2px solid #cad4d6');
		}
	});

	$("#mensaje").change( function() {
		if( $.trim($(this).val()) == "" ) {
			$(".error.mensaje").hide();
			$("#mensaje").focus().after("<div class='error mensaje'><span>Ingrese un mensaje</span></div>");
			$("#mensaje").css('border', '2px solid #fe7485');
		}
	});

	$("#email").keyup( function() {
		if( $.trim($(this).val()) != "" && valiEmailReg.test($.trim($(this).val()))) {
			$(".error.email").fadeOut();
			$("#email").css('border','2px solid #cad4d6');
		}
	});

	$("#email").change( function() {
		if( $.trim($(this).val()) == "" && !valiEmailReg.test($.trim($(this).val()))) {
			$(".error.email").hide();
			$("#email").focus().after("<div class='error email'><span>Ingrese un correo electrónico válido</span></div>");
			$("#email").css('border', '2px solid #fe7485');
		}
	});	
})(jQuery);