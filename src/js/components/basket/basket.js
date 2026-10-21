import { Product } from "../product/product.js";
class Basket {
  #basket = [
    {
      product: new Product({
        id: 10,
        name: "Alpha SV Jacket",
        brand: "Arc'teryx",
        description:
          "Premium, hardwearing Gore-Tex Pro storm jacket designed for severe alpine conditions.",
        color: "blue",
        weight: 485,
        price: "900.00",
        id_category: 3,
      }),
      amount: 2,
    },
  ];
  get basket() {
    return [...this.#basket];
  }
  addProduct(product) {
    const productId = product.getId();
    const productInBasket = findProductInBasket(this.#basket, productId);

    if (productInBasket) {
      productInBasket.amount += 1;
    }
    else {
      const newProduct = { product, amount: 1 };
      this.#basket.push(newProduct);
    }
    return this.basket;
  }
  remove(product){

  }
}

function findProductInBasket(basket, id) {
  return basket.find(({ product, _ } = productInfo) => product.getId() == id);
}

export const basket = new Basket();
console.log(
  basket.addProduct(
    new Product({
      id: 10,
      name: "Alpha SV Jacket",
      brand: "Arc'teryx",
      description:
        "Premium, hardwearing Gore-Tex Pro storm jacket designed for severe alpine conditions.",
      color: "blue",
      weight: 485,
      price: "900.00",
      id_category: 3,
    }),
  ),
);
