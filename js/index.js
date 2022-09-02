function verificarCuenta(){
    let user = localStorage.getItem("user");
    if (user==null){
        Swal.fire({
            position: 'top',
            icon: 'error',
            title: 'Debes iniciar sesion antes de acceder a la web',
            showConfirmButton: false,
            timer: 1500
          });
       setTimeout(()=>{
        window.location="login.html";
       },1500);
    } else {
        Swal.fire({
            position: 'top',
            icon: 'success',
            title: 'Bienvenido '+user,
            showConfirmButton: false,
            timer: 1500
          });
    }
}



document.addEventListener("DOMContentLoaded", function(){
    verificarCuenta();
    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        localStorage.setItem("catName", "Autos");
        window.location = "products.html";
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        localStorage.setItem("catName", "Juguetes");
        window.location = "products.html";
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        localStorage.setItem("catName", "Muebles");
        window.location = "products.html";
    });
    document.getElementById("cerrarSesion").addEventListener("click",()=>{
        localStorage.removeItem("user")
        window.location.reload()
        });
});