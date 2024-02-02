import people from "./data.js";
import { CreateButton } from "./Components/Buttons.js";
import { CreateCard } from "./Components/Card.js";

const spanElement = document.querySelector("[data-js=people-in-space]");
const peopleList = document.querySelector("[data-js=people-details]");
const navigationButtons = document.querySelector(
  "[data-js=navigation-buttons]"
);

const allButton = CreateButton({
  name: "All",
  onClick: fetchPeople,
});
const issButton = CreateButton({
  name: "ISS",
  onClick: fetchPeople,
});
const tiangongButton = CreateButton({
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
  let numberOfPeople = 0;
  if (initialFetch) {
    peopleList.innerHTML = "Click on the respective button to view the data.";
    spanElement.textContent = "";
  } else {
    people
      .filter((person) => person.craft.includes(filterQuery))
      .forEach((person) => {
        peopleList.append(CreateCard(person));
        numberOfPeople++;
      });

    if (!peopleList.hasChildNodes()) {
      peopleList.innerHTML = "No data Found";
    }
    spanElement.textContent = numberOfPeople;
  }
}

/*------Fetch method using URL--------*/

/* async function fetchNumberOfPeopleInSpace() {
  peopleList.innerHTML = "";

  try {
    const response = await fetch("http://api.open-notify.org/astros.json");
    const data = await response.json();
    let numberOfPeople = 0;
    const people = data.people;
    if (initialFetch) {
      peopleList.innerHTML = "Click on the respective button to view the data.";
      spanElement.textContent = "";
    } else {
      people
        .filter((person) => person.craft.includes(filterQuery))
        .forEach((person) => {
          peopleList.append(CreateCard(person));
          numberOfPeople++;
        });

      if (!peopleList.hasChildNodes()) {
        peopleList.innerHTML = "No data Found";
      }
      spanElement.textContent = numberOfPeople;
    }
  } catch (error) {
    console.log(error);
  }
} */

function fetchPeople(e) {
  initialFetch = false;
  e.currentTarget.dataset.isActive = true;
  const clickButton = e.currentTarget.innerHTML.trim();
  handleClickHighlight();

  filterQuery = clickButton.includes("All") ? "" : clickButton;
  fetchNumberOfPeopleInSpace();
}

// highlight only the clicked button

function handleClickHighlight() {
  Array.from(navigationButtons.children).forEach((button) => {
    if (
      button.dataset.isActive === "true" &&
      !button.classList.contains("button__active")
    ) {
      button.classList.add("button__active");
      button.disabled = true;
    } else {
      button.dataset.isActive = "false";
      button.disabled = false;
      button.classList.remove("button__active");
    }
  });
}
