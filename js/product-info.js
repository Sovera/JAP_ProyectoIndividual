let productsComents=[];
let productsArray=[];


function MostrarProducto(productsInfo) {
    document.getElementById("Name").innerHTML=productsInfo.name;
    document.getElementById("Precio").innerHTML=+productsInfo.cost;
    document.getElementById("Currency").innerHTML=productsInfo.currency;
    document.getElementById("Descripcion").innerHTML=productsInfo.description;
    document.getElementById("Imagen").src=productsInfo.images[0];
    document.getElementById("Imagen2").src=productsInfo.images[1];
    document.getElementById("Imagen3").src=productsInfo.images[2];
    
}

function MandarComentario(){
  let texto=document.getElementById("Opinion").value;
  let usuario=localStorage.getItem(`user`);
  let score=0;
  let radios = document.getElementsByName('estrellas');
   for (let i = 0; i <= radios.length; i++) {
     if (radios[i].checked) {
       score=radios[i].value;
       break;
}
   }
   console.log(score);
  let fecha= new Date;
  let dia= fecha.getDate();
  let mes= fecha.getMonth()+1;
  let año= fecha.getFullYear();
  let hora= fecha.getHours()+":"+fecha.getMinutes()+":"+fecha.getSeconds();
  let fechaCompl=año+"-"+mes+"-"+dia+" "+hora;
  let obj={};
  obj.user=usuario;
  obj.description=texto;
  obj.score=score;
  obj.dateTime=fechaCompl;
  productsComents.push(obj);
  
}

function MostrarComentarios(array){
  let htmlContentToAppend = "";

  for(let i = 0; i <= array.length; i++){ 
      let coments = array[i];
      htmlContentToAppend += `
      <div class="cajaComents">
      <div>
        <span><b> ${coments.user} </b></span>
      </div>
      <p>
${coments.description}
      </p>
      <span id="score">
      ${MostrarScore(coments.score)}
      </span>
      <span class="dateTime">${coments.dateTime}</span>
    </div>
           `
      document.getElementById("Comentarios").innerHTML = htmlContentToAppend; 
  }
}

function MostrarRelacionados(array){

  let htmlContentToAppend="";

for(let i=0; i<= array.relatedProducts.length; i++){
  let products = array.relatedProducts[i];
  htmlContentToAppend +=`
  <div class="col mb-5">
  <div class="card h-10">
      <img class="card-img-top" src="` + products.image + `" alt="..." />
          <div class="card-body p-4">
              <div class="text-center">
                  <h5 class="fw-bolder">`+ products.name +`</h5>
              </div>
          </div>
  <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
      <div class="text-center"><a class="btn btn-outline-dark mt-auto" onclick="setProduID(${products.id})">Ver Producto</a></div>
  </div>
</div>
</div>`
document.getElementById("containerRelacionados").innerHTML= htmlContentToAppend;
}
}

function AñadirAlCarro(producto){
  let image=producto.images[0]
  let name=producto.name
  let cost=producto.cost
  let currency=producto.currency

if (localStorage.getItem("carrito") === null) {
  let Carrito=[
    {
      "image":image,
      "name":name,
      "unitCost":cost,
      "currency":currency,
      "count":1
    }
  ]
  localStorage.setItem("carrito", JSON.stringify(Carrito));
}else{
  let Carrito = JSON.parse(localStorage.getItem("carrito"))
  let productoNew = 
  {
    "image":image,
    "name":name,
    "unitCost":cost,
    "currency":currency,
    "count":1
   }
   
   Carrito.push(productoNew);
   localStorage.setItem("carrito", JSON.stringify(Carrito));
}

}

function setProduID(id) {
  localStorage.setItem("productID", id);
  window.location = "product-info.html";
}

function MostrarScore(puntos){
  let estrellas="";
  for(let i = 1; i <= 5; i++){
    if(i <= puntos){
      estrellas+=`<span class="bi bi-star-fill naranja"></span>`
    }else{  
      estrellas+=`<span class="bi bi-star naranja"></span>`   
}
  }
  return estrellas;
}

document.addEventListener("DOMContentLoaded", () => {
  let codigo = localStorage.getItem("productID");
  let products=localStorage.getItem("catID");
  let url = PRODUCT_INFO_URL + codigo + EXT_TYPE;
  let urlcoments = PRODUCT_INFO_COMMENTS_URL + codigo + EXT_TYPE;
  let urlProducts = PRODUCTS_URL+products+EXT_TYPE;
  getJSONData(url).then(function (resultObj) {
    if (resultObj.status === "ok") {
      productsInfo = resultObj.data;
      MostrarProducto(productsInfo);
      MostrarRelacionados(productsInfo);
    }
  });
  getJSONData(urlcoments).then(function (resultObj) {
    if (resultObj.status === "ok") {
      productsComents = resultObj.data;
      MostrarComentarios(productsComents);
    }
  });


  document.getElementById("enviarComen").addEventListener("click", function() {
    MandarComentario();
    MostrarComentarios(productsComents);
  });
  document.getElementById("AñadirAlCarro").addEventListener("click", function() {
    AñadirAlCarro(productsInfo);
    Swal.fire({
      title: 'Producto Añadido al carrito',
      text: '¿Desea seguir comprando?',
      showDenyButton: true,
      confirmButtonText: 'Seguir comprando',
      denyButtonText: `No, ir a mi carrito`,
    }).then((result) => {
      if (result.isConfirmed) {
        window.location="products.html";
      } else if (result.isDenied) {
        window.location="cart.html";
      }
    })
  });
});
