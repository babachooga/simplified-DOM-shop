export function cleanContainer(container) {
  container.innerHTML = "";
}

export function findDispatchTarget(event, dispatcher) {
  for (const key in dispatcher) {
    const $element = event.target.closest(`[data-${key}]`);

    if ($element) {
      return { key: key, element: $element };
    }
  }
}
