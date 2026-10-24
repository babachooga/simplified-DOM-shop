import { basket } from "../../../../index.js";
import { database } from "../../database/database.js";
import { createCartItemCard } from "../../components/basket/basket.js";
import { createHeader } from "../../components/header/header.js";
import { Product } from "../../components/product/product.js";

export function basketPage() {
  const $wrapper = document.createElement("div");

  const $header = createHeader();
  const $basketSection = createBasketSection();

  $wrapper.append($header, $basketSection);
  return $wrapper;
}

function createBasketSection() {
  const $section = document.createElement("section");

  let $showcase = createListOfCards(basket.basket);
  let $fullPrice = document.createElement("span")

  $fullPrice.textContent = basket.fullPrice 


  const actions = {
    increase: (productClass) => {
      basket.addProduct(productClass)
      console.log("+1");
    },
    decrease: (productClass) => {
      basket.removeProduct(productClass)
      console.log(-1);
    },
    delete: (productClass) => {
      basket.deleteProduct(productClass)
      console.log(0);
    },
  };

  const dispatcher = {
    action: ($element) => {
      const command = $element.dataset.action;
      const productId = +$element.dataset.product_id;
      const product = database.find((product) => product.id === productId);
      const productClass = new Product(product)
      actions[command](productClass);
      const $newListOfcard = createListOfCards(basket.basket);
      $showcase.replaceWith($newListOfcard);
      $showcase = $newListOfcard;
      $fullPrice.textContent = basket.fullPrice
      console.log("basket updated");
    },
  };

  $section.addEventListener("click", (event) => {
    for (const key in dispatcher) {
      const $element = event.target.closest(`[data-${key}]`);
      if ($element) {
        dispatcher[key]($element);
        break;
      }
    }
  });

  $section.append($showcase,$fullPrice);
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
