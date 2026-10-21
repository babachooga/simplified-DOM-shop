import { database } from "../../database/database.js";
import {
  createPaginationNavigation,
  Pagination,
} from "../../components/pagination/pagination.js";
import { Product, renderCard } from "../../components/product/product.js";
import { createHeader } from "../../components/header/header.js";

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
  
  
  // const dispatcher = {
  //   page_number: (number) => {},
  //   product_id: (number) => {},
  // };

  $products.addEventListener("click", (event) => {
    const datasetValue = event.target.dataset.page_number;
    if (datasetValue) {
      productPagination.setCurrentPage(+datasetValue);

      const numberArr = productPagination.buttonsNumbersArray();
      const $newNavigation = createPaginationNavigation(numberArr);

      const $newShowCase = createListOfCards(
        productPagination.currentPageItems,
      );

      $navigation.replaceWith($newNavigation);
      $navigation = $newNavigation;

      const currentPage = document.querySelector(
        `[data-page_number="${productPagination.currentPage}"]`,
      );
      currentPage.style.background = "cyan";

      $showcase.replaceWith($newShowCase);
      $showcase = $newShowCase;
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
