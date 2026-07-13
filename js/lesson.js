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

let exchangeRates = null;

const convert = (input) => {
    const value = input.value;

    if (!exchangeRates) return;

    if (value === '') {
        somInput.value = '';
        usdInput.value = '';
        eurInput.value = '';
        return;
    }

    const numValue = parseFloat(value);

    if (Number.isNaN(numValue)) {
        return;
    }

    if (input.id === 'som') {
        usdInput.value = (numValue / exchangeRates.usd).toFixed(2);
        eurInput.value = (numValue / exchangeRates.eur).toFixed(2);
    } else if (input.id === 'usd') {
        somInput.value = (numValue * exchangeRates.usd).toFixed(2);
        eurInput.value = ((numValue * exchangeRates.usd) / exchangeRates.eur).toFixed(2);
    } else if (input.id === 'eur') {
        somInput.value = (numValue * exchangeRates.eur).toFixed(2);
        usdInput.value = ((numValue * exchangeRates.eur) / exchangeRates.usd).toFixed(2);
    }
};

const loadExchangeRates = async () => {
    try {
        const response = await fetch('../data/converter.json');

        if (!response.ok) {
            throw new Error(`Ошибка сети: ${response.status}`);
        }

        exchangeRates = await response.json();

        if (somInput && usdInput && eurInput) {
            somInput.oninput = () => convert(somInput);
            usdInput.oninput = () => convert(usdInput);
            eurInput.oninput = () => convert(eurInput);
        }
    } catch (error) {
        console.error('Не удалось загрузить курсы валют:', error);
    }
};
loadExchangeRates();

// CARD SWITCHER

const card = document.querySelector('.card');
const btnNext = document.querySelector('#btn-next');
const btnPrev = document.querySelector('#btn-prev');

let cardId = 1;

const renderCard = (todo) => {
    const { title, id, completed } = todo;
    const isCompleted = completed ? 'Completed' : 'Incomplete';
    const completeColor = completed ? 'green' : 'red';

    card.innerHTML = `
        <p>${title}</p>
        <p style="color: ${completeColor}">${isCompleted}</p>
        <span>${id}</span>
    `;
};

const fetchTodo = async (id) => {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);

        if (!response.ok) {
            throw new Error(`Ошибка сети: ${response.status}`);
        }

        const data = await response.json();
        renderCard(data);
    } catch (error) {
        console.error('Не удалось загрузить карточку:', error);
        if (card) {
            card.innerHTML = '<p>Не удалось загрузить данные</p>';
        }
    }
};

btnNext.onclick = () => {
    cardId = cardId >= 200 ? 1 : cardId + 1;
    fetchTodo(cardId);
};

btnPrev.onclick = () => {
    cardId = cardId <= 1 ? 200 : cardId - 1;
    fetchTodo(cardId);
};

fetchTodo(cardId);


// FETCH запрос

const fetchPosts = async () => {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');

        if (!response.ok) {
            throw new Error(`Ошибка сети: ${response.status}`);
        }

        const data = await response.json();

        data.forEach((post) => {
            console.log(post);
        });
    } catch (error) {
        console.error('Не удалось загрузить посты:', error);
    }
};

fetchPosts();

// WEATHER

const searchInput = document.querySelector('#searchInput');
const searchButton = document.querySelector('#search');

const cityElement = document.querySelector('.city');
const tempElement = document.querySelector('.temp');

const BASE_API = 'https://api.openweathermap.org/data/2.5/weather';
const API_KEY = '291aa3950880603684e43c6cc36aed88';

const renderWeather = (weather) => {
    const { name, main } = weather;
    if (main) {
        const { temp } = main;
        cityElement.style.color = 'white';
        cityElement.innerHTML = name;
        tempElement.innerHTML = Math.round(temp) + '°C';
    } else {
        cityElement.style.color = 'red';
        cityElement.innerHTML = 'Город не найден';
        tempElement.innerHTML = '';
    }
};

const getWeatherData = async () => {
    if (searchInput.value.trim() === '') {
        cityElement.innerHTML = 'Введите название города';
        cityElement.style.color = 'red';
        tempElement.innerHTML = '';
    } else {
        try {
            const response = await fetch(`${BASE_API}?q=${searchInput.value.trim()}&lang=ru&units=metric&appid=${API_KEY}`);

            if (!response.ok) {
                throw new Error(`Ошибка сети: ${response.status}`);
            }
            const data = await response.json();
            renderWeather(data);
        } catch (error) {
            console.error('Не удалось загрузить погоду:', error);
            cityElement.style.color = 'red';
            cityElement.innerHTML = 'Ошибка загрузки';
            tempElement.innerHTML = '';
        } finally {
            searchInput.value = '';
        }
    }
};

searchButton.onclick = () => getWeatherData();