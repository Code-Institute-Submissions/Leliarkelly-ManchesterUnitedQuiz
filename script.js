const categoryContainer = document.getElementById("category-selector");
const quizContainer = document.getElementById("question-section");
const resultsContainer = document.getElementById("results");
const question = document.getElementById("question");
const finish = document.getElementById("finish");
const finalScore = document.getElementById("final-score");

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
let questionnum = 0;

function getData(input) {
  fetch("quiz.json")
    .then((res) => res.json())
    .then((data) => {
      questions = data;
      for (var i = 0; i < data.length; i++) {
        const category = data[i].category;
        if (category === `${input}`) {
          console.log(data[i]);
          questionnum ++;
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
  questioncounter ++;
  quizContainer.style.display = "block";
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
    let result;
    let colour;
    if (selectedChoice === correctAnswer) {
      (result = "check"), (colour = "#007400");
    } else {
      (result = "x"), (colour = "#c70101");
    }
    const compquestion = `<li> ${question} <p> The correct answer is ${answertext}</p> <p> your answer was ${youranswer}</p>
        <span><i class="bi bi-${result}-circle" style="font-size: 2rem; color: ${colour};"></i></span>
        </li> `;
    //create an element and append question and answer to
    console.log(compquestion);
    yourResults.innerHTML += compquestion;
    if (categoryQuestions.length === 0) {
        quizContainer.style.display = "none";
        finishGame();
    } else if (selectedChoice === correctAnswer) {
      position++;
      score++;
      console.log(position);
      positionresult = (position * 100) / questionnum + "%";
      console.log(positionresult);
      progress.style.width = (position * 100) / questionnum + "%";
      $('.gradient-circle').css({'background': 'conic-gradient(#c70101 0%, #c70101 `${postionresult}`)'});
      getNewQuestion();
      
      gameScore.innerHTML = `${score} of 5`;
    } else {
      position++;
      positionresult = (position * 100) / questionnum + "%";
      progress.style.width = (position * 100) / questionnum + "%";
      $('.gradient-circle').css({'background': 'conic-gradient(#c70101 0%, #c70101 `${postionresult}`)'});
      gameScore.innerHTML = `${score} of 5`;
      getNewQuestion();
    }
  });
});
      

function finishGame() {
  finish.style.display = "block";
  finalScore.innerText = `${score} of 5`;
console.log(score);  
}

playerCategory.addEventListener("click", () => getData("Player"));
teamCategory.addEventListener("click", () => getData("Team"));
competitionCategory.addEventListener("click", () => getData("Competition"));
