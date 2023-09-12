//selectors
const products = [
    {
        id: 1,
        name: "Apple",
        price: 1200
    },
    {
        id: 2,
        name: "orange",
        price: 1400
    },
    // {
    //     id: 3,
    //     name: "Mango",
    //     price: 900
    // },

    // {
    //     id: 4,
    //     name: "Lime",
    //     price: 50
    // },
    // {
    //     id: 5,
    //     name: "Lemon",
    //     price: 500
    // },
    // {
    //     id: 6,
    //     name: "carrot ",
    //     price: 500
    // }
];


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
    div.className = "item-list border border-2 p-3 mb-0 d-flex justify-content-between"
    div.innerHTML = `
    <p class="mb-0 item-name">${name}</p>
    <p class=" text-black-50 mb-0 item-price ">${price}mmk</p>
 `;
    return div;

}

const createRecordRow = (ProductId, quantity) => {

    const currentProduct = products.find(el => el.id == ProductId);

    let cost = currentProduct.price * quantity.valueAsNumber;

    const tableRow = document.createElement("tr");
    tableRow.classList.add("record-row");
    tableRow.innerHTML = `
    
    <td>1</td>
    <td class="text-start record-product">${currentProduct.name}</td>
    <td class="text-end record-price">${currentProduct.price}</td>
    <td class="text-end record-quantity">${quantity.valueAsNumber}</td>
    <td class="text-end record-cost">${cost}</td>
    `;


    return tableRow;
};

const calculateTotal = () => {
    console.clear();
    // let total = 0;



    // const allRecords = document.querySelectorAll(".record-cost");
    // console.log(allRecords);


    // allRecords.forEach(el => {
    //     // console.log(el);
    //     total += parseFloat(el.innerText)


    // })

    recordsTotal.innerText = [...document.querySelectorAll(".record-cost")].reduce((pv, cv) => pv + parseFloat(cv.innerText), 0);
};

//process

// console.log(product);

//generate product
products.forEach(el => {
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

    const currentProduct = products.find(el => el.id == product.value);

    let cost = currentProduct.price * quantity.valueAsNumber;


    //create new row
    recordRows.append(createRecordRow(product.value, quantity));

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
        price: newItemPrice.valueAsNumber
    }
    products.push(newItemObj);
    newItem.reset();
    console.log(products);
})









