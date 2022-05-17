function invest(index) {
    window.scrollTo(0, 0);
    document.getElementById("startupsSelect").options.selectedIndex = index;
    document.getElementById("startupsSelect").style.borderColor = "#007BFF";
}

function edit() {
    Swal.fire({
        title: '<h1> Editar información </h1>',
        icon: 'info',
        html:
          '<input class="form-control my-2" type="text" placeholder="Ingrese su nombre">' +
          '<input class="form-control" type="text" placeholder="Ingrese su apellido">' +
          '<input class="form-control my-2" type="email" placeholder="Ingrese su correo">' +
          '<a href="./passwordReset.html" class="link-primary" style="cursor:pointer;"> Cambiar contraseña </a>',
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false
    })
}
