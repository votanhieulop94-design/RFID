const products = [];

const categories = [
    "Shirt",
    "Pants",
    "Jacket",
    "Dress",
    "Shoes",
    "Bag"
];

const sizes = [
    "XS",
    "S",
    "M",
    "L",
    "XL"
];

const colors = [
    "White",
    "Black",
    "Blue",
    "Red",
    "Green",
    "Gray"
];

const warehouses = [
    "Warehouse",
    "Store A",
    "Store B",
    "Store C",
    "Store D"
];

for(let i = 1; i <= 1000; i++){

    let category =
        categories[Math.floor(Math.random()*categories.length)];

    let size =
        sizes[Math.floor(Math.random()*sizes.length)];

    let color =
        colors[Math.floor(Math.random()*colors.length)];

    let location =
        warehouses[Math.floor(Math.random()*warehouses.length)];

    let quantity =
        Math.floor(Math.random()*50)+1;

    let price =
        Math.floor(Math.random()*2000000)+200000;

    products.push({

        id: i,

        epc: "EPC" + String(i).padStart(6,"0"),

        sku: "SKU" + String(i).padStart(5,"0"),

        productName:
            `${category} ${color} ${size}`,

        category: category,

        color: color,

        size: size,

        quantity: quantity,

        price: price,

        location: location,

        status:
            quantity > 10
            ? "In Stock"
            : "Low Stock"

    });

}

let scanCounter = 0;

function filterProducts(){

    let id = document.getElementById("filterId").value.toLowerCase();

    let epc = document.getElementById("filterEPC").value.toLowerCase();

    let sku = document.getElementById("filterSKU").value.toLowerCase();

    let name = document.getElementById("filterName").value.toLowerCase();

    let category = document.getElementById("filterCategory").value;

    let color = document.getElementById("filterColor").value;

    let size = document.getElementById("filterSize").value;

    let qty = document.getElementById("filterQty").value;

    let price = document.getElementById("filterPrice").value;

    let location = document.getElementById("filterLocation").value;

    let status = document.getElementById("filterStatus").value;

    let result = products.filter(p =>

        p.id.toString().includes(id) &&

        p.epc.toLowerCase().includes(epc) &&

        p.sku.toLowerCase().includes(sku) &&

        p.productName.toLowerCase().includes(name) &&

        (category=="" || p.category==category) &&

        (color=="" || p.color==color) &&

        (size=="" || p.size==size) &&

        (qty=="" || p.quantity.toString().includes(qty)) &&

        (price=="" || p.price.toString().includes(price)) &&

        (location=="" || p.location==location) &&

        (status=="" || p.status==status)

    );

    loadProducts(result);

}
function filterProducts(){

    let id = document.getElementById("filterId").value.toLowerCase();

    let epc = document.getElementById("filterEPC").value.toLowerCase();

    let sku = document.getElementById("filterSKU").value.toLowerCase();

    let name = document.getElementById("filterName").value.toLowerCase();

    let category = document.getElementById("filterCategory").value;

    let color = document.getElementById("filterColor").value;

    let size = document.getElementById("filterSize").value;

    let qty = document.getElementById("filterQty").value;

    let price = document.getElementById("filterPrice").value;

    let location = document.getElementById("filterLocation").value;

    let status = document.getElementById("filterStatus").value;

    let result = products.filter(p =>

        p.id.toString().includes(id) &&

        p.epc.toLowerCase().includes(epc) &&

        p.sku.toLowerCase().includes(sku) &&

        p.productName.toLowerCase().includes(name) &&

        (category=="" || p.category==category) &&

        (color=="" || p.color==color) &&

        (size=="" || p.size==size) &&

        (qty=="" || p.quantity.toString().includes(qty)) &&

        (price=="" || p.price.toString().includes(price)) &&

        (location=="" || p.location==location) &&

        (status=="" || p.status==status)

    );

    loadProducts(result);

}
function loadProducts(data = products){

    const table = document.getElementById("productTable");

    let html = "";

    data.forEach(p => {

        html += `
        <tr>
            <td>${p.id}</td>
            <td>${p.epc}</td>
            <td>${p.sku}</td>
            <td>${p.productName}</td>
            <td>${p.category}</td>
            <td>${p.color}</td>
            <td>${p.size}</td>
            <td>${p.quantity}</td>
            <td>${p.price.toLocaleString()} đ</td>
            <td>${p.location}</td>
            <td>${p.status}</td>
        </tr>
        `;

    });

    table.innerHTML = html;
    document.getElementById("resultCount").innerHTML =
    `Showing ${data.length} / ${products.length} products`;
}
function showSection(id){

document.querySelectorAll(".section")
.forEach(sec=>sec.classList.add("hidden"));

document.getElementById(id)
.classList.remove("hidden");

}

function scanRFID(){

scanCounter++;

document.getElementById("scanCount")
.innerText = scanCounter;

let result = "<h3>Detected RFID Tags</h3>";

products.forEach(p=>{

result += `
${p.epc} - ${p.name}
<br>
`;

});

document.getElementById("scanResult")
.innerHTML = result;

}

function placeOrder(){

    let selected =
        document.getElementById(
            "productSelect"
        ).value;

    let inventory =
        products.filter(
            p => p.productName === selected
        );

    if(inventory.length === 0){

        document.getElementById(
            "orderResult"
        ).innerHTML =
            "Out of Stock";

        return;
    }

    let item = inventory[0];

    document.getElementById(
        "orderResult"
    ).innerHTML =

    `
    <h3>Order Fulfilled</h3>

    Product:
    ${item.productName}

    <br><br>

    EPC:
    ${item.epc}

    <br><br>

    Location:
    ${item.location}

    <br><br>

    Qty Available:
    ${inventory.length}
    `;
}
function updateDashboard(){

    document.getElementById(
        "totalProducts"
    ).innerText = products.length;

    let totalQty = products.reduce(
        (sum,p)=>sum+p.quantity,
        0
    );

    document.getElementById(
        "totalInventory"
    ).innerText = totalQty;

    let totalValue = products.reduce(
        (sum,p)=>sum+(p.price*p.quantity),
        0
    );

    document.getElementById(
        "inventoryValue"
    ).innerText =
        totalValue.toLocaleString() + " đ";

}
loadProducts();
updateDashboard();
function updateInventory() {

    let warehouse =
        products.filter(
            p => p.location === "Warehouse"
        ).length;

    let storeA =
        products.filter(
            p => p.location === "Store A"
        ).length;

    let storeB =
        products.filter(
            p => p.location === "Store B"
        ).length;

    let storeC =
        products.filter(
            p => p.location === "Store C"
        ).length;

    let storeD =
        products.filter(
            p => p.location === "Store D"
        ).length;

    document.getElementById(
        "warehouseCount"
    ).innerText = warehouse;

    document.getElementById(
        "storeACount"
    ).innerText = storeA;

    document.getElementById(
        "storeBCount"
    ).innerText = storeB;

    document.getElementById(
        "storeCCount"
    ).innerText = storeC;

    document.getElementById(
        "storeDCount"
    ).innerText = storeD;
    

}
loadProducts();
updateDashboard();
updateInventory();
function loadProductDropdown(){

    const select =
        document.getElementById(
            "productSelect"
        );

    select.innerHTML = "";

    const uniqueProducts =
        [...new Set(
            products.map(
                p => p.productName
            )
        )];

    uniqueProducts.forEach(name=>{

        select.innerHTML += `
        <option>${name}</option>
        `;

    });

}
function fillFilterOptions(){

    function fill(id,array){

        let select=document.getElementById(id);

        array.forEach(v=>{

            select.innerHTML +=
            `<option>${v}</option>`;

        });

    }

    fill("filterCategory",categories);

    fill("filterColor",colors);

    fill("filterSize",sizes);

    fill("filterLocation",warehouses);
    

}
function resetFilter(){

    document
    .querySelectorAll(".filter-row input")
    .forEach(i=>i.value="");

    document
    .querySelectorAll(".filter-row select")
    .forEach(s=>s.selectedIndex=0);

    loadProducts(products);

}
function findProduct(){

    let keyword =
        document
        .getElementById("warehouseSearch")
        .value
        .toLowerCase()
        .trim();

    let item = products.find(p =>

        p.productName.toLowerCase().includes(keyword) ||

        p.sku.toLowerCase().includes(keyword) ||

        p.epc.toLowerCase().includes(keyword)

    );

    if(!item){

        document.getElementById("orderResult").innerHTML =

        "<h3 style='color:red'>Product not found</h3>";

        return;

    }

    showProductInfo(item);

}
function findSelectedProduct(){

    let selected =
        document.getElementById("productSelect").value;

    let item =
        products.find(
            p => p.productName === selected
        );

    if(item){

        showProductInfo(item);

    }

}
function showProductInfo(item){

    document.getElementById("orderResult").innerHTML =

    `
    <h2>Product Information</h2>

    <b>Product:</b> ${item.productName}<br><br>

    <b>SKU:</b> ${item.sku}<br><br>

    <b>EPC:</b> ${item.epc}<br><br>

    <b>Category:</b> ${item.category}<br><br>

    <b>Color:</b> ${item.color}<br><br>

    <b>Size:</b> ${item.size}<br><br>

    <b>Price:</b> ${item.price.toLocaleString()} đ<br><br>

    <hr>

    <h2>Warehouse Information</h2>

    <b>Location:</b> ${item.location}<br><br>

    <b>Quantity:</b> ${item.quantity}<br><br>

    <b>Status:</b> ${item.status}
    `;

}
fillFilterOptions();
loadProducts();
updateDashboard();
updateInventory();
loadProductDropdown();
document
.querySelectorAll(".filter-row input, .filter-row select")
.forEach(item => {

    item.addEventListener("input", filterProducts);

    item.addEventListener("change", filterProducts);

});