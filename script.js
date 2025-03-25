let CartArr = [];
let subtotal = 0;



function init() {
    renderDishCategories();
    renderAllDishes();
}

function renderDishCategories() {
    let ulRef = document.getElementById('dish_categories_list_wrapper');
    let objKeysArr = Object.keys(dishCategories);

    for (let i = 0; i < objKeysArr.length; i++) {
        let categoryKey = objKeysArr[i];
        let category = dishCategories[categoryKey];

        ulRef.innerHTML += getDishCategories(categoryKey, category);
    }

}

// Template
function getDishCategories(categoryKey, category) {
    return `
        <a href="#${categoryKey}">
        <li><b>${category}</b></li>
        </a>
    `
}

function renderAllDishes() {
    renderAppetizers();
    renderPizza();
    renderPasta();
    renderSalads();
    renderDesserts();
    renderDrinks();
}


function renderAppetizers() {
    let divAppetizersRef = document.getElementById('appetizers_wrapper');


    for (let dishIndex = 0; dishIndex < menuDishes.appetizers.length; dishIndex++) {

        divAppetizersRef.innerHTML += getDishContainer(dishIndex, "appetizers");
    }
}

function renderPizza() {
    let divPizzaRef = document.getElementById('pizza_wrapper');

    for (let dishIndex = 0; dishIndex < menuDishes.appetizers.length; dishIndex++) {

        divPizzaRef.innerHTML += getDishContainer(dishIndex, "pizza");
    }
}

function renderPasta() {
    let divPastaRef = document.getElementById('pasta_wrapper');

    for (let dishIndex = 0; dishIndex < menuDishes.appetizers.length; dishIndex++) {

        divPastaRef.innerHTML += getDishContainer(dishIndex, "pasta");

    }
}

function renderSalads() {
    let divSaladsRef = document.getElementById('salads_wrapper');

    for (let dishIndex = 0; dishIndex < menuDishes.appetizers.length; dishIndex++) {

        divSaladsRef.innerHTML += getDishContainer(dishIndex, "salads");

    }



}
function renderDesserts() {
    let divDessertsRef = document.getElementById('desserts_wrapper');

    for (let dishIndex = 0; dishIndex < menuDishes.appetizers.length; dishIndex++) {

        divDessertsRef.innerHTML += getDishContainer(dishIndex, "desserts");

    }


}
function renderDrinks() {
    let divDrinksRef = document.getElementById('drinks_wrapper');

    for (let dishIndex = 0; dishIndex < menuDishes.appetizers.length; dishIndex++) {

        divDrinksRef.innerHTML += getDishContainer(dishIndex, "drinks");

    }


}


// Template
function getDishContainer(dishIndex, categoryKey) {
    return `
        <div class="single_dish space_between">

            <div class="gap_column">
                <h3>${menuDishes[categoryKey][dishIndex].name}</h3>
                <p>${menuDishes[categoryKey][dishIndex].description}</p>
                <div class="price"><b>${menuDishes[categoryKey][dishIndex].price.toFixed(2).replace(".", ",")} €</b></div>
            </div>

            <div onclick="addDishToBasket(${dishIndex}, '${categoryKey}'); addOrderView()" class="border_circle">
                <span class="add">+</span>
            </div>

        </div>
    `
}

// Basket

function addOrderView() {
    document.getElementById('not_selected').classList.add('d_none');
    document.getElementById('invoice').classList.remove('d_none')
    document.getElementById('order_confirmation').classList.add('d_none');

}

function removeOrderView() {
    document.getElementById('not_selected').classList.remove('d_none');
    document.getElementById('invoice').classList.add('d_none')


}

function renderBasket() {
    basketRef = document.getElementById('dish_to_basket_wrapper');
    basketRef.innerHTML = "";
    subtotal = 0;

    for (let indexDishBasket = 0; indexDishBasket < CartArr.length; indexDishBasket++) {
        let dishIndex = CartArr[indexDishBasket].index;
        let categoryKey = CartArr[indexDishBasket].category;
        basketRef.innerHTML += getCartEntry(dishIndex, categoryKey, indexDishBasket);
        
        calculateSubtotal(dishIndex, categoryKey);
    }
    showSubtotal();
    showTotal();
}

function calculateSubtotal(dishIndex, categoryKey) {
    subtotal = subtotal + (menuDishes[categoryKey][dishIndex].price * menuDishes[categoryKey][dishIndex].amount)
};

function showSubtotal() {
    let subtotalRef = document.getElementById('subtotal');
    subtotalRef.innerHTML = subtotal.toFixed(2).replace(".", ",") +" €";
}

function showTotal() {
    let totalRef = document.getElementById('total');
    let totalBtn = document.getElementById('total_btn');
    totalRef.innerHTML = (subtotal + 3).toFixed(2).replace(".", ",") +" €";
    totalBtn.innerHTML = (subtotal + 3).toFixed(2).replace(".", ",") +" €";
}


function addDishToBasket(dishIndex, categoryKey) {
    if (menuDishes[categoryKey][dishIndex].amount == 0) {
        CartArr.push({category: categoryKey, index: dishIndex})
    }

    increaseAmount(dishIndex, categoryKey);
}

function increaseAmount(dishIndex, categoryKey) {
    menuDishes[categoryKey][dishIndex].amount++;
    renderBasket();
}

function decreaseAmount(dishIndex, categoryKey, indexDishBasket) {
    if (menuDishes[categoryKey][dishIndex].amount > 1) {
        menuDishes[categoryKey][dishIndex].amount--;
    } else {
        removeDishFromBasket(dishIndex, categoryKey, indexDishBasket)
    }

    renderBasket();

}

function removeDishFromBasket(dishIndex, categoryKey, indexDishBasket) {
    menuDishes[categoryKey][dishIndex].amount = 0;
    CartArr.splice(indexDishBasket,1);
    renderBasket();

    if (CartArr.length == 0) {
        removeOrderView();

    }
}

function pay() {
    showOrderConfirmation();
    amountReset();
    CartArr = [];
    renderBasket();
}

function amountReset() {
    for (let indexDishBasket = 0; indexDishBasket < CartArr.length; indexDishBasket++) {
        let dishIndex = CartArr[indexDishBasket].index;
        let categoryKey = CartArr[indexDishBasket].category;

        menuDishes[categoryKey][dishIndex].amount = 0;
    }
}

function showOrderConfirmation() {
    document.getElementById('order_confirmation').classList.remove('d_none');
    document.getElementById('invoice').classList.add('d_none')


}

// template

function getCartEntry(dishIndex, categoryKey, indexDishBasket) {


    return `
    <div class="cart_entry">
        <h3>${menuDishes[categoryKey][dishIndex].name}</h3>

        <div class="cart_entry_row row">
            <div class="amount_control">
                <span onclick="decreaseAmount(${dishIndex}, '${categoryKey}', ${indexDishBasket})" class="btn_minus">−</span>
                <span class="amount_count"><b>${menuDishes[categoryKey][dishIndex].amount}</b></span>
                <span onclick="increaseAmount(${dishIndex}, '${categoryKey}')" class="btn_plus">+</span>
            </div>

            <div class="cart_single_price">
                <span>
                    ${(menuDishes[categoryKey][dishIndex].amount * menuDishes[categoryKey][dishIndex].price).toFixed(2).replace(".", ",")} €
                </span>
                <img onclick="removeDishFromBasket(${dishIndex}, '${categoryKey}', ${indexDishBasket})" class="trash_svg" src="./assets/icons/trash.svg">
            </div>

        </div>
        <span class="order_note">Anmerkung hinzufügen</span>

    </div>
`
}




// function ARCHIVgetCartEntry(dishIndex, categoryKey) {
//     return `
//         <div class="cart_entry">
//             <h3>${menuDishes[categoryKey][dishIndex].name}</h3>

//             <div class="cart_entry_row row">
//                 <div class="amount_control">
//                     <span class="btn_minus">−</span>
//                     <span class="amount_count"><b>${menuDishes[categoryKey][dishIndex].amount}</b></span>
//                     <span class="btn_plus">+</span>
//                 </div>

//                 <div class="cart_single_price">
//                     <span>
//                         ${(menuDishes[categoryKey][dishIndex].amount*menuDishes[categoryKey][dishIndex].price).toFixed(2).replace(".", ",")} €
//                     </span>
//                     <img class="trash_svg" src="./assets/icons/trash.svg">
//                 </div>

//             </div>
//             <span class="order_note">Anmerkung hinzufügen</span>

//         </div>
//     `
// }

// function ARCHIVaddDishToBasket(dishIndex, categoryKey) {
//     let dishToBasketRef = document.getElementById('dish_to_basket_wrapper');
//     dishToBasketRef.innerHTML = "";
    
//     if (menuDishes[categoryKey][dishIndex].amount == 0) {
//         menuDishes[categoryKey][dishIndex].amount++;
//         dishToBasketRef.innerHTML += getCartEntry(dishIndex, categoryKey);
//     }
// }
