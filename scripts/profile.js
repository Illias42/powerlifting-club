// Ще можна показувати на вкладці браузера (title) ім'я користувача

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
    for (let i = 0; i < impactContainer.children.length; i++) {
        if (impactContainer.children[i].classList.contains('tests-container')) {
            impactContainer.children[i].remove();
        }
    }
    const articlesContainer = document.createElement('div');
    articlesContainer.classList.add('articles-container');
    impactContainer.appendChild(articlesContainer);

    // ...
}

function showTests() {
    for (let i = 0; i < impactContainer.children.length; i++) {
        if (impactContainer.children[i].classList.contains('articles-container')) {
            impactContainer.children[i].remove();
        }
    }
    const testsContainer = document.createElement('div');
    testsContainer.classList.add('tests-container');
    impactContainer.appendChild(testsContainer);

    // ...
}