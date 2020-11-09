const question = document.querySelector("#question");
const choices = Array.from(document.querySelectorAll(".choice-text"));
const scoreText = document.querySelector("#score");
const progressText = document.querySelector("#progressText");

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []
let timeleft = 30
   

let questions = [
    {
        question : "What vitamin or mineral are you deficient in if you have Rickets?",
        choice1 : "Vitamin A, Retinol",
        choice2 : "Vitamin D, Calciferol",
        choice3 : "Calcium",
        choice4 : "Vitamin K, Phylloquinone",
        answer : "2"
    },
    {
        question : "What vitamin or mineral are you deficient in if you have Anaemia?",
        choice1 : "Vitamin B12, Cyanocobalamin",
        choice2 : "Vitamin C, Ascorbic Acid",
        choice3 : "Calcium",
        choice4 : "Vitamin D, Calciferol",
        answer : "1"
    },
    {
        question : "What vitamin or mineral are you deficient in if you have Beri-Beri?",
        choice1 : "Vitamin B1, Thiamine",
        choice2 : "Vitamin D, Calciferol",
        choice3 : "Vitamin C, Ascorbic Acid",
        choice4 : "Vitamin K, Phylloquinone",
        answer : "1"
    },
    {
        question : "What vitamin or mineral are you deficient in if you have Anaemia?",
        choice1 : "Vitamin B1, Thiamine",
        choice2 : "Vitamin B2, Riboflavin",
        choice3 : "Iron",
        choice4 : "Calcium",
        answer : "3"
    },
    {
        question : "What vitamin or mineral are you deficient in if you have Scurvy?",
        choice1 : "Vitamin A, Retinol",
        choice2 : "Vitamin D, Calciferol",
        choice3 : "Vitamin B2, Riboflavin",
        choice4 : "Vitamin C, Ascorbic Acid",
        answer : "4"
    }
]

const SCORE_POINTS = 1
const MAX_QUESTIONS = 5

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
    timeleft = 30
}

let downloadTimer = setInterval(function(){
    if (timeleft <= 0) {
        clearInterval(downloadTimer);
        $(".choice-container").addClass("hide");
        $(".question").addClass("hide");
        $(".countdown").addClass("gameOver animate__animated animate__bounceInDown");
        document.getElementById("countdown").innerHTML = "Game Over :(";
        setTimeout(() => {
            localStorage.setItem("mostRecentScore", JSON.stringify(score))

            return window.location.assign("end.html")
        }, 3000)
        

    } else {
        document.getElementById("countdown").innerHTML = timeleft + " seconds remaining";
    }
    timeleft -= 1;
}, 1000);



getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem("mostRecentScore", JSON.stringify(score))
        

        return window.location.assign("end.html")
    }

    questionCounter++
    question.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    
    const questionIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset["number"]
        choice.innerText = currentQuestion["choice" + number]
    })

    availableQuestions.splice(questionIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset["number"]

        let classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect"

        if(classToApply === "correct") {
            incrementScore(SCORE_POINTS)
        }

        if(classToApply === "incorrect") {
            timeleft -= 5;
            $(".countdown").addClass("red");
            $(".countdown").addClass("animate__animated animate__shakeX");
            setTimeout(() => {
                $(".countdown").removeClass("red");
                $(".countdown").removeClass("animate__animated animate__shakeX");
    
            }, 2000)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()


