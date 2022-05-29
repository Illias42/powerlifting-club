let user;

(async function getUserData() {
    const url = new URL(window.location.href);
    const userId = url.searchParams.get("id");
    const response = await fetch(`https://odbproject.herokuapp.com/api/users/${userId}`);
    
    if (response.status === 200) {
        user = await response.json();
        
        document.title = user.name + " " + user.surname;

        const avatar = document.querySelector(".avatar img");
        const username = document.querySelector("#user-name");
        const about = document.querySelector("#about-text");
        const email = document.querySelector("#user-email");

        avatar.src = user.avatar;
        username.innerHTML = user.name + " " + user.surname;
        email.innerHTML = user.email;
        if (user.about) {
            about.innerHTML = user.about;
        }

        showArticles()
    
    } else {
        throw new Error("Failed to get user data");
    }
})()
.catch(err => console.log(err.message));

const impactContainer = document.querySelector('.impact');

document.addEventListener('DOMContentLoaded', showArticles);

const impactButtons = document.querySelectorAll('.impact-btn');
for(let i = 0; i < impactButtons.length; i++) {
	impactButtons[i].addEventListener('click', configImpactType);
}

function configImpactType(event) {
	let type = event.target;
	
	if (type.classList.contains('articles-btn')) {
		markType(type);
        showArticles();
	} else if (type.classList.contains('tests-btn')) {
		markType(type);
        showTests();
	}
}

function markType(type) {
	for (let i = 0; i < impactButtons.length; i++) {
		impactButtons[i].className = impactButtons[i].className.replace(' selected', '');
	}
	type.classList.add('selected');
}

function showArticles() {
    if (user && !impactContainer.lastElementChild.classList.contains('articles-container')) {
    for (let i = 0; i < impactContainer.children.length; i++) {
        if (impactContainer.children[i].classList.contains('tests-container')) {
            impactContainer.children[i].remove();
        }
    }
    const articlesContainer = document.createElement('div');
    articlesContainer.classList.add('articles-container');
    impactContainer.appendChild(articlesContainer);
    
    
    user.articles.map((article) => {
        const content = document.createElement('div');
        content.setAttribute('class', 'article-container');
        content.setAttribute('id', `article-${article.id}`);
        const date = new Date(article.createdAt);
        content.innerHTML += `
            <a class="article" href="./article.html?id=${article.id}">
              <div>
                <img src="${user.avatar}" />
              </div>  
              <div>    
                <div>${user.name} ${user.surname}</div>
                <div class="article-date">${date.toLocaleTimeString()} ${date.getDate()}/${date.getMonth()}/${date.getFullYear()}</div>
                <div class="article-title">${article.title}</div>
              </div>
            </a>
        `;
        articlesContainer.prepend(content);
    })
    }
}

function showTests() {
    if (user && !impactContainer.lastElementChild.classList.contains('tests-container')) {
    for (let i = 0; i < impactContainer.children.length; i++) {
        if (impactContainer.children[i].classList.contains('articles-container')) {
            impactContainer.children[i].remove();
        }
    }
    const testsContainer = document.createElement('div');
    testsContainer.classList.add('tests-container');
    impactContainer.appendChild(testsContainer);
    
    user.quizes.map((quiz) => {
        const date = new Date(quiz.createdAt);
        const content = document.createElement("div");
        content.className = "quiz";
        content.innerHTML = `
            <div>
                <p class="quiz-header">${quiz.name}</p>
                <p>Автор: <span class="quiz-author">${user.name + " " + user.surname}</span></p>
                <p>Кількість питань: <span class="quiz-questions">${quiz.questions.length}</p>
            </div>
            <a class="start-btn" href="./test.html?id=${quiz.id}">Почати</a>
        `;
        testsContainer.prepend(content);
    });
}
}