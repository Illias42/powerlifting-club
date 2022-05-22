(async function getQuizzes() {
    const token = localStorage.getItem("Token");
    const user = JSON.parse(atob(token.split('.')[1]));
    
    const response = await fetch(`https://odbproject.herokuapp.com/api/quiz/my/${user.id}`, {
        method: "GET"
    });

    if (response.status === 200) {
        const quizzes = await response.json()

        quizzes.map((quiz) => {
            console.log(quiz)
        });

    } else {
        throw new Error("Failed");
    }
})()
.catch(err => console.log(err.message))