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
      achievementBadges()
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
  const startTimer = () => {
      clearInterval(countdown); // Stop any previous interval before starting a new one
      let time = 60;
      countdown = setInterval(() => {
          const minutes = Math.floor(time / 60);
          const seconds = time % 60;
          timerElement.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
          if (time === 0) {
              clearInterval(countdown);
              nextQuestion(); // Move to the next question automatically
          }
          time--;
      }, 1000);
  };
  
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
