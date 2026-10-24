const ACTIONS = {
  moveToPage: "moveToPage"
}

export function createPaginationButton(number) {
  const $button = document.createElement("button");
  $button.textContent = number;
  $button.dataset.page_number = number;
  $button.dataset.action = ACTIONS.moveToPage;
  $button.className = "page-button";
  return $button;
}

export function createPaginationNavigation(numberArray) {
  const $navigation = document.createElement("nav");
  const $list = document.createElement("ul");

  for (const number of numberArray) {
    const $li = document.createElement("li");
    const $paginationButton = createPaginationButton(number);

    $li.append($paginationButton);
    $list.append($li);
  }

  $navigation.append($list);
  return $navigation;
}

export class Pagination {
  #STARTING_ARRAY = [];
  #STARTING_PAGE = 1;
  #PRODUCTS_PER_PAGE = 5;
  #BUTTONS_QUANTITY_LIMIT = 5;

  constructor(productsArray = this.#STARTING_ARRAY) {
    if (!Array.isArray(productsArray)) {
      throw new Error("Type of value is't array");
    }
    this.array = productsArray;
    this.currentPage = this.#STARTING_PAGE;
  }
  get currentPageItems() {
    const currentPage = this.currentPage;
    const productsPerPage = this.#PRODUCTS_PER_PAGE;

    const start = currentPage * productsPerPage - productsPerPage;
    const end = currentPage * productsPerPage;

    return this.array.slice(start, end);
  }
  get pagesQuantity() {
    return Math.ceil(this.array.length / this.#PRODUCTS_PER_PAGE);
  }
  setCurrentPage(number) {
    if (number <= 0 || typeof number !== "number" || number > this.pagesQuantity) {
      throw new Error("Invalid number");
    }
    this.currentPage = number;
  }
  buttonsNumbersArray() {
    const limitButton = this.#BUTTONS_QUANTITY_LIMIT;
    const pagesQuantity = this.pagesQuantity;

    const buttonsCount = Math.min(limitButton, pagesQuantity);
    const half = Math.floor(buttonsCount / 2);

    const step = Math.max(1,Math.min(this.currentPage - half, pagesQuantity - buttonsCount + 1));

    return Array.from({ length: buttonsCount }, (_, index) => index + step);
  }
  setNewArray(newArray) {
    if (!Array.isArray(newArray)) {
      throw new Error("Type of value is't array");
    }
    this.array = newArray;
  }//products.id products.name products.brand products.price categories.category
  resetPagination(array = []) {
    if (!Array.isArray(array)) {
      throw new Error("Invalid value, valid is't array");
    }
    this.#STARTING_ARRAY = [];
    this.#STARTING_PAGE = 1;
    this.#PRODUCTS_PER_PAGE = 10;
    this.#BUTTONS_QUANTITY_LIMIT = 5;
    this.array = array;
    this.currentPage = 1;
  }
}
