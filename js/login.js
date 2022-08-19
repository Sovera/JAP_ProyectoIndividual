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

function validacion(){
    let usuario=document.getElementById("Usuario").value;
    let password1=document.getElementById("password1").value;
    if(usuario==="" || password1===""){
       alert("Faltan datos");
    }else{
        location.href="portada.html";
        alert("Bievenido " +$usuario);
        localStorage.setItem("user")=usuario;
    }

}

document.addEventListener("DOMContentLoaded",()=>{
    document.getElementById("loginbtn").addEventListener("click",()=>{
    validacion();
    })
})
