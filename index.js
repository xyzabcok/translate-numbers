// Set the language
const languageOptions = {
    "English": "en-US",
    "Indonesian": "id-ID",
    "Spanish": "es-ES",
    "Portugese": "pt-PT"
}

// DOM grabbers
const startButton = document.querySelector(`button.start`);
const theInputField = document.querySelector(`#number`); 
const listOfCorrectAnswers = document.querySelector(`ul.correct-answers`);
const headlineText = document.querySelector(`div.current-num`);
const replayButton = document.querySelector(`button.replay`);
const selectLanguage = document.querySelector(`select#languages`);
// const selectedLanguage = selectLanguage.value;

// Event listeners
startButton.addEventListener("click", randomNumberGenerator);
replayButton.addEventListener("click");
selectLanguage.addEventListener("change", passTheLanguage)

// Pass the language
function passTheLanguage() {
    const selectedLanguage = selectLanguage.value; 
    return selectedLanguage;
}


// Set the number
function randomNumberGenerator() {
    const generatedNumber = Math.floor(Math.random() * 100) + 1;
    const readThis = generatedNumber.toString();
    theInputField.focus();
    sayTheNumber(readThis);
    theInputField.addEventListener("input", function() {
        numberCompare(generatedNumber);
    });
}

// Say the number
function sayTheNumber(num) {
    let utterance = new SpeechSynthesisUtterance();
    let languageUsed = languageOptions[passTheLanguage()];
    utterance.text = num;
    utterance.lang = `${languageUsed}`;
    window.speechSynthesis.speak(utterance);
}

// Check if the user input matches the random number
function numberCompare(num) {
    const userInput = parseInt(theInputField.value.trim());
    console.log(`PC: ${num}
    User: ${userInput}`);
    if (num === userInput) {
        const newCorrectAnswer = document.createElement(`li`);
        newCorrectAnswer.innerText = num;
        listOfCorrectAnswers.appendChild(newCorrectAnswer);
        theInputField.value = "";
        randomNumberGenerator();
    } else {
        console.log(`Nope.`)
    }
}