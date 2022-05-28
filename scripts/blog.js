const content = document.querySelector(".articles-container");

(async function getArticles() {
  content.classList.add("loading");
  const url = new URL(window.location.href);
  const currentPage = url.searchParams.get("page");
  const response = await fetch(`https://odbproject.herokuapp.com/api/articles/page/${currentPage}`, {
    method: "GET",
    headers: {
      Authorization: localStorage.getItem("Token"),
    },
  });

  if (response.status === 200) {
    content.classList.remove("loading");
    const {articles, count} = await response.json();

    articles.map((article) => {
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

    const navContainer = document.querySelector('.pagination');
    const nav = document.createElement('ul');
    const pagesCount = Math.ceil(count / 5);

    for(let i = 1; i <= pagesCount; i++) {
      const page = document.createElement('li');
      if(currentPage == i) {
        page.innerHTML = `
          <a class="active" href="blog.html?page=${i}">${i}</a>
        `;
      } else {
        page.innerHTML = `
          <a href="blog.html?page=${i}">${i}</a>
        `;
      }
        
      nav.append(page);
    }
    navContainer.prepend(nav);
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