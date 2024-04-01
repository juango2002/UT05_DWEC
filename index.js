// Objeto para almacenar los datos de la página
var datosPagina = {
    categorias: [],
    alergenos: [],
    menus: [],
    restaurantes: []
};

var migasDePan = ["Inicio"];

function actualizarMigasDePan(nombrePagina) {
    if (nombrePagina === "Inicio") {
        migasDePan = ["Inicio"];
        return;
    }
    if (migasDePan.length === 2) {
        migasDePan = migasDePan.slice(0, migasDePan.length - 1);
    }
    migasDePan.push(nombrePagina);
}

function mostrarMigasDePan() {
    var migasDePanContainer = document.getElementById("migas-de-pan");
    var migasDePanHTML = "<ol class='breadcrumb'>";
    migasDePan.forEach(function (item, index) {
        migasDePanHTML += `<li class='breadcrumb-item'>${item}</li>`;
    });
    migasDePanHTML += "</ol>";

    migasDePanContainer.innerHTML = migasDePanHTML;
}

// Función para cargar los datos iniciales
function cargarDatosIniciales() {
    // Aquí cargarías los objetos iniciales según lo requerido
    // Por ejemplo:
    datosPagina.categorias = [
        {
            nombre: "Entrantes", platos: [
                { nombre: "Ensalada", imagen: "img/ensalada.jpg", alergenos: ["Frutos Secos"] },
                { nombre: "Croquetas", imagen: "img/croquetas.jpg", alergenos: ["Lactosa"] },
                { nombre: "Bravas", imagen: "img/bravas.jpg", alergenos: ["Gluten", "Lactosa"] },
                { nombre: "Calamares", imagen: "img/calamares.jpg", alergenos: ["Mariscos"] }
            ]
        },
        {
            nombre: "Platos Principales", platos: [
                { nombre: "Paella", imagen: "ruta/a/imagen-paella.jpg", alergenos: ["Mariscos"] },
                { nombre: "Pasta", imagen: "ruta/a/imagen-pasta.jpg", alergenos: ["Gluten"] },
                { nombre: "Filete", imagen: "ruta/a/imagen-filete.jpg", alergenos: [] },
                { nombre: "Pollo Asado", imagen: "ruta/a/imagen-pollo-asado.jpg", alergenos: [] }
            ]
        },
        {
            nombre: "Postres", platos: [
                { nombre: "Tarta", imagen: "ruta/a/imagen-tarta.jpg", alergenos: ["Gluten", "Lactosa"] },
                { nombre: "Helado", imagen: "ruta/a/imagen-helado.jpg", alergenos: [] },
                { nombre: "Flan", imagen: "ruta/a/imagen-flan.jpg", alergenos: ["Lactosa"] },
                { nombre: "Fruta", imagen: "ruta/a/imagen-fruta.jpg", alergenos: [] }
            ]
        }
    ];
    datosPagina.alergenos = ["Gluten", "Lactosa", "Frutos Secos", "Mariscos"];

    // Añadir menús que incluyan platos de las categorías proporcionadas
    datosPagina.menus = [
        {
            nombre: "Menú del Chef",
            platos: [
                datosPagina.categorias[0].platos[0], // Ensalada
                datosPagina.categorias[1].platos[0], // Paella
                datosPagina.categorias[2].platos[0]  // Tarta
            ]
        },
        {
            nombre: "Menú Infantil",
            platos: [
                datosPagina.categorias[0].platos[1], // Croquetas
                datosPagina.categorias[1].platos[1], // Pasta
                datosPagina.categorias[2].platos[1]  // Helado
            ]
        }
    ];
}

// Función para mostrar las categorías en la zona central
function mostrarCategorias() {
    var zonaCentral = document.getElementById("zona-central");
    zonaCentral.innerHTML = ""; // Limpiamos el contenido existente
    datosPagina.categorias.forEach(function (categoria) {
        var categoriaHTML = document.createElement("div");
    categoriaHTML.innerHTML = `<h3 onclick="mostrarPlatosPorCategoria('${categoria.nombre}')">${categoria.nombre}</h3>`;
        // categoriaHTML.onclick = function () {
        //     mostrarPlatosPorCategoria(categoria.nombre);
        // }
        zonaCentral.appendChild(categoriaHTML);
    });
}

// Función para mostrar platos aleatorios en la página inicial
function mostrarPlatosAleatorios() {
    var zonaCentral = document.getElementById("zona-central");
    // zonaCentral.innerHTML = ""; // Limpiamos el contenido existente
    var platosAleatorios = [];
    for (var i = 0; i < 3; i++) {
        var categoriaAleatoria = datosPagina.categorias[Math.floor(Math.random() * datosPagina.categorias.length)];
        var platoAleatorio = categoriaAleatoria.platos[Math.floor(Math.random() * categoriaAleatoria.platos.length)];
        platosAleatorios.push(platoAleatorio);
    }
    var platosHTML = "<h2 class='w-100'>Platos Aleatorios</h2>"; // Agregamos una clase 'w-100' para que el título ocupe todo el ancho de la columna
    platosAleatorios.forEach(function (plato) {
        platosHTML += `
            <div class="col mb-4">
                <div class="card">
                    <img src="${plato.imagen}" class="card-img-top" alt="${plato.nombre}">
                    <div class="card-body">
                        <h5 class="card-title">${plato.nombre}</h5>
                    </div>
                </div>
            </div>`;
    });
    zonaCentral.innerHTML += platosHTML;
}

// Función para mostrar los platos de una categoría específica
function mostrarPlatosPorCategoria(categoria) {
    // Obtener todos los elementos de la lista de navegación
    var opciones = document.querySelectorAll('.navbar-nav .nav-link');

    // Iterar sobre cada opción y eliminar la clase 'active'
    opciones.forEach(function (opcion) {
        opcion.classList.remove('active');
    });

    // Agregar la clase 'active' solo al elemento clicado
    event.target.classList.add('active');

    var zonaCentral = document.getElementById("zona-central");
    zonaCentral.innerHTML = ""; // Limpiamos el contenido existente
    if (categoria === "Inicio") {
        mostrarCategorias();
        mostrarPlatosAleatorios();
        actualizarMigasDePan(categoria);
        mostrarMigasDePan();
        cambiarMenuNav(datosPagina.categorias, "categorias");
        return;
    }

    datosPagina.categorias.forEach(function (cat) {
        if (cat.nombre === categoria) {
            var categoriaHTML = document.createElement("div");
            categoriaHTML.classList.add("col-md-4");
            categoriaHTML.innerHTML = `<h3>${categoria}</h3><br>`;
            cat.platos.forEach(function (plato) {
                var platoHTML = document.createElement("div");
                platoHTML.innerHTML = `<img class="img-fluid" src="${plato.imagen}">`;
                platoHTML.innerHTML += `<p>${plato.nombre}</p>`;
                platoHTML.onclick = function () {
                    mostrarFichaPlato(plato);
                };
                categoriaHTML.appendChild(platoHTML);
            });
            zonaCentral.appendChild(categoriaHTML);

            cambiarMenuNav(cat.platos, "platos");
        }
    });

    actualizarMigasDePan(categoria);
    mostrarMigasDePan();
}

// Función para mostrar la ficha de un plato
function mostrarFichaPlato(plato) {
    // Crear un div para mostrar la ficha del plato
    var fichaHTML = `
        <div class="ficha-plato">
            <div class="ficha-plato-header">
                <h5 class="ficha-plato-title">${plato.nombre}</h5>
                <br>
            </div>
            <div class="ficha-plato-body" style="width: 400px;">
                <img src="${plato.imagen}" alt="${plato.nombre}" class="img-fluid">
                <br>
                <p><strong>Descripción:</strong> Descripcion de prueba</p>
                <p><strong>Precio:</strong> 20.99$</p>
            </div>
        </div>
    `;

    var zonaCentral = document.getElementById("zona-central");
    zonaCentral.innerHTML = ""; // Limpiamos el contenido existente
    zonaCentral.innerHTML = fichaHTML;

    actualizarMigasDePan(plato.nombre);
    mostrarMigasDePan();
}

// Función para mostrar la lista de alergenos
function mostrarAlergenos() {
    var zonaCentral = document.getElementById("zona-central");
    zonaCentral.innerHTML = ""; // Limpiamos el contenido existente
    var alergenosHTML = "<h2>Alergenos</h2>";
    datosPagina.alergenos.forEach(function (alergeno) {
        alergenosHTML += `<p>${alergeno}</p>`;
    });
    zonaCentral.innerHTML = alergenosHTML;
}

function cambiarMenuNav(lista, tipo) {
    var menuNav = document.getElementById("navbarNav");
    menuNav.innerHTML = "";
    var ul = document.createElement("ul");
    ul.classList.add("navbar-nav");

    opcionInicio(ul);

    lista.forEach(function (item) {
        var li = document.createElement("li");
        li.classList.add("nav-item");
        var a = document.createElement("a");
        a.classList.add("nav-link");
        a.textContent = item.nombre;
        // Agregar el evento onclick para mostrar la ficha del plato
        a.onclick = function () {
            if (tipo === "platos") {
                mostrarFichaPlato(item);
            } else if (tipo === "categorias") {
                mostrarPlatosPorCategoria(item.nombre);
            }
        };
        li.appendChild(a);
        ul.appendChild(li);
    });

    opcionesAdicionales(ul);

    menuNav.appendChild(ul);
}

function opcionInicio(ul) {
    var li = document.createElement("li");
    li.classList.add("nav-item");
    var a = document.createElement("a");
    a.classList.add("nav-link");
    a.textContent = "Inicio";
    a.onclick = function () {
        mostrarPlatosPorCategoria("Inicio");
    }
    li.appendChild(a);
    ul.appendChild(li);
}

function opcionesAdicionales(ul) {
    // Alergenos
    var li = document.createElement("li");
    li.classList.add("nav-item");
    li.classList.add("dropdown"); // Agregar la clase 'dropdown' para crear un menú desplegable
    var a = document.createElement("a");
    a.classList.add("nav-link");
    a.classList.add("dropdown-toggle"); // Agregar la clase 'dropdown-toggle' para indicar que este elemento es el control del menú desplegable
    a.href = "#";
    a.textContent = "Alérgenos";
    a.setAttribute("role", "button");
    a.setAttribute("data-bs-toggle", "dropdown"); // Agregar el atributo 'data-bs-toggle' para activar el menú desplegable
    a.setAttribute("aria-expanded", "false");
    li.appendChild(a);

    var dropdownMenu = document.createElement("ul");
    dropdownMenu.classList.add("dropdown-menu"); // Agregar la clase 'dropdown-menu' para el menú desplegable
    dropdownMenu.setAttribute("aria-labelledby", "navbarDropdown");
    datosPagina.alergenos.forEach(function (alerg) {
        var dropdownItem = document.createElement("li");
        dropdownItem.innerHTML = `<a class="dropdown-item" onclick="mostrarPlatosPorAlergeno('${alerg}')">${alerg}</a>`;
        dropdownMenu.appendChild(dropdownItem);
    });
    li.appendChild(dropdownMenu);

    ul.appendChild(li);

    // Menus
    var li = document.createElement("li");
    li.classList.add("nav-item");
    li.classList.add("dropdown"); // Agregar la clase 'dropdown' para crear un menú desplegable
    var a = document.createElement("a");
    a.classList.add("nav-link");
    a.classList.add("dropdown-toggle"); // Agregar la clase 'dropdown-toggle' para indicar que este elemento es el control del menú desplegable
    a.href = "#";
    a.textContent = "Menús";
    a.setAttribute("role", "button");
    a.setAttribute("data-bs-toggle", "dropdown"); // Agregar el atributo 'data-bs-toggle' para activar el menú desplegable
    a.setAttribute("aria-expanded", "false");
    li.appendChild(a);

    var dropdownMenu = document.createElement("ul");
    dropdownMenu.classList.add("dropdown-menu"); // Agregar la clase 'dropdown-menu' para el menú desplegable
    dropdownMenu.setAttribute("aria-labelledby", "navbarDropdown");
    datosPagina.menus.forEach(function (menu) {
        var dropdownItem = document.createElement("li");
        dropdownItem.innerHTML = `<a class="dropdown-item" onclick="mostrarPlatosPorMenu('${menu.nombre}')">${menu.nombre}</a>`;
        dropdownMenu.appendChild(dropdownItem);
    });
    li.appendChild(dropdownMenu);

    ul.appendChild(li);
}

function mostrarPlatosPorAlergeno(alergeno) {
    var zonaCentral = document.getElementById("zona-central");
    zonaCentral.innerHTML = ""; // Limpiamos el contenido existente

    var platosConAlergeno = [];
    datosPagina.categorias.forEach(function (cat) {
        var platosFiltrados = cat.platos.filter(function(plato) {
            return plato.alergenos && plato.alergenos.includes(alergeno);
        });
        platosConAlergeno = platosConAlergeno.concat(platosFiltrados);
    });

    if (platosConAlergeno.length > 0) {
        var platosHTML = "<h2 class='w-100'>" + alergeno + "</h2>"; // Título con el nombre del alérgeno
        platosConAlergeno.forEach(function (plato) {
            platosHTML += `
                <div class="col mb-4">
                    <div class="card">
                        <img src="${plato.imagen}" class="card-img-top" alt="${plato.nombre}">
                        <div class="card-body">
                            <h5 class="card-title">${plato.nombre}</h5>
                        </div>
                    </div>
                </div>`;
        });
        zonaCentral.innerHTML += platosHTML;
        cambiarMenuNav(datosPagina.categorias, "categorias");
    }

    actualizarMigasDePan(alergeno);
    mostrarMigasDePan();
}

function mostrarPlatosPorMenu(menu) {
    var zonaCentral = document.getElementById("zona-central");
    zonaCentral.innerHTML = ""; // Limpiamos el contenido existente

    // Buscar el menú en los datosPagina.menus
    var menuEncontrado = datosPagina.menus.find(function (m) {
        return m.nombre === menu;
    });

    if (menuEncontrado) {
        // Mostrar el título del menú
        var tituloMenuHTML = `<h2 class='w-100'>${menuEncontrado.nombre}</h2>`;
        zonaCentral.innerHTML += tituloMenuHTML;

        // Mostrar los platos del menú
        var platosHTML = "";
        menuEncontrado.platos.forEach(function (plato) {
            platosHTML += `
                <div class="col mb-4">
                    <div class="card">
                        <img src="${plato.imagen}" class="card-img-top" alt="${plato.nombre}">
                        <div class="card-body">
                            <h5 class="card-title">${plato.nombre}</h5>
                        </div>
                    </div>
                </div>`;
        });
        zonaCentral.innerHTML += platosHTML;
    } else {
        zonaCentral.innerHTML = "<p>El menú no fue encontrado.</p>";
    }

    // Actualizar las migas de pan
    actualizarMigasDePan(menu);
    mostrarMigasDePan();
}

// Función para inicializar la página
function inicializarPagina() {
    cargarDatosIniciales();
    mostrarCategorias();
    mostrarPlatosAleatorios();
    cambiarMenuNav(datosPagina.categorias, "categorias");

}

// Evento onLoad para inicializar la página cuando se cargue
window.onload = inicializarPagina;
