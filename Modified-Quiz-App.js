
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
const signUp = document.getElementById('Sign-Up');
const quizContainer = document.getElementById('quiz-container');
// Get the dropdown links



let currentQuestionIndex = 0;
let score = 0;
let countdown;
let incorrectAnswers = [];  // Array to store details of incorrect responses
 // Default to all questions

 const loadQuestion = () => {
     const currentQuestion = quizData[currentQuestionIndex];
    questionContainer.innerHTML = `
        <p>${currentQuestion.question}</p>
        <ul>
            ${currentQuestion.options.map((option, index) => `
                <li>
                    <input type="radio" name="option" value="${option}" id="option${index}">
                    <label for="option${index}">${option}</label>
                </li>
            `).join('')}
        </ul>
    `;

    resetTimer?.();  // Optional chaining to avoid calling undefined function
    startTimer?.();
};


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
function achievementBadges() {
  const calculateUserPercentage = ((score/15) * 100);
  const approximateCalculatedUserPercentage = Math.floor(calculateUserPercentage);
    if (approximateCalculatedUserPercentage >= 80) {
        questionContainer.innerHTML = `<p>you got ${approximateCalculatedUserPercentage}%</p> 
        <div>Golden Badge Achievement🏅: ${score}</div>`
    }
    if (approximateCalculatedUserPercentage <= 60) {
        questionContainer.innerHTML = `<p>you got ${approximateCalculatedUserPercentage}%</p> 
        <div>You're just too dumb🤦‍♂️: ${score}</div>`
    }
}

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
        achievementBadges()
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
        achievementBadges()
        previewButton.style.display = "inline-block"//Added
    }
};

const updateProgress = () => {
    const progressPercentage = ((currentQuestionIndex + 1) / quizData.length) * 100;
    progressBar.style.width = progressPercentage + "%";
    progressBar.textContent = Math.floor(progressPercentage) + "%";
};



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
