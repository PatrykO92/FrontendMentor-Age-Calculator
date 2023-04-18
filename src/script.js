const AVERAGE_NUMBER_OF_DAYS_IN_YEAR = 365.242199;
const AVERAGE_NUMBER_OF_DAYS_IN_MONTH = 30.437;

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
  const totalDiffInMs = currentDate - date;
  const totalDiffInDays = totalDiffInMs / (1000 * 60 * 60 * 24);
  const totalDiffInMonths = Math.floor(
    totalDiffInDays / AVERAGE_NUMBER_OF_DAYS_IN_MONTH
  );

  const displayYears = Math.floor(totalDiffInMonths / 12);
  const displayMonths = Math.floor(totalDiffInMonths - displayYears * 12);
  const displayDays = Math.floor(
    totalDiffInDays -
      displayYears * AVERAGE_NUMBER_OF_DAYS_IN_YEAR -
      displayMonths * AVERAGE_NUMBER_OF_DAYS_IN_MONTH
  );

  yearsOutput.innerHTML = `<span id="yearsOutput">0</span> <span>${
    displayYears === 1 ? "year" : "years"
  }</span>`;
  monthsOutput.innerHTML = `<span id="monthsOutput">0</span> <span>${
    displayMonths === 1 ? "month" : "months"
  }</span>`;
  daysOutput.innerHTML = `<span id="daysOutput">0</span> <span>${
    displayDays === 1 ? "day" : "days"
  }</span>`;

  let yearsCounter = 0;
  const yearsInterval = setInterval(() => {
    if (yearsCounter <= displayYears) {
      document.getElementById("yearsOutput").textContent = yearsCounter;
      yearsCounter++;
    } else {
      clearInterval(yearsInterval);
      let monthsCounter = 0;
      const monthsInterval = setInterval(() => {
        if (monthsCounter <= displayMonths) {
          document.getElementById("monthsOutput").textContent = monthsCounter;
          monthsCounter++;
        } else {
          clearInterval(monthsInterval);
          let daysCounter = 0;
          const daysInterval = setInterval(() => {
            if (daysCounter <= displayDays) {
              document.getElementById("daysOutput").textContent = daysCounter;
              daysCounter++;
            } else {
              clearInterval(daysInterval);
            }
          }, 50);
        }
      }, 50);
    }
  }, 50);
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
