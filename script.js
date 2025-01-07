const dayEl = document.querySelectorAll("#day-value");
const hourEl = document.querySelectorAll("#hour-value");
const minuteEl = document.querySelectorAll("#minute-value");
const secondEl = document.querySelectorAll("#second-value");

// declaring initial values for the day,hour,minute and second depending on the users current time.
// Create a new date object for new year and subtract in from the current date to get the remaining time in milliseconds.
const newYear = new Date(2026, 0, 1);
let currentDate = new Date();
let remainingTime = newYear - currentDate; // remianing time in milliseconds
let remainingDays = Math.floor(remainingTime / (1000 * 60 * 60 * 24)); // convert the remainingTime to days(1second=1000milliseconds)

/*To get the remaining hours for the day I have created a new Date object for the 
next day(this holds the milliseconds till the start of next day) and subtracted 
the value(milliseconds) of current moment and converted it to hours */
let remainingHours = Math.floor(
  (new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate() + 1
  ) -
    new Date()) /
    (1000 * 60 * 60)
);

/*To get the remaining minutes in the current hour, I just had to subtract 
the current minute value from 60, which would give me the remaining minutes in 
the current hour(as the value of current minute increases the value of remaining 
minutes would decrease)*/
let remainingMinutes = 60 - new Date().getMinutes();
let remainingSeconds = 60 - new Date().getSeconds();

/* The following functions creates a temporary top and bottom flippers over the actual top and bottom elements created in the HTML.
They are temporary because they are removed from the DOM tree as soon as the flipping animation ends. The div.top-flipper and  div.bottom-flipper 
added from the script are the ones that actually flip there by giving the user a interactive flipping effect*/
function createTemporaryDayFlipper() {
  const container = document.querySelector(".day > .flipper");
  const div = document.createElement("div");
  div.classList.add("top-flipper");
  const p = document.createElement("p");
  p.innerText =
    remainingDays < 10 ? String(remainingDays).padStart(2, "0") : remainingDays;
  div.appendChild(p);

  const bottomDiv = document.createElement("div");
  bottomDiv.classList.add("bottom-flipper");
  const bottomP = document.createElement("p");
  bottomP.innerText =
    remainingDays < 10 ? String(remainingDays).padStart(2, "0") : remainingDays;
  bottomDiv.appendChild(bottomP);

  container.appendChild(div);
  container.appendChild(bottomDiv);

  div.addEventListener("animationend", () => div.remove());
  bottomDiv.addEventListener("animationend", () => bottomDiv.remove());
}

function createTemporaryHourFlipper() {
  const container = document.querySelector(".hour > .flipper");
  const div = document.createElement("div");
  div.classList.add("top-flipper");
  const p = document.createElement("p");
  p.innerText =
    remainingHours < 10
      ? String(remainingHours).padStart(2, "0")
      : remainingHours;
  div.appendChild(p);

  const bottomDiv = document.createElement("div");
  bottomDiv.classList.add("bottom-flipper");
  const bottomP = document.createElement("p");
  bottomP.innerText =
    remainingHours < 10
      ? String(remainingHours).padStart(2, "0")
      : remainingHours;
  bottomDiv.appendChild(bottomP);

  container.appendChild(div);
  container.appendChild(bottomDiv);

  div.addEventListener("animationend", () => div.remove());
  bottomDiv.addEventListener("animationend", () => bottomDiv.remove());
}

function createTemporaryMinuteFlipper() {
  const container = document.querySelector(".minute > .flipper");
  const div = document.createElement("div");
  div.classList.add("top-flipper");
  const p = document.createElement("p");
  p.innerText =
    remainingMinutes < 10
      ? String(remainingMinutes).padStart(2, "0")
      : remainingMinutes;
  div.appendChild(p);

  const bottomDiv = document.createElement("div");
  bottomDiv.classList.add("bottom-flipper");
  const bottomP = document.createElement("p");
  bottomP.innerText =
    remainingMinutes < 10
      ? String(remainingMinutes).padStart(2, "0")
      : remainingMinutes;
  bottomDiv.appendChild(bottomP);

  container.appendChild(div);
  container.appendChild(bottomDiv);

  div.addEventListener("animationend", () => div.remove());
  bottomDiv.addEventListener("animationend", () => bottomDiv.remove());
}

function createTemporarySecondFlipper() {
  const container = document.querySelector(".second > .flipper");
  const div = document.createElement("div");
  div.classList.add("top-flipper");
  const p = document.createElement("p");
  p.innerText =
    remainingSeconds < 10
      ? String(remainingSeconds).padStart(2, "0")
      : remainingSeconds;
  div.appendChild(p);

  const bottomDiv = document.createElement("div");
  bottomDiv.classList.add("bottom-flipper");
  const bottomP = document.createElement("p");
  bottomP.innerText =
    remainingSeconds < 10
      ? String(remainingSeconds).padStart(2, "0")
      : remainingSeconds;
  bottomDiv.appendChild(bottomP);

  container.appendChild(div);
  container.appendChild(bottomDiv);

  div.addEventListener("animationend", () => div.remove());
  bottomDiv.addEventListener("animationend", () => bottomDiv.remove());
}

// When the countdown ends set all the values to 0
if(currentDate>=newYear){
  remainingDays=0;
  remainingHours=0;
  remainingMinutes=0;
  remainingSeconds=0;
}

/*The following code inserts the initial value of each time component(day, hour...) in the respective elements*/
minuteEl.forEach((element) => {
  if (remainingMinutes < 10) {
    element.textContent = String(remainingMinutes).padStart(2, "0");
  } else {
    element.textContent = remainingMinutes;
  }
});

hourEl.forEach((element) => {
  if (remainingHours < 10) {
    element.textContent = String(remainingHours).padStart(2, "0");
  } else {
    element.textContent = remainingHours;
  }
});

dayEl.forEach((element) => {
  if (remainingDays < 10) {
    element.textContent = String(remainingDays).padStart(2, "0");
  } else {
    element.textContent = remainingDays;
  }
});

secondEl.forEach((element) => {
  if (remainingSeconds < 10) {
    element.textContent = String(remainingSeconds).padStart(2, "0");
  } else {
    element.textContent = remainingSeconds;
  }
});

/*The setInterval function was used to update the value of the time components. It runs every second and updates the value of the remainingSeconds.
For the other time components(hour, minute, day) the update only happens if the value has changed from the initial value.

The functions were intentianally called before updating the value of the respective time components to give an effect of the initial time giving
way to the new time. Updating the value before calling the function makes th animation look kind of off.
*/
if (currentDate < newYear) {
  setInterval(() => {
    createTemporarySecondFlipper();
    remainingSeconds = 60 - new Date().getSeconds();
    secondEl.forEach((element) => {
      if (remainingSeconds < 10) {
        element.textContent = String(remainingSeconds).padStart(2, "0");
      } else {
        element.textContent = remainingSeconds;
      }
    });

    if (remainingMinutes !== 60 - new Date().getMinutes()) {
      createTemporaryMinuteFlipper();
      remainingMinutes = 60 - new Date().getUTCMinutes();
      minuteEl.forEach((element) => {
        if (remainingMinutes < 10) {
          element.textContent = String(remainingMinutes).padStart(2, "0");
        } else {
          element.textContent = remainingMinutes;
        }
      });
    }

    if (
      remainingHours !==
      Math.floor(
        (new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          new Date().getDate() + 1
        ) -
          new Date()) /
          (1000 * 60 * 60)
      )
    ) {
      createTemporaryHourFlipper();
      remainingHours = Math.floor(
        (new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          new Date().getDate() + 1
        ) -
          new Date()) /
          (1000 * 60 * 60)
      );
      hourEl.forEach((element) => {
        if (remainingHours < 10) {
          element.textContent = String(remainingHours).padStart(2, "0");
        } else {
          element.textContent = remainingHours;
        }
      });
    }

    if (
      remainingDays !==
      Math.floor((newYear - new Date()) / (1000 * 60 * 60 * 24))
    ) {
      createTemporaryDayFlipper();
      remainingDays = Math.floor(
        (newYear - new Date()) / (1000 * 60 * 60 * 24)
      );
      dayEl.forEach((element) => {
        if (remainingDays < 10) {
          element.textContent = String(remainingDays).padStart(2, "0");
        } else {
          element.textContent = remainingDays;
        }
      });
    }
  }, 1000);
}
