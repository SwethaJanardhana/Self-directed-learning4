import people from "./data.js";
import { createButton } from "./Components/Buttons.js";

const spanElement = document.querySelector("[data-js=people-in-space]");
const peopleList = document.querySelector("[data-js=people-details]");
const navigationButtons = document.querySelector(
  "[data-js=navigation-buttons]"
);

const allButton = createButton({ name: "All", onClick: fetchAllPeople });
const issButton = createButton({ name: "ISS", onClick: fetchISSPeople });
const tiangongButton = createButton({
  name: "Tiangong",
  onClick: fetchTiangongPeople,
});
navigationButtons.append(allButton, issButton, tiangongButton);

let check = "";

fetchNumberOfPeopleInSpace();

/*------Fetch method using static data--------*/

/*function fetchNumberOfPeopleInSpace() {
  peopleList.innerHTML = "";
  spanElement.textContent = people.length;
  if (check === "All") {
    people.forEach((person) => {
      peopleList.append(createCard(person));
    });
  } else if (check === "ISS") {
    people
      .filter((person) => person.craft === "ISS")
      .forEach((person) => {
        peopleList.append(createCard(person));
      });
  } else if (check === "Tiangong") {
    people
      .filter((person) => person.craft === "Tiangong")
      .forEach((person) => {
        peopleList.append(createCard(person));
      });
  } else {
    peopleList.innerHTML = "Click to view the data";
    peopleList.style.color = "white";
  }
  if (!peopleList.hasChildNodes()) {
    peopleList.innerHTML = "No data Found";
  }
}
*/

/*------Fetch method using URL--------*/

async function fetchNumberOfPeopleInSpace() {
  peopleList.innerHTML = "";

  try {
    const response = await fetch("http://api.open-notify.org/astros.json");
    const data = await response.json();
    spanElement.textContent = data.number;
    const people = data.people;

    if (check === "All") {
      people.forEach((person) => {
        peopleList.append(createCard(person));
      });
    } else if (check === "ISS") {
      people
        .filter((person) => person.craft === "ISS")
        .forEach((person) => {
          peopleList.append(createCard(person));
        });
    } else if (check === "Tiangong") {
      people
        .filter((person) => person.craft === "Tiangong")
        .forEach((person) => {
          peopleList.append(createCard(person));
        });
    } else {
      peopleList.innerHTML = "Click to view the data";
      peopleList.style.color = "white";
    }

    if (!peopleList.hasChildNodes()) {
      peopleList.innerHTML = "No data Found";
    }
  } catch (error) {
    console.log(error);
  }
}

function fetchAllPeople() {
  check = event.target.textContent.trim();
  fetchNumberOfPeopleInSpace();
}

function fetchISSPeople() {
  check = event.target.textContent.trim();
  fetchNumberOfPeopleInSpace();
}

function fetchTiangongPeople() {
  check = event.target.textContent.trim();
  fetchNumberOfPeopleInSpace();
}

function createCard(props) {
  const createLi = document.createElement("li");
  createLi.classList.add("fontColor");
  createLi.textContent = props.name;
  return createLi;
}
