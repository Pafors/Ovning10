// API URI
const starWarsApiUrl = 'https://www.swapi.tech/api/people/';

// Get reference on where to place the result
const display = document.querySelector('#displayResult');

// Get reference to the form
const form = document.querySelector('#inputForm');

// Add event listener for the nodes in the form
form.addEventListener('submit', (e) => searchForCharacter(e));


// Event handler for the input form
function searchForCharacter(e) {
    // Stop event bubbling up, mostly for "submit" button
    e.preventDefault();

    // Get the new item from the form, remove empty spaces
    const character = form['sw-character-field'].value.trim();

    switch (e.target.id) {
        // Submit button is pressed
        case 'inputForm':
            // Skip empty entries
            if (character === '') { e.target.reset(); return; }

            // Get the data
            getApi(`${starWarsApiUrl}?name=${character}`);

            // Clear the input form
            e.target.reset();
            break;
        default:
            // Inform that something that is unhandled was received
            console.log(`*** UNHANDLED TARGET: ${e.target}`);
            break;
    }
}

function getApi(fullUri) {
    displayInfo("(hämtar data)");
    fetch(fullUri)
        .then(res => res.json())
        .then(data => {
            displayResult(data);
        })
        .catch(err => console.log(err))
}


// Simple display of info
function displayInfo(infoText) {
    // Clear previous result
    display.innerHTML = '';
    // Display info message
    display.innerHTML = infoText;
}

// Display the received array in the display area
function displayResult(items) {
    console.log(items);
    console.log(items.result);
    // Clear previous result
    display.innerHTML = '';

    // If empty, inform user
    if (items.result.length === 0) {
        displayInfo('(inget resultat)');
        return;
    }

    // Iterate through all items and add them
    items.result.forEach((character) => {
        // Add item card to row
        display.innerHTML += createCard(character);
    });

}

// Item bootstrap card factory function
function createCard(character) {
    const card =
`Name:       ${character.properties.name}
Gender:     ${character.properties.gender}
Hair color: ${character.properties.hair_color}
Height:     ${character.properties.height}
Mass:       ${character.properties.mass}

`;
    // Other attributes, not in use
    // Description: ${character.description}
    // birth_year: ${character.properties.birth_year}
    // created: ${character.properties.created}
    // edited: ${character.properties.edited}
    // eye_color: ${character.properties.eye_color}
    // homeworld: ${character.properties.homeworld}
    // skin_color: ${character.properties.skin_color}
    // url: ${character.properties.url}
    return card;
}
