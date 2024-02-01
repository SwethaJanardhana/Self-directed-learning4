import people from "./data.js";
import { createButton } from "./Components/Buttons.js";

const spanElement = document.querySelector("[data-js=people-in-space]");
const peopleList = document.querySelector("[data-js=people-details]");
const navigationButtons = document.querySelector(
  "[data-js=navigation-buttons]"
);

const allButton = createButton({ name: "All", onClick: fetchPeople });
const issButton = createButton({ name: "ISS", onClick: fetchPeople });
const tiangongButton = createButton({
  name: "Tiangong",
  onClick: fetchPeople,
});
navigationButtons.append(allButton, issButton, tiangongButton);

let filterQuery = " ";
let initialFetch = true;

fetchNumberOfPeopleInSpace();

/*------Fetch method using static data--------*/

function fetchNumberOfPeopleInSpace() {
  peopleList.innerHTML = "";
  spanElement.textContent = people.length;

  if (initialFetch) {
    peopleList.innerHTML = "Click on the respective button to view the data.";
  } else {
    people
      .filter((person) => person.craft.includes(filterQuery))
      .forEach((person) => {
        peopleList.append(createCard(person));
      });

    if (!peopleList.hasChildNodes()) {
      peopleList.innerHTML = "No data Found";
    }
  }
}

/*------Fetch method using URL--------*/

/* async function fetchNumberOfPeopleInSpace() {
  peopleList.innerHTML = "";

  try {
    const response = await fetch("http://api.open-notify.org/astros.json");
    const data = await response.json();
    spanElement.textContent = data.number;
    const people = data.people;
    if (initialFetch) {
      peopleList.innerHTML = "Click on the respective button to view the data.";
    } else {
      people
        .filter((person) => person.craft.includes(filterQuery))
        .forEach((person) => {
          peopleList.append(createCard(person));
        });

      if (!peopleList.hasChildNodes()) {
        peopleList.innerHTML = "No data Found";
      }
    }
  } catch (error) {
    console.log(error);
  }
} */

function fetchPeople(e) {
  initialFetch = false;
  const clickButton = e.target.innerHTML.trim();
  filterQuery = clickButton.includes("All") ? "" : clickButton;
  fetchNumberOfPeopleInSpace();
}

function createCard(props) {
  const createLi = document.createElement("li");
  createLi.classList.add("fontColor");
  createLi.textContent = props.name;
  return createLi;
}
