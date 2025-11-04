const questions = [
    {
        question: "What is the most followed football team on Instagram?",
        answers: [
            { text: "Real Madrid", correct: true},
            { text: "Barcelona", correct: false},
            { text: "Chelsea", correct: false},
            { text: "Man United", correct: false},
        ]
    },
    {
        question: "What team has the most goals in the premier league?",
        answers: [
            { text: "Arsenal", correct: false},
            { text: "Liverpool", correct: false},
            { text: "Chelsea", correct: false},
            { text: "Man United", correct: true},
        ]
    },
    {
        question: "What team won the champions league in the 2018/19 season?",
        answers: [
            { text: "Arsenal", correct: false},
            { text: "Liverpool", correct: true},
            { text: "Chelsea", correct: false},
            { text: "Man United", correct: false},
        ]
    },
    {
         question: "What team has won the most trophies OAT",
        answers: [
            { text: "Al Ahly", correct: true},
            { text: "Celtic", correct: false},
            { text: "Real Madrid", correct: false},
            { text: "Man United", correct: false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.
    question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}
function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }

}
function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}


function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}


nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})


startQuiz();