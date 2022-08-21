document.addEventListener("DOMContentLoaded", function(){
    //btnLogout();
    document.getElementById("cerrarSesion").addEventListener("click",()=>{
        localStorage.removeItem("user")
        location.href="index.html";
        });
});

function btnLogout(){
    let user = localStorage.getItem("user");
    if (user==null){
        document.getElementById("cerrarSesion").style.display="block";
    } else{
        document.getElementById("cerrarSesion").style.display="none";
    }
}