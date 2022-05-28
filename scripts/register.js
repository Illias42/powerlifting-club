const toggleRegPassword = document.querySelector('.toggle-reg-password');
const regPassword = document.querySelector('#reg-password');

toggleRegPassword.addEventListener('click', () => {
    const type = regPassword.getAttribute('type') === 'password' ? 'text' : 'password';

    regPassword.setAttribute('type', type);
    
    toggleRegPassword.classList.toggle('bi-eye');
});


if (localStorage.getItem("Token")) {
    window.location.replace('./index.html');
}

const registerForm = document.querySelector('.register-container');
const avatarInput = document.querySelector('#reg-avatar');
const avatar = document.querySelector('#avatar>img');

registerForm.addEventListener('submit', registerSubmit);
avatarInput.addEventListener('change', changeAvatar);

async function registerSubmit(e) {
    e.preventDefault();

    const formData = new FormData(registerForm); 

    const response = await fetch('https://odbproject.herokuapp.com/api/users/register', {
        method: "POST",
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    });

    if (response.status === 201) {
        const data = await response.json();
        localStorage.setItem("Token", `Bearer ${data.token}`);
        console.log(window.location.pathname);
        window.location.replace('./index.html');
    } else if (response.status === 409) {
        const message = "Дана електронна адреса вже використовується.";
        const errBlock = document.getElementById('reg-errors');
        errBlock.innerHTML = message;
        errBlock.style.display = "block";

        setTimeout(() => {
            errBlock.style.display = "none";
            errBlock.innerHTML = "";
        }, 10000)
    } else {
        console.log(await response.text());
    }
}

function changeAvatar(e) {
    avatar.src = URL.createObjectURL(e.target.files[0]);
}