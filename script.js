let inputNumber = document.getElementById("inputNumber");
const openingPage = document.getElementById("openingPage");
const generate = document.getElementById("generate");
const container = document.querySelector(".container");
const lift = document.querySelector(".lift");
const leftDoor = document.querySelector(".left-door");
const rightDoor = document.querySelector(".right-door");

generate.addEventListener("click", (e) => {
  e.preventDefault();
  inputNumber = inputNumber.value;
  if (inputNumber > 0 && inputNumber < 100) {
    container.classList.remove("hidden");
    openingPage.classList.add("hidden");

    for (let index = 1; index < inputNumber; index++) {
      container.insertAdjacentHTML(
        "afterbegin",
        ` <div class="floor-container">
   <div class="btn-container">
     <span><button class=" btn btn-up">Up</button></span>

     <span><button class=" btn btn-down">Down</button></span>
   </div>
   <div class="horizontal-flex">
     <hr/>
     <p>Floor ${index}</p>
   </div>
 </div>`
      );
    }
    container.insertAdjacentHTML(
      "afterbegin",
      ` <div class="floor-container">
 <div class="btn-container">

   <span><button class=" btn btn-down">Down</button></span>
 </div>
 <div class="horizontal-flex">
   <hr/>
   <p>Floor ${inputNumber}</p>
 </div>
</div>`
    );
    // events for Button up
    const btnUp = [...document.querySelectorAll(".btn-up")];
    let count = 0;
    btnUp.reverse();
    btnUp.map(function (block, index) {
      block.addEventListener("click", function () {
        let countup = index * 2; //multiplied by 2 to make every transition for floor to take 2s

        //To Check that user not clicked the same floor
        if (count != countup) {
          let translateValue = -10 * index - 1;

          let buttons = document.querySelectorAll(".btn");

          // disable buttons
          buttons.forEach((button) => {
            button.setAttribute("disabled", true);
          });

          let transitionTime = Math.abs(countup - count);
          lift.style.transform = `translateY(${translateValue}rem)`;
          lift.style.transition = `transform ${transitionTime}s ease  `;
          // transition finished event
          lift.addEventListener("transitionend", () => {
            // enable buttons

            // opens the doors
            leftDoor.classList.add("left-move-open");
            rightDoor.classList.add("right-move-open");

            // to close the doors
            leftDoor.addEventListener("transitionend", () => {
              leftDoor.classList.add("left-move-close");
              rightDoor.classList.add("right-move-close");

              //  to remove all the classes after transition
              setTimeout(() => {
                leftDoor.classList.remove("left-move-close");
                rightDoor.classList.remove("right-move-close");
                leftDoor.classList.remove("left-move-open");
                rightDoor.classList.remove("right-move-open");
                // enables the buttons
                buttons.forEach((button) => {
                  button.removeAttribute("disabled");
                });
              }, 2500);
            });
          });
          return (count = countup);
        }
      });
    });

    // events for Button down
    const btnDown = [...document.querySelectorAll(".btn-down")];
    btnDown.reverse();
    btnDown.map(function (block, index) {
      block.addEventListener("click", function () {
        lift.classList.add("move-up");
        let countup = (index + 1) * 2; //multiplied by 2 to make every transition for floor to take 2s
        let translateValue = -10 * index - 11; //added 10 extra because down is starting from 1st floor
        btndownfunc();
        let buttons = document.querySelectorAll(".btn");

        // disable buttons
        buttons.forEach((button) => {
          button.setAttribute("disabled", true);
        });
        async function btndownfunc() {
          let transitionTime = Math.abs(countup - count);
          lift.style.transform = `translateY(${translateValue}rem)`;
          lift.style.transition = `transform  ${transitionTime}s ease  `;
          // transition finished event
          lift.addEventListener("transitionend", () => {
            // enable buttons

            // opens the doors
            leftDoor.classList.add("left-move-open");
            rightDoor.classList.add("right-move-open");

            // to close the doors
            leftDoor.addEventListener("transitionend", () => {
              leftDoor.classList.add("left-move-close");
              rightDoor.classList.add("right-move-close");

              //  to remove all the classes after transition
              setTimeout(() => {
                leftDoor.classList.remove("left-move-close");
                rightDoor.classList.remove("right-move-close");
                leftDoor.classList.remove("left-move-open");
                rightDoor.classList.remove("right-move-open");
                // enables the buttons
                buttons.forEach((button) => {
                  button.removeAttribute("disabled");
                });
              }, 2500);
            });
          });
          return (count = countup);
        }
      });
    });
  } else {
    alert("Please Enter a Value between 0 and 100");
    location.reload();
  }
});
