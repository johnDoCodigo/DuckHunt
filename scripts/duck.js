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

  let missedShotsCount = 0;
  let shotsOnTarget = 0;

  const gameContainer = document.getElementById("game");

  //starts the dog first
  createDog(24, 2);
  animateDogBeggin();

  //run code only after the dog animation
  setTimeout(function() {

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

    //Animate default Sprite
    const animateSprite = (duck) => {
      let position = 0;
      const interval = 200;
    
      return setInterval(() => {
        if (duck.element) {
          duck.element.style.backgroundPosition = `-${position}px 0px`;
        }
    
        if (position < 210) {
          position = position + 70;
        } else {
          position = 70;
        }
      }, interval);
    };
  const switchDirections = (duck) => {
    
    
    const tID = animateSprite(duck);

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

    root.style.setProperty("--inicialX", positionX + "%");
    root.style.setProperty("--inicialY", positionY + "%");

    root.style.setProperty("--finalX", newPositionX + "%");
    root.style.setProperty("--finalY", newPositionY + "%");

    duck.positionX = newPositionX;
    duck.positionY = newPositionY;

    void element.offsetWidth; // restart the ANIMATION!!!!
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

    setTimeout(startGame, 2200);
  };



  const startGame = () => {
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
      shotsOnTarget++;

      const shotSound = new Audio('sounds/shots.mp3');
      shotSound.play();

      const shotsDuckSond = new Audio('sounds/duckQuack.mp3');
      shotsDuckSond.play();

    });
  };


  //start Game
  startGame();
  const roundOnSound = new Audio('sounds/roundOne.mp3');
  roundOnSound.play();

  const shotsDuckSond = new Audio('sounds/duckQuack.mp3');
  shotsDuckSond.play();


  //kill duck
  function missedShot() {
    console.log("missed shot");
    shots--;
    missedShotsCount++;

    const shotSound = new Audio('sounds/shots.mp3');
    shotSound.play();

    const laugh = new Audio('sounds/laugh.mp3');
    laugh.play();

    let shotsBox = document.getElementById("shots");
    shotsBox.innerHTML = `${shots} shots left`;

    if (shots == 0) {
      gameOver();

    const gameOverSound = new Audio('sounds/gameOver.mp3');
    gameOverSound.play();
    }
  }

  function roundsCount() {
    currentRound++;
    let roundsBox = document.getElementById("rounds");
    roundsBox.innerHTML = `${currentRound} of ${rounds}`;

    if (currentRound == rounds+1) {
    gameWin();
      
    const winningSound = new Audio('sounds/winning.mp3');
    winningSound.play();
    return;
    }

  }

  // Missed Shot - Always Listening for click of Missing Shot
  gameContainer.addEventListener("click", missedShot);

  function changeScore() {
    scorePoints = scorePoints + 100;
    let scoreBox = document.getElementById("score-points");
    scoreBox.innerHTML = `${scorePoints} points`;
  }

  const gameOver = () => {

    let generalContainer = document.getElementById("mainContainer")

    let accuracy = Math.round((shotsOnTarget/ (missedShotsCount+shotsOnTarget))*100);
    
   
const htmlBlock =`<div id="overlay">
    <div id="boxwinner">
      <div class="dogLost"></div>
      <h2>Game over!!</h3>
      <h4 id="accuracy"></h4>
      <button id="newGame" class="custom-btn btn-13"  onclick="location.reload()">Start New Game</button>
    </div>
  </div>`


  generalContainer.innerHTML+= htmlBlock;  

  let accuracyDiv = document.getElementById("accuracy");
  accuracyDiv.innerHTML = `${accuracy} % Accuracy`;

};


const gameWin = () => {

  let generalContainer = document.getElementById("mainContainer")

  let accuracy = Math.round((shotsOnTarget/ (missedShotsCount+shotsOnTarget))*100);
  
 
const htmlBlock =`<div id="overlay">
  <div id="boxwinner">
    <div class="dogWin"></div>
    <h2>YOU Win!!</h3>
    <h4 id="accuracy"></h4>
    <button id="newGame" class="custom-btn btn-13"  onclick="location.reload()">Start New Game</button>
  </div>
</div>`


generalContainer.innerHTML+= htmlBlock;  

let accuracyDiv = document.getElementById("accuracy");
accuracyDiv.innerHTML = `${accuracy} % Accuracy`;

};

  // utilities functions

  //generate random Int Number
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

}, 6000);
};
