const categoryContainer = document.getElementById("category-selector");
const quizContainer = document.getElementById("question-section");
const resultsContainer = document.getElementById("results");
const submitButton = document.getElementById("submit");
const question = document.getElementById("question");
const quizBox = document.getElementById("quizBox");
const endGame = document.getElementById("end");
const finish = document.getElementById("finish");

//category

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

let questioncounter = 0;
let score = 0;
let questions = [];
let completedQuestions = [];
let position = 0;
let categoryQuestions = [];

function getData(input) {
  fetch("quiz.json")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      questions = data;
      for (var i = 0; i < data.length; i++) {
        const category = data[i].category;
        if (category === `${input}`) {
          console.log(data[i]);
          categoryQuestions.push(data[i]);
        }
      }
      console.log(categoryQuestions);
      getNewQuestion();
      categoryContainer.style.display = "none";
      finish.style.display = "none";
    })
    .catch((err) => console.log(err));
}

function getNewQuestion() {
  const questionIndex = Math.floor(Math.random() * categoryQuestions.length);
  console.log(questionIndex);
  currentQuestion = categoryQuestions[questionIndex];
  question.innerHTML = currentQuestion.question;
  optionA.innerText = currentQuestion.optiona;
  optionB.innerText = currentQuestion.optionb;
  optionC.innerText = currentQuestion.optionc;
  optionD.innerText = currentQuestion.optiond;
  const completedQuestion = categoryQuestions.splice(questionIndex, 1);
  console.log(completedQuestion);
  // console.log(completedQuestions);
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
    // const answerA = currentQuestion.optiona;
    // const answerB = currentQuestion.optionb;
    // const answerC = currentQuestion.optionc;
    // const answerD = currentQuestion.optiond;
    const correctAnswer = currentQuestion.answer;
    let result;
    let colour;
    if (selectedChoice === correctAnswer) {
      (result = "check"), (colour = "#007400");
    } else {
      (result = "x"), (colour = "#c70101");
    }

    const compquestion = `<li> ${question} <p> THe correct answer is ${answertext}</p> <p> your answer was ${youranswer}</p>
        <i class="bi bi-${result}-circle" style="font-size: 2rem; color: ${colour};"></i>
        </li> `;

    //create an element and append question and answer to
    console.log(compquestion);
    endGame.innerHTML += compquestion;

    if (categoryQuestions.length === 0) {
      quizContainer.style.display = "none";
      finishGame();
    } else if (selectedChoice === correctAnswer) {
      e.target.classList.add("correct");
      setTimeout(() => {
        e.target.classList.remove("correct");
      }, 3000);
      position++;
      console.log(position);
      progress.style.width = (position * 100) / 5 + "%";
      getNewQuestion();
      score++;
      console.log(score);
      gameScore.innerHTML = `${score} of 5`;
    } else {
      e.target.classList.add("incorrect");
      setTimeout(() => {
        e.target.classList.remove("incorrect");
      }, 3000);
      position++;
      progress.style.width = (position * 100) / 5 + "%";
      getNewQuestion();
    }
  });
});

function finishGame() {
  finish.style.display = "block";
  const quizResults = `
        <p>You scored ${score} out of 5</p>`;

  quizBox.innerHTML = quizResults;
}

playerCategory.addEventListener("click", () => getData("Player"));
teamCategory.addEventListener("click", () => getData("Team"));
competitionCategory.addEventListener("click", () => getData("Competition"));
