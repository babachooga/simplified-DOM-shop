import { $app } from "../../../../index.js";
import { clearContainer } from "../../DOM functions/index.js";
import { createProductsPage } from "../../pages/product_page/productPage.js";

export function createHeader() {
  const $header = document.createElement("header");
  $header.className = "header";

  const $buttonProductPage = document.createElement("button");
  $buttonProductPage.dataset.page = "products";
  $buttonProductPage.textContent = "products";

  const $buttonBasketPage = document.createElement("button");
  $buttonBasketPage.dataset.page = "basket";
  $buttonBasketPage.textContent = "basket";

  $header.append($buttonProductPage, $buttonBasketPage);

  const events = {
    products: () => {
      clearContainer($app)
      const $productsPage = createProductsPage()
      $app.append($productsPage)
    },
    basket: () => {
      console.log(2);
    },
  };

  $header.addEventListener("click", (event) => {
    const target = event.target.closest(`[data-page]`);
    const pageValue = target.dataset["page"];
    events[pageValue]()
  });

  return $header;
}
