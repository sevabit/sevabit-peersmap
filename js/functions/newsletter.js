/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function sign()
{

    var name = $('#nombre').val();
    var mail = $('#correo').val();

    if (name.length < 1 || mail.length < 1) {
        toastr.error("Faltan datos de suscripción");
        return;
    }
    
    if (name.length > 50) {
        toastr.error("Nombre ingresado excede el largo permitido");
        return;
    }
    
    if (mail.length > 50) {
        toastr.error("Correo ingresado excede el largo permitido");
        return;
    }
    
    if (!mail.includes("@") || !mail.substring(mail.length - 4, mail.length).includes(".")) {
        toastr.error("Debe ingresar un correo válido");
        return;
    }
    
    
    

    $.ajax({
        url: 'newsletterSignUp',
        type: 'POST',
        data: {nombre: name, correo: mail},
        dataType: 'text'
    }).done(function (respuesta) {

        if (respuesta.length > 1) {
            toastr.info(respuesta);
            $('#nombre').val("");
            $('#correo').val("");
        } else {
            toastr.error("Error al conectar al servidor.");
        }
    });
}