function register() {
    if (document.getElementById("flexCheckDefault").checked) {
        window.location = "registerStartup.html";
        return true;
    }
    swal(
        "¡Registrado correctamente!", 
        "Introduzca sus credenciales de inicio de sesión", 
        "success"
        ).then(function() {
        window.location = "index.html";
    });
    return false;
}
