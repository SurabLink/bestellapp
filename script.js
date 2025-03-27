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

function addOrderView() {
    document.getElementById('not_selected').classList.add('d_none');
    document.getElementById('invoice').classList.remove('d_none');
    document.getElementById('order_confirmation').classList.add('d_none');
}

function removeOrderView() {
    document.getElementById('not_selected').classList.remove('d_none');
    document.getElementById('invoice').classList.add('d_none');
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
    subtotal = subtotal + (menuDishes[categoryKey][dishIndex].price * menuDishes[categoryKey][dishIndex].amount);
}

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

function openBasket() {
    document.getElementById('basket_container').style.display = 'block';
    document.getElementById('open_basket_btn').style.display = 'none';
    document.getElementById('header').style.display = 'none';
    document.getElementById('main_content').style.display = 'none';
    document.getElementById('footer').style.display = 'none';
}

function closeBasket() {
    document.getElementById('basket_container').style.display = 'none';
    document.getElementById('open_basket_btn').style.display = 'block';
    document.getElementById('header').style.display = 'flex';
    document.getElementById('main_content').style.display = 'block';
    document.getElementById('footer').style.display = 'flex';
}