if (localStorage.getItem("Token")) {
    window.location.replace(window.location.pathname.replace('register.html', 'index.html'));
}


const registerForm = document.querySelector('.register-container');
registerForm.addEventListener('submit', registerSubmit);

async function registerSubmit(e) {
    e.preventDefault();

    const name = e.target[0].value;
    const surname = e.target[1].value;
    const email = e.target[2].value;
    const password = e.target[3].value;
    const formData = {name, surname, email, password};

    const response = await fetch('https://odbproject.herokuapp.com/api/users/register', {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    });

    if (response.status === 201) {
        const data = await response.json();
        localStorage.setItem("Token", `Bearer ${data.token}`);
        console.log(window.location.pathname);
        window.location.replace(window.location.pathname.replace('register.html', 'index.html'));
    } else if (response.status === 201) {
        const message = "Ця електронна адреса вже використовується.";
        console.log(message)
    } else {
        console.log(await response.text());
    }
}