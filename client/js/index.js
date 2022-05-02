window.onload = function() {
    swal("AVISO DE COOKIES", "Utilizamos cookies propias y de terceros para mejorar nuestros servicios. Si continúa con la navegación consideraremos que acepta este uso.");
};

function login() {
    var username = document.getElementById('username').value;

    if (username != "admin") {
        window.location = "investments.html";
    } else {
        window.location = "investors.html";
    }
}