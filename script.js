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
const gameProgress = document.getElementById("your-progress");
// placeholder for final score on final page
// const finalScore = document.getElementById("final-score");
const graphicScore = document.getElementById("scoreJS");

//used to populate question, answers, progress and images
const optionA = document.getElementById("a-option");
const optionB = document.getElementById("b-option");
const optionC = document.getElementById("c-option");
const optionD = document.getElementById("d-option");
const image = document.getElementById("image");
const choices = Array.from(document.getElementsByClassName("answer"));
const progress = document.querySelector("#progress-bar");

//variables

let questionCounter = 0; // question number
let score = 0; //correct answers
let questions = []; // store of all questions from JSON files
let categoryQuestions = []; // Array of questions by category selected
let completedQuestions = []; // store for questions that have been completed during quiz
let questionnum = 0; // total number of questions per category
let currentQuestion; // currentQUestion being asnwered
let resulticon; //icon to display depending on whether right or wrong - cross for wrong and check for correct
let colour; //background colour to display - red for wrong and green for correct
let textFeedback; //feedback text :  Well done or Wrong answer
let imageURL; // image url variable for questions
let backgroundImage = [
  "ManchesterUnitedHomePage1.jpg",
  "ManchesterUnitedHomePage2.jpg",
  "ManchesterUnitedHomePage3.jpg",
  "ManchesterUnitedHomePage4.jpg",
];
// array of background images for home page

//randomise background image on home page
let randomItem =
  backgroundImage[Math.floor(Math.random() * backgroundImage.length)];
  document.body.style.backgroundImage = `url(images/${randomItem})`;

//The getData function fetches question data from quiz.json and takes as parameter,
// the category selected and pushes those questions to the completed question array
function getData(input) {
  fetch("quiz.json")
    .then((res) => res.json())
    .then((data) => {
      questions = data;
      for (var i = 0; i < data.length; i++) {
        const category = data[i].category;
        if (category === `${input}`) {
          questionnum++;
          categoryQuestions.push(data[i]);
        }
      }
      getNewQuestion();
      categoryContainer.style.display = "none";
    })
    .catch((err) => console.log(err));
}

//this function will check if there is an image against a question in the quiz.json file and add to DOM if true.

function checkImage() {
  console.log(currentQuestion.image);
  if (currentQuestion.image !== undefined) {
    document.body.style.backgroundImage = "none";
    imageURL = currentQuestion.image;
    image.style.display = "block";
    image.style.backgroundImage = `url(images/${imageURL})`;
  }
}

//this function will display the new Question and possible answers into the DOM
function getNewQuestion() {
  document.body.scrollTop = 0; // For Safari to move back to top of screen
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera to move back to top of screen
  questionCounter++;
  gameProgress.innerHTML = `${questionCounter} of ${questionnum}`;
  questionContainer.style.display = "block";
  image.style.display = "none";
  const questionIndex = Math.floor(Math.random() * categoryQuestions.length);
  currentQuestion = categoryQuestions[questionIndex];
  question.innerHTML = `Question ${questionCounter}: ${currentQuestion.question}`;
  optionA.innerText = currentQuestion.optiona;
  optionB.innerText = currentQuestion.optionb;
  optionC.innerText = currentQuestion.optionc;
  optionD.innerText = currentQuestion.optiond;
  checkImage();
  const completedQuestion = categoryQuestions.splice(questionIndex, 1);
  completedQuestions.push(...completedQuestion);
}
//this function will listen for a click and check and store answers into completedQuestion variable
choices.forEach((item) => {
  item.addEventListener("click", (e) => {
    const selectid = e.target.id;
    const selectedChoice = selectid.charAt(0);
    const question = currentQuestion.question;
    const youranswer = e.target.innerText;
    const answertext = currentQuestion.correctanswer;
    const correctAnswer = currentQuestion.answer;
    if (categoryQuestions.length === 0 && selectedChoice === correctAnswer) {
      resulticon = "check";
      colour = "#228C22";
      textFeedback = "Well Done!";
      score++;
      // positionResult = (questionCounter * 100) / questionnum + "%";
      progress.style.width = (questionCounter * 100) / questionnum + "%";
      finishGame();
    } else if (
      categoryQuestions.length === 0 &&
      selectedChoice != correctAnswer
    ) {
      resulticon = "x";
      colour = "#c70101";
      textFeedback = "Wrong Answer!";
      progress.style.width = (questionCounter * 100) / questionnum + "%";
      finishGame();
    } else if (selectedChoice === correctAnswer) {
      resulticon = "check";
      colour = "#228C22";
      textFeedback = "Well Done!";
      score++;
      progress.style.width = (questionCounter * 100) / questionnum + "%";
      getNewQuestion();
    } else {
      resulticon = "x";
      colour = "red";
      textFeedback = "Wrong Answer!";
      progress.style.width = (questionCounter * 100) / questionnum + "%";
      getNewQuestion();
    }
    const compquestion = `  
    <li style ="background-color: ${colour}"><p>${question}</p> 
    <p> The correct answer is ${answertext}</p> 
    <p> ${textFeedback} Your answer was ${youranswer} &emsp; <i class="bi bi-${resulticon}-circle"></i></p>
      </li> `;
    yourAnswers.innerHTML += compquestion;
  });
});

// style="color: ${colour};"

// this function is called when all the questions have been completed.  It hides questions container, and display the result containers

function finishGame() {
  questionContainer.style.display = "none";
  resultsContainer.style.display = "block";
  yourResultsContainer.style.display = "block";
  const winningScore = (score / questionnum) * 100;
  const losingScore = 100 - winningScore;
  //this part of the function adds an animated Chart.js which display the results
  let ctx = document.getElementById("myChart");
  const myChart = new Chart(ctx, {
    type: "doughnut",
    data: {
      datasets: [
        {
          data: [0, winningScore, losingScore],
          backgroundColor: [
            "rgba(255,255,255)",
            "rgba(199,1,1)",
            "rgba(255,255,255)",
          ],
        },
      ],
    },

    options: {
      cutout: 90,
      animation: {
        animateScale: true,
        animateRotate: true,
      },
    },
  });
  graphicScore.innerText = `You scored \n ${score}/${questionnum}`;
}

// this function hides and display the results
function showResults() {
  if (yourAnswersContainer.style.display === "none") {
    yourAnswersContainer.style.display = "block";
  } else {
    yourAnswersContainer.style.display = "none";
  }
}

//event listeners for the category selection and the show answers
playerCategory.addEventListener("click", () => getData("Player"));
teamCategory.addEventListener("click", () => getData("Team"));
competitionCategory.addEventListener("click", () => getData("Competition"));
showAnswers.addEventListener("click", () => showResults());

