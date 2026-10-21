import { Product } from "../product/product.js";

export class Basket {
    #basket = [];
    get basket() {
        return [...this.#basket];
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

        if (cartProduct) {
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

export const basket = new Basket();
