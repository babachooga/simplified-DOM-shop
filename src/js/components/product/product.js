const priceError = new Error(
  "Price can't be a negative number or being equal to zero.",
);
const idError = new Error("Product must have an id");

export class Product {
  #id;
  #price;
  constructor(product) {
    if (!product.id) {
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

const actions = {
  addIntoBasket: "addIntoBasket",
};

export function renderCard(product) {
  const $card = document.createElement("div");
  $card.className = "product-card";

  const $title = document.createElement("h3");
  $title.textContent = product.name;

  const $brand = document.createElement("p");
  $brand.textContent = product.brand;

  const $price = document.createElement("p");
  $price.textContent = `${product.getPrice()}`;

  const $addButton = document.createElement("button");
  $addButton.textContent = "Добавить в корзину";
  $addButton.dataset.product_id = product.getId();
  $addButton.dataset.action = actions.addIntoBasket;

  $card.append($title, $brand, $price, $addButton);

  return $card;
}
