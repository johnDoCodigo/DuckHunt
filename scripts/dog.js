  let dog;
  let dogAppearID;
  const gameContainer = document.getElementById("game");


function createDog(x, y) {
    dog = document.createElement("div");
    dog.id = "dog";

    dog.style.bottom = `${x}%`;
    dog.style.left = `${y}%`;
    gameContainer.append(dog);

  }

function animateDogBeggin() {
    dog.classList.toggle("dog");
    var position = 100;
    const interval = 600;

    const audio = new Audio('sounds/dogbark.mp3');
    audio.play();



    dogAppearID = setInterval(() => {
      let dogElement = document.getElementById("dog");
      if (dogElement) {
        dogElement.style.backgroundPosition = `-${position}px 0px`;
      }

      if (position < 800) {
        position = position + 100;
      } else {
        dog.remove();
      }
    }, interval);

    dog.addEventListener("animationend", function () {
      dog.classList.toggle("dog");
      dog.removeEventListener("animationend", arguments.callee);
      animateDogBeggin();
    });
  }

  function createDogLaugh(x,y) {
    let dog2 = document.createElement("div");
    dog2.className = "dogLaugh";
    gameContainer.append(dog2);
    const interval = 800;

    const laugh = new Audio('sounds/DogLaugh.mp3');
    laugh.play();

    dog2.style.bottom = `${x}%`;
    dog2.style.left = `${y}%`;
    
    function removeDog(){
      dog2.remove();
    }
    dog2.addEventListener("animationend", removeDog);
   }


  let dog2 = createDogLaugh();