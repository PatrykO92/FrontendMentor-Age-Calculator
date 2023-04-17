// Create a new Date object with the current date and time
const currentDate = new Date();

// Get the year, month, and day of the current date
const actualYear = currentDate.getFullYear();

const form = document.querySelector("form");
const dayInput = document.querySelector("#day");
const monthInput = document.querySelector("#month");
const yearInput = document.querySelector("#year");

const daysOutput = document.querySelector("#days-output");
const monthsOutput = document.querySelector("#months-output");
const yearsOutput = document.querySelector("#years-output");

const setErrorFor = (input, message) => {
  const formControl = input.parentElement;
  const error = formControl.querySelector([".error-message"]);
  formControl.querySelector("p").classList.add("error");
  error.innerText = message;
};

const setSuccessFor = (input) => {
  const formControl = input.parentElement;
  const error = formControl.querySelector([".error-message"]);
  formControl.querySelector("p").classList.remove("error");
  error.innerText = "";
};

const checkDate = (year, month, day) => {
  // Create a new date object with year, month, and day values
  const date = new Date(year, month - 1, day);

  // Check if the resulting date is valid
  if (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  ) {
    return true;
  } else {
    return false;
  }
};

const calculateYearsAndSetUpOutputs = (date) => {
  console.log(date);
  console.log(currentDate);
  const diffInMs = currentDate - date;
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  const diffInMonths = Math.floor(diffInDays / 30.437);
  const diffInYears = Math.round(diffInMonths / 12);

  yearsOutput.innerHTML = `<span>${diffInYears}</span> <span>${
    diffInYears === 1 ? "year" : "years"
  }</span>`;
  monthsOutput.innerHTML = `<span>${diffInMonths}</span> <span>${
    diffInMonths === 1 ? "month" : "months"
  }</span>`;
  daysOutput.innerHTML = `<span>${diffInDays}</span> <span>${
    diffInDays === 1 ? "day" : "days"
  }</span>`;
};

const validateForm = () => {
  let inputFormValidationSucces = true;
  const dayValue = dayInput.value.trim();
  const monthValue = monthInput.value.trim();
  const yearValue = yearInput.value.trim();

  if (dayValue === "") {
    setErrorFor(dayInput, "Day cannot be blank");
    inputFormValidationSucces = false;
  } else if (dayValue < 1 || dayValue > 31) {
    setErrorFor(dayInput, "Must be a valid day");
    inputFormValidationSucces = false;
  } else {
    setSuccessFor(dayInput);
  }

  if (monthValue === "") {
    setErrorFor(monthInput, "Month cannot be blank");
    inputFormValidationSucces = false;
  } else if (monthValue > 12 || monthValue < 1) {
    setErrorFor(monthInput, "Must be a valid month");
    inputFormValidationSucces = false;
  } else {
    setSuccessFor(monthInput);
  }

  if (yearValue === "") {
    setErrorFor(yearInput, "Year cannot be blank");
    inputFormValidationSucces = false;
  } else if (yearValue < 1850) {
    setErrorFor(yearInput, "Are you a vampire?");
    inputFormValidationSucces = false;
  } else if (yearValue > actualYear) {
    setErrorFor(yearInput, "Are you from future?");
    inputFormValidationSucces = false;
  } else {
    setSuccessFor(yearInput);
  }

  if (!inputFormValidationSucces) return;
  if (checkDate(Number(yearValue), Number(monthValue), Number(dayValue))) {
    const checkDate = new Date(
      Number(yearValue),
      Number(monthValue) - 1,
      Number(dayValue)
    );
    console.log(checkDate);
    calculateYearsAndSetUpOutputs(checkDate);
  } else {
    setErrorFor(dayInput, "Must be a valid date");
    setErrorFor(monthInput, "");
    setErrorFor(yearInput, "");
  }
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  validateForm();
});
