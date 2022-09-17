function MostrarProducto(productsInfo) {
    document.getElementById("Name").innerHTML=productsInfo.name;
    document.getElementById("Precio").innerHTML=+productsInfo.cost;
    document.getElementById("Currency").innerHTML=productsInfo.currency;
    document.getElementById("Descripcion").innerHTML=productsInfo.description;
    document.getElementById("Imagen").src=productsInfo.images[0];
    //document.getElementById("Imagen2").src=productsInfo.images[1];
    //document.getElementById("Imagen3").src=productsInfo.images[2];
    
}

function MostrarComentarios(array){
  let htmlContentToAppend = "";

  for(let i = 0; i < array.length; i++){ 
      let coments = array[i];
      htmlContentToAppend += `
      <div class="cajaComents">
      <div>
        <span><b>${coments.user} </b></span>
      </div>
      <p>
${coments.description}
      </p>
      <span id="score">
        ${coments.score}
      </span>
      <span class="dateTime">${coments.dateTime}</span>
    </div>
           `
      document.getElementById("Comentarios").innerHTML = htmlContentToAppend; 
  }
}

/*function MostrarScore(array){
  for(let i = 0; i < array.length; i++){
    let coments = array[i];
    let cont=0;
    if(cont <= coments.score){
      htmlContentToAppend += `<span class="fa fa-star checked"></span>`
      cont++;
    }else{     
    htmlContentToAppend += `<span class="fa fa-star"></span>`
    cont++;}
}


*/











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
});
