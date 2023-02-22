// bound to button onclick
function changeWord() {
    // get the value in the input element
    let userInput = document.getElementById('adjective-input').value
    
    // change the inner HTML of the adjective (span) element
    document.getElementById('adjective').innerHTML = userInput
}

// bound to input field oninput
function toggleWordColor() {
    // get the adjective (span) element
    let adjective = document.getElementById('adjective')
    
    // see if the span element is in the .salmon class
    let hasSalmon = adjective.className === 'salmon'

    // if it is, remove the .salmon class
    if (hasSalmon) {
        adjective.className = ''
    }
    // otherwise, add the .salmon class
    else {
        adjective.className = 'salmon'
    }
}