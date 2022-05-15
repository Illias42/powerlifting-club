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
    if (localStorage.getItem("Token")) {
        window.location.replace('./cabinet.html');
    }
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



const loginForm = document.querySelector('.login-modal>.modal-content');
loginForm.addEventListener('submit', loginSubmit);

async function loginSubmit(e) {
    e.preventDefault();

    const email = e.target[1].value;
    const password = e.target[2].value;
    const formData = {email, password};

    const response = await fetch('https://odbproject.herokuapp.com/api/users/login', {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    });

    if (response.status === 201) {
        const data = await response.json()
        localStorage.setItem("Token", `Bearer ${data.token}`);
        closeModal();
    } else {
        const message = "Не вдалось увійти. Перевірте введені дані.";
        const errBlock = document.getElementById('log-errors');
        errBlock.innerHTML = message;
        errBlock.style.display = "block";

        setTimeout(() => {
            errBlock.style.display = "none";
            errBlock.innerHTML = "";
        }, 10000)
    }
}