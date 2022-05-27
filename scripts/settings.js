const toggleSettingPassword = document.querySelector('.toggle-settings-password');
const settingsPassword = document.querySelector('.settings #password');

toggleSettingPassword.addEventListener('click', () => {
    const type = settingsPassword.getAttribute('type') === 'password' ? 'text' : 'password';

    settingsPassword.setAttribute('type', type);
    
    toggleSettingPassword.classList.toggle('bi-eye');
});

const avatarInput = document.querySelector('#change-avatar');
const avatar = document.querySelector('#avatar>img');

avatarInput.addEventListener('change', changeAvatar);

async function changeAvatar(e) {
    avatar.src = URL.createObjectURL(e.target.files[0]);
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
function deleteAccount() {
    console.log('Deleted');

    // ...
}