document.addEventListener("DOMContentLoaded", function(){
    btnLogout();
    document.getElementById("cerrarSesion").addEventListener("click",()=>{
        localStorage.removeItem("user")
        window.location.reload()
        });
});

function btnLogout(){
    let user = localStorage.getItem("user");
    if (user==null){
        document.getElementById("cerrarSesion").style.display="block";
    }
}