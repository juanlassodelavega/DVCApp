function edit() {
    Swal.fire({
        title: '<h1> Editar información </h1>',
        icon: 'info',
        html:
          '<input class="form-control" type="text" placeholder="Ingrese el nombre de su Startup">' + 
          '<input type="number" placeholder="¿Cuál es el capital necesario?" class="form-control my-2" min="0" step="0.1">' +
          '<textarea class="form-control" placeholder="Añade una descripción..." rows="3"></textarea>',
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false
    })
}

function cancel() {
    Swal.fire({
        title: '¿Estás seguro?',
        text: "¡No podrás revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '¡Sí!',
        cancelButtonText: '¡No!'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            '¡Cancelada!',
            'La inversión ha sido cancelada.',
            'success'
          )
        }
    })
}