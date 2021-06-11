const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game-container');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('setting-form');
const difficultySelect = document.getElementById('difficulty');

const words = [
    'bad',
    'red',
    'drag',
    'test',
    'rescue',
    'light',
    'woozy',
    'wrong',
    'interfere',
    'fetch',
    'bruise',
    'silky',
    'hose',
    'crack',
    'wait',
    'doubt',
    'terrify',
    'coherent',
    'heady',
    'loving'
];


let randomWord;

let score = 0;

let time = 10;
// Set difficulty to value in Local storage
let difficulty = localStorage.getItem('difficulty') != null ? localStorage.getItem('difficulty') : 'medium';

// Set difficulty select value
difficultySelect.value = localStorage.getItem('difficulty') != null ? localStorage.getItem('difficulty') : 'medium';

//Focus on text on start
text.focus();

//Start counting down
const timeInterval = setInterval(updateTime, 1000);

// Generate random word from array
function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)];
}

//Add word to DOM
function addWordToDom() {
    randomWord = getRandomWord();
    word.innerHTML = randomWord;
}

//Update Score
function updateScore() {
    score++;
    scoreEl.innerHTML = score;
}

//Update time
function updateTime() {
    time--;
    timeEl.innerHTML = time + 's';

    if(time === 0) {
        clearInterval(timeInterval);
        //game over
        gameOver();
    }
}

//Game over
function gameOver() {
    endgameEl.innerHTML = `
    <h1>Time ran out</h1>
    <p>Your final score is ${score}</p>
    <button onclick="location.reload()">Reload</button>`;

    endgameEl.style.display = 'flex';
}

addWordToDom();

//Event listeners 
//Typing
text.addEventListener('input', e => {
    const insertedText = e.target.value;

    if(insertedText === randomWord) {
        addWordToDom();
        updateScore();

        //Clean
        e.target.value = '';

        if(difficulty === 'hard') {
            time += 2;
        } else if(difficulty === 'medium') {
            time += 3;
        } else {
            time += 5;
        }

        updateTime();
    }
})

//Setting selects
settingsForm.addEventListener('change', e => {
    difficulty = e.target.value;
    //console.log(difficulty);
    localStorage.setItem('difficulty', difficulty);
});