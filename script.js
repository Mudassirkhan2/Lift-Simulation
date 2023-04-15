let inputFloor = document.getElementById("inputFloor");
let inputLift = document.getElementById("inputLift");
const openingPage = document.getElementById("openingPage");
const generate = document.getElementById("generate");
const container = document.querySelector(".container") ;
const firstLift = document.querySelector(".first-lift") ;


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
        alert("As you are in Small device Enter the Value of lifts in between 0 to 4");
        location.reload();
      }
    }
    else if( window.innerWidth > 500 && window.innerWidth <= 768){
      console.log("im in desktop less than 768")
      if( inputLift>0 && inputLift < 5){
        liftGeneration()
      }
      else{
        alert(" Enter the Value of lifts in between 0 to 5");
        location.reload();
      }
    }
    else if( window.innerWidth > 500 && window.innerWidth <= 1024){
      console.log("im in desktop less than 1024")
      if( inputLift>0 && inputLift < 7){
        liftGeneration()
      }
      else{
        alert(" Enter the Value of lifts in between 0 to 7");
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


    // const lift = document.querySelector(".lift");
    const lift = [...document.querySelectorAll(".lift")];
    const leftDoor = document.querySelectorAll(".left-door");
    const rightDoor = document.querySelectorAll(".right-door");  
    let indexLift =1
    let liftanimationindex=0
    function liftAnimation(block, buttons,liftanimationindex,indexLift) {
      console.log(liftanimationindex)
      // opens the doors
      leftDoor[liftanimationindex].classList.add("left-move-open");

      rightDoor[liftanimationindex].classList.add("right-move-open");
    
      // to close the doors
      leftDoor[liftanimationindex].addEventListener("transitionend", () => {
        leftDoor[liftanimationindex].classList.add("left-move-close");

        rightDoor[liftanimationindex].classList.add("right-move-close");
    
        //  to remove all the classes after transition
        setTimeout(() => {
          leftDoor[liftanimationindex].classList.remove("left-move-close");
          rightDoor[liftanimationindex].classList.remove("right-move-close");
          leftDoor[liftanimationindex].classList.remove("left-move-open");
          rightDoor[liftanimationindex].classList.remove("right-move-open");
            indexLift =0
            console.log("transition end index " ,indexLift)
        }, 2500);
      });
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
          let transitionTime = Math.abs(countup - count);
          console.log(indexLift)
          lift[indexLift].style.transform = `translateY(${translateValue}rem)`;
          lift[indexLift].style.transition = `transform ${transitionTime}s ease`;

          function transitionRunListener() {
            console.log("transition start")
            console.log(indexLift)
            if(indexLift < inputFloor-1){
              liftanimationindex = indexLift
              indexLift = indexLift + 1
            }
            else{
              console.log("hii")
              liftanimationindex = indexLift
              indexLift=0
            }
            console.log("transition start index ", indexLift)
            this.removeEventListener("transitionrun", transitionRunListener);
          }
          // transition finished event
          function transitionEndListener() {
            block.classList.remove("btn-clicked");
            liftAnimation(block, buttons, liftanimationindex, indexLift);
            console.log("transitionend")
            this.removeEventListener("transitionend", transitionEndListener);
          }
          
          lift[indexLift].addEventListener("transitionrun", transitionRunListener);
          lift[indexLift].addEventListener("transitionend", transitionEndListener);
          
          return (count = countup);
        }
        //if same floor
        else {
          block.classList.remove("btn-clicked");
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

         

          let transitionTime = Math.abs(countup - count);
          lift[indexLift].style.transform = `translateY(${translateValue}rem)`;
          lift[indexLift].style.transition = `transform  ${transitionTime}s ease  `;

          function transitionRunListener() {
            console.log("transition start")
            console.log(indexLift)
            if(indexLift < inputFloor-1){
              liftanimationindex = indexLift
              indexLift = indexLift + 1
            }
            else{
              console.log("hii")
              liftanimationindex = indexLift
              indexLift=0
            }
            console.log("transition start index ", indexLift)
            this.removeEventListener("transitionrun", transitionRunListener);
          }
          // transition finished event
          function transitionEndListener() {
            block.classList.remove("btn-clicked");
            liftAnimation(block, buttons, liftanimationindex, indexLift);
            console.log("transitionend")
            this.removeEventListener("transitionend", transitionEndListener);
          }
          
          lift[indexLift].addEventListener("transitionrun", transitionRunListener);
          lift[indexLift].addEventListener("transitionend", transitionEndListener);
          return (count = countup);
        }
        //if same floor
        else {
          block.classList.remove("btn-clicked");
          liftAnimation(block, buttons);
        }
      });
    });
  } else {
    alert("Please Enter a Floors Value between 0 and 100");
    location.reload();
  }
  
});


