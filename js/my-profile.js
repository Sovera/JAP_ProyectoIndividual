

//variable del local storage steadas
let PrimerNombreLocal=localStorage.getItem("PrimerNombre");
let PrimerApellidoLocal=localStorage.getItem("PrimerApellido");
let SegundoNombreLocal=localStorage.getItem("SegundoNombre");
let SegundoApellidoLocal=localStorage.getItem("SegundoApellido");
let EmailLocal=localStorage.getItem("email");
let TelefonoLocal=localStorage.getItem("Telefono");
let UsuarioLocal=localStorage.getItem("user");
let objectURL=localStorage.getItem("perfil");

//variables de los input, sin valor asignado todavia
let PrimerNombre
let PrimerApellido
let SegundoNombre
let SegundoApellido
let Email
let Telefono
let Usuario


function LeerDatos(){
 PrimerNombre=document.getElementById("Primer-Nombre").value;
 PrimerApellido=document.getElementById("Primer-Apellido").value;
 SegundoNombre=document.getElementById("Segundo-Nombre").value;
 SegundoApellido=document.getElementById("Segundo-Apellido").value;
 Email=document.getElementById("Correo-electronico").value;
 Telefono=document.getElementById("Telefono-de-contacto").value;
 Usuario=document.getElementById("Usuario").value;
}



function MostrarDatos(){
    document.getElementById("Primer-Nombre").value=PrimerNombreLocal;
    document.getElementById("Primer-Apellido").value=PrimerApellidoLocal;
    document.getElementById("Segundo-Nombre").value=SegundoNombreLocal;
    document.getElementById("Segundo-Apellido").value=SegundoApellidoLocal;
    document.getElementById("Correo-electronico").value=EmailLocal;
    document.getElementById("Telefono-de-contacto").value=TelefonoLocal;
    document.getElementById("Usuario").value=UsuarioLocal;
    let Imagen = document.getElementById("ImagenPerfil");
    if(objectURL!==null){
    Imagen.src = objectURL;
    }else{
        Imagen.src ="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
    }


}
function CargarDatos(){
    if(PrimerNombre!==PrimerNombreLocal){
    localStorage.setItem("PrimerNombre",PrimerNombre);
    }
    if(SegundoNombre!==SegundoNombreLocal){
        localStorage.removeItem("SegundoNombre",SegundoNombre);
        localStorage.setItem("SegundoNombre",SegundoNombre);
        }
        if(PrimerApellido!==PrimerApellidoLocal){
            localStorage.removeItem("PrimerApellido",PrimerApellido);
            localStorage.setItem("PrimerApellido",PrimerApellido);
            }
        if(SegundoApellido!==SegundoApellidoLocal){
            localStorage.removeItem("SegundoApellido",SegundoApellido);
            localStorage.setItem("SegundoApellido",SegundoApellido);
            }
            if(Email!==EmailLocal){
                localStorage.removeItem("email",Email);
                localStorage.setItem("email",Email);
                }
                if(Telefono!==TelefonoLocal){
                    localStorage.removeItem("Telefono",Telefono);
                    localStorage.setItem("Telefono",Telefono);
                    }
                    if(Usuario!==UsuarioLocal){
                        localStorage.removeItem("user",Usuario);
                        localStorage.setItem("user",Usuario);
                        }
                               
}

function borrarDatos(){
    localStorage.removeItem("PrimerApellido",PrimerApellido);
    localStorage.removeItem("SegundoNombre",SegundoNombre);
    localStorage.removeItem("SegundoApellido",SegundoApellido);
    localStorage.removeItem("email",Email);
    localStorage.removeItem("Telefono",Telefono);
    localStorage.removeItem("user",Usuario);
}

function subirImagen(){
// Obtener referencia al input y a la imagen
let Archivos = document.getElementById("Imagen-perfil");
let Imagen = document.getElementById("ImagenPerfil");

  // Los archivos seleccionados, pueden ser muchos o uno
  let archivos = Archivos.files;
  // Si no hay archivos salimos de la función y quitamos la imagen
  if (!archivos || !archivos.length) {
    Imagen.src = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
    return;
  }
  // Ahora tomamos el primer archivo, el cual vamos a previsualizar
  let primerArchivo = archivos[0];
  // Lo convertimos a un objeto de tipo objectURL
  let objectURL = URL.createObjectURL(primerArchivo);
  // Y a la fuente de la imagen le ponemos el objectURL
  Imagen.src = objectURL;
  localStorage.setItem("perfil",objectURL);
}


document.addEventListener('DOMContentLoaded',()=>{
    MostrarDatos();
    document.getElementById("UserGrande").innerHTML=UsuarioLocal

    document.getElementById("btnCambios").addEventListener("click",()=>{
        'use strict'


        var forms = document.querySelectorAll('.needs-validation')
      
      
        Array.prototype.slice.call(forms)
          .forEach(function (form) {
            form.addEventListener('submit', function (event) {
              if (!form.checkValidity()) {
                event.preventDefault()
                event.stopPropagation()
              }
              LeerDatos();
              CargarDatos();
              subirImagen();
              form.classList.add('was-validated')
            }, false)
          })
        
        })

        })
        