let scrabbleWords = new Set();

fetch('scrabbleWords.json')
    .then(response => response.json())
    .then(wordsArray => {
        scrabbleWords = new Set(
            wordsArray.map(word => word.trim().toLowerCase())
        );
        console.log(`Loaded ${scrabbleWords.size} words`);

        // Hide loader, show form with fade-in
        document.getElementById('loader').style.display = 'none';
        const wordForm = document.getElementById('wordForm');
        wordForm.style.display = 'block';  // Make the form block-level
        setTimeout(() => wordForm.classList.add('show'), 50);  // Add fade-in class
    })
    .catch(error => {
        console.error('Error loading words:', error);
        document.getElementById('loader').style.display = 'none';
        const errorMessage = document.getElementById('errorMessage');
        errorMessage.innerHTML = "⚠️ Failed to load dictionary. Please refresh the page.";
    });

const form = document.getElementById('wordForm');
const input = document.getElementById('wordInput');
const result = document.getElementById('result');

form.addEventListener('submit', function(event) {
    event.preventDefault();

    const word = input.value.trim().toLowerCase();
    checkWord(word);
});

function capitalizeWord(word) {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
};

function checkWord(word) {
    if (scrabbleWords.has(word)) {
        result.innerHTML = `<b>${capitalizeWord(word)}</b> is a valid Scrabble word!`;
        result.style.color = 'green';
    } else {
        result.innerHTML = `<b>${capitalizeWord(word)}</b> is not a valid word.`;
        result.style.color = 'red';
    }
}