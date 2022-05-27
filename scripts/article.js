const url = new URL(window.location.href);
const wrapper = document.querySelector(".article-container");
const avatar = document.querySelector(".comment-area img");
const commentField = document.querySelector(".comment-area textarea");
const commentInput = document.querySelector(".comment-area textarea");
const commentButton = document.querySelector(".comment-area .button");
const commentsContainer = document.querySelector(".comments-container");

const commentsNumber = document.getElementById('comments-number');

const token = localStorage.getItem("Token");
let user;

if (token) {
  user = JSON.parse(atob(token.split('.')[1]));
  avatar.src = user.avatar;
  commentField.placeholder = "";
  commentField.disabled = false;
  commentButton.style.display = "block";
  commentButton.addEventListener('click', sendComment);
}

const socket = io("https://odbproject.herokuapp.com/");
socket.on("connect", () => console.log(`Connected. Id: ${socket.id}`))
socket.emit("join-room", url.searchParams.get("id"));
socket.on("message", (data) => addComment(data));

(async function getArticle() {
  wrapper.classList.add("loading");
  const articleId = url.searchParams.get("id");
  const response = await fetch(`https://odbproject.herokuapp.com/api/articles/${articleId}`, {
    method: "GET",
    headers: {
      Authorization: localStorage.getItem("Token"),
    },
  });

  if (response.status === 200) {
    wrapper.classList.remove("loading");
    const data = await response.json();
    const date = new Date(data.article.createdAt);
    wrapper.innerHTML += `
      <div>
        <div id="head">
          <div id="author">
            <img src="${data.article.author.avatar}" />
            <span>${data.article.author.name} ${data.article.author.surname}<span>
          </div>
          <div>
            <span id="created-at">${date.toLocaleTimeString()}  ${date.getDate()}/${date.getMonth()}/${date.getFullYear()}</span>
          </div>
        </div>
        <div id="title">${data.article.title}</div>
        <div id="article-content">
          ${data.article.content}
        </div>
      </div>
    `

    data.article.comments.map(comment => addComment({
      avatar: comment.author.avatar,
      author: comment.author.name + " " + comment.author.surname,
      text: comment.text,
      createdAt: comment.createdAt
    }))
  } else {
    wrapper.classList.remove("loading");
    throw new Error("Failed to get articles");
  }

})()
.catch(err => console.log(err.message))


async function sendComment() {
  if (commentInput.value) {
    const commentData = {
      authorId: user.id,
      articleId: url.searchParams.get("id"),
      avatar: user.avatar,
      author: user.name + " " + user.surname, 
      text: commentInput.value,
      createdAt: Date.now()
    };
    addComment(commentData);
    socket.emit("comment", url.searchParams.get("id"), commentData);
    commentInput.value = "";
  }
}


async function addComment(data) {
  const comment = document.createElement('div');
  comment.className = "comment";
  comment.innerHTML = `
    <img src="${data.avatar}" />
      <div>
        <p>${data.author}</p>
        <div class="content">${data.text}</div>
    </div>
  `;
  commentsContainer.prepend(comment);

  countComments();
}

function countComments() {
  let numOfComments = document.querySelectorAll('.comment').length;

  if (numOfComments === 0) {
    commentsNumber.textContent = 'Немає коментарів';
  } else if (numOfComments === 1) {
    commentsNumber.textContent = numOfComments + ' коментар';
  } else if (numOfComments >= 2 && numOfComments < 5) {
    commentsNumber.textContent = numOfComments + ' коментарі';
  } else {
    commentsNumber.textContent = numOfComments + ' коментарів';
  }
}