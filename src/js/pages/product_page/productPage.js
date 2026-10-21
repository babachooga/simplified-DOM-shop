import { database } from "../../database/database.js";
import {
    createPaginationNavigation,
    Pagination,
} from "../../components/pagination/pagination.js";
import { Product, renderCard } from "../../components/product/product.js";
import { createHeader } from "../../components/header/header.js";
import { basket } from "../../components/basket/basket.js";

const productPagination = new Pagination(database);

export function createProductsPage() {
    const $pageWrapper = document.createElement("div");

    const $header = createHeader();

    const $productSection = createProductsSection();

    $pageWrapper.append($header, $productSection);

    return $pageWrapper;
}

function createProductsSection() {
    const $products = document.createElement("section");

    let $showcase = createListOfCards(productPagination.currentPageItems);

    const numberArr = productPagination.buttonsNumbersArray();
    let $navigation = createPaginationNavigation(numberArr);

    $products.append($showcase, $navigation);

    const dispatcher = {
        page_number: (number) => {
            productPagination.setCurrentPage(number);

            const numberArr = productPagination.buttonsNumbersArray();
            const $newNavigation = createPaginationNavigation(numberArr);

            const $newShowCase = createListOfCards(
                productPagination.currentPageItems,
            );

            $navigation.replaceWith($newNavigation);
            $navigation = $newNavigation;

            $showcase.replaceWith($newShowCase);
            $showcase = $newShowCase;
        },
        product_id: (number) => {
            const currentPageProducts = productPagination.currentPageItems;
            const product = currentPageProducts.find(
                (product) => product.id === number,
            );
            try {
                const productObject = new Product(product);
                console.log(basket.addProduct(productObject));
            } catch (error) {
                console.log("We couldn't add item into the basket");
                console.log(error.message);
            }
        },
    };

    $products.addEventListener("click", (event) => {
        for (const key in dispatcher) {
            const $element = event.target.closest(`[data-${key}]`);

            if ($element) {
                const datasetValue = $element.dataset[key];
                dispatcher[key](+datasetValue);
            }
        }
    });

    return $products;
}

function createListOfCards(productsArray) {
    const $list = document.createElement("ul");

    for (const product of productsArray) {
        const productObject = new Product(product);
        const $productCard = renderCard(productObject);

        const $li = document.createElement("li");
        $li.append($productCard);
        $list.append($li);
    }

    return $list;
}
