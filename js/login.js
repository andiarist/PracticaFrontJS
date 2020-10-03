import { cargarBasicos } from './tools.js'

function main2 () {

    // Cargamos lo básico    
    const storeUsers = cargarBasicos()

    // Botones 
    const btnLogin =  document.querySelector('#b_login')

    // Manejadores de eventos
    if (btnLogin) {
        btnLogin.addEventListener('click', onClickLogin)
    }

    function onClickLogin () {
        
        const formLogin = document.querySelector('#f_login')

        const users = window.localStorage.getItem(storeUsers) ? 
        JSON.parse(window.localStorage.getItem(storeUsers)) : []        

        const inputs = [...formLogin.querySelectorAll('input')]

        let findUser = users.find( item => item.username.toLowerCase() == inputs[0].value.toLowerCase() )        
        
        // Comprobamos los datos
        if (!findUser) {
            console.log('Usuario no encontrado')
            formLogin.querySelector('p.error').innerHTML = 'El usuario no existe'
        } else  if (findUser.pass !== inputs[1].value) {
            console.log('Pass incorrecta')
            formLogin.querySelector('p.error').innerHTML = 'La contraseña es incorrecta'
        } else {
            console.log('Usuario y password correctos')
            // almaceno el username en sessionStorage
            sessionStorage.setItem('username', findUser.username)
            // redirigimos a la página del usuario y pasamos el username en la URL
            //window.location = `usuario.html?${findUser.username}`
            window.location = `usuario.html`
        }  
    }
}


document.addEventListener('DOMContentLoaded', main2)