
// section1a - Category Container - display on page load
const categoryContainer = document.getElementById("category-section");
// section 1b Question Container --> - display after category is selected
const questionContainer = document.getElementById("question-section");
// <!-- 1c Results Container -- diaplsyed after 5 questions completed
const resultsContainer = document.getElementById("results-section");
// <!-- 1d Your Results Container -- displayed after 5 questions completed
const yourResultsContainer = document.getElementById("your-results-section");
// <!-- 1e Your Answers Container --> displayed if show result button selected
const yourAnswersContainer = document.getElementById("your-answers-section");
// Show answers - Display given answers on click 
const showAnswers = document.getElementById("show-results");
// populates answers into DOM
const yourAnswers = document.getElementById("your-answers");
const question = document.getElementById("question");
const answers = document.getElementById("your-results-detail");
const finalScore = document.getElementById("final-score");
const gradientCircle = document.querySelector(".gradient-circle");
console.log(showAnswers);


const playerCategory = document.getElementById("players");
const teamCategory = document.getElementById("team");
const competitionCategory = document.getElementById("competitions");
const gameScore = document.getElementById("your-score");
const optionA = document.getElementById("a-option");
const optionB = document.getElementById("b-option");
const optionC = document.getElementById("c-option");
const optionD = document.getElementById("d-option");
const options = Array.from(document.getElementsByClassName("answer"));
const progress = document.querySelector("#progress-bar");

//show and hide
const categorySelector = document.getElementById("category-selector");
const questionSection = document.getElementById("question-section");
const finalscore = document.getElementById("your-score");

let questionCounter = 0;  // question number
let score = 0;  //score of correct answers
let questions = []; // store of all questions
let completedQuestions = [];  // store for questions that have been completed
// let position = 0;
let categoryQuestions = [];  // store for category question fetched
let questionnum = 0;  // total number of questions fetch per category

function getData(input) {
  fetch("quiz.json")
    .then((res) => res.json())
    .then((data) => {
      questions = data;
      for (var i = 0; i < data.length; i++) {
        const category = data[i].category;
        questionnum++
        if (category === `${input}`) {
          console.log(data[i]);
          categoryQuestions.push(data[i]);
        }
      }
      console.log(categoryQuestions);
      getNewQuestion();
      categoryContainer.style.display = "none";
    })
    .catch((err) => console.log(err));
}

function getNewQuestion() {
  questionCounter++;
  questionContainer.style.display = "block";
  const questionIndex = Math.floor(Math.random() * categoryQuestions.length);
  currentQuestion = categoryQuestions[questionIndex];
  question.innerHTML = `Question ${questionCounter}: ${currentQuestion.question}`;
  optionA.innerText = currentQuestion.optiona;
  optionB.innerText = currentQuestion.optionb;
  optionC.innerText = currentQuestion.optionc;
  optionD.innerText = currentQuestion.optiond;
  const completedQuestion = categoryQuestions.splice(questionIndex, 1);
  console.log(completedQuestion);
  completedQuestions.push(...completedQuestion);
  console.log(completedQuestions);
}
options.forEach((item) => {
  item.addEventListener("click", (e) => {
    const selectid = e.target.id;
    const selectedChoice = selectid.charAt(0);
    const question = currentQuestion.question;
    const youranswer = e.target.innerText;
    const answertext = currentQuestion.correctanswer;
    const correctAnswer = currentQuestion.answer;
    let resulticon;
    let colour;
    if (selectedChoice === correctAnswer) {
      (resulticon = "check"), (colour = "#007400");
      // position++;
      // console.log(position);
      console.log(questionCounter);
      score++;
      positionresult = (questionCounter * 100) / questionnum + "%";
      progress.style.width = (questionCounter * 100) / questionnum + "%";
      gameScore.innerHTML = `${score} of 5`;
      if (categoryQuestions.length != 0) {
        getNewQuestion();
      } else {
        finishGame();
      }
    } else if (categoryQuestions.length === 0) {
      finishGame();
    } else {
      (resulticon = "x"), (colour = "#c70101");
      // position++;
      positionresult = (questionCounter * 100) / questionnum + "%";
      progress.style.width = (questionCounter * 100) / questionnum + "%";
      gameScore.innerHTML = `${score} of 5`;
      getNewQuestion();
    }
    const compquestion = `
            <li> ${question} 
                <p> The correct answer is ${answertext}</p> 
                <p> Your answer was ${youranswer}</p>
                    <span><i class="bi bi-${resulticon}-circle" style="font-size: 2rem; color: ${colour};"></i></span></li> `;
    //create an element and append question and answers to
    yourAnswers.innerHTML += compquestion;
  });
});

function finishGame() {
  questionContainer.style.display = "none";
  resultsContainer.style.display = "block";
  yourResultsContainer.style.display = "block";
  const percentScore = (score / 5) * 100 + "%";
  gradientCircle.style.background = `conic-gradient(#c70101 0%, #c70101 ${percentScore} ,#fff ${percentScore}, #fff 100%)`;
  finalScore.innerHTML = `Your score is <br> ${score} out of 5`;
}

function showResults() {
  yourAnswersContainer.style.display = "block";
}

playerCategory.addEventListener("click", () => getData("Player"));
teamCategory.addEventListener("click", () => getData("Team"));
competitionCategory.addEventListener("click", () => getData("Competition"));
showAnswers.addEventListener("click", () => showResults());
