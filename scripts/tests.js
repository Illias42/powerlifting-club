const container = document.querySelector(".tests-container");

(async function getQuizzes() {
  const token = localStorage.getItem("Token");
  const user = JSON.parse(atob(token.split(".")[1]));

  const response = await fetch(`https://odbproject.herokuapp.com/api/quiz`, {
    method: "GET",
  });

  if (response.status === 200) {
    const quizzes = await response.json();

    quizzes.map((quiz) => {
        console.log(quiz);

        const comment = document.createElement("div");
        comment.className = "quiz";
        comment.innerHTML = `
            <div>
                <p class="quiz-header">${quiz.name}</p>
                <p>Автор: <span class="quiz-author">${quiz.author.name + " " + quiz.author.surname}</span></p>
                <p>Кількість питань: <span class="quiz-questions">${quiz.questions.length}</p>
            </div>
            <a class="start-btn" href="./test.html?id=${quiz.id}">Почати</a>
        `;
        container.prepend(comment);
    });
  } else {
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
