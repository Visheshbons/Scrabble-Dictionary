let scrabbleWords = [];

fetch('scrabbleWords.json')
    .then(response => response.json())
    .then(words => {
        // Normalize all scrabbleWords to lowercase
        scrabbleWords = words.map(word => word.toLowerCase());
        console.log(`Successfully loaded ${scrabbleWords.length} words.`);
        
        // Enable the form after loading
        document.getElementById('wordInput').disabled = false;
        document.querySelector('#wordForm input[type="submit"]').disabled = false;
    })
    .catch(error => {
        console.error('Error loading words:', error);
    });

const form = document.getElementById('wordForm');
const input = document.getElementById('wordInput');

form.addEventListener('submit', function(event) {
    event.preventDefault(); // Stop page refresh

    const word = input.value.trim().toLowerCase(); // Normalize input
    checkWord(word);
});

function checkWord(word) {
    if (scrabbleWords.includes(word)) {
        alert("✅ Valid Scrabble Word!");
    } else {
        alert("❌ Not a Valid Word.");
    }
}