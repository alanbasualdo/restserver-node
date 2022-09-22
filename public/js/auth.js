const formulario = document.querySelector('form')

const url = (window.location.hostname.includes('localhost'))
    ? 'http://localhost:8080/api/auth/'
    : 'https://restserver-node-ferher.herokuapp.com/api/auth/';

function handleCredentialResponse(response) {

    const body = { id_token: response.credential }

    fetch(url + 'google', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-type': 'application/json'
        }
    })
        .then(resp => resp.json())
        .then(({ token }) => {
            localStorage.setItem('token', token)
            window.location = 'chat.html'
        })
        .catch(console.warn)
}

formulario.addEventListener('submit', ev => {
    ev.preventDefault();
    const formData = {};

    for (let el of formulario.elements) {
        if (el.name.length > 0) {
            formData[el.name] = el.value
        }
    }

    fetch(url + 'login', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
            'Content-type': 'application/json'
        }
    })
        .then(resp => resp.json())
        .then(({ msg, token }) => {
            if (msg) {
                return console.error(msg)
            }
            localStorage.setItem('token', token)
            window.location = 'chat.html'
        })
        .catch(err => {
            console.log(err)
        })
})

const button = document.getElementById('google-signout')
button.onclick = () => {

    console.log(google.accounts.id)
    google.accounts.id.disableAutoSelect()

    google.accounts.id.revoke(localStorage.getItem('token'), done => {
        localStorage.clear()
        location.reload()
    })

}