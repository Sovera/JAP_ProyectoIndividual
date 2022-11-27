let productsCarrito = [];
let precioTotal=0;
let carrito=JSON.parse(localStorage.getItem("carrito"));
//bajamos a un array local el array del local storage que tiene las compras del cliente


function cargarCarrito(array){

if(array.length>0){
//Se fija si el array esta vacio si no lo esta entra en el if
    let htmlContentToAppend = "";
    let htmlContentToAppend2 = "";

    for(let i = 0; i < array.length; i++){ 
document.getElementById("PrecioEnvio").innerHTML=0.00;
let productsCarrito = array[i];
if(productsCarrito.currency!="USD"){
//Se fija que el currency del producto sea distinto a USD para identificar cuales viene en dolares y cuales no
let dolar=0.026
let costo=productsCarrito.unitCost
let resultado=costo*dolar.toFixed(2);
//Cambiamos su cost a uno pasado de pesos a dolares para luego mostrarselo al usuario en dolares

        htmlContentToAppend += `
        <div class="card p-4">
        <div class="row">
        <div class="col-md-5 col-11 mx-auto bg-light d-flex justify-content-center align-items-center shadow product_img">
        <img src="`+ productsCarrito.image +`" class="img-fluid" alt="cart img">
        </div>
        <div class="col-md-7 col-11 mx-auto px-4 mt-2">
        <div class="row">
        <div class="col-6 card-title">
        <h1 class="mb-4 product_name">`+ productsCarrito.name +`</h1>
        </div>
        <div class="col-6">
        <ul class="pagination justify-content-end set_quantity">
        <li class="page-item"><input type="number" name="" class="page-link" min="1"  value="`+ productsCarrito.count +`" id="textbox`+ i +`" onchange="calcularSubtotal('`+ i +`','`+ resultado +`')">
        </li>
        </li>
        </ul>
        </div>
        </div>
        <div class="row justify-content-between">
        <div class="justify-content-start">
        <div class="col-4 d-flex justify-content-start price_money">
        <h5> USD&nbsp;<span id="itemval`+ i +`">`+ resultado +` </span></h5>
        </div>
        </div>
        <div class="col-4 d-flex">
        <button class="btn btn-danger" onclick="borrarProducto('`+ i +`')">Borrar</button>
        </div>
        </div>
        </div>
        </div>
        </div>
        <hr/>
        `

        htmlContentToAppend2 += `<li><p><span class="font-weight-bold">`+ productsCarrito.name +`:</span>
                                <span id="currency`+ i +`">USD&nbsp;</span><span id="productoTotal`+ i +`">`+ resultado +`</span></p></li>`
        
        document.getElementById("montoDeProductos").innerHTML = htmlContentToAppend2;
        document.getElementById("ContenedorProductos").innerHTML = htmlContentToAppend;

}else{

    //Si el producto venia ya en dolares solo procede a mostrarlo tal cual viene
        htmlContentToAppend += `
        <div class="card p-4">
        <div class="row">
        <div class="col-md-5 col-11 mx-auto bg-light d-flex justify-content-center align-items-center shadow product_img">
        <img src="`+ productsCarrito.image +`" class="img-fluid" alt="cart img">
        </div>
        <div class="col-md-7 col-11 mx-auto px-4 mt-2">
        <div class="row">
        <div class="col-6 card-title">
        <h1 class="mb-4 product_name">`+ productsCarrito.name +`</h1>
        </div>
        <div class="col-6">
        <ul class="pagination justify-content-end set_quantity">
        <li class="page-item"><input type="number" name="" class="page-link" min="1"  value="`+ productsCarrito.count +`" id="textbox`+ i +`" onchange="calcularSubtotal('`+ i +`','`+ productsCarrito.unitCost +`')">
        </li>
        </li>
        </ul>
        </div>
        </div>
        <div class="row justify-content-between">
        <div class="justify-content-start">
        <div class="col-4 d-flex justify-content-start price_money">
        <h5>`+ productsCarrito.currency+ `&nbsp;<span id="itemval`+ i +`">`+ productsCarrito.unitCost +` </span></h5>
        </div>
        </div>
        <div class="col-4 d-flex">
        <button class="btn btn-danger" onclick="borrarProducto('`+ i +`')">Borrar</button>
        </div>
        </div>
        </div>
        </div>
        </div>
        <hr/>
        `

        htmlContentToAppend2 += `<li><p><span class="font-weight-bold">`+ productsCarrito.name +`:</span>
                                <span id="currency`+ i +`">`+ productsCarrito.currency+ `</span> <span id="productoTotal`+ i +`">`+ productsCarrito.unitCost +`</span></p></li>`
        
        document.getElementById("montoDeProductos").innerHTML = htmlContentToAppend2;
        document.getElementById("ContenedorProductos").innerHTML = htmlContentToAppend;
} 
    }
}
else{
//Si el array esta vacio, limpia todos los div de html donde tendria que haber productos y los subtotales y precios de envio los baja a 0
    htmlContentToAppend = ``
    htmlContentToAppend2 = ``
    document.getElementById("montoDeProductos").innerHTML = htmlContentToAppend2;
    document.getElementById("ContenedorProductos").innerHTML = htmlContentToAppend;
    document.getElementById("SubtotalCarrito").innerHTML=0.00;
    document.getElementById("PrecioEnvio").innerHTML=0.00;
    
}
}

function calcularSubtotal(item,precio){
//Toma el costo pot unidad y las unidades para multiplicar esos numeros y obtener el subtotal de ese producto en especifico
let textbox= "textbox"+item;
let productoTotal= "productoTotal"+item;
let unidad= document.getElementById(textbox).value
let precioTotal= precio * parseInt(unidad);
let htmlContentToAppend2 = precioTotal;
document.getElementById(productoTotal).innerHTML = htmlContentToAppend2;
calcularSubtotalCarrito(productsCarrito)

}

function borrarProducto(i){
//Cuando se apriete el boton de cada item toma su posicion en el array que luego usa para borrar del array local y sobrescribir el del local storage
    productsCarrito.splice(i, 1);
    cargarCarrito(productsCarrito)
    calcularSubtotalCarrito(productsCarrito)
    localStorage.setItem("carrito", JSON.stringify(productsCarrito));

    
}

function calcularSubtotalCarrito(array){ 
    let precioTotal=0
    for(let i = 0; i < array.length; i++){
//Tomando la longitud del array busca todos los totales de producto en html para ir sumandolos y sacar el total
        let precio=document.getElementById("productoTotal"+i).textContent;
        let precioInt= parseFloat(precio)
        precioTotal= precioInt+precioTotal
        parseFloat(precioTotal);
        document.getElementById("SubtotalCarrito").innerHTML=precioTotal
    }
    if(document.getElementById("Premium").checked===true){
    //Si la persona preciono premium toma el 15% de el precio total como valor de envio y ademas se suma al total
    precioTotal=precioTotal+precioTotal*(15/100)
    document.getElementById("SubtotalCarrito").innerHTML=(precioTotal).toFixed(2)
    document.getElementById("PrecioEnvio").innerHTML=(precioTotal*(15/100)).toFixed(2)
    }if(document.getElementById("Express").checked===true){
        //Si la persona preciono Express toma el 7% de el precio total como valor de envio y ademas se suma al total
        precioTotal=precioTotal+precioTotal*(7/100)
        document.getElementById("SubtotalCarrito").innerHTML=(precioTotal).toFixed(2)
        document.getElementById("PrecioEnvio").innerHTML=(precioTotal*(7/100)).toFixed(2)
    }if(document.getElementById("Standard").checked===true){
        //Si la persona preciono Standar toma el 5% de el precio total como valor de envio y ademas se suma al total
        precioTotal=precioTotal+precioTotal*(5/100)
        document.getElementById("SubtotalCarrito").innerHTML=(precioTotal).toFixed(2)
        document.getElementById("PrecioEnvio").innerHTML=(precioTotal*(5/100)).toFixed(2)
    }
    }

function OpcionTarjeta(){
 document.getElementById("metodoTarejeta").style.display="block"
 document.getElementById("metodoTransferencia").style.display="none"
}
//Las dos funciones desabilitan y habilitan metodos de pagos diferentes para que no esten disponibles a la vez
function OpcionTransferencia(){
document.getElementById("metodoTransferencia").style.display="block"
document.getElementById("metodoTarejeta").style.display="none"
}

function confirmarMetodoPago(){
    let numTarjeta=document.getElementById("NumTarjeta").value
    let CodSeg=document.getElementById("NumSeguridad").value
    let Ven=document.getElementById("VenTarjeta").value
    let numCuenta=document.getElementById("NumCuenta").value

    if(document.getElementById("Tarjeta").checked===true){
       if(numTarjeta.length==0 || CodSeg.length==0 || Ven.length==0){
        document.getElementById("MetodoPagoValid").style.display="none"
        document.getElementById("MetodoPagoInvalid").style.display="block"
        document.getElementById('metodoDePago').classList.remove('btn-outline-success');
        document.getElementById('metodoDePago').classList.add('btn-outline-danger');
        return false
       }else{
        document.getElementById("MetodoPagoValid").style.display="block"
        document.getElementById("MetodoPagoInvalid").style.display="none"
        document.getElementById('metodoDePago').classList.add('btn-outline-success');
        document.getElementById('metodoDePago').classList.remove('btn-outline-danger');
        return true
       }
//Confirma que si selecciono el metodo de pago de tarjeta todos sus inputs esten llenos, y le da feedback al user
    }else
    if(document.getElementById("Transferencia").checked===true){
        if(numCuenta.length==0){
            document.getElementById("MetodoPagoValid").style.display="none"
            document.getElementById("MetodoPagoInvalid").style.display="block"
            document.getElementById('metodoDePago').classList.remove('btn-outline-success');
            document.getElementById('metodoDePago').classList.add('btn-outline-danger');
            return false
           }else{
            document.getElementById("MetodoPagoValid").style.display="block"
            document.getElementById("MetodoPagoInvalid").style.display="none"
            document.getElementById('metodoDePago').classList.add('btn-outline-success');
            document.getElementById('metodoDePago').classList.remove('btn-outline-danger');
            return true
           }
//Confirma que si selecciono el metodo de pago de Transferencia todos sus inputs esten llenos, y le da feedback al user
    }
    else{
//Si no se selecciono ningun pago tambien dara fedback negativo al usuario
        document.getElementById("MetodoPagoValid").style.display="none"
        document.getElementById("MetodoPagoInvalid").style.display="block"
        document.getElementById('metodoDePago').classList.remove('btn-outline-success');
        document.getElementById('metodoDePago').classList.add('btn-outline-danger');
        return false
       }
}

document.addEventListener("DOMContentLoaded",()=>{
    let codigoUser="25801";
    let url=CART_INFO_URL+codigoUser+EXT_TYPE;
    getJSONData(url).then(function(resultObj){
        if (resultObj.status === "ok")
            {
                productsCarrito = resultObj.data.articles;
                productsCarrito = productsCarrito.concat(carrito);
//Unimos el array local al cual se le cargo lo traido del servidor con el que tenia guardado en el local storage
                cargarCarrito(productsCarrito);
                calcularSubtotalCarrito(productsCarrito);
            }
            
        });
        document.getElementById("Tarjeta").addEventListener("click", function(){
            OpcionTarjeta();
        });
        document.getElementById("Transferencia").addEventListener("click", function(){
            OpcionTransferencia();
        });
        document.getElementById("Premium").addEventListener("click", function(){
            calcularSubtotalCarrito(productsCarrito);
        });
        document.getElementById("Standard").addEventListener("click", function(){
            calcularSubtotalCarrito(productsCarrito);
        });
        document.getElementById("Express").addEventListener("click", function(){
            calcularSubtotalCarrito(productsCarrito);
        });
        document.getElementById("Comprar").addEventListener("click", function(){
            confirmarMetodoPago();
        });
        document.getElementById("GuardarModal").addEventListener("click", function(){
            confirmarMetodoPago();
        });
        document.getElementById("Comprar").addEventListener("click", function(){
             (() => {
                'use strict'
                const forms = document.querySelectorAll('.needs-validation')
                Array.from(forms).forEach(form => {
                  form.addEventListener('submit', event => {
                    if (!form.checkValidity() || confirmarMetodoPago()==false) {
                      event.preventDefault()
                      event.stopPropagation()
                    }else{
                        Swal.fire({
                            icon: 'success',
                            title: 'Compra finalizada',
                            text: 'Su compra a sido realizada con exito!',
                            showConfirmButton: false,
                            timer:2500
                          })
                          event.preventDefault();
                    }
              
                    form.classList.add('was-validated')
                  }, false)
                })
            })()
        });
    })
