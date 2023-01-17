const user = document.querySelector('.user-input');
const password = document.querySelector('.password-input');
const btn = document.querySelector('.btn');
const inputs = document.querySelector('.container__inputs');
const links = document.querySelector('.links');
btn.onclick = () => {
    if(user.value !== 'abcd' || password.value !== '1234'){
        alert('Wrong validation')
    } else {
        inputs.style.display = 'none';
        links.style.display = 'flex';
    }

}