window.onload = () => {
  let tID;
  let ducks = [];
  let duckIds = [];
  let nextDuckId = 1;
  let duckRender;
  let position = 70;
  let scorePoints = 0;
  let shots = 3;
  const interval = 400;
  let currentRound = 1;
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

  function animateDuckRandom(duck) {
    const duckId = duck.idName;
    let element = document.getElementById(duckId);

    const directions = ["right", "left", "right-top", "left-top"];
    const randomDirection =
      directions[Math.floor(Math.random() * directions.length)];

    element.classList.toggle("duck-" + randomDirection);

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

    element.addEventListener("animationend", function handleAnimationEnd() {
      const newRandomDirection =
        directions[Math.floor(Math.random() * directions.length)];
      element.classList.toggle("duck-" + randomDirection);
      element.classList.toggle("duck-" + newRandomDirection);
      element.removeEventListener("animationend", handleAnimationEnd);
      element.addEventListener("animationend", handleAnimationEnd);
    });
  }

  const switchDirections = (duck) => {
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

    root = document.documentElement;

    let positionX = duck.positionX;
    let positionY = duck.positionY;

    const duckId = duck.idName;
    let element = document.getElementById(duckId);

    element.classList.remove("duckAnimation");

    let newPositionX = getRandomInt(25, 95);
    let newPositionY = getRandomInt(25, 95);

    if (newPositionX > positionX && newPositionY != positionY) {
      element.classList.add("duck-right-top");
    } else if (newPositionX < positionX && newPositionY != positionY) {
      element.classList.add("duck-left-top");
    } else if (newPositionX == positionX && newPositionY > positionY) {
      element.classList.add("right");
    } else if (newPositionX == positionX && newPositionY < positionY) {
      element.classList.add("left");
    }
    /*     else {
      newPositionX = getRandomInt(25,100);
      newPositionY = getRandomInt(25,100);
    } */

    root.style.setProperty("--inicialX", positionX + "%");
    root.style.setProperty("--inicialY", positionY + "%");

    root.style.setProperty("--finalX", newPositionX + "%");
    root.style.setProperty("--finalY", newPositionY + "%");

    duck.positionX = newPositionX;
    duck.positionY = newPositionY;

    void element.offsetWidth; // restart da ANIMATION!!!!
    element.classList.add("duckAnimation");
  };

  const animateDeadDuck = (duckElement, positionX, positionY) => {
    clearInterval(tID);
    duckElement.className = "";
    duckElement.style = "";
    duckElement.classList.toggle("duck-dead");

    duckElement.style.top = `${positionY}px`;
    duckElement.style.left = `${positionX}px`;

    setTimeout(function () {
      duckElement.remove();
    }, 2000);

    setTimeout(round, 2200);
  };

  //tests of create and render ducks
  const round = () => {
    let duck = createDuck(25, getRandomInt(25, 95));
    let rendered = generateDuck(duck);
    switchDirections(duck);

    rendered.addEventListener("animationend", function () {
      clearInterval(tID);
      switchDirections(duck);
    });

    rendered.addEventListener("click", function (e) {
      e.stopPropagation();
      rendered.removeEventListener("animationend", arguments.callee);

      const rect = rendered.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;

      // Get the position of the duck
      console.log(`You clicked the duck at position (${x}, ${y})`);

      shots = 3;
      document.getElementById("shots").innerHTML = `${shots} shots left`;
      animateDeadDuck(rendered, x, y);
      changeScore();
      roundsCount();
    });
  };

  round();

  //kill duck
  /*   ducks.forEach(function (duck) {
    const duckElement = document.getElementById(duck.idName);
  }); */

  function missedShot() {
    console.log("missed shot");
    shots--;
    let shotsBox = document.getElementById("shots");
    shotsBox.innerHTML = `${shots} shots left`;

    if (shots == 0) {
      gameOver();
    }
  }

  function roundsCount() {
    currentRound++;
    let roundsBox = document.getElementById("rounds");
    roundsBox.innerHTML = `${currentRound} of ${rounds}`;

    if (currentRound == rounds+1) {
      gameOver();
      return;
    }

    
  }

  // Missed Shot
  gameContainer.addEventListener("click", missedShot);

  function changeScore() {
    scorePoints = scorePoints + 100;
    let scoreBox = document.getElementById("score-points");
    scoreBox.innerHTML = `${scorePoints} points`;
  }

  const gameOver = () => {
    modal = document.createElement("div");
  };

  // utilities functions
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
};
