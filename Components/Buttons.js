export function CreateButton(props) {
  const button = document.createElement("button");
  button.textContent = props.name;
  button.classList.add("button-class");
  button.addEventListener("click", props.onClick);
  button.dataset.isActive = false;
  return button;
}
