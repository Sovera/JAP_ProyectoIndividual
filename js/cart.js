let productsCarrito = [];


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
}

function calcularSubtotalCarrito(array){
    for(let i = 0; i < array.length; i++){
        
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

document.addEventListener("DOMContentLoaded",()=>{
    let codigoUser="25801";
    let url=CART_INFO_URL+codigoUser+EXT_TYPE;
    getJSONData(url).then(function(resultObj){
        if (resultObj.status === "ok")
            {
                productsCarrito = resultObj.data.articles;
                cargarCarrito(productsCarrito);
            }
        });
        document.getElementById("Tarjeta").addEventListener("click", function(){
            OpcionTarjeta();
        });
        document.getElementById("Transferencia").addEventListener("click", function(){
            OpcionTransferencia();
        });
    })
