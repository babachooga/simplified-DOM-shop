import { createCartItemCard } from "../../components/basket/basket.js";
import { findDispatchTarget } from "../../DOM functions/index.js";
import { BASKET_HANDLER, PRODUCT_ID } from "../../components/basket/basket.js";

export function createBasketSection(basket) {
  const $section = document.createElement("section");

  let $showcase = createListOfCards(basket.basket);
  let $fullPrice = document.createElement("span");

  $fullPrice.textContent = basket.fullPrice;

  const basketDispatcher = {
    [BASKET_HANDLER.increase]: (product) => {
      basket.addProduct(product);
    },
    [BASKET_HANDLER.decrease]: (product) => {
      basket.removeProduct(product);
    },
    [BASKET_HANDLER.delete]: (product) => {
      basket.deleteProduct(product);
    },
  };

  $section.addEventListener("click", (event) => {
    const responce = findDispatchTarget(event, BASKET_HANDLER);
    if (!responce) return;
    const $element = responce.element.closest(`[data-${PRODUCT_ID}]`);
    const productId = +$element.dataset[`${PRODUCT_ID}`];
    const { product } = basket.findProduct(productId);
    basketDispatcher[responce.key](product);

    const $newShowcase = createListOfCards(basket.basket)
    $showcase.replaceWith($newShowcase)
    $showcase = $newShowcase
    $fullPrice.textContent = basket.fullPrice
  });

  $section.append($showcase, $fullPrice);
  return $section;
}

function createListOfCards(basket) {
  const $list = document.createElement("ul");

  for (const product of basket) {
    const $productCard = createCartItemCard(product);

    const $li = document.createElement("li");
    $li.append($productCard);
    $list.append($li);
  }

  return $list;
}
