
let productsArray = [];

function MostrarListaProducts(array){
    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){ 
        let products = array[i];
        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + products.image + `" alt="product image" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                        <h4>`+ products.name +`</h4> 
                        <p> `+ products.description +`</p> 
                        </div>
                        <small class="text-muted">` + products.currency +" "+products.cost+ `</small> 
                    </div>

                </div>
            </div>
        </div>
        `
        document.getElementById("products").innerHTML = htmlContentToAppend; 
    }
}

document.addEventListener("DOMContentLoaded",()=>{
    getJSONData(PRODUCTS_AUTOS).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            categoriesArray = resultObj.data.products;
            MostrarListaProducts(categoriesArray);
        }
    });
});