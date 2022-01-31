const questionContainer = document.getElementById("question-section");
const categoryContainer = document.getElementById("category-section");
const resultsContainer = document.getElementById("results-section");
const yourResultsContainer = document.getElementById("your-results-section");
const yourAnswersContainer = document.getElementById("your-answers-section");
const yourAnswers = document.getElementById("your-answers");
const submitButton = document.getElementById("submit");
const question = document.getElementById("question");
const answers = document.getElementById("your-results-detail")
const finalScore = document.getElementById("final-score");
const gradientCircle = document.querySelector(".gradient-circle");
const restartQuiz = document.querySelector(".restart-btn");
const showAnswers = document.getElementById("show-results");
console.log(showAnswers);
//Quiz category

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
  
    })
    .catch((err) => console.log(err));
}

function getNewQuestion() {
  questioncounter ++;
  questionContainer.style.display = "block";
  const questionIndex = Math.floor(Math.random() * categoryQuestions.length);
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
    let resulticon;
    let colour;
        if (selectedChoice === correctAnswer) {
          (resulticon = "check"), 
          (colour = "#007400");
          position++;
          score++;
          positionresult = (position * 100) / questionnum + "%";
          progress.style.width = (position * 100) / questionnum + "%";
          gameScore.innerHTML = `${score} of 5`;
          if(categoryQuestions.length !=0){
            getNewQuestion();
          }
          else {
            finishGame();          
            }      
          }  
        else if (categoryQuestions.length === 0) {
          finishGame();}
        else {
          (resulticon = "x"), 
          (colour = "#c70101");
          position++;
          positionresult = (position * 100) / questionnum + "%";
          progress.style.width = (position * 100) / questionnum + "%";
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
  const Percentscore = (score/5) * 100 + "%";
  gradientCircle.style.background = `conic-gradient(#c70101 0%, #c70101 ${Percentscore} ,#fff ${Percentscore}, #fff 100%)`;
  finalScore.innerHTML = `Your score is <br> ${score} out of 5`;           
}

function showResults(){
  console.log("hello");
  yourAnswersContainer.style.display = "block";
}

playerCategory.addEventListener("click", () => getData("Player"));
teamCategory.addEventListener("click", () => getData("Team"));
competitionCategory.addEventListener("click", () => getData("Competition"));
restartQuiz.addEventListener("click", () => restartGame());
showAnswers.addEventListener("click", () => showResults());