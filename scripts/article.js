console.log(window.location.href)
const url = new URL(window.location.href);
const wrapper = document.querySelector(".article-container");

console.log(url.searchParams.get("id"))

async function getArticle() {
  const response = await fetch(`https://odbproject.herokuapp.com/api/articles/${url.searchParams.get("id")}`, {
    method: "GET",
    headers: {
      Authorization: localStorage.getItem("Token"),
    },
  });

  if (response.status === 200) {
    const data = await response.json();
    
    console.log(data);
    const date = new Date(data.article.createdAt);
    wrapper.innerHTML += `
      <div>
        <div id="head">
          <div id="author">
            <img src="https://odbproject.herokuapp.com/${data.article.author.avatar}" />
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
  }
}

getArticle();
