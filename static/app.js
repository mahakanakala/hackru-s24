function fetchResponse() {
    const userInput = document.getElementById('user-input').value; // Get the user input
    fetch('/get_response?prompt=' + userInput, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "prompt": userInput, 'chat_context': document.querySelector('.userMessage') === null ? "" : document.querySelector('.userMessage') === null ? "" : [...document.querySelectorAll('.userMessage')].map(el => el.textContent).join()})
    })
        .then(response => response.json())
        .then(data => {
            // Display the response on the webpage
            // document.getElementById('response').innerText = data.response_value;

            const newUserName = document.createElement('div');
            newUserName.innerText = "You"
            const newUserInput = document.createElement("div");

            newUserInput.classList.add('userMessage');
            newUserName.classList.add('userName')
            const newUserContent = document.createTextNode(userInput);

            newUserInput.appendChild(newUserContent);

            const currentUserDiv = document.querySelector("#chat-messages");
            currentUserDiv.insertAdjacentElement("beforeend", newUserInput)
            currentUserDiv.insertAdjacentElement("beforeend", newUserName)

            // BOT
            // const newBotName = document.createElement('div');
            // newUserName.innerText = "StylistAI"
            const newDiv = document.createElement("md-block");
            newDiv.classList.add('botMessage');
            // and give it some content
            const newContent = document.createTextNode(data.response_value);

            // add the text node to the newly created div
            newDiv.appendChild(newContent);

            const currentDiv = document.querySelector("#chat-messages");
            currentDiv.insertAdjacentElement("beforeend", newDiv)


        })
        .catch(error => {
            console.error('Error fetching response:', error);
        });
}

document.getElementById("send-btn").addEventListener("click", fetchResponse);
// Call fetchResponse function when the page loads
// document.addEventListener('DOMContentLoaded', fetchResponse);
