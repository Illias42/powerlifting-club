'use strict';

const modal = document.querySelector('.login-modal');

const openBtn = document.querySelectorAll('.login-btn');
for(let i = 0; i < openBtn.length; i++) {
    openBtn[i].addEventListener('click', openModal);
}

const closeBtn = document.querySelector('.close-modal');
closeBtn.addEventListener('click', closeModal);

document.addEventListener('click', clickOutside);
document.addEventListener('keyup', escapeClose);

function openModal() {
    modal.style.display = 'block';
}

function closeModal() {
    modal.style.display = 'none';
}

function clickOutside(event) {
    if(event.target === modal) {
        modal.style.display = 'none';
    }
}

function escapeClose(event) {
    if (event.keyCode === 27) {
        modal.style.display = 'none';
    }
}