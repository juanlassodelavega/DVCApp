function register() {
    swal(
        "¡Registrado correctamente!", 
        "Introduzca sus credenciales de inicio de sesión", 
        "success"
        ).then(function() {
        window.location = "index.html";
    });
}