import { Product } from "../product/product.js";

export class Basket {
  #basket = [];
  get basket() {
    return [...this.#basket];
  }
  get fullPrice(){
    return this.#basket.reduce((acc,{product,amount})=>{
      const finalPrice = product.getPrice() * amount
      return acc += finalPrice
    },0)
  }
  addProduct(product) {
    const productId = product.getId();
    const productInBasket = findProductInBasket(this.#basket, productId);

    if (productInBasket) {
      this.#basket = this.#basket.map(({ product, amount }) => {
        if (product.getId() === productId) {
          return { product, amount: amount + 1 };
        }
        return { product, amount };
      });
    } else {
      this.#basket = [...this.#basket, { product: product, amount: 1 }];
    }

    return this.basket;
  }
  removeProduct(product) {
    const productId = product.getId();

    const cartProduct = findProductInBasket(this.#basket, productId);

    if (!cartProduct) {
      throw new Error("No such product in the basket");
    }

    if (cartProduct.amount === 1) {
      return this.deleteProduct(product);
    }

    this.#basket = this.#basket.map(({ product, amount }) => {
      if (product.getId() === productId) {
        return { product, amount: amount - 1 };
      }
      return { product, amount };
    });

    return this.basket;
  }
  deleteProduct(product) {
    const productId = product.getId();

    console.log()
    if (!findProductInBasket(this.#basket, productId)) {
      throw new Error("No such product in the basket");
    }

    this.#basket = this.#basket.filter(
      ({ product, amount }) => product.getId() !== productId,
    );

    return this.basket;
  }
}

function findProductInBasket(basket, id) {
  return basket.find(
    ({ product, amount } = productInfo) => product.getId() == id,
  );
}

const ACTIONS = {
  DECREASE: "decrease",
  INCREASE: "increase",
  DELETE: "delete",
}

export function createCartItemCard({ product, amount }) {
  const $item = document.createElement("div");
  $item.className = "cart-item";
  $item.dataset.product_id = product.getId();

  const $name = document.createElement("h3");
  $name.className = "cart-item__name";
  $name.textContent = product.name;

  const $price = document.createElement("p");
  $price.className = "cart-item__price";
  $price.textContent = `${product.getPrice()}`;

  const $decrease = document.createElement("button");
  $decrease.type = "button";
  $decrease.className = "cart-item__button";
  $decrease.dataset.action = ACTIONS.DECREASE;
  $decrease.dataset.product_id = product.getId();
  $decrease.textContent = "−";

  const $amount = document.createElement("span");
  $amount.className = "cart-item__amount";
  $amount.textContent = amount;

  const $increase = document.createElement("button");
  $increase.type = "button";
  $increase.className = "cart-item__button";
  $increase.dataset.action = ACTIONS.INCREASE;
  $increase.dataset.product_id = product.getId();
  $increase.textContent = "+";

  const $controls = document.createElement("nav");
  $controls.className = "cart-item__controls";
  $controls.append($decrease, $amount, $increase);

  const $delete = document.createElement("button");
  $delete.type = "button";
  $delete.className = "cart-item__delete";
  $delete.dataset.action = ACTIONS.DELETE;
  $delete.dataset.product_id = product.getId();
  $delete.textContent = "Удалить";

  $item.append($name, $price, $controls, $delete);
  return $item;
}
