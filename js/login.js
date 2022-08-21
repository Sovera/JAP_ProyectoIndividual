function showAlertSuccess() {
    document.getElementById("alert-success").classList.add("show");
}

function showAlertError() {
    document.getElementById("alert-danger").classList.add("show");
}

function Usuario(){
    let Usuario = {};
    Usuario.nombre=document.getElementById("Usuario").value;
    Usuario.apellido=document.getElementById("password1").value;
    return Usuario;
}

function onSignIn(googleUser){
    let profile = googleUser.getBasicProfile();
    let usuario = profile.getName();
    localStorage.setItem("user",usuario);
    location.href="index.html";       
}

function validacion(){
    let usuario=document.getElementById("Usuario").value;
    let password1=document.getElementById("password1").value;
    if(usuario==="" || password1===""){
        Swal.fire({
            position: 'top',
            icon: 'error',
            title: 'Faltan ingresar datos',
            showConfirmButton: false,
            timer: 1500
          });
       document.getElementById("Usuario").classList("error");
       document.getElementById("password1").classList("error");
    }else{
        localStorage.setItem("user",usuario);
        location.href="index.html";
    }

}

document.addEventListener("DOMContentLoaded",()=>{
    document.getElementById("loginbtn").addEventListener("click",()=>{
    validacion();
    })
})
