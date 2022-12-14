// API URI
const cardApiUrl = 'https://deckofcardsapi.com/api/deck/new/draw/?count=1';

// Get reference on where to place the result
const display = document.querySelector('#displayCard');

// Get reference to the button
const form = document.querySelector('#inputForm');

// The placeholder for the function that will get data from an API
let getData;

// Start Web Worker if available, otherwise use same thread
if (window.Worker) {
    const fetchWorker = new Worker('./fetchWorker.js');
    getData = getApiWebWorker(fetchWorker);
    fetchWorker.onmessage = (e) => {
        displayResult(e.data);
    }
}
else {
    getData = getApi;
}

// Add event listener for the nodes in the form
form.addEventListener('submit', (e) => drawACard(e));

// Event handler for the input form
function drawACard(e) {
    // Stop event bubbling up, mostly for "submit" button
    e.preventDefault();

    switch (e.target.id) {
        // Submit button is pressed so draw a new card
        case 'inputForm':
            // Get the data
            getData(cardApiUrl);
            break;
        default:
            // Inform that something that is unhandled was received
            console.log(`*** UNHANDLED TARGET: ${e.target}`);
            break;
    }
}

function getApi(fullUri) {
    displayInfo("(hämtar kort)");
    fetch(fullUri)
        .then(res => res.json())
        .then(data => {
            displayResult(data);
        })
        .catch(err => console.log(err))
}

function getApiWebWorker(fetchWorker) {
    return (fullUri) => {
        displayInfo("(hämtar kort)");
        fetchWorker.postMessage(fullUri);
    }
}

// Simple display of info
function displayInfo(infoText) {
    // Clear previous result
    display.innerHTML = '';
    // Display info message
    display.innerHTML = infoText;
}

// Display the received array in the display area
function displayResult(result) {
    // Clear previous result
    display.innerHTML = '';

    // If empty, inform user
    if (!result.success) {
        displayInfo('(inget resultat)');
        return;
    }

    // Iterate through all result and add them
    result.cards.forEach((card) => {
        // Add card to row
        display.appendChild(createElement(card));
    });

}

// Card bootstrap card factory function
function createElement(drawnCard) {
    // Create a new boot strap grid column for the card image
    const newColumn = document.createElement('div');
    newColumn.classList.add('col-4');

    // Create a image element for the card image and add the URL
    const cardImage = document.createElement('img');
    cardImage.classList.add('img-fluid');
    cardImage.setAttribute('src', drawnCard.images.png);

    // Append card image to the column
    newColumn.appendChild(cardImage);
    return newColumn;
}


