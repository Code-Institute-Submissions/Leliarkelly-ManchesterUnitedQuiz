/* jshint esversion: 6 */

const categoryContainer = document.getElementById("category-section");
// section1a - Category Container - quiz categories
const playerCategory = document.getElementById("players");
const teamCategory = document.getElementById("team");
const competitionCategory = document.getElementById("competitions");
// section 1b Question Container --> - display after category is selected
const questionContainer = document.getElementById("question-section");
// <!-- 1c Results Container -- displays after 5 questions completed
const resultsContainer = document.getElementById("results-section");
// <!-- 1d Your Results Container -- displays after 5 questions completed
const yourResultsContainer = document.getElementById("your-results-section");
// <!-- 1e Your Answers Container --> displayed if show result button selected
const yourAnswersContainer = document.getElementById("your-answers-section");
// placeholder for populated answers after each question is answered
const yourAnswers = document.getElementById("your-answers");
// Show answers - Display given answers on click show result icon
const showAnswers = document.getElementById("show-results");
// placeholder for questions
const question = document.getElementById("question");

// placeholder for game score during game
const gameScore = document.getElementById("your-score");
// placeholder for final score on final page
const finalScore = document.getElementById("final-score");
// used to update graphic based on final score
const gradientCircle = document.querySelector(".gradient-circle");
console.log(showAnswers);

//used to populate question, answers, progress and images
const optionA = document.getElementById("a-option");
const optionB = document.getElementById("b-option");
const optionC = document.getElementById("c-option");
const optionD = document.getElementById("d-option");
const image = document.getElementById("image");
const options = Array.from(document.getElementsByClassName("answer"));
const progress = document.querySelector("#progress-bar");

//variables

let questionCounter = 0; // question number
let score = 0; //correct answers
let questions = []; // store of all questions from JSON files
let categoryQuestions = []; // Array of questions by category selected
let completedQuestions = []; // store for questions that have been completed during quiz
let questionnum = 0; // total number of questions per category
let currentQuestion;
let positionResult;
let resulticon;
let colour;
// let imageOutput;
let imageURL;

//The getData function fetches question date from quiz.json and takes as parameter,
// the category selected and pushes those questions to the completed question array
function getData(input) {
  fetch("quiz.json")
    .then((res) => res.json())
    .then((data) => {
      questions = data;
      for (var i = 0; i < data.length; i++) {
        const category = data[i].category;
        if (category === `${input}`) {
          console.log(data[i]);
          questionnum++;
          console.log(questionnum);
          categoryQuestions.push(data[i]);
        }
      }
      console.log(categoryQuestions);
      getNewQuestion();
      categoryContainer.style.display = "none";
      // categoryContainer.style.marginTop = "none";
    })
    .catch((err) => console.log(err));
}

//this function will check if there is an image in the JSON and add to DOM if true.

function checkImage() {
  console.log(currentQuestion.image);
  if (currentQuestion.image !== undefined) {
    document.body.style.backgroundImage = "none";
    imageURL = currentQuestion.image;
    console.log(imageURL);
    image.style.display = "block";
    image.style.backgroundImage = `url(images/${imageURL})`;
  }
}

function getNewQuestion() {
  gameScore.innerHTML = `${score} of ${questionnum}`;
  questionCounter++;
  questionContainer.style.display = "block";
  image.style.display = "none";
  document.body.style.backgroundImage = "url('ManchesterUnitedHomePage4.jpg')";
  console.log(questionnum);
  console.log(categoryQuestions.length);
  const questionIndex = Math.floor(Math.random() * categoryQuestions.length);

  currentQuestion = categoryQuestions[questionIndex];
  question.innerHTML = `Question ${questionCounter}: ${currentQuestion.question}`;
  optionA.innerText = currentQuestion.optiona;
  optionB.innerText = currentQuestion.optionb;
  optionC.innerText = currentQuestion.optionc;
  optionD.innerText = currentQuestion.optiond;
  checkImage();
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
    if (categoryQuestions.length === 0 && selectedChoice === correctAnswer) {
      resulticon = "check";
      colour = "#007400";
      console.log(questionCounter);
      console.log(questionnum);
      score++;
      positionResult = (questionCounter * 100) / questionnum + "%";
      progress.style.width = (questionCounter * 100) / questionnum + "%";
      gameScore.innerHTML = `${score} of ${questionnum}`;
      finishGame();
    } else if (
      categoryQuestions.length === 0 &&
      selectedChoice != correctAnswer
    ) {
      resulticon = "x";
      colour = "red";
      positionResult = (questionCounter * 100) / questionnum + "%";
      progress.style.width = (questionCounter * 100) / questionnum + "%";
      gameScore.innerHTML = `${score} of ${questionnum}`;
      finishGame();
    } else if (selectedChoice === correctAnswer) {
      resulticon = "check";
      colour = "#007400";
      console.log(questionCounter);
      console.log(questionnum);
      score++;
      positionResult = (questionCounter * 100) / questionnum + "%";
      progress.style.width = (questionCounter * 100) / questionnum + "%";
      gameScore.innerHTML = `${score} of ${questionnum}`;
      getNewQuestion();
    } else {
      resulticon = "x";
      colour = "red";
      positionResult = (questionCounter * 100) / questionnum + "%";
      progress.style.width = (questionCounter * 100) / questionnum + "%";
      gameScore.innerHTML = `${score} of 5`;
      getNewQuestion();
    }
    console.log(resulticon);
    console.log(colour);
    const compquestion = `
    <li>${question} 
    <p> The correct answer is ${answertext}</p> 
    <p> Your answer was ${youranswer} &emsp; <i class="bi bi-${resulticon}-circle" style="color: ${colour};"></i></p>
      </li> `;
    yourAnswers.innerHTML += compquestion;
  });
});

function finishGame() {
  questionContainer.style.display = "none";
  resultsContainer.style.display = "block";
  yourResultsContainer.style.display = "block";
  const percentScore = (score / 5) * 100 + "%";
  gradientCircle.style.background = `conic-gradient(#c70101 0%, #c70101 ${percentScore} ,#fff ${percentScore}, #fff 100%)`;
  finalScore.innerHTML = `You scored <br> ${score} out of 5`;
}

function showResults() {
  if (yourAnswersContainer.style.display === "none") {
    yourAnswersContainer.style.display = "block";
  } else {
    yourAnswersContainer.style.display = "none";
  }
}

playerCategory.addEventListener("click", () => getData("Player"));
teamCategory.addEventListener("click", () => getData("Team"));
competitionCategory.addEventListener("click", () => getData("Competition"));
showAnswers.addEventListener("click", () => showResults());
