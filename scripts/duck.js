window.onload = () => {
  let tID;
  let ducks = [];
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
        isAlive: true 
    };
    nextDuckId++;
    ducks.push(duck);
    return duck;
};
  
  
  const generateDuck = (duck) => {
    duckRender = document.createElement("div");
    duckRender.id = duck.idName;
  
    duckRender.style.bottom = `${duck.positionX}%`;
    duckRender.style.left = `${duck.positionY}%`;
  
    gameContainer.append(duckRender);
    return duckRender;
  
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

  function animateDuckRightDiagonal(duck) {
    const duckId = duck.idName;
    duckRender.classList.toggle("duck-right-top");
    tID = setInterval(() => {
      let element = document.getElementById(duckId);
      if (element) {
        element.style.backgroundPosition = `-${position}px 0px`;
      }

      if (position < 210) {
        position = position + 70;
      } else {
        position = 70;
      }
    }, interval);

    duckRender.addEventListener("animationend", function () {
      duckRender.classList.toggle("duck-right-top");
      duckRender.removeEventListener("animationend", arguments.callee);
      animateDuckLeftDiagonal(duck);
    });


  }

  function switchDirections(){
    if (animateDuckRightDiagonal){



    }
  
  }

  function animateDuckLeftDiagonal(duck) {
    duckRender.classList.toggle("duck-left-top");
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

      duckRender.addEventListener("animationend", function () {
      duckRender.classList.toggle("duck-left-top");
      duckRender.removeEventListener("animationend", arguments.callee);
      animateDuckRightDiagonal(duck);
    });
  }

  const animateDeadDuck = (positionX, positionY) => {
    clearInterval(tID);
    duck.className = "";
    duck.style = "";
    duck.classList.toggle("duck-dead");

    duck.style.top = `${positionY}px`;
    duck.style.left = `${positionX}px`;

  };


//tests of create and render ducks
  let duck1 = createDuck(35, 5);
  let duck2 = createDuck(5, 5);
  console.log(duck1);
  console.log(ducks);
  let duck1Render = generateDuck(duck1);
  console.log(duck1Render);
  animateDuckRightDiagonal(duck1);

  //kill duck
  duckRender.addEventListener("click", function () {
    
    duck.removeEventListener("animationend", arguments.callee);

    const rect = duck.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    // Get the position of the duck
    console.log(`You clicked the duck at position (${x}, ${y})`);

    animateDeadDuck(x, y);
  });
};
