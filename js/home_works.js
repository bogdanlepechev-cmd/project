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
const maxPosition = parentBlock.clientWidth - childBlock.clientWidth;

function countUp() {
    let currentLeft = parseInt(childBlock.style.left);
    currentLeft += 3;
    childBlock.style.left = `${currentLeft}px`;
    if (currentLeft < maxPosition) {
        requestAnimationFrame(countUp);
    } else {
        childBlock.style.left = `${maxPosition}px`;
    }
}
countUp();