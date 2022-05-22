if (!localStorage.getItem("Token")) {
    window.location.replace('./index.html');
}

const token = localStorage.getItem("Token");
const user = JSON.parse(atob(token.split('.')[1]));

const username = document.querySelector('#current-user');
const avatar = document.querySelector('.avatar img');

username.innerHTML = `${user.name}`;
avatar.src = user.avatar;