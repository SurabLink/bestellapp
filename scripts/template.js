function getDishCategories(categoryKey, category) {

    return `
        <a href="#${categoryKey}">
        <li><b>${category}</b></li>
        </a>
    `
}

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
