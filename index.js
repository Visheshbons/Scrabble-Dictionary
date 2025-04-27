let scrabbleWords = new Set(); // <- using Set, not array

fetch('scrabbleWords.json')
    .then(response => response.json())
    .then(wordsArray => {
        // Normalize and put into Set
        scrabbleWords = new Set(
            wordsArray.map(word => word.trim().toLowerCase())
        );
        console.log(`Loaded ${scrabbleWords.size} words`);

        // Enable form after loading
        document.getElementById('wordInput').disabled = false;
        document.querySelector('#wordForm input[type="submit"]').disabled = false;
    })
    .catch(error => {
        console.error('Error loading words:', error);
    });

const form = document.getElementById('wordForm');
const input = document.getElementById('wordInput');

form.addEventListener('submit', function(event) {
    event.preventDefault();

    const word = input.value.trim().toLowerCase();
    checkWord(word);
});

function checkWord(word) {
    if (scrabbleWords.has(word)) { // <- .has() instead of .includes()
        alert("✅ Valid Scrabble Word!");
    } else {
        alert("❌ Not a Valid Word.");
    }
}