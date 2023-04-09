let inputFloor = document.getElementById("inputFloor");
let inputLift = document.getElementById("inputLift");
const openingPage = document.getElementById("openingPage");
const generate = document.getElementById("generate");
const container = document.querySelector(".container") ;
const firstLift = document.querySelector(".first-lift") ;
const lift = document.querySelector(".lift");
const leftDoor = document.querySelector(".left-door");
const rightDoor = document.querySelector(".right-door");

generate.addEventListener("click", (e) => {
  e.preventDefault();
  inputFloor = inputFloor.value;
  inputLift = inputLift.value;

  if (inputFloor > 0 && inputFloor < 100) {
    container.classList.remove("hidden");
    openingPage.classList.add("hidden");

    for (let index = 1; index < inputFloor; index++) {
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
            <p>Floor ${inputFloor}</p>
          </div>
        </div>`

    );
    
   
    if(window.innerWidth <= 500 ){
      console.log("mobile device")
      if( inputLift>0 && inputLift < 4){
        liftGeneration()
      }
      else{
        alert("As you are in Small device Enter the Value in between 0 to 4");
        location.reload();
      }
    }
    else if( window.innerWidth > 500 && window.innerWidth <= 768){
      console.log("im in desktop less than 768")
      if( inputLift>0 && inputLift < 5){
        liftGeneration()
      }
      else{
        alert(" Enter the Value in between 0 to 5");
        location.reload();
      }
    }
    else if( window.innerWidth > 500 && window.innerWidth <= 1024){
      console.log("im in desktop less than 1024")
      if( inputLift>0 && inputLift < 7){
        liftGeneration()
      }
      else{
        alert(" Enter the Value in between 0 to 7");
        location.reload();
      }
    }
    else{
      if( inputLift>0 && inputLift < 11){
        liftGeneration()
      }
      else{
        alert(" Enter the Value in between 0 to 11");
        location.reload();
      }
    }

    function liftGeneration(){
      for (let index = 1; index < inputLift; index++) {
        firstLift.insertAdjacentHTML(
          "afterend",
            ` <div class="lift">
                  <div class="left-door"></div>
                  <div class="right-door"></div>
              </div> `
        )
      }
  
    }
    // events for Button up
    const btnUp = [...document.querySelectorAll(".btn-up")];
    let count = 0;
    btnUp.reverse();  //reversed the order of array
    btnUp.map(function (block, index) {
      block.addEventListener("click", function () {
        block.classList.add("btn-clicked");
        let countup = index * 2; //multiplied by 2 to make every transition for floor to take 2s

        const buttons = document.querySelectorAll(".btn");
        //To Check that user not clicked the same floor
        if (count != countup) {
          let translateValue = -10 * index - 1;

          // disable buttons
          buttons.forEach((button) => {
            button.setAttribute("disabled", true);
          });

          let transitionTime = Math.abs(countup - count);
          lift.style.transform = `translateY(${translateValue}rem)`;
          lift.style.transition = `transform ${transitionTime}s ease  `;
          // transition finished event
          lift.addEventListener("transitionend", () => {
            block.classList.remove("btn-clicked");
            liftAnimation(block, buttons);
          });
          return (count = countup);
        }
        //if same floor
        else {
          block.classList.remove("btn-clicked");
          // disable buttons
          buttons.forEach((button) => {
            button.setAttribute("disabled", true);
          });
          liftAnimation(block, buttons);
        }
      });
    });

    // events for Button down
    const btnDown = [...document.querySelectorAll(".btn-down")];
    btnDown.reverse();
    btnDown.map(function (block, index) {
      block.addEventListener("click", function () {
        block.classList.add("btn-clicked");
        const buttons = document.querySelectorAll(".btn");

        // lift.classList.add("move-up");
        let countup = (index + 1) * 2; //multiplied by 2 to make every transition for floor to take 2s
        //To Check that user not clicked the same floor
        if (count != countup) {
          let translateValue = -10 * index - 11; //added 10 extra because down is starting from 1st floor

          // disable buttons
          buttons.forEach((button) => {
            button.setAttribute("disabled", true);
          });

          let transitionTime = Math.abs(countup - count);
          lift.style.transform = `translateY(${translateValue}rem)`;
          lift.style.transition = `transform  ${transitionTime}s ease  `;

          // transition finished event
          lift.addEventListener("transitionend", () => {
            block.classList.remove("btn-clicked");

            liftAnimation(block, buttons);
          });
          return (count = countup);
        }
        //if same floor
        else {
          block.classList.remove("btn-clicked");
          // disable buttons
          buttons.forEach((button) => {
            button.setAttribute("disabled", true);
          });
          liftAnimation(block, buttons);
        }
      });
    });
  } else {
    alert("Please Enter a Floors Value between 0 and 100");
    location.reload();
  }
});

function liftAnimation(block, buttons) {
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
      buttons.forEach((button) => {
        button.removeAttribute("disabled");
      });
    }, 2500);
  });
}
