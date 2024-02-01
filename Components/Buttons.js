export function createButton(props) {
  const button = document.createElement("button");
  button.textContent = props.name;
  button.addEventListener("click", props.onClick);
  return button;
}
