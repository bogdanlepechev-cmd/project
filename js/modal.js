const modal = document.querySelector('.modal');
const openModalButton = document.querySelector('#btn-get');
const closeModalButton = document.querySelector('.modal_close');
let hasOpenedByTimer = false;
let hasOpenedByScroll = false;

const openModal = (source) => {
    if (source === 'timer' && hasOpenedByTimer) return;
    if (source === 'scroll' && hasOpenedByScroll) return;
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    if (source === 'timer') hasOpenedByTimer = true;
    if (source === 'scroll') hasOpenedByScroll = true;
};

const closeModal = () => {
    modal.style.display = 'none';
    document.body.style.overflow = '';
};

setTimeout(() => {
    openModal('timer');
}, 10000);

window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY + window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    if (scrollPosition >= documentHeight - 50) {
        openModal('scroll');
    }
});

if (openModalButton) openModalButton.onclick = () => openModal('manual');
if (closeModalButton) closeModalButton.onclick = closeModal;
if (modal) {
    modal.onclick = (event) => {
        if (event.target === modal) closeModal();
    };
}