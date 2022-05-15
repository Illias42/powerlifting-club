const content = document.querySelector(".articles-list");

async function getArticles() {
  const response = await fetch("https://odbproject.herokuapp.com/api/articles/myarticles", {
    method: "GET",
    headers: {
      Authorization: localStorage.getItem("Token"),
    },
  });

  console.log(response);

  if (response.status === 200) {
    const data = await response.json();
    data.articles.map((article) => {
        const date = new Date(article.createdAt);
        content.innerHTML += `
          <a class="article" href="./article.html?id=${article.id}">
            <div>
              <img src="https://odbproject.herokuapp.com/${article.author.avatar}" />
            </div>  
            <div>    
              <div>${article.author.name} ${article.author.surname}</div>
              <div class="article-date">${date.toLocaleTimeString()} ${date.getDate()}/${date.getMonth()}/${date.getFullYear()}</div>
              <div class="article-title">${article.title}</div>
            </div>
          </a>
        `;
    })
  }
}

getArticles();
