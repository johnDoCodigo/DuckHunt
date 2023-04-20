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

  function animateDog() {
    dog.classList.toggle("dog");
    var position = 100;
    const interval = 120;
    dogAppearID = setInterval(() => {
      let dogElement = document.getElementById("dog");
      if (dogElement) {
        dogElement.style.backgroundPosition = `-${position}px 0px`;
      }

      if (position < 800) {
        position = position + 100;
      } else {
        position = 100;
      }
    }, interval);

    dog.addEventListener("animationend", function () {
      dog.classList.toggle("dog");
      dog.removeEventListener("animationend", arguments.callee);
      animateDog();
    });
  }

  createDog(24, 5);
  animateDog();