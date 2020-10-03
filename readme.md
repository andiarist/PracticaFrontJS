# Práctica del módulo Desarrollo Frontend con JavaScript

Se carga un archivo .js por cada página diferenciada.

Los datos comunes los importamos desde el archivo **tools.js**:

 - Carga las plantillas del header y del footer. 
 - Devuelve el nombre de la tabla donde se van a almacenar los datos de los usuarios, así en caso de que queramos modificarlo, solo tenemos que cambiarlo en un archivo.

Al hacer login, una vez comprobamos contra localStorage si el usuario existe y sus datos son correctos, almacenamos el username en la variable de sessionStorage, de esta manera tenemos localizados los datos del usuario que hace login sin necesidad de pasarle ningún parámetro en la URL.

Existe una página de usuario donde se carga la lista de películas desde el API. En esta lista podemos pinchar en el ID de cada película para que nos lleve a la ficha individual. El Id de la película se envía a través de la URL como parámetro:

 - pelicula.html?IDPeli

 Desde la página de pelicula.html, cargamos la ficha haciendo otra llamada al API con el ID que extraemos de la URL.

 Se ha añadido un botón de volver al listado de películas. Como en todo momento que estamos logueados sabemos quien es a través del sessionStorage, no necesitamos pasar ningún otro argumento en la URL.







