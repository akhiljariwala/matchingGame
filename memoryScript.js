// This is the source card array for the memory matching game. Card images comes from game
var cardsArray = [
    {    'name': 'CSS',    'img': 'https://github.com/robgmerrill/img/blob/master/css3-logo.png?raw=true',  },
    {    'name': 'HTML',    'img': 'https://github.com/robgmerrill/img/blob/master/html5-logo.png?raw=true',  },
    {    'name': 'jQuery',    'img': 'https://github.com/robgmerrill/img/blob/master/jquery-logo.png?raw=true',  },
    {    'name': 'JS',    'img': 'https://github.com/robgmerrill/img/blob/master/js-logo.png?raw=true',  },
    {    'name': 'Node',    'img': 'https://github.com/robgmerrill/img/blob/master/nodejs-logo.png?raw=true',  },
    {    'name': 'Photo Shop',    'img': 'https://github.com/robgmerrill/img/blob/master/photoshop-logo.png?raw=true',  },
    {    'name': 'PHP',    'img': 'https://github.com/robgmerrill/img/blob/master/php-logo_1.png?raw=true',  },
    {    'name': 'Python',    'img': 'https://github.com/robgmerrill/img/blob/master/python-logo.png?raw=true',  },
    {    'name': 'Ruby',    'img': 'https://github.com/robgmerrill/img/blob/master/rails-logo.png?raw=true',  },
    {    'name': 'Sass',    'img': 'https://github.com/robgmerrill/img/blob/master/sass-logo.png?raw=true',  },
    {    'name': 'Sublime',    'img': 'https://github.com/robgmerrill/img/blob/master/sublime-logo.png?raw=true',  },
    {    'name': 'Wordpress',    'img': 'https://github.com/robgmerrill/img/blob/master/wordpress-logo.png?raw=true',  },
  ];

//  Creates a list of cards and sorts the cards at random
var gameGrid = cardsArray.concat(cardsArray);
  gameGrid.sort(function() {
      return 0.5 - Math.random();
  })

// Checks to see that the two cards selected are a match. If the cards are a match, adss 'match' to the card class
var match = function() {
    var selected = document.querySelectorAll('.selected');
    for (i = 0; i < selected.length; i++) {
        selected[i].classList.add("match");
    }
}

// Initial global variables.
var count = 0;
var firstGuess = "";
var secondGuess = "";
var delay = 1200;

//Reset guesses after two attempts
var resetGuesses = function() {
    count = 0;
    firstGuess = "";
    secondGuess = "";
    var selectedBoxes = document.querySelectorAll('.selected');
    for (i = 0; i < selectedBoxes.length; i++) {
        selectedBoxes[i].classList.remove('selected');
    }
}

// Fetches the game board
var game = document.getElementById("gameBoard");

// Creates a new section for the cards to be placed on top of
var grid = document.createElement("section");
    grid.setAttribute("class", "grid");

// Attaches the game grid to the game board
game.appendChild(grid);

// Checks if the two cards are a match when the grid is clicked. 
grid.addEventListener('click', function (event) {
    // Selects card target
    var clicked = event.target;
    // If the clicked target is the game board, or if the card has already been selected or already matched -> do nothing
    if (clicked.nodeName == "SECTION" || clicked.parentNode.classList.contains('selected') || clicked.parentNode.classList.contains('match')) {
        console.log('Invalid click');
        return;
    }
    // count should always be <2
    if (count < 2) {
        // add selected tag to the target
        clicked.parentNode.classList.add('selected');
        // increase count to 1 or 2
        count++;
        // if first object selected, set firstGuess variable to the name of the target
        if (count == 1) {
            firstGuess = clicked.parentNode.dataset.name;
        } 
        // if second object selected, set secondGuess variable to the name of the target and compare to the firstGuess
        else {
            secondGuess = clicked.parentNode.dataset.name;
            // if match, perform match function
            if (firstGuess == secondGuess && firstGuess != "") {
                // delay effect gives time for user to view change
                setTimeout(match, delay);
            }
            setTimeout(resetGuesses, delay);
        }
    } 
})

// Populate the board with newCards at random selected from cardsArray
for (i = 0; i < gameGrid.length; i++) {
    var newCard = document.createElement("div");
    newCard.classList.add("card");
    newCard.dataset.name = gameGrid[i].name;
    newCard.style.backgroundImage = `url(${gameGrid[i].img})`;
    grid.appendChild(newCard);

    // front of card is a solid orange color
    var front = document.createElement('div');
    front.classList.add('front');
    newCard.appendChild(front);
    
    // back of card has the matched image on it
    var back = document.createElement('div');
    back.classList.add('back');
    back.style.backgroundImage = `url(${gameGrid[i].img})`;
    newCard.appendChild(back);
}

