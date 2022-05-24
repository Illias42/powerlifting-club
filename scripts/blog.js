const content = document.querySelector(".articles-container");

(async function getArticles() {
  const response = await fetch("https://odbproject.herokuapp.com/api/articles/", {
    method: "GET",
    headers: {
      Authorization: localStorage.getItem("Token"),
    },
  });

  if (response.status === 200) {
    const data = await response.json();
    console.log(data);
    data.articles.map((article) => {
      const date = new Date(article.createdAt);
      content.innerHTML += `
        <a class="article" href="./article.html?id=${article.id}">  
            <div>   
                <div class="article-head"> 
                    <img src="${article.author.avatar}" />
                    <div>${article.author.name} ${article.author.surname} • <span class="article-date">${date.toLocaleTimeString()} ${date.getDate()}/${date.getMonth()}/${date.getFullYear()}</span></div>
                </div>
                <div class="article-title">${article.title}</div>
                <div class="article-content">
                  ${article.content}
                </div>
            </div>
        </a>
        `;
    });
  } else {
    throw new Error("Failed to get articles")
  }
})()
.catch(err => console.log(err.message))

// Search

document.getElementById('search-bar').oninput = function() {
  let val = this.value.trim().toLowerCase();

  let items = document.querySelectorAll('.article-title');
  
  if (val !== '') {
    items.forEach((elem) => {
      if (elem.innerText.toLowerCase().search(val) === -1) {
        elem.parentElement.parentElement.classList.add('hide');
      } else {
        elem.parentElement.parentElement.classList.remove('hide');
      }
    });

  } else {
    items.forEach((elem) => {
      elem.parentElement.parentElement.classList.remove('hide');
    });
  }
}