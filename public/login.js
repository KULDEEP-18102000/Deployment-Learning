const useremail = document.getElementById('email')
const userpassword = document.getElementById('password')

document.getElementById('my-form').addEventListener('submit', onSubmit);

document.getElementById('forgot').onclick = async function () {
    window.location.href = '/forgot-password.html'
}

async function onSubmit(e) {
    e.preventDefault();
    my_obj = {
        email: useremail.value,
        password: userpassword.value
    }
    try {
        const response = await axios.post('http://3.109.32.194:3000/user/login', my_obj)
        // console.log(response)
        alert(response.data.message)
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('isPremium', response.data.isPremium)
        window.location.href = 'expense.html'
    } catch (error) {
        document.body.innerHTML = document.body.innerHTML + `<h3>${error.message}</h3>`
    }
    useremail.value = ""
    userpassword.value = ""
}
