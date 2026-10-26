export const HEADER_HANDLER = {
  move_to_basket: {
    key: "move_to_basket",
    name: "basket",
    text: "basket page",
  },
  move_to_products: {
    key: "move_to_products",
    name: "products",
    text: "products page",
  },
  move_to_about: {
    key: "move_to_about",
    name: "about",
    text: "about page",
  },
};

export function createHeader() {
  const $header = document.createElement("header");
  $header.className = "header";

  const $nav = createHeaderNavigation();

  $header.append($nav);
  return $header;
}

function createHeaderNavigation() {
  const $nav = document.createElement("nav");

  Object.entries(HEADER_HANDLER).forEach(([key, { name, text }]) => {
    const $button = document.createElement("button");
    $button.dataset[key] = name;
    $button.textContent = text;

    $nav.append($button);
  });

  return $nav;
}
