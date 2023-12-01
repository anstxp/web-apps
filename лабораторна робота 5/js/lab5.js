const lengthInput = document.querySelector('input[name="length"]');
const widthInput = document.querySelector('input[name="width"]');
const perimeterSpan = document.getElementById('perimeter');
const areaSpan = document.getElementById('area');
const diagonalSpan = document.getElementById('diagonal');

lengthInput.addEventListener('input', calculate);
widthInput.addEventListener('input', calculate);

function calculate() {
    const length = parseFloat(lengthInput.value);
    const width = parseFloat(widthInput.value);

    if (!isNaN(width) && !isNaN(length) && length >= 0 && width >= 0) {
        const perimeter = 2 * (length + width);
        const area = length * width;
        const diagonal = Math.sqrt(length ** 2 + width ** 2);

        perimeterSpan.textContent = perimeter;
        areaSpan.textContent = area;
        diagonalSpan.textContent = diagonal;
    }
    else {
        perimeterSpan.textContent = "0";
        areaSpan.textContent = "0";
        diagonalSpan.textContent = "0";
    }
}

const chatWindow = document.getElementById('chat-window');
function scroll() {
    chatWindow.scrollTop = chatWindow.scrollHeight;
}
function addMessage(message, sender, userMessageClass) {
    const messageElement = document.createElement("div");
    messageElement.classList.add(userMessageClass);
    messageElement.innerHTML = `<span class="sender">${sender}</span><br>${message}`;
    chatWindow.appendChild(messageElement);
    scroll()
}
function sendMessage(inputElement, sender, userMessageClass) {
    const message = inputElement.value;
    if (message) {
        addMessage(message, sender, userMessageClass);
        inputElement.value = '';
    }
}
const user1MessageInput = document.getElementById('user1-message');
const user1SendButton = document.getElementById('user1-send-button');
const user2MessageInput = document.getElementById('user2-message');
const user2SendButton = document.getElementById('user2-send-button');
user1SendButton.addEventListener('click', function() {
    sendMessage(user1MessageInput, 'User 1', 'user1-message');
});
user2SendButton.addEventListener('click', function() {
    sendMessage(user2MessageInput, 'User 2', 'user2-message');
});
user1MessageInput.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        sendMessage(user1MessageInput, 'User 1', 'user1-message');
    }
});
user2MessageInput.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        sendMessage(user2MessageInput, 'User 2', 'user2-message');
    }
});

function transliterate() {
    const dictionary = {
        'а': 'a', 'б': 'b', 'в': 'v', 'г': 'h', 'д': 'd', 'е': 'e', 'є': 'ye', 'ж': 'zh',
        'з': 'z', 'и': 'y', 'і': 'i', 'ї': 'yi', 'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm',
        'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u', 'ф': 'f',
        'х': 'kh', 'ц': 'ts', 'ч': 'ch', 'ш': 'sh', 'щ': 'shch', 'ь': '\'', 'ю': 'yu',
        'я': 'ya'
    };
    let input = document.getElementById('ukrainianInput').value;
    let output = '';
    for (let i = 0; i < input.length; i++) {
        let char = input[i].toLowerCase();
        if (dictionary[char]) {
            output += dictionary[char];
        } else {
            output += char;
        }
    }
    document.getElementById('transliteratedOutput').value = output;
}
document.getElementById('ukrainianInput').addEventListener('input', transliterate);

function calculateDay() {
    const birthdateInput = document.getElementById("birthdate");
    const resultElement = document.getElementById("result");
    const birthdate = new Date(birthdateInput.value);

    if (!isNaN(birthdate.getTime())) {
        const daysOfWeek = ["Неділя", "Понеділок", "Вівторок", "Середа", "Четвер", "П'ятниця", "Субота"];

        const dayOfWeek = daysOfWeek[birthdate.getDay()];

        resultElement.textContent = `${dayOfWeek}`;
    } else {
        resultElement.textContent = "Введіть коректну дату народження";
    }
}
