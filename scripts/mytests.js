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
            `;
        });

    } else {
        throw new Error("Failed");
    }
})()
.catch(err => console.log(err.message))