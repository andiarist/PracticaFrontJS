import { cargarBasicos } from './tools.js'

function main () {

    // Cargamos lo básico
    const storeUsers = cargarBasicos()
    

    // Definimos el array de provincias
    const aProv = ['A Coruña', 'Álava', 'Albacete', 'Alicante', 'Almería', 'Asturias', 'Ávila', 'Badajoz', 
                    'Baleares', 'Barcelona', 'Burgos', 'Cáceres', 'Cádiz', 'Cantabria', 'Castellón', 
                    'Ciudad Real', 'Córdoba', 'Cuenca', 'Girona', 'Granada', 'Guadalajara', 'Gipuzkoa', 'Huelva',
                    'Huesca', 'Jaén', 'La Rioja', 'Las Palmas', 'León', 'Lérida', 'Lugo', 'Madrid', 'Málaga', 'Murcia', 
                    'Navarra', 'Ourense', 'Palencia', 'Pontevedra', 'Salamanca', 'Segovia', 'Sevilla', 'Soria', 'Tarragona', 
                    'Santa Cruz de Tenerife', 'Teruel', 'Toledo', 'Valencia', 'Valladolid', 'Vizcaya', 'Zamora', 'Zaragoza']

    // Leemos los campos del formulario de registro
    const formRegistro = document.querySelector('#f_registro')
    const genero = [...formRegistro.querySelectorAll('[name="genero"]')]
    const nombre = formRegistro.querySelector('input#nombre')
    const apellidos = formRegistro.querySelector('input#apellidos')
    const nacionalidad = [...formRegistro.querySelectorAll('[name="nacionalidad"]')]
    const provincias = formRegistro.querySelector('select#provincias')
    const tel = formRegistro.querySelector('input#mobile')
    const email = formRegistro.querySelector('input#email')
    const username = formRegistro.querySelector('input#username')
    const api_key = formRegistro.querySelector('input#api_key')
    const pass = formRegistro.querySelector('input#pass')
    const pass2 = formRegistro.querySelector('input#pass2')
    const condiciones = formRegistro.querySelector('input#condiciones')
    const comentarios = formRegistro.querySelector('textarea')
     

    // Botón
    const btnRegistro =  document.querySelector('#b_registro')

    // Manejadores de eventos
    nacionalidad.forEach(item => item.addEventListener('change', provManager))
    if (btnRegistro) {
        btnRegistro.addEventListener('click', onClickRegistro)
    }

    // Funciones

    // Muestra el listado de provincias si está seleccionada nacionalidad española
    function provManager (ev) {
        //console.log(ev.target.id)
        if (ev.target.id == 'espan') {
            // cargamos las provincias
            displaySelect('provincias', aProv)
            //las mostramos -> le quitamos la class .hidden al fieldset
            provincias.parentElement.classList.remove('hidden')
        } else {
            // nos aseguramos de que el fieldset tiene la clase .hidden si no está marcado la opción españa
            provincias.parentElement.classList.add('hidden')
        }
    }

    // Validar los campos del formulario
    function validarForm () {

        if (!formRegistro.checkValidity()) {            
            const campos = [nombre, apellidos, tel, email, username, username, api_key, pass, pass2]
            //console.dir(campos)
            

            try {
                const error = new Error()

                // comprobamos los radio
                if (!genero[0].checkValidity()) {
                    error.code = 'genero'
                    throw error
                }
                if (!nacionalidad[0].checkValidity()) {
                    error.code = 'nacionalidad'
                    throw error
                }

                // comprobamos la provincia
                if ((nacionalidad.filter(item => item.checked)[0].value) == 'Española') {
                    if (!provincias.checkValidity()){
                        error.code = 'provincias'
                        throw error
                    }
                }
                
                // comprobamos los input texto
                campos.forEach((item) => {                    
                    if(!item.value) {
                        error.code = item.id
                        throw error
                    }
                })                

                //comprobamos que se han aceptado las condiciones
                if (!condiciones.checked) {
                    error.code = 'condiciones'
                    throw error
                }

                return true  

            } catch (error) {
                let errorMsg
                
                switch (error.code) {
                    case 'genero':
                        errorMsg = 'Marca el género al que perteneces'
                        break;
                    case 'nombre':
                        errorMsg = 'Introduce tu nombre'
                        break;
                    case 'apellidos':
                        errorMsg = 'Introduce tus apellidos'
                        break;
                    case 'nacionalidad':
                        errorMsg = 'Selecciona tu nacionalidad'
                        break;
                    case 'provincias':
                        errorMsg = 'Selecciona tu provincia'
                        break
                    case 'mobile':
                        errorMsg = 'Introduce tu número de teléfono'
                        break;
                    case 'email':
                        errorMsg = 'Introduce tu dirección de correo'
                        break
                    case 'username':
                        errorMsg = 'Introduce tu nombre de usuario'
                        break
                    case 'api_key':
                        errorMsg = 'Introduce tu api_key'
                        break
                    case 'pass':
                        errorMsg = 'Introduce tu contraseña'
                        break
                    case 'pass2':
                        errorMsg = 'Repite tu contraseña'
                        break
                    case 'condiciones':
                        errorMsg = 'Es necesario que aceptes las condiciones'
                        break
                    default:
                        errorMsg = 'Se ha produido un error'
                        break;
                }  
                
                formRegistro.querySelector('p.error').innerHTML = errorMsg
                return false
            }
            
        }

        // comprobamos que las contraseñas coinciden
        if (pass.value !== pass2.value) {
            console.log('contraseñas distintas')
            formRegistro.querySelector('p.error').innerHTML = 'Es necesario que las contraseñas coincidan'
            return false
        }


        return true
    }

    function onClickRegistro (ev) {
        
        console.log('click en registrar usuario')
        ev.preventDefault()

        // validamos el formulario        
        if (!validarForm()) {
            console.log('El formulario es inválido')
            return
        }

        // metemos los valores de los campos del formulario en usuario
        const usuario = {
            genero : genero.filter(item => item.checked)[0].value,
            nombre : nombre.value,
            apellidos : apellidos.value,
            nacionalidad : nacionalidad.filter(item => item.checked)[0].value,
            provincia : aProv[provincias.selectedIndex-1],
            tel : tel.value,
            email : email.value,
            username : username.value,
            api_key : api_key.value,
            pass : pass.value,
            pass2 : pass2.value,
            condiciones : condiciones.checked,
            comentarios : comentarios.value
        }

        console.log('Datos del usuario: ', usuario)

        // Almacenamos los datos
        const users = window.localStorage.getItem(storeUsers) ?
        JSON.parse(window.localStorage.getItem(storeUsers)) : []
        // comprobamos que el nombre de usuario no existe
        let findUser = users.find( item => item.username == usuario.username) 
        if (findUser){
            formRegistro.querySelector('p.error').innerHTML = 'El nombre de usuario ya existe'
            return
        }
        users.push(usuario)
        window.localStorage.setItem(storeUsers, JSON.stringify(users))
        location.href = 'login.html'
       
    }



    
    function displaySelect (id, data) {
        let html = '<option></option>'
        data.forEach (item => html += `
                    <option value='${item}'>${item}</option>`)
        document.querySelector('#'+id).innerHTML = html
    }





}

document.addEventListener('DOMContentLoaded', main)