const priceError = new Error(
  "Price can't be a negative number or being equal to zero.",
);
const idError = new Error("Product must have an id");

export class Product {
  #id;
  #price;
  constructor(product) {
    if (typeof product.id !== "number" || isNaN(product.id)) {
      throw idError;
    }
    if (product.price <= 0) {
      throw priceError;
    }
    this.#id = product.id;
    this.name = product.name;
    this.brand = product.brand;
    this.description = product.description;
    this.weight = product.weight;
    this.color = product.color;
    this.#price = product.price;
  }
  getId() {
    return this.#id;
  }
  getPrice() {
    return this.#price;
  }
}

export const PRODUCT_HANDLER = {
  favorite: "favotite",
  add_to_cart: "add_to_cart"
}

export const PRODUCT_ID = "product_id"

export function renderCard(product) {
  const $card = document.createElement("div");
  $card.dataset[PRODUCT_ID] = product.getId();
  $card.className = "product-card";

  const $title = document.createElement("h3");
  $title.textContent = product.name;

  const $brand = document.createElement("p");
  $brand.textContent = product.brand;

  const $price = document.createElement("p");
  $price.textContent = `${product.getPrice()}`;

  const $addButton = document.createElement("button");
  $addButton.textContent = "add to card"
  $addButton.dataset[PRODUCT_HANDLER.add_to_cart] = PRODUCT_HANDLER.add_to_cart;
  
  const $favoriteButton = document.createElement("button");
  $favoriteButton.textContent = "to favorite"
  $favoriteButton.dataset[PRODUCT_HANDLER.favorite] = PRODUCT_HANDLER.favorite;

  $card.append($title, $brand, $price, $addButton, $favoriteButton);

  return $card;
}
