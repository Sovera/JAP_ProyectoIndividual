function mostrarUser(){
    let nombre=localStorage.getItem("user");
    document.getElementById("nombreUser").innerHTML=nombre;
}



document.addEventListener('DOMContentLoaded',()=>{
mostrarUser();

document.getElementById("cerrarSesion").addEventListener("click",()=>{
    localStorage.removeItem("user")
    window.location="login.html";
    });
})