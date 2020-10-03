export const templateHeader = {
    render: (page) => {

        let menu

        switch (page) {
            case 'index.html':
                menu = `
                    <li><a href="./registro.html">Registro</a></li>
                    <li><a href="./login.html">Login</a></li>
                    `
                break
            
            case 'registro.html':
                menu = `
                    <li><a href="./index.html">Inicio</a></li>
                    <li><a href="./login.html">Login</a></li>
                    `
                break

            case 'login.html':
                menu = `
                    <li><a href="./index.html">Inicio</a></li>
                    <li><a href="./registro.html">Registro</a></li>
                    `
                break

            case 'usuario.html':
                menu = `
                    <li><a href="./index.html">Inicio</a></li>
                    <li><a href="./login.html">Logout</a></li>
                    `
                break            
            case 'pelicula.html':
                menu = `
                    <li><a href="./index.html">Inicio</a></li>
                    <li><a href="./login.html">Logout</a></li>
                    `
                break 
            default:
                menu = `
                    <li><a href="./registro.html">Registro</a></li>
                    <li><a href="./login.html">Login</a></li>
                    `
                break
        }
        return `<div class="menu">
                    <ul> ${menu} </ul>
                </div>
                <h1>Mis Pelis</h1>
                `
    }
}