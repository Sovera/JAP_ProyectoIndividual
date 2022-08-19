function verificarCuenta(){
    let user = localStorage.getItem("user")
    if (user==""){
        alert("Debe iniciar sesion para acceder a la web");
        window.location="login.html"
    }
}



document.addEventListener("DOMContentLoaded", function(){
    verificarCuenta();
    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });
});