function reset() {
    swal(
        "Correo de restablecimiento de contraseña enviado", 
        "Sigue las instrucciones para restablecer la contraseña", 
        "success"
        ).then(function() {
        window.location = "index.html";
    });
}