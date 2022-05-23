let currentQuiz = {
    movingToNextQuestion() {
        //find all next buttons and add event lisener to them
    var nextButton = document.querySelectorAll(".nextButton");
    for(i = 0; i < nextButton.length; i++){
      nextButton[i].addEventListener("click", function(event){
        //Find the element that was clicked
        var elementClicked = event.target;
        //If it was a next button then remove the is-active class from it parent
        if(elementClicked.className === "nextButton"){
          elementClicked.parentNode.classList.remove("is-active");
          //If there isnt a next sibling then reshow the options to add questions and the info div
          if(elementClicked.parentNode.nextElementSibling === null) {
            buildResult();
          } else {
            //If there is a next siblng then add the is-active class to it
            elementClicked.parentNode.nextElementSibling.classList.add("is-active");
          }
        }
      });
    }
}
};

document.addEventListener('click', (e) => {
    if(e.target.className === "nextButton" && e.target.textContent !== 'Завершити') {
        view.currentQuestion++;
        document.querySelector('.counter').innerHTML = `${view.currentQuestion} / ${currentQuiz.questions.length}`;
    }
})

function startAgain() {
    document.querySelector('.result-container').remove();

    view.correctAnswers = 0;
    view.currentQuestion = 1;
    document.querySelector('.counter').innerHTML = `${view.currentQuestion} / ${currentQuiz.questions.length}`;

    view.displayQuestions();
}

function buildResult() {
    document.querySelector('.counter').style.display = 'none';
    
    const resultContainer = document.createElement('div');
    resultContainer.classList.add('result-container');

    const resultMessage = document.createElement('p');
    resultMessage.classList.add('result-message');

    resultMessage.innerHTML = `
        Правильних відповідей: <span class="score">${view.correctAnswers} / ${currentQuiz.questions.length}</span>
    `;

    resultContainer.appendChild(resultMessage);

    let percentage = (100 * view.correctAnswers) / currentQuiz.questions.length;

    const resultStatus = document.createElement('div');
    resultStatus.classList.add('result-status');

    if (percentage > 80) {
        resultStatus.textContent = 'Вау, чудовий результат! Мабуть, ти зі Львівської політехніки :)';
    } else if (percentage < 80 && percentage > 50) {
        resultStatus.textContent = 'Непоганий результат, але можна краще!';
    } else {
        resultStatus.textContent = 'Хмм, мабуть ти занадто розслабився. Спробуй ще раз!';
    }

    resultContainer.appendChild(resultStatus);

    const startAgainBtn = document.createElement('button');
    startAgainBtn.textContent = 'Почати знову';
    startAgainBtn.classList.add('start-again-btn');
    startAgainBtn.addEventListener('click', startAgain);

    resultContainer.appendChild(startAgainBtn);

    wrapper.appendChild(resultContainer);
}

// GETTING THE TEST

const token = localStorage.getItem("Token");
const user = JSON.parse(atob(token.split('.')[1]));

const url = new URL(window.location.href);
const wrapper = document.querySelector(".test-container");

(async function getQuiz() {
    const id = url.searchParams.get("id");
    const response = await fetch(`https://odbproject.herokuapp.com/api/quiz/${id}`, {
        method: "GET"
    });

    if (response.status === 200) {
        const quiz = await response.json()

        const date = new Date(quiz.createdAt);

        // currentQuiz = quiz;
        Object.assign(currentQuiz, quiz);
        console.log(currentQuiz);

        wrapper.innerHTML += `
            <div>
            <div id="head">
                <div id="author">
                <img src="${quiz.author.avatar}" />
                <span>${quiz.author.name} ${quiz.author.surname}<span>
                </div>
                <div>
                    <span id="created-at">${date.toLocaleTimeString()}  ${date.getDate()}/${date.getMonth()}/${date.getFullYear()}</span>
                </div>
            </div>
            <div id="title">${quiz.name}</div>
            <div id="test-content">
                <button id="start-btn" onclick="view.displayQuestions()">Почати тест</button>
                <p class="counter" style="display: none;">${view.currentQuestion} / ${currentQuiz.questions.length}</p>
                <div class="questions-wrapper"></div>
            </div>
            </div>
        `;
    } else {
        throw new Error("Failed");
    }
})()
.catch(err => console.log(err.message))

// PASSING THE TEST

const view = {
    //This runs when you click start quiz
    displayQuestions: function() {
    document.querySelector('.counter').style.display = "block";
    //Hide the options to add questions and the info
    const hideStartBtn = document.getElementById('start-btn');
    hideStartBtn.style.display = "none";
    //Clear the quesitons wrapper
    const questionsWrapper = document.querySelector(".questions-wrapper");
    questionsWrapper.innerHTML = "";

    //for each quesiton in array create elements neede and give classes
    currentQuiz.questions.forEach(function(question, index) {
        const questionDiv = document.createElement("div");
        questionDiv.setAttribute("class", "questionDiv");
        const nextButton = document.createElement("button");
        nextButton.setAttribute("class", "nextButton");
        const questionLi = document.createElement("li");
        questionLi.setAttribute("class", "question");
        const correctLi = document.createElement("li");
        correctLi.setAttribute("class", "correct");
        const wrongOneLi = document.createElement("li");
        wrongOneLi.setAttribute("class", "wrong");
        const wrongTwoLi = document.createElement("li");
        wrongTwoLi.setAttribute("class", "wrong");
        const wrongThreeLi = document.createElement("li");
        wrongThreeLi.setAttribute("class", "wrong");

        //add each question div to the question wrapper
        questionsWrapper.appendChild(questionDiv);

        questionsWrapper.firstChild.classList.add("is-active");

        //add the text to the inputs the values in the questions array
        questionLi.textContent = question.question;
        correctLi.textContent = question.correct;
        wrongOneLi.textContent = question.wrongOne;
        wrongTwoLi.textContent = question.wrongTwo;
        wrongThreeLi.textContent = question.wrongThree;

        //If its the last question the button should say finish if not it should say next
        if (index === currentQuiz.questions.length - 1){
        nextButton.textContent = "Завершити";
        } else{
        nextButton.textContent = "Наступне";
        }

        //Append elements to div
        questionDiv.appendChild(questionLi);

        //put the answers in a random order before apprending them so correct isnt always 1st
        const array = [correctLi, wrongOneLi, wrongTwoLi, wrongThreeLi];
        array.sort(function(a, b){return 0.5 - Math.random()});
        array.forEach(function(item){
        questionDiv.appendChild(item);
        });

        questionDiv.appendChild(nextButton);

        this.displayAnswersCorrect();
        currentQuiz.movingToNextQuestion();

    }, this);

    },

    correctAnswers: 0,
    currentQuestion: 1,

    displayAnswersCorrect: function() {
    const questionDiv = document.querySelectorAll(".questionDiv");

    //add click event to each question div if the element clicked has class correct then add 1 to correctAnswers and change the color of element to green.
    //Else change the color of element to red and find the elemtn with correct class and make it green
    for (let i = 0; i < questionDiv.length; i++) {
        questionDiv[i].onclick = function(event) {
        event = event || window.event;
        if(event.target.className === "correct"){
            view.correctAnswers++;
            event.target.style.color = "#2ecc71";
            event.target.style.borderColor = "#2ecc71";
        } else if(event.target.className === "wrong"){
            event.target.style.color = "#e74c3c";
            event.target.style.borderColor = "#e74c3c";
            var itemChildren = event.target.parentNode.children;
            for(i = 0; i < itemChildren.length; i++){
            if(itemChildren[i].classList.contains("correct")){
                itemChildren[i].style.color = "#2ecc71";
                itemChildren[i].style.borderColor = "#2ecc71";
            }
            }
        }
        //Remove correct and wrong classes so the same question the score cant go up and colors cant chaneg
        var itemChildren = event.target.parentNode.children;
        for(i = 0; i < itemChildren.length; i++){
            itemChildren[i].classList.remove("correct");
            itemChildren[i].classList.remove("wrong");
        }
        }
    }

    }
}