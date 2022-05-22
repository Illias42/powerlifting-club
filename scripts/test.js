(async function getQuiz() {
    const id = url.searchParams.get("id");
    const response = await fetch(`https://odbproject.herokuapp.com/api/quiz/${id}`, {
        method: "GET"
    });

    if (response.status === 200) {
        const quiz = await response.json()

        console.log(quiz)

    } else {
        throw new Error("Failed");
    }
})()
.catch(err => console.log(err.message))