const quiz = {
    questions: [],

    addQuestion(question, correct, wrongOne, wrongTwo, wrongThree) {
      this.questions.push({
        question: question,
        correct: correct,
        wrongOne: wrongOne,
        wrongTwo: wrongTwo,
        wrongThree: wrongThree
      });

      document.getElementById('question-number').textContent = this.questions.length + 1;

      const addedQuestionsNum = document.getElementById('questions-added');

      if(this.questions.length === 1 || this.questions.length === 2 || this.questions.length === 3 ||
        this.questions.length === 4) {
          addedQuestionsNum.textContent = 'Наразі у ваш тест додано ' + this.questions.length + ' запитання.';
      } else {
          addedQuestionsNum.textContent = 'Наразі у ваш тест додано ' + this.questions.length + ' запитань.';
      }
    }
};

const handlers = {
    addQuestion() {
      const question = document.getElementById('question-name');
      const correct = document.getElementById('correct-answer');
      const wrongOne = document.getElementById('first-wrong');
      const wrongTwo = document.getElementById('second-wrong');
      const wrongThree = document.getElementById('third-wrong');

      const errEmpty = document.querySelector('.error');
      const errSame = document.querySelector('.error-same-answers');

      if(question.value === '' || correct.value === '' || wrongOne.value === '' || wrongTwo.value === '' || wrongThree.value === '') {
          errEmpty.classList.remove('hidden');
          errSame.classList.add('hidden');
          return;
      }

      const answers = document.querySelectorAll('.answer');
      for (let i = 0; i < answers.length; i++) {
          for (let j = i + 1; j < answers.length; j++) {
              if (answers[i].value === answers[j].value) {
                  errSame.classList.remove('hidden');
                  errEmpty.classList.add('hidden');
                  return;
              }
          }
      }

      errEmpty.classList.add('hidden');
      errSame.classList.add('hidden');

      quiz.addQuestion(question.value, correct.value, wrongOne.value, wrongTwo.value, wrongThree.value);

      question.value = '';
      correct.value = '';
      wrongOne.value = '';
      wrongTwo.value = '';
      wrongThree.value = '';
    }
};

const addQuestionBtn = document.getElementById('add-question-btn');
addQuestionBtn.addEventListener('click', handlers.addQuestion);

const testForm = document.getElementById('test-form');
testForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const testName = document.getElementById('test-name').value;

    // Цей об'єкт обробити і зберегти в базі даних
    const test = {
        name: testName,
        questions: quiz.questions
    };

    const res = await fetch("https://odbproject.herokuapp.com/api/quiz", {
        method: "POST",
        body: JSON.stringify(test),
        headers: {
            Authorization: localStorage.getItem("Token"),
        }
    });
});