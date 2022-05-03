const calBtn = document.querySelector('.cal-btn');
calBtn.addEventListener('click', calculateCalories);

function calculateCalories() {
    const height = document.getElementById('cal-height').value;
    const weight = document.getElementById('cal-weight').value;
    const age = document.getElementById('cal-age').value;
    const gender = document.querySelector('input[name="cal-gender"]:checked').value;
    const activity = document.getElementById('cal-activity').value;
    const resultContainer = document.querySelector('.cal-result');
    const calories = document.getElementById('calories');

    if(gender === 'male') {
        let result = (10 * weight) + (6.25 * height) - (5 * age) + 5;

        switch(activity) {
            case '1.2':
                result *= 1.2;
                break;
            case '1.375':
                result *= 1.375;
                break;
            case '1.55':
                result *= 1.55;
                break;
            case '1.725':
                result *= 1.725;
                break;
            case '1.9':
                result *= 1.9;
                break;
        }

        calories.textContent = result.toFixed(0);
        resultContainer.classList.remove('hidden');

        return;
    } else {
        let result = (10 * weight) + (6.25 * height) - (5 * age) - 161;

        switch(activity) {
            case '1.2':
                result *= 1.2;
                break;
            case '1.375':
                result *= 1.375;
                break;
            case '1.55':
                result *= 1.55;
                break;
            case '1.725':
                result *= 1.725;
                break;
            case '1.9':
                result *= 1.9;
                break;
        }

        calories.textContent = result.toFixed(0);
        resultContainer.classList.remove('hidden');
        
        return;
    }
}