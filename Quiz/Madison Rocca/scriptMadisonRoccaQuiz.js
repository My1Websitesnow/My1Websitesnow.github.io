// Define an array to store questions, options, and correct answers
const questions = [{
    question: "What was the name of the sorceress who turned Madison and her friends into Power Rangers?",
    options: ["a) Rita Repulsa", "b) Udonna", "c) Morgana", "d) Scorpina"],
    answer: "b",
    answered: false,
	imagePath: "../../female power rangers_Madison Rocca(Melanie Vallejo)/maddison rocca.jpg" 
  },
  {
    question: "In which season of Power Rangers did Madison Rocca appear?",
    options: ["a) Power Rangers Dino Thunder", "b) Power Rangers Ninja Storm", "c) Power Rangers Mystic Force", "d) Power Rangers SPD"],
    answer: "c",
    answered: false,
	imagePath: "../../female power rangers_Madison Rocca(Melanie Vallejo)/maddison rocca1.jpg"
  },
  {
    question: "What color was the Ranger suit worn by Madison Rocca?",
    options: ["a) Red", "b) Blue", "c) Yellow", "d) Green"],
    answer: "b",
    answered: false,
	imagePath: "../../female power rangers_Madison Rocca(Melanie Vallejo)/PRMF-Madison_Rocca.webp" 
  },
				   
  {
    question: "Which element did Madison Rocca represent as a Power Ranger?",
    options: ["a) Fire", "b) Water", "c)  Earth", "d) Wind"],
    answer: "b",
    answered: false,
	imagePath: "../../female power rangers_Madison Rocca(Melanie Vallejo)/" 
  },
				   
  {
    question: "What was Madison's special weapon as a Power Ranger?",
    options: ["a) Power Sword", "b) Eagle Sword", "c)  Zip Charger", "d)  Magi Staff"],
    answer: "d",
    answered: false,
	imagePath: "../../female power rangers_Madison Rocca(Melanie Vallejo)/" 
  },
				   
  {
    question: "Which actor portrayed the character of Madison Rocca?",
    options: ["a) Melanie Vallejo", "b) Alyson Hannigan", "c) Cerina Vincent", "d)  Melody Perkins"],
    answer: "a",
    answered: false,
	imagePath: "../../female power rangers_Madison Rocca(Melanie Vallejo)/" 
  },
				   
  {
    question: "Which Mystic Force Ranger was Madison's love interest?",
    options: ["a) Nick Russell", "b) Xander Bly", "c) Chip Thorn", "d) Daggeron"],
    answer: "a",
    answered: false,
	imagePath: "../../female power rangers_Madison Rocca(Melanie Vallejo)/" 
  },

  {
    question: "What was the name of the Zord piloted by Madison Rocca?",
    options: ["a) Mystic Phoenix", "b)  Mystic Sprite", "c) Mystic Mermaid", "d) Mystic Garuda"],
    answer: "c",
    answered: false,
	imagePath: "../../female power rangers_Madison Rocca(Melanie Vallejo)/" 
  },

  {
    question: "What was the name of the primary antagonist in Power Rangers Mystic Force?",
    options: ["a) Emperor Gruumm", "b)  Master Vile", "c) Master Org", "d) Octomus the Master"],
    answer: "d",
    answered: false,
	imagePath: "../../female power rangers_Madison Rocca(Melanie Vallejo)/" 
  },
				   
  {
    question: "What was the name of the city where Madison and the other Power Rangers operated?",
    options: ["a) Angel Grove", "b) Briarwood", "c) Mariner Bay", "d) Blue Bay Harbor"],
    answer: "b",
    answered: false,
	imagePath: "../../female power rangers_Madison Rocca(Melanie Vallejo)/" 
  },
];

// Define an array to store the selected options for each question
let selectedOptions = new Array(questions.length).fill(null);
let currentQuestionIndex = 0;


function displayCurrentQuestion() {
  const quizContainer = document.getElementById("quiz-container");
  quizContainer.innerHTML = ""; // Clear previous question

  const questionObj = questions[currentQuestionIndex];
  const {
    question,
    options,
    answered,
    imagePath // Get the imagePath property from the question object
  } = questionObj;

  const questionContainer = document.createElement("div");
  questionContainer.classList.add("question");

  const questionTitle = document.createElement("p");
  questionTitle.textContent = `${currentQuestionIndex + 1}. ${question}`;
  questionContainer.appendChild(questionTitle);

  // Add image for the current question
  const image = document.createElement("img");
  image.src = imagePath; // Set the src attribute with the imagePath property
  image.alt = "Question Image " + (currentQuestionIndex + 1); // Alt text includes the question number
  image.classList.add("question-image");
  questionContainer.appendChild(image);

  const optionsList = document.createElement("ul");
  options.forEach((option, optionIndex) => {
    const listItem = document.createElement("li");
    const radioInput = document.createElement("input");
    radioInput.type = "radio";
    radioInput.name = `q${currentQuestionIndex}`;
    radioInput.value = String.fromCharCode(97 + optionIndex); // Convert optionIndex to character code

    // Check if the option was previously selected
    if (selectedOptions[currentQuestionIndex] === radioInput.value) {
      radioInput.checked = true;
    }

    // Enable radio buttons only if the question has not been answered
    if (!answered) {
      radioInput.disabled = false;
    } else {
      radioInput.disabled = true;
      // If answered, mark the correct option with a class
      if (questionObj.isCorrect === optionIndex) {
        listItem.classList.add("correct");
      } else if (selectedOptions[currentQuestionIndex] === radioInput.value) {
        listItem.classList.add("incorrect");
      }
    }

    // Add event listener to capture selected option
    radioInput.addEventListener("change", function () {
      selectedOptions[currentQuestionIndex] = this.value;
    });

    listItem.appendChild(radioInput);
    listItem.appendChild(document.createTextNode(option));
    optionsList.appendChild(listItem);
  });

  questionContainer.appendChild(optionsList);
  quizContainer.appendChild(questionContainer);

  // Update navigation buttons based on the current question index
  const nextBtn = document.getElementById("next-btn");
  const backBtn = document.getElementById("back-btn");

  if (currentQuestionIndex === 0) {
    backBtn.style.display = "none";
  } else {
    backBtn.style.display = "inline-block";
  }

  if (currentQuestionIndex === questions.length - 1) {
    nextBtn.style.display = "none";
  } else {
    nextBtn.style.display = "inline-block";
  }

  // Generate feedback spans for the current question
  generateFeedbackSpans(questionObj, currentQuestionIndex);

  // Apply tick and cross colors
  showTick();
  showCross();
}
// Function to navigate to the next question
function goToNextQuestion() {
  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex++;
    displayCurrentQuestion();
  }
}

function goToPreviousQuestion() {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    displayCurrentQuestion();
  }
}

function evaluateAnswers() {
  let score = 0;

  questions.forEach((question, index) => {
    const selectedOption = selectedOptions[index];
    const isCorrect = selectedOption === question.answer;
    if (isCorrect) {
      score++;
      question.isCorrect = question.options.indexOf(selectedOption);
    } else {
      question.isCorrect = null;
    }
    // Mark the question as answered
    question.answered = true;

    // Compare all options with the correct answer
    const optionsList = document.querySelectorAll(`input[name="q${index}"]`);
    optionsList.forEach((input) => {
      const optionIndex = input.value.charCodeAt(0) - 97; // Convert character code to option index
      const isCorrectOption = question.options[optionIndex].startsWith(question.answer);
      if (input.nextElementSibling) {
        input.nextElementSibling.classList.remove("correct", "incorrect"); // Remove previous marks
        if (isCorrectOption) {
          input.nextElementSibling.innerHTML = "&#10004;"; // Tick mark for correct option
          input.nextElementSibling.classList.add("tick"); // Add tick class
        } else {
          input.nextElementSibling.innerHTML = "&#10008;"; // Cross mark for incorrect option
          input.nextElementSibling.classList.add("cross"); // Add cross class
        }
      }
    });
  });

  // Lock all options after answers are checked
  const optionsLists = document.querySelectorAll(".question ul");
  optionsLists.forEach((optionsList, index) => {
    const radioInputs = optionsList.querySelectorAll("input[type='radio']");
    radioInputs.forEach((input) => {
      input.disabled = true;
    });
  });

  // Display score in the feedback container
  const feedbackContainer = document.getElementById("feedback-container");
  feedbackContainer.textContent = `Score: ${score} / ${questions.length}`;

  return score; // Return the score
}


// Function to generate feedback spans for all options in a question
function generateFeedbackSpans(question, questionIndex) {
  const optionsList = document.querySelectorAll(`input[name="q${questionIndex}"]`);

  optionsList.forEach((input) => {
    const optionIndex = input.value.charCodeAt(0) - 97; // Convert character code to option index
    const feedbackSpan = document.createElement("span");
    feedbackSpan.classList.add("feedback");

    // Check if the question has been answered
    if (question.answered) {
      const isCorrectOption = optionIndex === (question.answer.charCodeAt(0) - 97);
      if (isCorrectOption) {
        feedbackSpan.innerHTML = "&#10004;"; // Tick mark for correct option
        feedbackSpan.classList.add("correct"); // Add correct class
        feedbackSpan.style.color = "green"; // Apply green color for tick
      } else {
        feedbackSpan.innerHTML = "&#10008;"; // Cross mark for incorrect option
        feedbackSpan.classList.add("incorrect"); // Add incorrect class
        feedbackSpan.style.color = "red"; // Apply red color for cross
      }
    }

    input.parentElement.appendChild(feedbackSpan); // Append feedback span to the option
  });
}

// Function to update the feedback spans for all questions
function updateFeedbackForAllQuestions() {
  questions.forEach((question, questionIndex) => {
    generateFeedbackSpans(question, questionIndex);
  });
}

// Function to show tick symbols with the desired color
function showTick() {
  const tickElements = document.querySelectorAll(".tick");
  tickElements.forEach((tick) => {
    tick.style.color = "green"; // Change tick color to green
  });
}

// Function to show cross symbols with the desired color
function showCross() {
  const crossElements = document.querySelectorAll(".cross");
  crossElements.forEach((cross) => {
    cross.style.color = "red"; // Change cross color to red
  });
}

function checkAnswer() {
  const feedbackContainer = document.getElementById("feedback-container");
  feedbackContainer.innerHTML = ""; // Clear previous feedback

  questions.forEach((question, index) => {
    const optionsList = document.querySelectorAll(`input[name="q${index}"]`);

    optionsList.forEach((input) => {
      const optionIndex = input.value.charCodeAt(0) - 97; // Convert character code to option index
      const isCorrectOption = question.options[optionIndex].startsWith(question.answer);
      const feedbackSpan = document.createElement("span");
      feedbackSpan.classList.add("feedback");
      feedbackSpan.innerHTML = isCorrectOption ? "&#10004;" : "&#10008;"; // Tick or cross
      feedbackSpan.classList.add(isCorrectOption ? "tick" : "cross"); // Add tick/cross class
      input.parentElement.appendChild(feedbackSpan); // Append feedback span to the option
    });
  });

  // Update feedback spans for all questions
  updateFeedbackForAllQuestions();

  // Evaluate answers to display the score
  evaluateAnswers();

  // Display current question with feedback
  displayCurrentQuestion();
}

// Update event listener for the check answer button
const checkAnswerBtn = document.getElementById("check-answer-btn");
checkAnswerBtn.addEventListener("click", () => {
  evaluateAnswers();
  displayCurrentQuestion();
});

// Update event listeners for the navigation buttons
const nextBtn = document.getElementById("next-btn");
nextBtn.addEventListener("click", goToNextQuestion);

const backBtn = document.getElementById("back-btn");
backBtn.addEventListener("click", goToPreviousQuestion);

// Function to shuffle an array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Function to start the quiz
function startQuiz() {
  // Shuffle the questions array to get random questions
  shuffleArray(questions);

  // Reset current question index
  currentQuestionIndex = 0;

  // Display the first question
  displayCurrentQuestion();

  const nextBtn = document.getElementById("next-btn");
  nextBtn.addEventListener("click", goToNextQuestion);

  const backBtn = document.getElementById("back-btn");
  backBtn.addEventListener("click", goToPreviousQuestion);

  const checkAnswerBtn = document.getElementById("check-answer-btn"); // Get the "Check Answer" button
  checkAnswerBtn.addEventListener("click", checkAnswer); // Attach event listener to the "Check Answer" button
}