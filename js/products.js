let productsArray = [];
let precioMax;
let precioMin;
let buscador;


function MostrarListaProducts(array){
    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){ 
        let products = array[i];
        htmlContentToAppend += `
        <div onclick="setProduID(${products.id})" class="list-group-item list-group-item-action">
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
                        
                        <small class="text-muted"> ` + products.currency +" "+products.cost+ `</small> 
                    </div>
                    <p class="mb-1 totalVen"> Total vendidos: ${products.soldCount}</p>
                </div>
            </div>
        </div>
        `
        document.getElementById("products").innerHTML = htmlContentToAppend; 
    }
}

function setProduID(id) {
    localStorage.setItem("productID", id);
    window.location = "product-info.html";
}

function ProductosFiltrados(productsArray){
         if(precioMax>0 && precioMin>0){
            arrayFiltrada=productsArray.filter(productsArray => productsArray.cost>=precioMin && productsArray.cost<=precioMax);
            MostrarListaProducts(arrayFiltrada);
            productsArray = arrayFiltrada;
            }else{
                MostrarListaProducts(productsArray);
            }
        }



function ProductosAsc(productsArray){
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

function ProductosDesc(productsArray){
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


function ProductosImpo(productsArray){
            productsImpo=productsArray.sort((a,b)=>{
                return b.soldCount-a.soldCount;
            })
            MostrarListaProducts(productsImpo);
        }

function Buscador(productsArray){
                let arrayBuscador=productsArray.filter(productsArray =>{ 
                return productsArray.name.toLowerCase().indexOf(buscador.toLowerCase())>-1 || productsArray.description.toLowerCase().indexOf(buscador.toLowerCase())>-1;
                })
                MostrarListaProducts(arrayBuscador);
}
    


function NameCat(){
    CatName=localStorage.getItem(`catName`);
    document.getElementById("NameCat").innerHTML = CatName;
}

function Limpiar(){
    precioMax=undefined;
    precioMin=undefined;
    buscador=undefined;
    document.getElementById("precioMax").value="";
    document.getElementById("precioMin").value ="";
    document.getElementById("Buscador").value ="";
    let codigo=localStorage.getItem("catID");
    let url=PRODUCTS_URL+codigo+EXT_TYPE;
    getJSONData(url).then(function(resultObj){
        if (resultObj.status === "ok")
            {
                productsArray = resultObj.data.products;
                MostrarListaProducts(productsArray);
            }
        })
}

document.addEventListener("DOMContentLoaded",()=>{
    let codigo=localStorage.getItem("catID");
    let urlcat=CATEGORIES_URL;
    let url=PRODUCTS_URL+codigo+EXT_TYPE;
    getJSONData(url).then(function(resultObj){
        if (resultObj.status === "ok")
            {
                productsArray = resultObj.data.products;
                productsObj= resultObj.data;
                CatName=productsObj.catName;
                localStorage.setItem("catName", CatName);
                MostrarListaProducts(productsArray);
                NameCat();
            }
        });
        

    document.getElementById("Filtrar").addEventListener("click",()=>{
        precioMax=parseInt(document.getElementById("precioMax").value);
        precioMin=parseInt(document.getElementById("precioMin").value);
        ProductosFiltrados(productsArray);
        })

    document.getElementById("Limpiar").addEventListener("click",()=>{
        Limpiar();
        })
        
    document.getElementById("sortDesc").addEventListener("click",()=>{
            ProductosDesc(productsArray);
        })
    document.getElementById("sortAsc").addEventListener("click",()=>{
            ProductosAsc(productsArray);
        })

    document.getElementById("sortByCount").addEventListener("click",()=>{
            ProductosImpo(productsArray);
        })

    document.getElementById("Buscador").addEventListener("input",()=>{
            buscador=document.getElementById("Buscador").value;
            Buscador(productsArray);
        })
        
});