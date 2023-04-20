window.onload = () => {
  let tID;
  let duck;
  let position = 70;
  const interval = 1000;
  const rounds = 5;
  const gameContainer = document.getElementById("game");

  function createDuck(x, y) {
    duck = document.createElement("div");
    duck.id = "duck";

    duck.style.bottom = `${x}%`;
    duck.style.left = `${y}%`;
    gameContainer.append(duck);
  }

  function animateDuckRight() {
    duck.classList.toggle("duck-right");
    tID = setInterval(() => {
      let element = document.getElementById("duck");
      if (element) {
        element.style.backgroundPosition = `-${position}px 0px`;
      }

      if (position < 210) {
        position = position + 70;
      } else {
        position = 70;
      }
    }, interval);

    duck.addEventListener("animationend", function () {
      duck.classList.toggle("duck-right");
      duck.removeEventListener("animationend", arguments.callee);
      animateDuckLeft();
    });
  }

  function animateDuckLeft() {
    duck.classList.toggle("duck-left");
    tID = setInterval(() => {
      let element = document.getElementById("duck");
      if (element) {
        element.style.backgroundPosition = `-${position}px 0px`;
      }

      if (position < 210) {
        position = position + 70;
      } else {
        position = 70;
      }
    }, interval);

    duck.addEventListener("animationend", function () {
      duck.classList.toggle("duck-left");
      duck.removeEventListener("animationend", arguments.callee);
      animateDuckRight();
    });
  }

  function animateDuckRightDiagonal() {
    duck.classList.toggle("duck-right-top");
    tID = setInterval(() => {
      let element = document.getElementById("duck");
      if (element) {
        element.style.backgroundPosition = `-${position}px 0px`;
      }

      if (position < 210) {
        position = position + 70;
      } else {
        position = 70;
      }
    }, interval);

    duck.addEventListener("animationend", function () {
      duck.classList.toggle("duck-right-top");
      duck.removeEventListener("animationend", arguments.callee);
      animateDuckLeftDiagonal();
    });
  }

  function animateDuckLeftDiagonal() {
    duck.classList.toggle("duck-left-top");
    tID = setInterval(() => {
      let element = document.getElementById("duck");
      if (element) {
        element.style.backgroundPosition = `-${position}px 0px`;
      }

      if (position < 210) {
        position = position + 70;
      } else {
        position = 70;
      }
    }, interval);

    duck.addEventListener("animationend", function () {
      duck.classList.toggle("duck-left-top");
      duck.removeEventListener("animationend", arguments.callee);
      animateDuckRightDiagonal();
    });
  }
  const animateDeadDuck = () => {
    duck.className = "";
    duck.classList.toggle("duck-dead");
    /* duck.style.backgroundPosition = `0px 0px`; */
    setTimeout(() => {
      tID = setInterval(() => {
        let element = document.getElementById("duck");
        if (element) {
          element.style.backgroundPosition = `-${position}px 0px`;
        }
        if (position < 350) {
          position = position + 70;
        } else {
          position = 70;
        }
      }, interval);
    }, 2000);
  };

  //kill duck

  createDuck(35, 5);
  animateDuckRight();

  duck.addEventListener("click", function () {
    animateDeadDuck();
  });

  /*   duck.addEventListener('click', (event) => {
    event.target.classList.add("shot");
 
  
    setTimeout(() => {
      duck.parentNode.removeChild(duck);
     
      addScore();
      countDeadDucks();
      countShots();
 

      checkWinner();
 
    

    }, 500);
  }); */
};
