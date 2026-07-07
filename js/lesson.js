// TAB SLIDER 

const tabContentBlocks = document.querySelectorAll('.tab_content_block');
const tabContentItems = document.querySelectorAll('.tab_content_item');
const tabParent = document.querySelector('.tab_content_items');

let currentIndex = 0;

const hideTabContent = () => {
    tabContentBlocks.forEach((block) => {
        block.style.display = 'none';
    });
    tabContentItems.forEach((item) => {
        item.classList.remove('tab_content_item_active');
    });
};

const showTabContent = (i = 0) => {
    tabContentBlocks[i].style.display = 'block';
    tabContentItems[i].classList.add('tab_content_item_active');
    currentIndex = i;
};

hideTabContent();
showTabContent(0);

const nextTab = () => {
    currentIndex = (currentIndex + 1) % tabContentItems.length;
    hideTabContent();
    showTabContent(currentIndex);
};

let intervalId = setInterval(nextTab, 3000);

tabParent.onclick = (event) => {
    if (event.target.classList.contains('tab_content_item')) {
        tabContentItems.forEach((item, index) => {
            if (item === event.target) {
                hideTabContent();
                showTabContent(index);
                clearInterval(intervalId);
                intervalId = setInterval(nextTab, 3000);
            }
        });
    }
};

// CONVERTER

const somInput = document.querySelector('#som');
const usdInput = document.querySelector('#usd');
const eurInput = document.querySelector('#eur');

const xhr = new XMLHttpRequest();
xhr.open('GET', '../data/converter.json');
xhr.send();

xhr.onload = () => {
    const data = JSON.parse(xhr.response);
    const convert = (input) => {
        const value = input.value;
        if (value === '') {
            somInput.value = '';
            usdInput.value = '';
            eurInput.value = '';
            return;
        }
        const numValue = parseFloat(value);
        if (input.id === 'som') {
            usdInput.value = (numValue / data.usd).toFixed(2);
            eurInput.value = (numValue / data.eur).toFixed(2);
        } else if (input.id === 'usd') {
            somInput.value = (numValue * data.usd).toFixed(2);
            eurInput.value = ((numValue * data.usd) / data.eur).toFixed(2);
        } else if (input.id === 'eur') {
            somInput.value = (numValue * data.eur).toFixed(2);
            usdInput.value = ((numValue * data.eur) / data.usd).toFixed(2);
        }
    };
    somInput.oninput = () => convert(somInput);
    usdInput.oninput = () => convert(usdInput);
    eurInput.oninput = () => convert(eurInput);
};