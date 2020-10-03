import { cargarBasicos } from './tools.js'

function main4 () {
    const storeUsers = cargarBasicos()

    // Obtenemos el id de la pelicula de la URL
    const idPeli = window.location.search.substring(1)
    console.log('ID Peli:', idPeli)

    // Obtenemos el username de sessionStorage
    const currentUser = sessionStorage.getItem('username')
    console.log('Usuario actual:', currentUser)
    

    // Buscamos los datos del usuario en la tabla
    const users = window.localStorage.getItem(storeUsers) ?
    JSON.parse(window.localStorage.getItem(storeUsers)) : []
    let findUser = users.find( item => item.username == currentUser) 
    

    // Extraemos la API_Key para poder enviársela al API
    const clave = findUser.api_key

    // Construimos la url de la peli
    let url2 = `https://api.themoviedb.org/3/movie/${idPeli}?api_key=${clave}&language=es-ES`

    obtenerDatosAPIPeli(url2)
        
    function obtenerDatosAPIPeli (url) {    
        fetch (url)
        .then ( res => {
            console.log(res)            
            if (res.status < 200 || res.status >= 300) {
                console.log(res.statusText)
                throw new Error('HTTP Error ' + res.status)
            }
            return res.json()
        })
        .then ( datos => muestraPeli(datos) )
        .catch (error => console.log(error.message))
    }
    
    function muestraPeli (datos) {
        console.log(datos)

        document.querySelector('h1.titulo_peli').innerHTML = datos.title
        document.querySelector('.sinopsis').innerHTML = datos.overview
        document.querySelector('.fecha').innerHTML = datos.release_date
        document.querySelector('.genero').innerHTML = (datos.genres.map(item => item.name)).toString()

        document.querySelector('.poster').innerHTML = `<img src="https://image.tmdb.org/t/p/w300${datos.poster_path}" alt="">`
        
        //document.querySelector('.volver').innerHTML = `<a href="${document.referrer}">Volver a películas >>></a>`         
        //document.querySelector('.volver').innerHTML = `<a href="./usuario.html?${currentUser}">Volver a películas >>></a>`  
        document.querySelector('.volver').innerHTML = `<a href="./usuario.html">Volver a películas >>></a>`          

    }

}
document.addEventListener('DOMContentLoaded', main4)