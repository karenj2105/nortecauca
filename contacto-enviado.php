<?php
//if "email" variable is filled out, send email
if (isset($_REQUEST['mensaje']))  {

	//Email information
	$admin_email = "karenj2105@gmail.com";
	$email = obtenerValor('email');
	$nombre = obtenerValor('nombre');
	$asunto = obtenerValor('asunto');
	$mensaje = obtenerValor('mensaje');	

	if (!validarParametros($nombre, $email, $asunto, $mensaje)) {
		fallo();
	} else {

		$headers = "From: Web sitio <karenj2105@gmail.com>\r\n"
		. "Reply-To: " . $email . "\r\n"
		. "X-Mailer: PHP/" . phpversion() . "\r\n"
		. "MIME-Version: 1.0\r\n";

		//send email
		$textoEmail = "Un usuario le ha enviado un mensaje a través del formulario del sitio web.\r\n\r\n"
						. "Nombre: $nombre\r\n\r\nEmail: $email\r\n\r\nAsunto: $asunto\r\n\r\nMensaje:\r\n\r\n$mensaje\r\n\r\n(Fin del mensaje)";

		$enviado = mail($admin_email, "Mensaje enviado de $nombre a sitio", $textoEmail, $headers);

		//() ? si : no
		($enviado) ? exito() : fallo();
	}	
} else {
	fallo();
}

function obtenerValor($nombre) {
	if (array_key_exists($nombre, $_REQUEST)) {
		return $_REQUEST[$nombre];
	}
	return "";
}
function validarParametros($nombre, $email, $asunto, $mensaje) {
	if ($email == "" || $nombre == "" || $mensaje == "") {
		return false;
	}
	if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
		return false;
	}
	return true;
}
function exito() { echo '{"status" : "success"}'; }
function fallo() { echo '{"status" : "error"}'; }
?>
