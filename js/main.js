const questions = [
    { 
        text: "I feel happy with my current relationship.", 
        options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"], 
    },
    { 
        text: "My partner and I communicate openly and well.", 
        options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"], 
    },
    { 
        text: "I think about my partner even during busy moments of my day.", 
        options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"], 
    },
    { 
        text: "I can feel uneasy when my partner does not respond to me quickly.", 
        options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"], 
    },
    { 
        text: "I trust my partner completely.", 
        options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"], 
    },
    { 
        text: "are you sure?", 
        options: ["yes","no"], 
    },
    { 
        text: "I notice when my partner seems distracted or distant.", 
        options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"], 
    },
    { 
        text: "I sometimes wonder if my partner truly appreciates everything I do for them.", 
        options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"], 
    },
    { 
        text: "Are you sure you are not overthinking this?", 
        options: ["i am sure", "i am very sure", "just move on..."], 
    },
    { 
        text: "I sometimes feel like I need to guide my partner's decisions for their own good.", 
        options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"], 
    },
    { 
        text: "I can ask my partner for details about their plans or who they're spending time with.", 
        options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"], 
    },
    { 
        text: "I have imagined scenarios where my partner might meet someone better than me.", 
        options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"], 
    },
    { 
        text: "I sometimes feel like I know my partner better than they know themselves.", 
        options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"], 
    },
    { 
        text: "I believe my partner would struggle without me.", 
        options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"], 
    },
    { 
        text: "I have altered aspects of my behavior or appearance to ensure my partner stays interested.", 
        options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"], 
    },
    { 
        text: "I sometimes feel like my partner owes me loyalty because of how much I've done for them.", 
    }, 
];

let gameContainer = document.getElementById('gameContainer');
let currentQuestionIndex = 0;

function loadQuestion() {
    const questionText = document.getElementById("question-text");
    const choicesContainer = document.getElementById("choices-container");
    const nextButton = document.getElementById("next-btn");

    // Play the sound when the question appears
    document.getElementById('questionSound').play();

    // Load the current question
    const question = questions[currentQuestionIndex];
    questionText.textContent = question.text;

    // Clear old choices
    choicesContainer.innerHTML = "";

    // Add new choices
    question.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.textContent = option;

        // Add click handler to apply 'clicked' class
        button.onclick = () => {
            // Remove 'clicked' class from all buttons
            const buttons = choicesContainer.querySelectorAll("button");
            buttons.forEach(btn => btn.classList.remove("clicked"));

            // Add 'clicked' class to the current button
            button.classList.add("clicked");

            nextButton.disabled = false; // Enable the next button when an option is selected
        };

        choicesContainer.appendChild(button);
    });

    // Disable the next button initially
    nextButton.disabled = true;
}

function nextQuestion() {
    // Play the sound after the "Continue" button is clicked
    document.getElementById('continueSound').play();

    // Fade out the current question
    gameContainer.classList.add('fade');

    // Wait for the fade-out transition to complete before loading the next question
    setTimeout(() => {
        currentQuestionIndex++;

        // If there are more questions, load the next question
        if (currentQuestionIndex < questions.length - 1) {
            loadQuestion();
        } else if (currentQuestionIndex === questions.length - 1) {
            loadLastQuestion();
        } else {
            endGame();
        }

        // Fade in the new question
        gameContainer.classList.remove('fade');
    }, 500); // Match the duration of the CSS transition
}


function loadLastQuestion() {
    const questionText = document.getElementById("question-text");
    const choicesContainer = document.getElementById("choices-container");
    const nextButton = document.getElementById("next-btn");

    // Update the question text
    const question = questions[currentQuestionIndex];
    questionText.textContent = question.text;

    // Clear old choices and hide the next button
    choicesContainer.innerHTML = "";
    nextButton.style.display = "none";

    // Display the final statement and the following text
    const finalStatementContainer = document.getElementById("final-statement-container");
    const finalStatementText = document.getElementById("final-statement-text");

    finalStatementContainer.classList.remove("hidden");

    finalStatementText.textContent = "I sometimes feel like my partner owes me loyalty because of how much I've done for them.";
    
    // Fade in the final statement text
    finalStatementText.style.opacity = "0";
    setTimeout(() => {
        finalStatementText.style.transition = "opacity 2s ease-in";
        finalStatementText.style.opacity = "1";
    }, 500); // 500ms delay before fade-in begins

    // Then, fade in the following text after a delay
    setTimeout(() => {
        const followingText = "This feeling may stem from a sense of imbalance in the relationship.";
        finalStatementText.textContent = followingText;
        finalStatementText.style.transition = "opacity 2s ease-in";
        finalStatementText.style.opacity = "1";
    }, 4000); // 4-second delay before the following text appears

    // Fade to black after 7 seconds and then navigate to the next page
    setTimeout(() => {
        // Apply fade to black effect
        gameContainer.style.transition = "background-color 2s ease-in";
        gameContainer.style.backgroundColor = "black";
        
        // After the fade, navigate to the end page
        setTimeout(() => {
            window.location.href = "endPage.html";
        }, 2000); // Delay for fade effect before navigating
    }, 7000); // 7-second delay before fade to black
}

let gameEnded = false;  // Flag to prevent multiple game endings

function endGame() {
    if (gameEnded) return;  // Prevent multiple calls

    gameEnded = true;  // Set the flag to true once the game ends

    const choicesContainer = document.getElementById("choices-container");

    // Create the "Return to Main Menu" button
    const returnButton = document.createElement("a");
    returnButton.href = "index.html"; // Link to the home page (index.html)
    returnButton.textContent = "Return to Home"; // Text of the button
    returnButton.className = "button"; // Apply the existing button styles

    // Apply fade-in for the return button
    returnButton.style.opacity = "0";
    setTimeout(() => {
        returnButton.style.transition = "opacity 2s ease-in";
        returnButton.style.opacity = "1";
    }, 500); // 500ms delay before fade-in begins

    // Append the button to the container
    choicesContainer.appendChild(returnButton);

    // Center the button in the container (CSS)
    choicesContainer.style.display = "flex";
    choicesContainer.style.justifyContent = "center";
    choicesContainer.style.alignItems = "center";
    choicesContainer.style.height = "100vh"; // Full height of the viewport
}



// Start the game
window.onload = loadQuestion;

// array of responses END
const responses = [
    "Is what I'm doing not enough?", 
    "Is it something else that you don't want to admit? Think about it.",
    "You know I love you. Turn off your screen.",
    "Is this love, or are you confusing it with something else?",
    "Why do you feel like this? What is it that you're not admitting to yourself?",
    "Do you call this Love?",
    "Don't think like this. Just Don't.",
    "Wanna Play Again?",
    "Why are you taking this? You're overreacting.",
    "You're imagining things.",
    "If you didn't act this way, I wouldn't have to be like this.",
    "It's not a big deal, you're just being sensitive.",
    "I do everything for you, and this is how you repay me?",
    "Why are you focusing on this when we have other issues to deal with?",
    "If you leave me, you'll regret it.",
    "No one will love you like I do.",
    "You're delusional."
];

// Function to select a random response
function getRandomResponse() {
    const randomIndex = Math.floor(Math.random() * responses.length); // Generate a random index
    return responses[randomIndex]; // Return the randomly selected response
}

// Set the randomly selected response into the paragraph
document.getElementById("response").textContent = getRandomResponse();

window.onload = () => {
    let paragraphs = document.querySelectorAll('.section-paragraph');
    let delay = 0;

    paragraphs.forEach((p, index) => {
        // Get the number of steps based on the content length
        const steps = p.textContent.length;

        // Set the animation with increasing delay for each paragraph
        p.style.visibility = 'visible';  // Make paragraph visible
        p.style.animation = `typing 2s steps(${steps}) ${delay}s forwards, cursor 0.5s step-end infinite alternate`;

        // Increase the delay by the typing time plus cursor blink duration
        delay += 2.5; // Adjust the delay to control the time between each line typing out

        // Add a callback to wait for the current animation to finish before continuing
        setTimeout(() => {
            // Allow the next paragraph to animate
            if (index < paragraphs.length - 1) {
                paragraphs[index + 1].style.visibility = 'visible';
            }
        }, (2 * steps) + 500); // Wait for typing animation duration + extra for cursor blink
    });
};

setTimeout(() => {
    // Apply fade to black effect
    gameContainer.style.transition = "background-color 2s ease-in";
    gameContainer.style.backgroundColor = "black";
    
    // After the fade, navigate to the end page
    setTimeout(() => {
        window.location.href = "endPage.html"; 
    }, 2000); 
}, 7000); 

// AUDIO INTRO
window.addEventListener('click', () => {
    document.getElementById("intro").play();

});