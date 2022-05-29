const container = document.querySelector(".tests-container");

(async function getQuizzes() {
  container.classList.add("loading");
  const url = new URL(window.location.href);
  const currentPage = url.searchParams.get("page");

  const response = await fetch(`https://odbproject.herokuapp.com/api/quiz/page/${currentPage}`, {
    method: "GET",
  });

  if (response.status === 200) {
    container.classList.remove("loading");
    const {quizzes, count} = await response.json();

    quizzes.map((quiz) => {
        const content = document.createElement("div");
        content.className = "quiz";
        content.innerHTML = `
            <div>
                <p class="quiz-header">${quiz.name}</p>
                <p>Автор: <a href="./profile.html?id=${quiz.author.id}" class="quiz-author">${quiz.author.name + " " + quiz.author.surname}</a></p>
                <p>Кількість питань: <span class="quiz-questions">${quiz.questions.length}</p>
            </div>
            <a class="start-btn" href="./test.html?id=${quiz.id}">Почати</a>
        `;
        container.append(content);
    });

    const navContainer = document.querySelector('.pagination');
    const nav = document.createElement('ul');
    const pagesCount = Math.ceil(count / 9);

    for(let i = 1; i <= pagesCount; i++) {
      const page = document.createElement('li');
      if(currentPage == i) {
        page.innerHTML = `
          <a class="active" href="tests.html?page=${i}">${i}</a>
        `;
      } else {
        page.innerHTML = `
          <a href="tests.html?page=${i}">${i}</a>
        `;
      }
        
      nav.append(page);
    }
    navContainer.prepend(nav);
  } else {
    container.classList.remove("loading");
    throw new Error("Failed");
  }
})().catch((err) => console.log(err.message));


document.getElementById('search-bar').oninput = function() {
    let val = this.value.trim().toLowerCase();
   
  
    let items = document.querySelectorAll('.quiz-header');
    console.log(items[0].innerText);
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
