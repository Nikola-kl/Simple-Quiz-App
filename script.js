const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const restartButton = document.getElementById('restart-btn');
const quitButton = document.getElementById('quit-btn');
const questionContainer = document.getElementById('questionContainer');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answerButtons')
const resultBox = document.getElementById('result-box');
const scoreText = document.getElementById('score-text');
let score = 0;

let shuffledQuestions, currentQuestionIndex


// FUNCTION FOR DIFFERENT CONTROL BUTTONS

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
    currentQuestionIndex += 1;
    resetState();
    setNextQuestion();
})
restartButton.addEventListener('click', startGame);
quitButton.addEventListener('click', resetQuiz)


// START GAME FUNCTION

function startGame() {
    resetState();
    // console.log('Started');
    startButton.classList.add('hide');
    questionContainer.classList.remove('hide');
    shuffledQuestions = questions.sort(() => Math.random() - .5);
    currentQuestionIndex = 0;
    setNextQuestion();
}


// QUESTION SETUP FUNCTION

function setNextQuestion() {
    showQuestion(shuffledQuestions[currentQuestionIndex]);
    nextButton.classList.add('hide');
}

function showQuestion(shuffledQuestion) {
    questionElement.innerText = shuffledQuestion.question;
    shuffledQuestion.answers.forEach(answer => {
       const button = document.createElement('button');
       button.innerText = answer.text;
       button.dataset.correct = answer.correct;
       button.classList.add('btn');
       answerButtonsElement.appendChild(button);
        // console.log(button.dataset.correct)
       button.addEventListener('click', selectAnswer)
    });   
}

// THIS FUNCTION TAKES THE SELECTED ELEMENT (E) FROM THE EVENT LISTENER 

function selectAnswer(e) {
    // console.log('we have selected an answer');
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    const answerOptions = answerButtonsElement.children
    Array.from(answerOptions).forEach(button => {
        setStatusClass(button, button.dataset.correct);
        button.disabled = true;
        button.classList.remove('btn', 'hover');
    });


    document.getElementById('next-btn').classList.remove('hide');

    if (correct === 'true') {
        score += 1;
        // console.log(score);
     };

    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide');
    } else {
        nextButton.classList.add('hide');
        resultBox.classList.remove('hide');
        finalScore();
    };
}


// FINAL SCORE FUNCTION THAT CREATES A <P> TAG AND GENERATES A SCORE

function finalScore() {
        const para = document.createElement('p');
        const node = document.createTextNode(`Your score is ${score}/10.`);
        para.appendChild(node);
        scoreText.appendChild(para);
        document.getElementById('question').innerHTML = 'Congratulations!';
}


function setStatusClass(button, correct) {
    if (correct === 'true') {
        button.classList.add('correct');
    } else if (correct === 'false') {
        button.classList.add('incorrect');
    }
};


// RESETING STATE AND QUIZ FUNCTIONS

function resetQuiz() {
    resetState()
    startButton.classList.remove('hide');
    questionContainer.classList.add('hide');
    resultBox.classList.add('hide');
}

function resetState() {
    resultBox.classList.add('hide');
    nextButton.classList.add('hide');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    };
    let score = 0;

    while (scoreText.firstChild) {
        scoreText.removeChild(scoreText.firstChild);
    }
}




// QUESTION LIST

const questions = [
    {
        number: 1,
        question: 'What is 2 times 2?',
        answers: [
            { text: '4', correct: true },
            { text: '7', correct: false },
            { text: '5', correct: false },
            { text: '95', correct: false }
        ]
    },
    {
        number: 2,
        question: 'Which planet in the Milky Way is the hottest?',
        answers: [
            { text: 'Mercury', correct: false },
            { text: 'Venus', correct: true },
            { text: 'Mars', correct: false },
            { text: 'Earth', correct: false }
        ]
    },
    {
        number: 3,
        question: 'What is the largest Spanish-speaking city in the world?',
        answers: [
            { text: 'New-York', correct: false },
            { text: 'Madrid', correct: false },
            { text: 'Rio de Janeiro', correct: false },
            { text: 'Mexico City', correct: true }           
        ]
    },
    {
        number: 4,
        question: 'How many hearts does an octopus have?',
        answers: [
            { text: '1', correct: false },
            { text: '3', correct: true },
            { text: '4', correct: false },
            { text: 'An octopus has no heart', correct: false } 
        ]
    },
    {
        number: 5,
        question: 'How many European capitals does the Danube flow through?',
        answers: [
            { text: '7', correct: false },
            { text: '8', correct: false },
            { text: '4', correct: true },
            { text: '3', correct: false } 
        ]
    },
    {
        number: 6,
        question: 'What does FIFA stand for in English?',
        answers: [
            { text: 'Fourth International Football Association', correct: false },
            { text: 'International Federation of Association Football', correct: true },
            { text: 'Favorite International Flying Astronauts', correct: false },
            { text: 'Football Is For Aliens', correct: false } 
               
        ]
    },
    {
        number: 7,
        question: 'What year was Cinderella released?',
        answers: [
            { text: '1964', correct: false },
            { text: '1950', correct: true },
            { text: '1948', correct: false },
            { text: '1970', correct: false } 
        ]
    },
    {
        number: 8,
        question: 'Where is the Colosseum located?',
        answers: [
            { text: 'Ankara', correct: false },
            { text: 'Moscow', correct: false },
            { text: 'Washington', correct: false },
            { text: 'Rome', correct: true } 
        ]
    },
    {
        number: 9,
        question: 'Where is the city of Trieste located?',
        answers: [
            { text: 'Slovenia', correct: false },
            { text: 'Italy', correct: true },
            { text: 'Austria', correct: false },
            { text: 'Croatia', correct: false } 
        ]
    },
    {
        number: 10,
        question: 'Where do penguins live?',
        answers: [
            { text: 'Northern hemisphere', correct: false },
            { text: 'Southern hemisphere', correct: true },
        ]
    },
]