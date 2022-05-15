if (!localStorage.getItem("Token")) {
    window.location.replace(window.location.pathname.replace('cabinet.html', 'index.html'));
}

const token = localStorage.getItem("Token");
const user = JSON.parse(atob(token.split('.')[1]));

console.log(user);

const username = document.querySelector('#current-user');
const avatar = document.querySelector('.avatar img');
const exitBtn = document.querySelector('#exit-btn');

username.innerHTML = `${user.name}`;
avatar.src = `https://odbproject.herokuapp.com/api/users/${user.id}/avatar`;
exitBtn.addEventListener("click", () => {
    localStorage.removeItem("Token");
    window.location.replace(window.location.pathname.replace('cabinet.html', 'index.html'));
});