// Joseph P. Pasaoa
//



document.addEventListener("DOMContentLoaded", () => {
  drawTen();

  let buttonDrawTen = document.querySelector("#button-draw10");
  buttonDrawTen.addEventListener("click", drawTen);

  let cardsFlex = document.querySelector("#cards-flex");
  cardsFlex.addEventListener('click', (e) => {
      if (e.target.parentNode.className === "joke-card") {
        let punchline = e.target.parentNode.childNodes[1];
        if (punchline.getAttribute('style') === "opacity: 0;") {
          punchline.setAttribute('style', "opacity: 1;");
        } else {
          punchline.setAttribute('style', "opacity: 0;");
        }
      }
  });
});

const clearJokes = () => {
  const cardsFlex = document.querySelector("#cards-flex");
  while (cardsFlex.firstChild) {
    cardsFlex.removeChild(cardsFlex.lastChild);
  }
}

function drawTen() {
  clearJokes();
  
  fetch("https://official-joke-api.appspot.com/random_ten")
    .then(response => {
        if (response.status !== 200) {
          return alert(`Error: ${response.status}. Please try again later.`);
        } else {
          return response.json();
        }
    })
    .then(jokesArr => {
        jokesArr.forEach(jokeObj => {
            makeCard(jokeObj);
        });
        let cardsFlexArr = document.querySelector("#cards-flex").childNodes;
        for (let i = 0; i < cardsFlexArr.length; i++) {
          setTimeout(() => {
            cardsFlexArr[i].setAttribute('style', 'opacity: 1;');
          }, i * 40);
        }
    })
    .catch(err => {
      console.log("err: ", err);
    });
}

const makeCard = (jokeObj) => {
  let cardsFlex = document.querySelector("#cards-flex");

  let buildingCard = document.createElement("div");
  buildingCard.className = "joke-card";
  let buildingCardSetup = document.createElement("div");
  buildingCardSetup.className = "card-setup";
  buildingCardSetup.innerText = jokeObj.setup;
  let buildingCardPunch = document.createElement("div");
  buildingCardPunch.className = "card-punchline";
  buildingCardPunch.innerText = jokeObj.punchline;
  buildingCardPunch.setAttribute('style', 'opacity: 0;');
      
  buildingCard.appendChild(buildingCardSetup);
  buildingCard.appendChild(buildingCardPunch);
  cardsFlex.appendChild(buildingCard);
}