
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

function ProductosFiltrados(){
    let codigo=localStorage.getItem("catID");
    let url=PRODUCTS_URL+codigo+EXT_TYPE;
    getJSONData(url).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            productsArray = resultObj.data.products;
            let precioMax=parseInt(document.getElementById("precioMax").value);
            let precioMin=parseInt(document.getElementById("precioMin").value);
            if(precioMax>0 && precioMin>0){
            arrayFiltrada=productsArray.filter(productsArray => productsArray.cost>=precioMin && productsArray.cost<=precioMax);
            MostrarListaProducts(arrayFiltrada);
            }else{
                MostrarListaProducts(productsArray);
            }
        }
    })
}

function ProductosAsc(){
    let codigo=localStorage.getItem("catID");
    let url=PRODUCTS_URL+codigo+EXT_TYPE;
    getJSONData(url).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            productsArray = resultObj.data.products;
            productsAsc=productsArray.sort((a,b)=>{
            if(a.name<b.name){
                return -1;
            }else if(a.name>b.name){
                return 1;
            }else{
                return 0
            }
    });
            MostrarListaProducts(productsAsc);
        }
    })
}

function ProductosDesc(){
    let codigo=localStorage.getItem("catID");
    let url=PRODUCTS_URL+codigo+EXT_TYPE;
    getJSONData(url).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            productsArray = resultObj.data.products;
            productsDesc=productsArray.sort((a,b)=>{
            if(a.name>b.name){
                return -1;
            }else if(a.name<b.name){
                return 1;
            }else{
                return 0
            }
    });
            MostrarListaProducts(productsDesc);
        }
    })
}

function ProductosImpo(){
    let codigo=localStorage.getItem("catID");
    let url=PRODUCTS_URL+codigo+EXT_TYPE;
    getJSONData(url).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            productsArray = resultObj.data.products;
            productsImpo=productsArray.sort((a,b)=>{
                return b.soldCount-a.soldCount;
            })
            MostrarListaProducts(productsImpo);
        }
    })
}

function Buscador(){
    let codigo=localStorage.getItem("catID");
    let url=PRODUCTS_URL+codigo+EXT_TYPE;
    getJSONData(url).then(function(resultObj){
        if (resultObj.status === "ok")
            {
                productsArray = resultObj.data.products;
                let buscador=document.getElementById("Buscador").value;
                let arrayBuscador=productsArray.filter(productsArray =>{ 
                return productsArray.name.toLowerCase().indexOf(buscador.toLowerCase())>-1 || productsArray.description.toLowerCase().indexOf(buscador.toLowerCase())>-1;
                })
                MostrarListaProducts(arrayBuscador);
                console.log(arrayBuscador)
}
    })
}

document.addEventListener("DOMContentLoaded",()=>{
    let codigo=localStorage.getItem("catID");
    let url=PRODUCTS_URL+codigo+EXT_TYPE;
    getJSONData(url).then(function(resultObj){
        if (resultObj.status === "ok")
            {
                productsArray = resultObj.data.products;
                MostrarListaProducts(productsArray);
            }

        });

    document.getElementById("Filtrar").addEventListener("click",()=>{
            ProductosFiltrados();
        })

    document.getElementById("sortAsc").addEventListener("click",()=>{
            ProductosAsc();
        })
        
    document.getElementById("sortDesc").addEventListener("click",()=>{
            ProductosDesc();
        })

    document.getElementById("sortByCount").addEventListener("click",()=>{
            ProductosImpo();
        })

    document.getElementById("Buscador").addEventListener("keyup",()=>{
            Buscador();
        })
        
});