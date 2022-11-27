const ORDER_ASC_BY_NAME = "AZ";
const ORDER_DESC_BY_NAME = "ZA";
const ORDER_BY_PROD_COUNT = "Cant.";
let currentCategoriesArray = [];
let currentSortCriteria = undefined;
let minCount = undefined;
let maxCount = undefined;

function sortCategories(criteria, array){
//Funcion que trae array y criterio con el cual se va a ordernar ese array
    let result = [];
    if (criteria === ORDER_ASC_BY_NAME)
    //Si se selecciono por orden ascendente de nombre entra aca
    {
        result = array.sort(function(a, b) {
        //Compara valores ASCI de los caracteres de los nombres dentro del array para ordenarlos de menor a mayor
            if ( a.name < b.name ){ return -1; }
            if ( a.name > b.name ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_NAME){
    //Si se selecciono por orden descendente de nombre entra aca
        result = array.sort(function(a, b) {
        //Compara valores ASCI de los caracteres de los nombres dentro del array para ordenarlos de mayor a menor
            if ( a.name > b.name ){ return -1; }
            if ( a.name < b.name ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_PROD_COUNT){
    //Si se selecciono por orden de mayor numero de productos vendidos entra aca
        result = array.sort(function(a, b) {
        //Compara valores de registro de la cantidad de productos vendidos dentro de cada categoria dentro del array para ordenarlos de mayor a menor
            let aCount = parseInt(a.productCount);
            let bCount = parseInt(b.productCount);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }

    return result;
}

function setCatID(id) {
    //asigna el id de la categoria en localstorage para despues acceder a ella y traer los productos de esa categoria en products.html
    localStorage.setItem("catID", id);
    window.location = "products.html";
}

function showCategoriesList(){
    let htmlContentToAppend = "";
    for(let i = 0; i < currentCategoriesArray.length; i++){
        let category = currentCategoriesArray[i];
    //Recorre el array traido del servidor para mostrarlo en la pagina       
            htmlContentToAppend += `
            <div onclick="setCatID(${category.id})" class="list-group-item list-group-item-action cursor-active">
                <div class="row">
                    <div class="col-3">
                        <img src="${category.imgSrc}" alt="${category.description}" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">${category.name}</h4>
                            <small class="text-muted">${category.productCount} artículos</small>
                        </div>
                        <p class="mb-1">${category.description}</p>
                    </div>
                </div>
            </div>
            `

        document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
    }
}

function sortAndShowCategories(sortCriteria, categoriesArray){
    //Se fija que un nuevo array local no este vacio
    currentSortCriteria = sortCriteria;
    if(categoriesArray != undefined){
        //si lo esta lo llena con el local traido del servidor
        currentCategoriesArray = categoriesArray;
    }
    //Si no lo rellena con el array ordenado con la funcion para ordenarlo por criterio
    currentCategoriesArray = sortCategories(currentSortCriteria, currentCategoriesArray);
    //Muestro las categorías ordenadas
    showCategoriesList();
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CATEGORIES_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            currentCategoriesArray = resultObj.data
            showCategoriesList()
        }
    });

    document.getElementById("sortAsc").addEventListener("click", function(){
        sortAndShowCategories(ORDER_ASC_BY_NAME);
    });

    document.getElementById("sortDesc").addEventListener("click", function(){
        sortAndShowCategories(ORDER_DESC_BY_NAME);
    });

    document.getElementById("sortByCount").addEventListener("click", function(){
        sortAndShowCategories(ORDER_BY_PROD_COUNT);
    });

});