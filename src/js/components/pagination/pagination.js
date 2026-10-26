
export const PAG_BUTTON_HANDLER = {
  page_number: "page_number",
  next_page: "next_page",
}

export function createPaginationButton(number) {
  const $button = document.createElement("button");
  $button.textContent = number;
  $button.dataset[PAG_BUTTON_HANDLER.page_number] = number;
  $button.dataset[PAG_BUTTON_HANDLER.next_page] = PAG_BUTTON_HANDLER.next_page;
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
  }
}
