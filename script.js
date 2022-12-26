let inputNumber = document.getElementById("inputNumber");
const form = document.getElementById("form");
const container = document.querySelector(".container");
const lift = document.querySelector(".lift");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  inputNumber = inputNumber.value;
  if (inputNumber > 0 && inputNumber < 100) {
    container.classList.remove("hidden");
    form.classList.add("hidden");

    for (let index = 1; index < inputNumber; index++) {
      container.insertAdjacentHTML(
        "afterbegin",
        ` <div class="floor-container">
   <div class="btn-container">
     <span><button class="btn-up">Up</button></span>

     <span><button class="btn-down">Down</button></span>
   </div>
   <div class="horizontal-flex">
     <hr />
     <p>Floor ${index}</p>
   </div>
 </div>`
      );
    }
    container.insertAdjacentHTML(
      "afterbegin",
      ` <div class="floor-container">
 <div class="btn-container">

   <span><button class="btn-down">Down</button></span>
 </div>
 <div class="horizontal-flex">
   <hr />
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
        let countup = index * 2;
        let translateValue = -10 * index - 0.4;
        let transitionTime = Math.abs(countup - count);
        lift.style.transition = `transform ${transitionTime}s ease`;
        lift.style.transform = `translateY(${translateValue}rem)`;
        return (count = countup);
      });
    });

    // events for Button down
    const btnDown = [...document.querySelectorAll(".btn-down")];
    btnDown.reverse();
    btnDown.map(function (block, index) {
      block.addEventListener("click", function () {
        let countup = (index + 1) * 2;
        let translateValue = -10 * index - 0.4 - 10;
        let transitionTime = Math.abs(countup - count);
        lift.style.transition = `transform ${transitionTime}s ease`;
        lift.style.transform = `translateY(${translateValue}rem)`;
        return (count = countup);
      });
    });
  } else {
    alert("Please Enter a Value between 0 and 100");
    location.reload();
  }
});
