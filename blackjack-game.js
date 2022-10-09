// console.log('JS connected');

const displayDealerHand = document.querySelector('#dealer-hand');
const displayPlayerHand = document.querySelector('#player-hand');
const btnHit            = document.querySelector('#hit');
const btnStay           = document.querySelector('#stay');
const btnNewGame        = document.querySelector('#new-game');

const deck  = [];
const dealerHand = [];
const player = {
    name: 'player 1',
    hand: [],
    wins: 0,
    losses: 0
};


//Initialize the game
newGame();



btnHit.addEventListener('click', () => {
    giveCard(player.hand);
    displayCards();

    if (calculateScore(player.hand) >= 21) {
        endGame();
    }
});

btnStay.addEventListener('click', () => {
    endGame();
});

btnNewGame.addEventListener('click', () => {
    btnHit.disabled = false;
    btnStay.disabled = false;
    btnNewGame.disabled = true;
    newGame();
});

function newGame () {
    deck.splice(0, deck.length);
    dealerHand.splice(0, dealerHand.length);
    player.hand.splice(0, player.hand.length);


    for(let i = 2; i <= 10 ; i++){
        addCard(i, 4);
    }

    addCard('A', 4);
    addCard('J', 4);
    addCard('Q', 4);
    addCard('K', 4);

    giveCard(dealerHand);
    giveCard(player.hand);
    giveCard(dealerHand);
    giveCard(player.hand);


    displayCards();

    if (calculateScore(player.hand) >= 21) {
        endGame();
    }
}

function addCard (value, count) {
    for (let i = 0; i < count; i++) {
        deck.push(value);
    }
}

    
function giveCard(person) {
    let random = Math.floor(Math.random() * deck.length);
    let card = deck.splice(random, 1); 

    person.push(card[0]);
}


function displayCards(showDealerHand = false) {
    displayPlayerHand.textContent = player.hand.join(" & ");
    displayDealerHand.textContent = `${dealerHand[0]} & ${showDealerHand ? dealerHand[1] : '??'}`;
}


function calculateScore(hand) {
    let sum = 0;
    let numberOfAces = 0;

    hand.forEach(e => {
        if (e == 'J' || e == 'Q' || e == 'K') {
            sum += 10;
        } else if(e == 'A') {
            numberOfAces++;
        } else {
            sum += e;
        }
    });
    
    if (numberOfAces > 0) {
        if (numberOfAces > 1) {
            sum += numberOfAces - 1;
        }
        
        if (sum < 11) {
            sum += 11;
        } else {
            sum += 1;
        }
    }

    return sum;
}

function whoWins() {
    const dealerScore = calculateScore(dealerHand);
    const palyerScore = calculateScore(player.hand);

    if (palyerScore == 21) {
        return 'BlackJack! Player Wins';
    }
    
    if (palyerScore > 21) {
        return 'Bust! House Wins';
    }

    if (dealerScore > 21) {
        return 'Player Wins';
    }
    
    if (dealerScore >= palyerScore) {
        return 'House Wins';
    }

    return 'Player Wins';
}

//TODO: Add a scoreboard 
function endGame() {
    btnHit.disabled = true;
    btnStay.disabled = true;
    btnNewGame.disabled = false;

    displayCards(true);
    let winner = whoWins();

    console.log(winner);
    alert(winner);
}