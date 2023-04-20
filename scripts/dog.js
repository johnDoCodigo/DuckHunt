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
    const interval = 200;
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

  /*function animateDogMissingShot(){
    dog.classList.toggle("dog");
    var position = 100;

  }
  */

  createDog(24, 2);
  animateDogBeggin();