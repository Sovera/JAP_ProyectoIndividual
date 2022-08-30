function mostrarUser(){
    let nombre=localStorage.getItem("user");
    document.getElementById("nombreUser").innerHTML=nombre;
}



document.addEventListener('DOMContentLoaded',()=>{
mostrarUser();
})