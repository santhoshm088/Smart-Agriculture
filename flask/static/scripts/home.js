let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');


openShopping.addEventListener('click', ()=>{
    body.classList.add('active');
})
closeShopping.addEventListener('click', ()=>{
    body.classList.remove('active');
})

let products = [
    {
        id: 1,
        name: 'WHEY PROTEIN',
        
        price: 1200
    },
    {
        id: 2,
        name: 'ZENITH PROTEIN',
        
        price: 1700
    },
    {
        id: 3,
        name: 'VEGAN POWDER',
    
        price: 2200
    },
    {
        id: 4,
        name: 'AYURVEDIC HERB',
        
        price: 1230
    },
    {
        id: 5,
        name: 'ASHWAGANDHA',
    
        price: 3200
    },
    {
        id: 6,
        name: 'GROWTH POWDER',
    
        price: 900
    },
    {
        id: 7,
        name: 'PEANUT',
        
        price: 700
    },
    {
        id: 8,
        name: 'BOUNTY B12',
        
        price: 800
    },
    {
        id: 9,
        name: 'COLLAGEN',
        
        price: 600
    }

];
let listCards  = [];
function initApp(){
    products.forEach((value, key) =>{
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
          
            <div class="title">${value.name}</div>
            <div class="price">${value.price.toLocaleString()}</div>
            <button onclick="addToCard(${key})">Add To Cart</button>`;
        list.appendChild(newDiv);
    })
}
initApp();
function addToCard(key){
    if(listCards[key] == null){
        // copy product form list to list card
        listCards[key] = JSON.parse(JSON.stringify(products[key]));
        listCards[key].quantity = 1;
    }
    reloadCard();
}
function reloadCard(){
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
    listCards.forEach((value, key)=>{
        totalPrice = totalPrice + value.price;
        count = count + value.quantity;
        if(value != null){
            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div><img src="image/${value.image}" style="object-fit:contain; height:100px; width:100px;"/></div>
                <div>${value.name}</div>
                <div>${value.price.toLocaleString()} </div>
                <div>
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                    
                </div>`;
                listCard.appendChild(newDiv);
        }
    })
    total.innerText = totalPrice.toLocaleString();
    quantity.innerText = count;
}
function changeQuantity(key, quantity){
    if(quantity == 0){
        delete listCards[key];
    }else{
        listCards[key].quantity = quantity;
        listCards[key].price = quantity * products[key].price;
    }
    reloadCard();
}