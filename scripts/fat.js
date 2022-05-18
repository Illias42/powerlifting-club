const fatBtn = document.querySelector('.fat-btn');
fatBtn.addEventListener('click', calculateFat);

function calculateFat() {
    const height = document.getElementById('fat-height').value;
    const weight = document.getElementById('fat-weight').value;
    const age = document.getElementById('fat-age').value;
    const gender = document.querySelector('input[name="fat-gender"]:checked').value;
    const resultContainer = document.querySelector('.fat-result');
    const fatMessage = document.querySelector('.fat-message');
    const fatErr = document.querySelector('.fat-err');
    const fat = document.getElementById('fat');
    const category = document.getElementById('fat-status');

    if(height === '' || weight === '' ||
         age === '' || age < 1 ||
         age > 200 || height < 40 ||
        height > 300 || weight < 2 || weight > 700) {
        fatMessage.classList.add('hidden');
        fatErr.classList.remove('hidden');
        resultContainer.classList.remove('hidden');

        return;
    }

    let bmi = (weight / ((height * height) / 10000)).toFixed(2);

    if(gender === 'male') {
        let result = 1.2 * bmi + 0.23 * age - 16.2;

        fatErr.classList.add('hidden');
        fatMessage.classList.remove('hidden');
        fat.textContent = result.toFixed(1) + '%';

        if (result < 2) {
            category.textContent = 'критично низький вміст жиру.';
        } else if (result > 2 && result < 6) {
            category.textContent = 'дуже низький вміст жиру.';
        } else if (result > 6 && result < 14) {
            category.textContent = 'спортсмен.';
        } else if (result > 14 && result < 18) {
            category.textContent = 'фітнес.';
        } else if (result > 18 && result < 25) {
            category.textContent = 'середній вміст жиру.';
        } else {
            category.textContent = 'підвищена вага.';
        }
        resultContainer.classList.remove('hidden');

        return;
    } else {
        let result = 1.2 * bmi + 0.23 * age - 5.4;

        fatErr.classList.add('hidden');
        fatMessage.classList.remove('hidden');
        fat.textContent = result.toFixed(0) + '%';

        if (result < 10) {
            category.textContent = 'критично низький вміст жиру.';
        } else if (result > 10 && result < 14) {
            category.textContent = 'дуже низький вміст жиру.';
        } else if (result > 14 && result < 21) {
            category.textContent = 'спортсменка.';
        } else if (result > 21 && result < 25) {
            category.textContent = 'фітнес.';
        } else if (result > 25 && result < 32) {
            category.textContent = 'середній вміст жиру.';
        } else {
            category.textContent = 'підвищена вага.';
        }

        resultContainer.classList.remove('hidden');
        
        return;
    }
}