import { loadQuestion, startTimer} from "./Basic-Func-Quiz-App.js";

const quizData = [
    {
        question: "What is the current president of Nigeria?",
        options: ["Bola Ahmed Tinubu", "Muhammed Buhari", "Olusegun Obasanjo", "Yakubu Gowon"],
        correctAnswer: "Bola Ahmed Tinubu"
    },
    {
        question: "What is the capital of Lagos State?",
        options: ["Ikeja", "Abuja", "Ibadan", "Kano"],
        correctAnswer: "Ikeja"
    },
    {
        question: "Who is the President of Russia?",
        options: ["Vladimir Putin", "Dmitry Medvedev", "Boris Yeltsin", "Mikhail Gorbachev"],
        correctAnswer: "Vladimir Putin"
    },
    {
        question: "Who is the Capital of Germany?",
        options: ["Berlin", "Munich", "Harmburg", "Frankfurt"],
        correctAnswer: "Berlin"
    },
    {
        question: "What is the longest river in the world?",
        options: ["Amazon River", "Nile River", "Yangtze River", "Mississippi River"],
        correctAnswer: "Nile River"
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Jupiter", "Venus"],
        correctAnswer: "Mars"
    },
    {
        question: "Who wrote 'Things Fall Apart'?",
        options: ["Wole Soyinka", "Chinua Achebe", "Ngugi wa Thiong'o", "Toni Morrison"],
        correctAnswer: "Chinua Achebe"
    },
    {
        question: "What is the capital of Germany?",
        options: ["Munich", "Berlin", "Frankfurt", "Hamburg"],
        correctAnswer: "Berlin"
    },
    {
        question: "Which country is known as the Land of the Rising Sun?",
        options: ["China", "Japan", "South Korea", "Thailand"],
        correctAnswer: "Japan"
    },
    {
        question: "What gas do plants absorb from the atmosphere?",
        options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
        correctAnswer: "Carbon Dioxide"
    },
    {
        question: "Who painted the Mona Lisa?",
        options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Claude Monet"],
        correctAnswer: "Leonardo da Vinci"
    },
    {
        question: "What is the currency of the United Kingdom?",
        options: ["Euro", "Dollar", "Pound Sterling", "Franc"],
        correctAnswer: "Pound Sterling"
    },
    {
        question: "Which African country was never colonized?",
        options: ["Ghana", "Ethiopia", "Nigeria", "South Africa"],
        correctAnswer: "Ethiopia"
    },
    {
        question: "What is the chemical symbol for Gold?",
        options: ["Ag", "Au", "Pb", "Fe"],
        correctAnswer: "Au"
    },
    {
        question: "What is the American Independence year?",
        options: ["1776", "1855", "1895", "1910"],
        correctAnswer: "1776"
    }
];

const questionContainer = document.getElementById("question-container");
const timerElement = document.getElementById("timer");
const nextButton = document.getElementById("next-button");
const restartButton = document.getElementById("restart-button");
const progressBar = document.querySelector(".progress-done");
const resultContainer = document.getElementById("result-container");
const previewButton = document.getElementById('Preview-button');
const backButton = document.getElementById('back-button')
const skipButton = document.getElementById('skip-button')
const dropdownLinks = document.querySelectorAll(".dropdown-content a");

// Get the dropdown links



let currentQuestionIndex = 0;
let score = 0;
let countdown;
let incorrectAnswers = [];  // Array to store details of incorrect responses
 // Default to all questions



loadQuestion(quizData, currentQuestionIndex, questionContainer, resetTimer, startTimer);
// Event listener for dropdown
dropdownLinks.forEach(link => {
    link.addEventListener("click", (event) => {
        event.preventDefault(); // Prevent page refresh

        // Extract the number from the text (e.g., "5 Questions" → 5)
        numberOfQuestions = parseInt(event.target.textContent);

        // Shuffle and slice quizData to the selected number
        shuffleQuestionArray();
        quizData = quizData.slice(0, numberOfQuestions);

        // Reset and load first question
        currentQuestionIndex = 0;
        score = 0;
        incorrectAnswers = [];
        loadQuestion();
        updateProgress();
    });
});

const checkAnswer = (selectedOption) => {
    const currentQuestion = quizData[currentQuestionIndex];
    if (selectedOption === currentQuestion.correctAnswer) {  
        score++;
    } else {
      incorrectAnswers.push({
        question: currentQuestion.question,
        userAnswer: selectedOption,
        correctAnswer: currentQuestion.correctAnswer
      });  
    }
};

function customMessage(selectedOption) {
    const currentQuestion = quizData[currentQuestionIndex];
    const message = document.createElement('p');
    if (selectedOption === currentQuestion.correctAnswer) {
        document.getElementById("myAudio").play();
        message.textContent = "🎉 Great Job!";
        message.style.color = "green";
    } else {
        document.getElementById("mySecondAudio").play();
        message.textContent = "❌ Wrong Answer!";
        message.style.color = "red";
    }
    resultContainer.innerHTML = ''; // Clear previous message
    resultContainer.appendChild(message);
}

backButton.addEventListener('click', ()=>{
    const selectedOption = document.querySelector('input[name="option"]:checked');
    if (currentQuestionIndex > 0 ) {
        currentQuestionIndex--;
        loadQuestion();
        updateProgress(); 
        backButton.style.display = "inline-block"        
    } 
    if (currentQuestionIndex === 0) {
        backButton.style.display = "none"
    }
})

skipButton.addEventListener("click", () => {
    if (currentQuestionIndex < quizData.length - 1) {
        currentQuestionIndex++;
        loadQuestion();
        resetTimer();
        updateProgress();
    } else {
        showResult(); // If it's the last question, show results
    }
});


const nextQuestion = () => {
    clearInterval(countdown);
    // setTimeout(() => customMessage(selectedOption.value), 1000);
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        loadQuestion();
        updateProgress();
    } else {
        showResult();
        previewButton.style.display = "inline-block"//Added
    }
};

const updateProgress = () => {
    const progressPercentage = ((currentQuestionIndex + 1) / quizData.length) * 100;
    progressBar.style.width = progressPercentage + "%";
    progressBar.textContent = Math.floor(progressPercentage) + "%";
};

//Using the fisherYatesShuffle method
const shuffleQuestionArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
  }
  return array;
};

const showResult = () => {
    clearInterval(countdown);
       
    resultContainer.innerHTML = `Your score: ${score} out of ${quizData.length}`;
    questionContainer.innerHTML = "";
    nextButton.style.display = "none";
    restartButton.style.display = "block";
    previewButton.style.display = "inline-block"//Added
};

const resetTimer = () => {
    clearInterval(countdown); // Stop the previous timer
    timerElement.textContent = "01:00";
};
// remove r from "startTimer"

nextButton.addEventListener("click", () => {
    const selectedOption = document.querySelector('input[name="option"]:checked');
    if (selectedOption) {
        checkAnswer(selectedOption.value);
        // questionContainer.style.opacity = 0;
        customMessage(selectedOption.value);
        // setTimeout(() => nextQuestion(), 60000);
        nextQuestion()
    } else {
        alert("Please select an option.");
    }
});

restartButton.addEventListener("click", () => {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.style.display = "block";
    incorrectAnswers = [];

    resultContainer.innerHTML = "";
    shuffleQuestionArray(quizData)
    loadQuestion();
    updateProgress();
});

// When review button is clicked, display the incorrect answers
previewButton.addEventListener("click", () => {
    // Build review content
    let reviewHTML = "<h2>Review Incorrect Answers</h2>";
    if (incorrectAnswers.length === 0) {
      reviewHTML += "<p>No incorrect answers. Great job!</p>";
    } else {
      incorrectAnswers.forEach((item, index) => {
        reviewHTML += `
          <div>
            <p><strong>Q${index + 1}:</strong> ${item.question}</p>
            <p>Your answer: ${item.userAnswer}</p>
            <p>Correct answer: ${item.correctAnswer}</p>
            <hr>
          </div>
        `;
      });
    }
    // Replace the question container content with the review
    questionContainer.innerHTML = reviewHTML;
  });

// Initialize the first question and progress
window.onload = () => {
    shuffleQuestionArray(quizData)
    loadQuestion();
    updateProgress();
};

loadQuestion();
//===IMPROVEMENTS===
// 1. Timer for Each Question ⏱️✅- Add a countdown timer to create urgency.✅
// 2. Progress Bar 📊✅ - Show progress with visual feedback (e.g., "3/5 questions completed").✅
// 3. Custom Messages 📝 - Display feedback for correct/incorrect answers (e.g., "Great job!" or "Try again!").
// 4. Review Incorrect Answers - Let users review questions they answered incorrectly.
// 5. Random Question Order 🎲 - Shuffle questions each time the quiz starts.
// 6. Animated Transitions 🎨✅	Smooth animations for navigating between questions.✅
// 7. custom Message - custom message on each question answered
// 8. BackButton - it is a cheatcode though
// 9. SkipButton - SKip Questions
// 10. Sound Effects - Added some sound effects
