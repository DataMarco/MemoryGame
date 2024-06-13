const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');
let numeroDeErros = 0;

const characters = [
  'atlego',
  'atletico',
  'atlpr',
  'bahia',
  'botafogo',
  'bragantino',
  'corinthians',
  'criciuma',
  'cruzeiro',
  'cuiaba_mt',
  'fla',
  'fluminense',
  'fortaleza',
  'gremio',
  'interrs',
  'juventude',
  'palmeiras',
  'saopaulo',
  'vasco',
  'vitoria'
];

const createElement = (tag, className) => {
  const element = document.createElement(tag);
  element.className = className;
  return element;
}

const incrementarErros = () => {
  numeroDeErros++;
  document.getElementById('error-number').textContent = numeroDeErros;
  console.log("Número de erros: " + numeroDeErros);
}

let firstCard = '';
let secondCard = '';

const checkEndGame = () => {
  const disabledCards = document.querySelectorAll('.disabled-card');

  if (disabledCards.length === 40) {
    clearInterval(this.loop); 
    exibirAlerta() 
  }
}
function exibirAlerta() {
  let spanPlayer = document.querySelector('.player');
  let timer = document.querySelector('.timer');
  let errorNumber = document.getElementById('error-number');

  alert(`Parabéns, ${spanPlayer.innerHTML}! O seu tempo foi de: ${timer.innerHTML}. O número de erros foi: ${errorNumber.innerHTML}`);
}

const checkCards = () => {
  const firstCharacter = firstCard.getAttribute('data-character');
  const secondCharacter = secondCard.getAttribute('data-character');

  if (firstCharacter === secondCharacter) {

    firstCard.firstChild.classList.add('disabled-card');
    secondCard.firstChild.classList.add('disabled-card');

    firstCard = '';
    secondCard = '';

    checkEndGame();

  } else {
    setTimeout(() => {

      firstCard.classList.remove('reveal-card');
      secondCard.classList.remove('reveal-card');

      firstCard = '';
      secondCard = '';

      incrementarErros();
    }, 500);
  }

}

const revealCard = ({ target }) => {

  if (target.parentNode.className.includes('reveal-card')) {
    return;
  }

  if (firstCard === '') {

    target.parentNode.classList.add('reveal-card');
    firstCard = target.parentNode;

  } else if (secondCard === '') {

    target.parentNode.classList.add('reveal-card');
    secondCard = target.parentNode;

    checkCards();

  }
}

const createCard = (character) => {

  const card = createElement('div', 'card');
  const characters = createElement('div', 'characters');
  const front = createElement('div', 'face front');
  const brasileirao = createElement('div', 'face brasileirao');

  front.style.backgroundImage = `url('../images/${character}.png')`;

  card.appendChild(front);
  card.appendChild(brasileirao);

  card.addEventListener('click', revealCard);
  card.setAttribute('data-character', character)

  return card;
}

const loadGame = () => {
  const duplicateCharacters = [...characters, ...characters];

  const shuffledArray = duplicateCharacters.sort(() => Math.random() - 0.5);

  shuffledArray.forEach((character) => {
    const card = createCard(character);
    grid.appendChild(card);
  });
}

const startTimer = () => {

  this.loop = setInterval(() => {
    const currentTime = +timer.innerHTML;
    timer.innerHTML = currentTime + 1;
  }, 1000);

}

window.onload = () => {
  spanPlayer.innerHTML = localStorage.getItem('player');
  startTimer();
  loadGame();
}
