import { database } from "../../database/database.js";
import {
  createPaginationNavigation,
  Pagination,
  PAG_BUTTON_HANDLER,
} from "../../components/pagination/pagination.js";
import { findDispatchTarget } from "../../DOM functions/index.js";
import {
  Product,
  renderCard,
  PRODUCT_HANDLER,
  PRODUCT_ID,
} from "../../components/product/product.js";

export function createProductsSection(basket) {
  const productPagination = new Pagination(database);

  const $productsSection = document.createElement("section");

  const $showcaseContainer = document.createElement("div");
  let $showcase = createListOfCards(productPagination.currentPageItems);

  const numberArr = productPagination.buttonsNumbersArray();

  const $navigationContainer = document.createElement("div");
  let $navigation = createPaginationNavigation(numberArr);

  $showcaseContainer.append($showcase);
  $navigationContainer.append($navigation);
  $productsSection.append($showcaseContainer, $navigationContainer);

  const showcaseDispatcher = {
    [PRODUCT_HANDLER.favorite]: (product) => console.log(2),
    [PRODUCT_HANDLER.add_to_cart]: (product) => basket.addProduct(product),
  };

  $showcaseContainer.addEventListener("click", (event) => {
    const responce = findDispatchTarget(event, showcaseDispatcher);
    if (responce) {
      const card = event.target.closest(`[data-${PRODUCT_ID}]`);
      const id = +card.dataset[`${PRODUCT_ID}`];

      const currentProducts = productPagination.currentPageItems;
      const object = currentProducts.find((product) => product.id === id);

      const newProduct = new Product(object);

      return showcaseDispatcher[responce.key](newProduct);
    }
    return;
  });

  const navigationDispatcher = {
    [PAG_BUTTON_HANDLER.next_page]: (number) => {
      productPagination.setCurrentPage(number);

      const newProducts = productPagination.currentPageItems;
      const $newShowcase = createListOfCards(newProducts);
      $showcase.replaceWith($newShowcase)
      $showcase = $newShowcase

      const pagNumbers = productPagination.buttonsNumbersArray()
      const $newNavigation = createPaginationNavigation(pagNumbers)
      
      $navigation.replaceWith($newNavigation)
      $navigation = $newNavigation
    },
  };

  $navigationContainer.addEventListener("click", (event) => {
    const responce = findDispatchTarget(event, navigationDispatcher);
    if (responce) {
      const pageNumber = +responce.element.dataset[PAG_BUTTON_HANDLER.page_number];
      return navigationDispatcher[responce.key](pageNumber);
    }
    return;
  });

  return $productsSection;
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
