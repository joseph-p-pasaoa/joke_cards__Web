// Joseph P. Pasaoa
//



let usedJokesObj = {};

document.addEventListener("DOMContentLoaded", () => {
  pageDraw(document.querySelector('#category-select').value);

  let buttonDrawJokes = document.querySelector("#button-draw-jokes");
  buttonDrawJokes.addEventListener("click", () => {
      pageDraw(document.querySelector('#category-select').value);
  });

  // PUNCHLINE TRIGGER SYSTEM
  const cardsFlex = document.querySelector("#cards-flex");
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

function errorOrJson(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response.json();
}

const makeCard = (jokeObj) => {
  usedJokesObj[jokeObj.id] = true;

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

function drawTenJokes(category) {
  fetch(`https://official-joke-api.appspot.com/jokes/${category}ten`)
    .then(errorOrJson)
    .then(jokesArr => {
        // BUILDING CURRENT JOKES POOL 1OF2
        fetchedJokesArr = jokesArr;
        return fetch(`https://official-joke-api.appspot.com/jokes/${category}ten`);
    })
    .then(errorOrJson)
    .then(jokesArr2 => {
        // BUILDING CURRENT JOKES POOL 2OF2
        fetchedJokesArr = fetchedJokesArr.concat(jokesArr2);

        // CREATES JOKE CARDS IN DOM USING JOKES POOL
        let cardsFlexArr = document.querySelector("#cards-flex").childNodes;
        while (cardsFlexArr.length < 10) {
          if (fetchedJokesArr.length < 1) {
            usedJokesObj = {};
          } 
          if (!usedJokesObj[fetchedJokesArr[0].id]) {
            makeCard(fetchedJokesArr[0]);
          }
          fetchedJokesArr.shift();
        }

        // REVEALS JOKES CARDS IN QUICK SERIES
        for (let i = 0; i < cardsFlexArr.length; i++) {
          setTimeout(() => {
            cardsFlexArr[i].setAttribute('style', 'opacity: 1;');
          }, i * 40);
        }
    })
    .catch(err => {
        console.log("Fetch error: ", err);
    });
}

function pageDraw(category) {
  clearJokes();

  let fetchedJokesArr = [];
  drawTenJokes(category);
}
