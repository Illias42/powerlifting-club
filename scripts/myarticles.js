const content = document.querySelector(".articles-list");

(async function getArticles() {
  const response = await fetch("https://odbproject.herokuapp.com/api/articles/myarticles", {
    method: "GET",
    headers: {
      Authorization: localStorage.getItem("Token"),
    },
  });

  if (response.status === 200) {
    const data = await response.json();
    data.articles.map((article) => {
        const date = new Date(article.createdAt);
        content.innerHTML += `
          <div class="article-container" id="article-${article.id}">
            <div class="article-options">
                <button type="button" class="delete-item-btn" onclick="openConfirmModal(${article.id})" title="Видалити">
                    <i class="fa-solid fa-trash-can"></i>
                </button>
            </div>
            <a class="article" href="./article.html?id=${article.id}">
              <div>
                <img src="${article.author.avatar}" />
              </div>  
              <div>    
                <div>${article.author.name} ${article.author.surname}</div>
                <div class="article-date">${date.toLocaleTimeString()} ${date.getDate()}/${date.getMonth()}/${date.getFullYear()}</div>
                <div class="article-title">${article.title}</div>
              </div>
            </a>
          </div>
        `;
    })
  } else {
    throw new Error("Failed to get articles")
  }
})()
.catch(err => console.log(err))

// Delete article

const confirmDeleteModal = document.querySelector('.confirm-delete-modal');

const closeConfirmBtn = document.querySelector('.close-confirm-modal');
closeConfirmBtn.addEventListener('click', closeConfirmModal);

const cancelBtn = document.querySelector('.cancel-btn');
cancelBtn.addEventListener('click', closeConfirmModal);

document.addEventListener('click', clickOutsideConfirm);
document.addEventListener('keyup', escapeCloseConfirm);

function openConfirmModal(id) {
    confirmDeleteModal.style.display = 'block';
    
    const deleteBtn = document.querySelector('.yes-btn');
    deleteBtn.addEventListener('click', () => deleteArticle(id));
}

function closeConfirmModal() {
    confirmDeleteModal.style.display = 'none';

    const oldBtnElement = document.querySelector(".yes-btn");
    const newBtnElement = oldBtnElement.cloneNode(true);
    oldBtnElement.parentNode.replaceChild(newBtnElement, oldBtnElement);
}

function clickOutsideConfirm (event) {
    if(event.target === confirmDeleteModal) {
        closeConfirmModal();
    }
}

function escapeCloseConfirm (event) {
    if (event.keyCode === 27) {
        closeConfirmModal();
    }
}

async function deleteArticle(id) {
    const response = await fetch(`https://odbproject.herokuapp.com/articles/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: localStorage.getItem("Token"),
        }
    });

    if(response.status === 204) {
        item = document.querySelector(`#article-${id}`);
        item.remove();
    }

    closeConfirmModal();
}