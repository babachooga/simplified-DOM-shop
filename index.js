import { createProductsPage } from "./src/js/pages/product_page/productPage.js";
import { Basket } from "./src/js/components/basket/basket.js";

export const basket = new Basket();

export const $app = document.getElementById("app");

const $productsPage = createProductsPage();
$app.append($productsPage);
