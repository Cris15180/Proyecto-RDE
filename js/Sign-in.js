const btnSignIn = document.getElementById('btn-sign-in');
const btnSignUp = document.getElementById('btn-sign-up');
const container = document.querySelector('.container');

btnSignUp.addEventListener('click', () => {
    container.classList.add('toggle');
});

btnSignIn.addEventListener('click', () => {
    container.classList.remove('toggle');
});
