let productsCarrito = [];
let precioTotal=0;


function cargarCarrito(array){
    let htmlContentToAppend = "";
    let htmlContentToAppend2 = "";

    for(let i = 0; i < array.length; i++){ 
        let productsCarrito = array[i];
        htmlContentToAppend += `
        <div class="card p-4">
        <h2 class="py-4 font-weight-bold">Carrito</h2>
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
        <div class="row">
        <div class="col-4 d-flex justify-content-start price_money">
        <h5>`+ productsCarrito.currency+ `&nbsp;<span id="itemval`+ i +`">`+ productsCarrito.unitCost +` </span></h5>
        </div>
        </div>
        </div>
        </div>
        </div>
        <hr/>
        `

        htmlContentToAppend2 += `<p>`+ productsCarrito.name +`</p>
                                <p>`+ productsCarrito.currency+ ` <span id="productoTotal`+ i +`">`+ productsCarrito.unitCost +`</span></p>`
        
        document.getElementById("montoDeProductos").innerHTML = htmlContentToAppend2;
        document.getElementById("ContenedorProductos").innerHTML = htmlContentToAppend; 
    }
}

function calcularSubtotal(item,precio){
let textbox= "textbox"+item;
let productoTotal= "productoTotal"+item;
let unidad= document.getElementById(textbox).value
let precioTotal= precio * parseInt(unidad);
let htmlContentToAppend2 = precioTotal;
document.getElementById(productoTotal).innerHTML = htmlContentToAppend2;
calcularSubtotalCarrito(productsCarrito)
}

function calcularSubtotalCarrito(array){ 
    for(let i = 0; i < array.length; i++){
        precio=document.getElementById("productoTotal"+i).textContent
        precioInt= parseInt(precio)
        precioTotal=0
        precioTotal= precioInt+precioTotal
        document.getElementById("SubtotalCarrito").innerHTML=precioTotal
    }
    if(document.getElementById("Premium").checked===true){
    precioTotal=precioTotal+precioTotal*(15/100)
    document.getElementById("SubtotalCarrito").innerHTML=precioTotal
    document.getElementById("PrecioEnvio").innerHTML=precioTotal*(15/100)
    }if(document.getElementById("Express").checked===true){
        precioTotal=precioTotal+precioTotal*(7/100)
        document.getElementById("SubtotalCarrito").innerHTML=precioTotal
        document.getElementById("PrecioEnvio").innerHTML=precioTotal*(7/100)
    }if(document.getElementById("Standard").checked===true){
        precioTotal=precioTotal+precioTotal*(5/100)
        document.getElementById("SubtotalCarrito").innerHTML=precioTotal
        document.getElementById("PrecioEnvio").innerHTML=precioTotal*(5/100)
    }
    }

function OpcionTarjeta(){
 document.getElementById("metodoTarejeta").style.display="block"
 document.getElementById("metodoTransferencia").style.display="none"
}

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

    }
    else{
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
                  
                // Fetch all the forms we want to apply custom Bootstrap validation styles to
                const forms = document.querySelectorAll('.needs-validation')
              
                // Loop over them and prevent submission
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
