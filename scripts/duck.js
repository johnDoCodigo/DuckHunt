window.onload = () => {
  var tID;
  var tID2;
  let duck;
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
    var position = 70;
    const interval = 100;
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
      //changeAnimation(duck.id);
    });
  }

  function animateDuckLeft() {
    duck.classList.toggle("duck-left");
    var position = 70;
    const interval = 100;
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
    var position = 70;
    const interval = 100;
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
    var position = 70;
    const interval = 100;
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


  createDuck(35, 5);
  animateDuckRightDiagonal();
};
