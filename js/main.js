const questions = [
    { 
        text: "I am satisfied with my current relationship.", 
        options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"], 
        glitch: false 
    },
    { 
        text: "I know my partner’s location most of the time.", 
        options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"], 
        glitch: true 
    },
    { 
        text: "I have looked through my partner’s phone without their knowledge.", 
        options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"], 
        glitch: true 
    },
    { 
        text: "My partner needs me to watch over them.", 
        options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"], 
        glitch: false 
    },
    { 
        text: "I followed my partner recently without their knowledge.", 
        options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"], 
        glitch: true 
    },
    { 
        text: "My partner is planning to leave me.", 
        options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"], 
        glitch: false 
    }
];

let currentQuestionIndex = 0;

function loadQuestion() {
    const questionContainer = document.getElementById("question-container");
    const questionText = document.getElementById("question-text");
    const choicesContainer = document.getElementById("choices-container");
    const nextButton = document.getElementById("next-btn");

    // Load current question
    const question = questions[currentQuestionIndex];
    questionText.textContent = question.text;

    // Clear old choices
    choicesContainer.innerHTML = "";

    // Add new choices
    question.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.textContent = option;
        button.onclick = () => {
            nextButton.disabled = false;
            if (question.glitch && option === "Disagree") {
                glitchEffect();
            }
        };
        choicesContainer.appendChild(button);
    });

    // Disable next button initially
    nextButton.disabled = true;
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        endGame();
    }
}

function glitchEffect() {
    const container = document.getElementById("game-container");
    container.style.animation = "glitch 0.1s infinite";
    setTimeout(() => {
        container.style.animation = "none";
    }, 1000);
}

function endGame() {
    const questionContainer = document.getElementById("question-container");
    questionContainer.innerHTML = `
        <h1>End of Survey</h1>
        <p>Thank you for your participation.</p>
    `;
    document.getElementById("next-btn").style.display = "none";
}

// Start the game
window.onload = loadQuestion;
