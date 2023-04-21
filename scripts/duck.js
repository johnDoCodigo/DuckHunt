window.onload = () => {
  let tID;
  let ducks = [];
  let duckIds = [];
  let nextDuckId = 1;
  let duckRender;
  let position = 70;
  const interval = 200;
  const rounds = 5;
  const gameContainer = document.getElementById("game");

  const createDuck = (positionX, positionY) => {
    let duck = {
      idName: "duck" + nextDuckId,
      positionX: positionX,
      positionY: positionY,
      isAlive: true,
    };
    nextDuckId++;
    ducks.push(duck);
    duckIds.push(duck.idName);
    return duck;
  };

  const generateDuck = (duck) => {
    duckRender = document.createElement("div");
    duckRender.id = duck.idName;

    duckRender.style.bottom = `${duck.positionX}%`;
    duckRender.style.left = `${duck.positionY}%`;

    gameContainer.append(duckRender);
    return duckRender;
  };

  function animateDuckRight(duck) {
    const duckId = duck.idName;
    let element = document.getElementById(duckId);

    element.classList.toggle("duck-right");
    tID = setInterval(() => {
      
      if (element) {
        element.style.backgroundPosition = `-${position}px 0px`;
      }

      if (position < 210) {
        position = position + 70;
      } else {
        position = 70;
      }
    }, interval);

    element.addEventListener("animationend", function () {
      element.classList.toggle("duck-right");
      element .removeEventListener("animationend", arguments.callee);
      animateDuckLeft(duck);
    });
  }

  function animateDuckLeft(duck) {
    const duckId = duck.idName;
    let element = document.getElementById(duckId);
    element.classList.toggle("duck-left");
    tID = setInterval(() => {
      if (element) {
        element.style.backgroundPosition = `-${position}px 0px`;
      }

      if (position < 210) {
        position = position + 70;
      } else {
        position = 70;
      }
    }, interval);

    element.addEventListener("animationend", function () {
      element.classList.toggle("duck-left");
      element.removeEventListener("animationend", arguments.callee);
      animateDuckRight(duck);
    });
  }

  function animateDuckRightDiagonal(duck) {
    const duckId = duck.idName;
    let element = document.getElementById(duckId);
    element.classList.toggle("duck-right-top");

    tID = setInterval(() => {
      if (element) {
        element.style.backgroundPosition = `-${position}px 0px`;
      }

      if (position < 210) {
        position = position + 70;
      } else {
        position = 70;
      }
    }, interval);

    element.addEventListener("animationend", function () {
      element.classList.toggle("duck-right-top");
      element.removeEventListener("animationend", arguments.callee);
      animateDuckLeftDiagonal(duck);
    });
  }

  function switchDirections() {
    if (animateDuckRightDiagonal) {
    }
  }

  function animateDuckLeftDiagonal(duck) {
    const duckId = duck.idName;
    let element = document.getElementById(duckId);
    element.classList.toggle("duck-left-top");
    tID = setInterval(() => {
      if (element) {
        element.style.backgroundPosition = `-${position}px 0px`;
      }

      if (position < 210) {
        position = position + 70;
      } else {
        position = 70;
      }
    }, interval);

    element.addEventListener("animationend", function () {
      element.classList.toggle("duck-left-top");
      element.removeEventListener("animationend", arguments.callee);
      animateDuckRightDiagonal(duck);
    });
  }

  const animateDeadDuck = (duck, positionX, positionY) => {
    clearInterval(tID);
    duck.className = "";
    duck.style = "";
    duck.classList.toggle("duck-dead");

    duck.style.top = `${positionY}px`;
    duck.style.left = `${positionX}px`;
  };

    //tests of create and render ducks
    let duck1 = createDuck(35, 5);
    let duck2 = createDuck(30, 20);
    generateDuck(duck1);
    generateDuck(duck2);
    animateDuckRightDiagonal(duck1);
    animateDuckRight(duck2)

  //kill duck
  duckIds.forEach(function(duckId) {
    const duck = document.getElementById(duckId);
    duck.addEventListener("click", function () {
      duck.removeEventListener("animationend", arguments.callee);
  
      const rect = duck.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;
  
      // Get the position of the duck
      console.log(`You clicked the duck at position (${x}, ${y})`);
  
      animateDeadDuck(duck, x, y);
    });
  });


};
