export function createAboutSection() {
  const $section = document.createElement("section");
  $section.className = "about";

  const $title = document.createElement("h1");
  $title.className = "about__title";
  $title.textContent = "Магазин снаряжения для скалолазания";

  const $description = document.createElement("p");
  $description.className = "about__description";
  $description.textContent =
    "Проект: каталог снаряжения с пагинацией и корзиной. Написан на чистом JavaScript с использованием классов и DOM API, без фреймворков.";

  $section.append($title, $description);
  return $section;
}
