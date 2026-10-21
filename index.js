// import { basket } from "./src/js/components/basket/basket.js";
import { createProductsPage } from "./src/js/pages/product_page/productPage.js";

export const $app = document.getElementById("app");

const $productsPage = createProductsPage();
$app.append($productsPage);
