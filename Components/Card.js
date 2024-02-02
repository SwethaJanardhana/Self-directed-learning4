export function CreateCard(props) {
  const createLi = document.createElement("li");
  createLi.classList.add("fontColor");
  createLi.textContent = props.name;
  return createLi;
}
