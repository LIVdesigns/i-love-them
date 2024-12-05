const questions = [
    { 
        text: "I feel happy with my current relationship.", 
        options: ["couldn't be happier", "Agree", "it's alright", "we're going through a rough stage at the moment", "There is something wrong between us"], 
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
        options: ["They're busy all the time", "they respond to me when they can", "they always give me an excuse", "it annoys me", "I then wonder and track them down"], 
    },
    { 
        text: "I trust my partner completely.", 
        options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"], 
    },

    { 
        text: "On a scale from 1-10, how often does your partner get distracted or distant?", 
        options: ["0-2", "3-5", "6-8", "9-10"], 
    },
    { 
        text: "I sometimes wonder if my partner truly appreciates everything I do for them.", 
        options: ["They love me. They appreciate me. I know it.", "They do nice things for me...here and there", "They don't show it often but they do", "sometimes", "They don't show vulnerability at all"], 
    },
    
    { 
        text: "I sometimes feel like I need to guide my partner's decisions for their own good.", 
        options: ["I made all the decisions", "they're perfectly fine", "they're indecisive. so I have to step in", "they don't know any better", "they can't decide for their own good"], 
    },
    { 
        text: "I can ask my partner for details about their plans or who they're spending time with.", 
        options: ["they tell me the truth", "Agree and always. i trust them", "Neutral", "defintely about who they're spending time with", "I always need to know"], 
    },
    { 
        text: "I have imagined scenarios where my partner might meet someone better than me.", 
        options: ["they could never", "no one will love them like i can", "occasionally", "never, they love me", "i'm too good for them"], 
    },
    { 
        text: "I sometimes feel like I know my partner better than they know themselves.", 
        options: ["they couldn't find themselves at first until me", "I feel the other way around", "we know each other deeply and equally... i think"], 
    },
    { 
        text: "I believe my partner would struggle without me.", 
        options: ["I've helped through the rough times", "they wouldn't know what to do", "they can handle their own", "yes definitely"], 
    },
    { 
        text: "Do you need to know where your partner is all the time to feel secured?", 
        options: ["yes", "i trust them enough", "sometimes", "it helps me", "they're hiding something"], 
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

    // Display the final statement
    const finalStatementContainer = document.getElementById("final-statement-container");
    const finalStatementText = document.getElementById("final-statement-text");

    finalStatementContainer.classList.remove("hidden");

    finalStatementText.textContent = "I sometimes feel like my partner owes me loyalty because of how much I've done for them.";

    // Fade in the final statement
    finalStatementText.style.opacity = "0";
    setTimeout(() => {
        finalStatementText.style.transition = "opacity 2s ease-in";
        finalStatementText.style.opacity = "1";
    }, 500); // Start fade-in after 500ms

    // Show the "Continue" button after the final statement fades in
    const continueButton = document.createElement("button");
    continueButton.textContent = "Continue";
    continueButton.classList.add("button");

    continueButton.onclick = () => {
        // Fade to black effect before navigating
        const fadeToBlack = document.createElement("div");
        fadeToBlack.className = "fade-to-black active";
        document.body.appendChild(fadeToBlack);

        setTimeout(() => {
            window.location.href = "endPage.html"; // Navigate after fade effect
        }, 3000); // Delay for fade effect
    };

    setTimeout(() => {
        choicesContainer.appendChild(continueButton); // Show button
        continueButton.style.opacity = "0";
        setTimeout(() => {
            continueButton.style.transition = "opacity 2s ease-in";
            continueButton.style.opacity = "1";
        }, 500); // Fade-in effect for button
    }, 3000); // Delay to show button after final statement
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


// Function to play sound
function playEndSound() {
    // Play the sound when the "Continue" button is clicked
    const endSound = document.getElementById('endSound');
    if (endSound) {
        endSound.play();
    } else {
        console.error("Audio element with ID 'endSound' not found.");
    }
}

document.getElementById('returnToHomeButton').addEventListener('click', function (event) {
    const endSound = document.getElementById('endSound');
    if (endSound) {
        // Prevent the button's default action temporarily
        event.preventDefault();
        
        // Play the sound
        endSound.play();
        
        // Navigate after the sound finishes playing
        endSound.onended = function () {
            window.location.href = '/home'; // Replace '/home' with your actual home URL
        };
    } else {
        console.error("Audio element with ID 'endSound' not found.");
    }
});
