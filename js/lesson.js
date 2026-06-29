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
