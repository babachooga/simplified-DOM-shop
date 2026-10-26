import { createProductsSection } from "./src/js/sections/product_section/productSection.js";
import { createBasketSection } from "./src/js/sections/basket_section/basketSection.js";
import { createAboutSection } from "./src/js/sections/about_section/aboutSection.js";
import {
  createHeader,
  HEADER_HANDLER,
} from "./src/js/components/header/header.js";
import {
  cleanContainer,
  findDispatchTarget,
} from "./src/js/DOM functions/index.js";
import { Basket } from "./src/js/components/basket/basket.js";

export const basket = new Basket();

const $app = document.getElementById("app");

const $header = document.getElementById("header");
const $main = document.getElementById("main");

const pages = {
  [HEADER_HANDLER.move_to_basket.key]: () => {
    cleanContainer($main);
    const $section = createBasketSection(basket);
    $main.append($section);
  },
  [[HEADER_HANDLER.move_to_products.key]]: () => {
    cleanContainer($main);
    const $section = createProductsSection(basket);
    $main.append($section);
  },
  [[HEADER_HANDLER.move_to_about.key]]: () => {
    cleanContainer($main);
    const $section = createAboutSection();
    $main.append($section);
  },
};

$header.addEventListener("click", (event) => {
  const responce = findDispatchTarget(event, HEADER_HANDLER);
  if (!responce) return;
  pages[responce.key]();
});

$header.append(createHeader());

$main.append(createAboutSection());
