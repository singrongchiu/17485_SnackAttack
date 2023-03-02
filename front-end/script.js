// bound to button onclick
function submitUserPassword() {
    // get the value in the input element
    let Username = document.getElementById('username').value

    let Password = document.getElementById('password').value
    
    // change the inner HTML of the adjective (span) element
    document.getElementById('username').innerHTML = Username
    document.getElementById('password').innerHTML = Password
}