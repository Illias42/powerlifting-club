const calcBtn = document.querySelector('.bmi-btn');
calcBtn.addEventListener('click', calculateBMI);

function calculateBMI() {
    const height = document.getElementById('bmi-height').value;
    const weight = document.getElementById('bmi-weight').value;
    const result = document.querySelector('.bmi-result');
    const bmiField = document.getElementById('bmi');
    const status = document.getElementById('bmi-status');
    const bmiMessage = document.querySelector('.bmi-message');
    const bmiErr = document.querySelector('.bmi-err');

    if(height === '' || weight === '') {
        bmiMessage.classList.add('hidden');
        bmiErr.classList.remove('hidden');
        result.classList.remove('hidden');

        return;
    }

    let bmi = (weight / ((height * height) 
    / 10000)).toFixed(2);

    bmiField.textContent = bmi;

    // Dividing as per the bmi conditions
    if (bmi < 18.6) {
        status.textContent = 'низька';
    } else if (bmi >= 18.6 && bmi < 24.9) {
        status.textContent = 'нормальна';
    } else {
        status.textContent = 'висока';
    }

    bmiErr.classList.add('hidden');
    bmiMessage.classList.remove('hidden');
    result.classList.remove('hidden');
}