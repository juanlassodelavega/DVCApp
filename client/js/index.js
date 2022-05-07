window.onload = function() {
    swal("AVISO DE COOKIES", "Utilizamos cookies propias y de terceros para mejorar nuestros servicios. Si continúa con la navegación consideraremos que acepta este uso.");
};

function login() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    if (username == "inversor") {
        window.location = "investments.html";
    } else if (username == "startup") {
        window.location = "investors.html";
    } else if (username == "admin") {
        window.location = "admin.html";
    } else {
        // alert("¡ERROR!")
        swal("Credenciales incorrectas", "El usuario o la contraseña son incorrectos, intenta de nuevo.", "error");
    }
}