const content = document.querySelector('.tests-list');

(async function getQuizzes() {
    const token = localStorage.getItem("Token");
    const user = JSON.parse(atob(token.split('.')[1]));
    
    const response = await fetch(`https://odbproject.herokuapp.com/api/quiz/my/${user.id}`, {
        method: "GET"
    });

    if (response.status === 200) {
        const quizzes = await response.json()

        quizzes.map((quiz) => {
            console.log(quiz);

            const date = new Date(quiz.createdAt);

            content.innerHTML += `
            <div class="test-container">
                <div class="test-options">
                    <button type="button" class="delete-item-btn" title="Видалити">
                        <i class="fa-solid fa-trash-can"></i>
                    </button>
                </div>
                <a class="test" href="./test.html?id=${quiz.id}">
                    <div>
                        <img src="${quiz.author.avatar}" />
                    </div>  
                    <div>    
                        <div>${quiz.author.name} ${quiz.author.surname}</div>
                        <div class="test-date">${date.toLocaleTimeString()} ${date.getDate()}/${date.getMonth()}/${date.getFullYear()}</div>
                        <div class="test-title">${quiz.name}</div>
                    </div>
                </a>
            </div>
            `;
        });

    } else {
        throw new Error("Failed");
    }
})()
.catch(err => console.log(err.message))

// Delete tests

const confirmDeleteModal = document.querySelector('.confirm-delete-modal');

const closeConfirmBtn = document.querySelector('.close-confirm-modal');
closeConfirmBtn.addEventListener('click', closeConfirmModal);

const cancelBtn = document.querySelectorAll('.cancel-btn');
for (let i = 0; i < cancelBtn.length; i++) {
    cancelBtn[i].addEventListener('click', closeConfirmModal);
}

document.addEventListener('click', clickOutsideConfirm);
document.addEventListener('keyup', escapeCloseConfirm);

// По якому елементу був клік
let item;

function openConfirmModal(event) {
    confirmDeleteModal.style.display = 'block';

    item = event.target.parentElement.parentElement.nextElementSibling;
    console.log(item);
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

function getDeleteBtns() {
    const openConfirmBtn = document.querySelectorAll('.delete-item-btn');

    for (let i = 0; i < openConfirmBtn.length; i++) {
        openConfirmBtn[i].addEventListener('click', openConfirmModal);
    }
}

setTimeout(getDeleteBtns, 300);


const deleteBtn = document.querySelectorAll('.yes-btn');
for (let i = 0; i < deleteBtn.length; i++) {
    deleteBtn[i].addEventListener('click', deleteTest);
}

function deleteTest() {
    console.log('Deleted ' + item);

    // ...

    closeConfirmModal();
}