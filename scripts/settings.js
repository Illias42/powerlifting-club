const name = document.querySelector("#name");
const surname = document.querySelector("#surname");
const about = document.querySelector("#about-me");
const email = document.querySelector("#email");
const avatarInput = document.querySelector('#change-avatar');
const avatar = document.querySelector('#avatar>img');

const token = localStorage.getItem("Token");
const user = JSON.parse(atob(token.split('.')[1]));
avatar.src = user.avatar;
name.value = user.name;
surname.value = user.surname;
    email.value = user.email;
    about.value = user.about;

const toggleSettingPassword = document.querySelector('.toggle-settings-password');
const settingsPassword = document.querySelector('.settings #password');

toggleSettingPassword.addEventListener('click', () => {
    const type = settingsPassword.getAttribute('type') === 'password' ? 'text' : 'password';

    settingsPassword.setAttribute('type', type);
    
    toggleSettingPassword.classList.toggle('bi-eye');
});

avatarInput.addEventListener('change', changeAvatar);
function changeAvatar(e) {
    avatar.src = URL.createObjectURL(e.target.files[0]);
}


const form = document.querySelector('.settings');
form.addEventListener("submit", saveChanges);

async function saveChanges(e) {
    e.preventDefault();
    const data = new FormData(form);
    
    const response = await fetch(`https://odbproject.herokuapp.com/api/users/${user.id}`, {
        method: "PUT",
        body: data,
        headers: {
            'Accept': 'application/json',
            'Authorization': localStorage.getItem("Token"),
        }
    });

    if (response.status === 201) {
        const data = await response.json();
        localStorage.setItem("Token", `Bearer ${data.token}`);
        window.location.replace('./cabinet.html');
    } else {
        console.log(await response.text());
    }
}

// Видалення акаунту
const openDeleteModal = document.querySelector('.delete-account-link');
openDeleteModal.addEventListener('click', openConfirmModal);

const confirmDeleteModal = document.querySelector('.delete-account-modal');

const closeConfirmBtn = document.querySelector('.close-confirm-modal');
closeConfirmBtn.addEventListener('click', closeConfirmModal);

const cancelBtn = document.querySelector('.cancel-btn');
cancelBtn.addEventListener('click', closeConfirmModal);

document.addEventListener('click', clickOutsideConfirm);
document.addEventListener('keyup', escapeCloseConfirm);

function openConfirmModal() {
    confirmDeleteModal.style.display = 'block';
}

function closeConfirmModal() {
    confirmDeleteModal.style.display = 'none';
}

function clickOutsideConfirm (event) {
    if(event.target === confirmDeleteModal) {
        confirmDeleteModal.style.display = 'none';
    }
}

function escapeCloseConfirm (event) {
    if (event.keyCode === 27) {
        confirmDeleteModal.style.display = 'none';
    }
}

const deleteAccountBtn = document.querySelector('.yes-btn');
deleteAccountBtn.addEventListener('click', deleteAccount);

// Підтверджено видалення акаунту
async function deleteAccount() {
    const response = await fetch(`https://odbproject.herokuapp.com/api/users/${user.id}`, {
        method: "DELETE",
        headers: {
          Authorization: localStorage.getItem("Token"),
        }
    });

    if(response.status === 204) {
        localStorage.removeItem("Token");
        window.location.replace('./index.html');
    }

    closeConfirmModal();
}