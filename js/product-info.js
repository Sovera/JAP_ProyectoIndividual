let productsComents=[];


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
  let url = PRODUCT_INFO_URL + codigo + EXT_TYPE;
  let urlcoments = PRODUCT_INFO_COMMENTS_URL + codigo + EXT_TYPE;
  getJSONData(url).then(function (resultObj) {
    if (resultObj.status === "ok") {
      productsInfo = resultObj.data;
      MostrarProducto(productsInfo);
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
});
