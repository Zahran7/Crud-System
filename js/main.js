// 
var proudectName = document.getElementById('proudectName');
var proudectPrice = document.getElementById('proudectPrice');
var oldPrice = document.getElementById('oldPrice');
var proudectCategory = document.getElementById('proudectCategory');
var proudectDesc = document.getElementById('proudectDesc');
var proudectCount = document.getElementById('proudectCount');
var inputImg = document.getElementById("fileInput");
var products = [];
var empty = "create";
var emp;

if(JSON.parse(localStorage.getItem("store"))){
products= JSON.parse(localStorage.getItem("store"))
}else{
    products=[];
}
displayProduct()


function addProduct() {
    var product = {
        name: proudectName.value,
        price: proudectPrice.value,
        oldPrice: oldPrice.value,
        category: proudectCategory.value,
        desc: proudectDesc.value,
        count: proudectCount.value,
        img : `img/${inputImg.files[0].name}`,
    };
    if (empty === "create") {
        if (product.count > 1) {
            for (var i = 0; i < product.count; i++) {
                products.push(product);
            }
        } else {
            products.push(product);
        }
    } else {
        products[emp] = product;
        empty = "create";
        Submit.innerHTML = 'Create';
    }
    localStorage.setItem("store",JSON.stringify(products))
    console.log(products);
    displayProduct();
    clearForm();
}

function displayProduct() {
    var cartona = '';
    for (var i = 0; i < products.length; i++) {
        cartona += `
    <div class="col-lg-4 col-md-6 col-sm-12">
        <div class="card product-card shadow-sm">
            <div class="img position-relative">
                <span class="out-of-stock-ribbon">Out of Stock</span>
                <div class="overlay"></div>
                <img src="${products[i].img}" class="card-img-top product-img" alt="Product Image">
            </div>
            <div class="card-body">
                <h5 class="card-title product-name">${products[i].name}</h5>
                <div class="product-pricing">
                    <p class="current-price">$${products[i].price}</p>
                    <p class="old-price">$${products[i].oldPrice}</p>
                </div>
                <p class="card-text category"> ${products[i].category}</p>
                <p class="card-text description">${products[i].desc}</p>
                <div class="button-group">
                    <button onclick="UpData(${i})" class="btn btni btnii btn-sm">
                        <i class="fa-regular fa-pen-to-square"></i>
                    </button>
                    <button onclick="Delete(${i})" class="btn btni btn-sm">
                        <i class="fa-regular fa-trash"></i>
                    </button>
                </div>
            </div>
        </div>
    </div>
`;


    }
    document.getElementById('rowPro').innerHTML = cartona;
}

function clearForm() {
    proudectName.value = '';
    proudectPrice.value = '';
    proudectCategory.value = '';
    proudectDesc.value = '';
    proudectCount.value = '';
    inputImg.value = '';
    oldPrice.value= '';
}

function deleteAll() {
    products.splice(0);
    localStorage.setItem("store",JSON.stringify(products))
    displayProduct();
}

function Delete(i) {
    products.splice(i, 1);
    localStorage.setItem("store",JSON.stringify(products))
    displayProduct();
}

function UpData(i) {
    proudectName.value = products[i].name;
    proudectPrice.value = products[i].price;
    oldPrice.value = products[i].oldPrice;
    proudectCategory.value = products[i].category;
    proudectDesc.value = products[i].desc;
    Submit.innerHTML = 'Update';
    empty = "update";
    localStorage.setItem("store",JSON.stringify(products))
    emp = i;
}

const fileInput = document.getElementById('fileInput');
fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
});


document.getElementById('productSaleOff').addEventListener('change', function() {
    if (this.checked) {
        document.querySelectorAll('.out-of-stock-ribbon').forEach((ribbon) => {
            ribbon.style.display = 'block'; 
        });
    }
});

document.getElementById('productSaleOn').addEventListener('change', function() {
    if (this.checked) {
        document.querySelectorAll('.out-of-stock-ribbon').forEach((ribbon) => {
            ribbon.style.display = 'none'; 
        });
    }
});

function calculateTotal() {
    var count = document.getElementById('proudectCount').value;
    var newPrice = document.getElementById('proudectPrice').value;
    var totalPrice = count * newPrice;

    document.getElementById('totalPrice').value = totalPrice ? `$${totalPrice.toFixed(2)}` : '$0.00';
}
