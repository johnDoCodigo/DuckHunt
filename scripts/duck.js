window.onload = () => {
  let tID;
  let ducks = [];
  let duckIds = [];
  let nextDuckId = 1;
  let duckRender;
  let position = 70;
  const interval = 400;
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
    const randomDirection = directions[Math.floor(Math.random() * directions.length)];
  
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
      const newRandomDirection = directions[Math.floor(Math.random() * directions.length)];
      element.classList.toggle("duck-" + randomDirection);
      element.classList.toggle("duck-" + newRandomDirection);
      console.log(randomDirection);
      console.log(newRandomDirection);
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

    console.log("here i am")

    root = document.documentElement;
  
    let positionX = duck.positionX;
    let positionY = duck.positionY;

    const duckId = duck.idName;
    let element = document.getElementById(duckId);

    element.classList.remove("duckAnimation");

    let newPositionX = getRandomInt(25,95);
    let newPositionY = getRandomInt(25,95);
    
    if (newPositionX > positionX && newPositionY != positionY) {
      
      element.classList.add("duck-right-top");
      
    }

    else if (newPositionX < positionX && newPositionY != positionY){
      
      element.classList.add("duck-left-top");
    }
    else if(newPositionX == positionX && newPositionY > positionY){
      
      element.classList.add("right");
    }

    else if(newPositionX == positionX && newPositionY < positionY){
      
      element.classList.add("left");
    }
/*     else {
      newPositionX = getRandomInt(25,100);
      newPositionY = getRandomInt(25,100);
    } */

    root.style.setProperty('--inicialX', positionX + "%");
    root.style.setProperty('--inicialY', positionY + "%");

    root.style.setProperty('--finalX', newPositionX + "%");
    root.style.setProperty('--finalY', newPositionY + "%");

    duck.positionX = newPositionX;
    duck.positionY = newPositionY;

    void element.offsetWidth; // restart da ANIMATION!!!!
    element.classList.add("duckAnimation");

  };




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
    generateDuck(duck1);
    switchDirections(duck1);


  //kill duck
  duckIds.forEach(function(duckId) {
    const duckeElement = document.getElementById(duckId);
    duckeElement.addEventListener("click", function () {
      duckeElement.removeEventListener("animationend", arguments.callee);
  
      const rect = duckeElement.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;
  
      // Get the position of the duck
      console.log(`You clicked the duck at position (${x}, ${y})`);

      duckeElement.classList.toggle("dead-duck");

  
      animateDeadDuck(duckeElement, x, y);
    });

    duckeElement.addEventListener("animationend", function() {
      console.log("WOOW")
      clearInterval(tID);
      switchDirections(duck1);
    });
  });


  // utilities functions

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }


};
