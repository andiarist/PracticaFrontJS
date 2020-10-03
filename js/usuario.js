import { cargarBasicos } from './tools.js'

function main3 () {
    const storeUsers = cargarBasicos()

    console.log(window.location)
    console.log(window.sessionStorage)

    // Obtenemos el username de sessionStorage
    const currentUser = sessionStorage.getItem('username')
    console.log('Usuario actual:', currentUser)

    // Buscamos los datos del usuario en la tabla
    const users = window.localStorage.getItem(storeUsers) ?
    JSON.parse(window.localStorage.getItem(storeUsers)) : []
    let findUser = users.find( item => item.username == currentUser) 
    console.log(findUser)

    // Le damos la bienvenida
    document.querySelector('span.nombre_usuario').innerHTML = `${findUser.nombre} ${findUser.apellidos}`

    // Extraemos la API_Key para poder enviársela al API
    const clave = findUser.api_key
    console.log('api key:', clave)

    // Inicializamos la paginación a la primera página    
    let paginacion = 1    
    let url = `https://api.themoviedb.org/3/movie/popular?api_key=${clave}&language=es-ES&page=`    
    

    obtenerDatosAPI (url, paginacion)


    function obtenerDatosAPI (url, pag) {
        url += `${pag}`
        console.log('url:', url)
        fetch (url)
        .then ( res => {
            console.log(res)            
            if (res.status < 200 || res.status >= 300) {
                console.log(res.statusText)
                throw new Error('HTTP Error ' + res.status)
            }
            return res.json()
        })
        .then ( datos => muestraPelis(datos) )
        .catch (error => console.log(error.message))
    }    


    function muestraPelis (datos) {
        console.log('Datos que devuelve la url:', datos)
        console.log ('Pagina:', datos.page)

        const pelis = datos.results.map (item => {
            return {
                id:                 item.id,
                titulo:             item.title,
                fecha_de_estreno:   item.release_date
            }
        })

        let displayTabla = ''

        pelis.forEach( item => {
            displayTabla += `
            <tr class="filas">
                <td class="celda_id">${item.id}</td>
                <td>${item.titulo}</td>
                <td>${item.fecha_de_estreno}</td>
            </tr>`
        })        

        document.querySelector('table.tabla_pelis tbody').innerHTML = displayTabla

        // Añadimos el evento para hacer click en cada peli
        document.querySelectorAll('.celda_id').forEach(
            item => item.addEventListener('click', onClickPeli)
        )


        console.log('Pelis: ', pelis)
    }

    // Definimos los botones de paginación
    const btnPrev = document.querySelector('#prev')
    const btnNext = document.querySelector('#next')

    if(btnPrev) {
        btnPrev.addEventListener('click', () => {paginarPelis(-1)})
    }
    if(btnNext) {
        btnNext.addEventListener('click', () => {paginarPelis(+1)})
    }

    function paginarPelis (n) {
        paginacion += n
        obtenerDatosAPI (url, paginacion)
        if (paginacion > 1){
            btnPrev.classList.remove('hidden')
        } else {
            btnPrev.classList.add('hidden')
        }

    }

    function onClickPeli (ev) {
        console.log('click en el id de una peli')
        let movie_id = ev.target.innerHTML

        window.location = `pelicula.html?${movie_id}`

    }




    

    







    






}

document.addEventListener('DOMContentLoaded', main3)