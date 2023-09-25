//selectors
const products = [
    {
        id: 1,
        name: "Apple",
        price: 1200,
    },
    {
        id: 2,
        name: "orange",
        price: 1400,
    },
    {
        id: 3,
        name: "carrot",
        price: 1000,

    },
    {
        id: 4,
        name: "grap",
        price: 3000,

    },
];
let rowCount = 1;

const app = document.querySelector("#app");
const newRecord = document.querySelector("#newRecord");
const product = document.querySelector("#product");
const quantity = document.querySelector("#quantity");
const records = document.querySelector("#records");
const inventories = document.querySelector("#inventories");
const recordRows = document.querySelector("#record-rows");
const newItem = document.querySelector("#newItem");
const newItemName = document.querySelector("#newItemName");
const newItemPrice = document.querySelector("#newItemPrice");
const recordsTotal = document.querySelector(".records-total");

//function
const createItem = (name, price) => {
    const div = document.createElement("div");
    div.className =
        "item-list border border-2 p-3 mb-0 d-flex justify-content-between";
    div.innerHTML = `
    <p class="mb-0 item-name">${name}</p>
    <p class=" text-black-50 mb-0 item-price ">${price}mmk</p>
 `;
    return div;
};

const createRecordRow = (ProductId, quantity) => {
    const currentProduct = products.find((el) => el.id == ProductId);

    let cost = currentProduct.price * quantity.valueAsNumber;

    const tableRow = document.createElement("tr");
    tableRow.classList.add("record-row");
    tableRow.setAttribute("product-id", ProductId);

    tableRow.innerHTML = `
    
    <td class="record-no"></td>
    <td class="text-start record-product">${currentProduct.name}</td>
    <td class="text-end record-price">${currentProduct.price}</td>
    <td class="text-end "> 
    <span>
    <i class="record-quantity-control record-quantity-decrement bi bi-dash"></i>
    </span>
    <span class="record-quantity" >${quantity.valueAsNumber}</span>
    <span>
    <i class="record-quantity-control record-quantity-increment  bi bi-plus"></i>
    </span>
    </td>
    <td class="text-end position-relative ">
    <span class="record-cost"> ${cost}</span>
    
    <button class=" d- btn btn-sm btn-primary record-row-del position-absolute">
    <i class="bi bi-trash3"></i>
    </button>
   </td>
    `;
    tableRow.querySelector(".record-row-del").addEventListener("click", () => {
        if (confirm("Sir, Can you check your invoice")) {
            tableRow.classList.add("animate__animated", "animate__fadeOut")
            tableRow.addEventListener("animationend", () => {
                tableRow.remove();
                calculateTotal();
            });

        }
    });

    return tableRow;
};

const calculateTotal = () => {
    // console.clear();
    // let total = 0;

    // const allRecords = document.querySelectorAll(".record-cost");
    // console.log(allRecords);

    // allRecords.forEach(el => {
    //     // console.log(el);
    //     total += parseFloat(el.innerText)

    // })

    recordsTotal.innerText = [
        ...document.querySelectorAll(".record-cost"),
    ].reduce((pv, cv) => pv + parseFloat(cv.innerText), 0);
};

//process

// console.log(product);

//generate product
products.forEach((el) => {
    // const newOption=document.createElement("Option")
    // newOption.innerText=el.name
    // newOption.value=el.id;
    // product.append(new Option(el.name, el.id));
    product.append(new Option(el.name, el.id));
    inventories.append(createItem(el.name, el.price));
});

// add records

newRecord.addEventListener("submit", (e) => {
    e.preventDefault();

    const isExistedRow = document.querySelector(
        `[product-id='${product.value}']`
    );

    if (isExistedRow) {
        let currentPrice = isExistedRow.querySelector(".record-price");
        let currentQuantity = isExistedRow.querySelector(".record-quantity");
        let currentCost = isExistedRow.querySelector(".record-cost ");
        let newQuantity =
            parseFloat(currentQuantity.innerText) + quantity.valueAsNumber;
        let newCost = currentPrice.innerText * newQuantity;

        currentQuantity.innerText = newQuantity;
        currentCost.innerText = newCost;
    } else {
        //create new row
        recordRows.append(createRecordRow(product.value, quantity));
    }

    // const currentProduct = products.find(el => el.id == product.value);

    // let cost = currentProduct.price * quantity.valueAsNumber;

    // console.log(cost);
    //clear form
    newRecord.reset();

    // calculate total cost

    calculateTotal();
});
newItem.addEventListener("submit", (e) => {
    e.preventDefault();
    let newItemId = products[products.length - 1].id + 1;
    const newItemObj = {
        id: newItemId,
        name: newItemName.value,
        price: newItemPrice.valueAsNumber,
    };
    products.push(newItemObj);

    //form reset
    newItem.reset();

    //ui update

    product.append(new Option(newItemObj.name, newItemId));
    inventories.append(createItem(newItemObj.name, newItemObj.price));
    // console.log(products);
});
