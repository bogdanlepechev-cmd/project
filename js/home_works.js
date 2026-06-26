// Проверка валидации почты

const gmailInput = document.getElementById('gmail_input');
const gmailButton = document.getElementById('gmail_button');
const gmailResult = document.getElementById('gmail_result');

const regExp = /^(?=[0-9.]*[a-z])[a-z0-9.]{3,20}@gmail\.com$/i;

gmailButton.onclick = () => {
    const emailValue = gmailInput.value.trim();

    if (regExp.test(emailValue)) {
        gmailResult.textContent = 'OK';
        gmailResult.style.color = 'green';
    } else {
        gmailResult.textContent = 'INVALID';
        gmailResult.style.color = 'red';
    }
};
// Движение квадрата

const parentBlock = document.querySelector('.parent_block');
const childBlock = document.querySelector('.child_block');
childBlock.style.left = '0px';
childBlock.style.top = '0px';
const maxPositionX = parentBlock.clientWidth - childBlock.clientWidth;
const maxPositionY = parentBlock.clientHeight - childBlock.clientHeight;

const speed = 4;
let direction = 'right';

function moveAround() {
    let currentLeft = parseInt(childBlock.style.left);
    let currentTop = parseInt(childBlock.style.top);

    if (direction === 'right') {
        currentLeft += speed;
        if (currentLeft >= maxPositionX) {
            currentLeft = maxPositionX;
            direction = 'down';
        }
    } else if (direction === 'down') {
        currentTop += speed;
        if (currentTop >= maxPositionY) {
            currentTop = maxPositionY;
            direction = 'left';
        }
    } else if (direction === 'left') {
        currentLeft -= speed;
        if (currentLeft <= 0) {
            currentLeft = 0;
            direction = 'up';
        }
    } else if (direction === 'up') {
        currentTop -= speed;
        if (currentTop <= 0) {
            currentTop = 0;
            direction = 'right';
        }
    }
    childBlock.style.left = `${currentLeft}px`;
    childBlock.style.top = `${currentTop}px`;
    requestAnimationFrame(moveAround);
}

moveAround();

// Секундомер

const secondsElement = document.getElementById('seconds');
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const resetButton = document.getElementById('reset');

let seconds = 0;
let milliseconds = 0;
let timerId = null;

function formatTime(value) {
    return value < 10 ? `0${value}` : value;
}

function updateDisplay() {
    secondsElement.textContent = `${formatTime(seconds)}:${formatTime(milliseconds)}`;
}

updateDisplay();

function stopTimer() {
    if (timerId !== null) {
        clearInterval(timerId);
        timerId = null;
    }
    startButton.disabled = false;
}

startButton.addEventListener('click', () => {
    if (timerId !== null || startButton.disabled) return;
    startButton.disabled = true;
    timerId = setInterval(() => {
        milliseconds++;
        if (milliseconds >= 100) {
            milliseconds = 0;
            seconds++;
        }
        updateDisplay();
    }, 10);
});

stopButton.addEventListener('click', () => {
    stopTimer();
});
resetButton.addEventListener('click', () => {
    stopTimer();
    seconds = 0;
    milliseconds = 0;
    updateDisplay();
});