import { templateFooter } from '../templates/footer.js'
import { templateHeader } from '../templates/header.js'

export function cargarBasicos () {

    // Cargamos las plantillas de: header y footer
    const posicion = window.location.pathname.lastIndexOf('/') + 1
    const page = window.location.pathname.slice(posicion)
    document.querySelector('header').innerHTML = templateHeader.render(page)
    document.querySelector('footer').innerHTML = templateFooter.render()

    // Cargamos la clave donde se guardan los datos
    const tablaDeUsuarios = 'usuarios'
    return tablaDeUsuarios
}