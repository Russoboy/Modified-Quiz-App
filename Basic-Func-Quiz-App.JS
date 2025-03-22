export const loadQuestion = (quizData, currentQuestionIndex, questionContainer, resetTimer, startTimer) => {
    // Check if quizData is an array and currentQuestionIndex is valid
    if (!Array.isArray(quizData) || quizData.length === 0) {
        console.error("❌ Error: quizData is not a valid array or is empty.");
        return;
    }

    if (currentQuestionIndex < 0 || currentQuestionIndex >= quizData.length) {
        console.error("❌ Error: Invalid currentQuestionIndex:", currentQuestionIndex);
        return;
    }

    const currentQuestion = quizData[currentQuestionIndex];

    if (!questionContainer) {
        console.error("❌ Error: questionContainer is not defined.");
        return;
    }
    
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


export const startTimer = (timerElement, nextQuestion) => {
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


