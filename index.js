// Objeto para almacenar los datos de la página
var datosPagina = {
    categorias: [],
    alergenos: [],
    menus: [],
    restaurantes: []
};

var migasDePan = ["Inicio"];

function actualizarMigasDePan(nombrePagina) {
    if(nombrePagina === "Inicio") {
        migasDePan = ["Inicio"];
        return;
    }
    if(migasDePan.length === 2) {
        migasDePan = migasDePan.slice(0, migasDePan.length - 1);
    }
    migasDePan.push(nombrePagina);
}

function mostrarMigasDePan() {
    var migasDePanContainer = document.getElementById("migas-de-pan");
    var migasDePanHTML = "<ol class='breadcrumb'>";
    migasDePan.forEach(function(item, index) {
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
        { nombre: "Entrantes", platos: [
            { nombre: "Ensalada", imagen: "img/ensalada.jpg" },
            { nombre: "Croquetas", imagen: "img/croquetas.jpg" },
            { nombre: "Bravas", imagen: "img/bravas.jpg" },
            { nombre: "Calamares", imagen: "img/calamares.jpg" },
        ]},
        { nombre: "Platos Principales", platos: [
            { nombre: "Paella", imagen: "ruta/a/imagen-paella.jpg" },
            { nombre: "Pasta", imagen: "ruta/a/imagen-pasta.jpg" },
            { nombre: "Filete", imagen: "ruta/a/imagen-filete.jpg" },
            { nombre: "Pollo Asado", imagen: "ruta/a/imagen-pollo-asado.jpg" }
        ]},
        { nombre: "Postres", platos: [
            { nombre: "Tarta", imagen: "ruta/a/imagen-tarta.jpg" },
            { nombre: "Helado", imagen: "ruta/a/imagen-helado.jpg" },
            { nombre: "Flan", imagen: "ruta/a/imagen-flan.jpg" },
            { nombre: "Fruta", imagen: "ruta/a/imagen-fruta.jpg" }
        ]}
    ];    
    datosPagina.alergenos = ["Gluten", "Lactosa", "Frutos Secos", "Mariscos"];
    // Carga de otros datos como menús y restaurantes
}

// Función para mostrar las categorías en la zona central
function mostrarCategorias() {
    var zonaCentral = document.getElementById("zona-central");
    zonaCentral.innerHTML = ""; // Limpiamos el contenido existente
    datosPagina.categorias.forEach(function(categoria) {
        var categoriaHTML = document.createElement("div");
        categoriaHTML.innerHTML = `<h3>${categoria.nombre}</h3>`;
        // categoria.platos.forEach(function(plato) {
        //     categoriaHTML.innerHTML += `<p>${plato}</p>`;
        // });
        categoriaHTML.onclick = function() {
            mostrarPlatosPorCategoria(categoria.nombre);
        }
        zonaCentral.appendChild(categoriaHTML);
    });
}

// Función para mostrar platos aleatorios en la página inicial
function mostrarPlatosAleatorios() {
    var zonaCentral = document.getElementById("zona-central");
    zonaCentral.innerHTML = ""; // Limpiamos el contenido existente
    var platosAleatorios = [];
    for (var i = 0; i < 3; i++) {
        var categoriaAleatoria = datosPagina.categorias[Math.floor(Math.random() * datosPagina.categorias.length)];
        var platoAleatorio = categoriaAleatoria.platos[Math.floor(Math.random() * categoriaAleatoria.platos.length)];
        platosAleatorios.push(platoAleatorio);
    }
    var platosHTML = "<h2>Platos Aleatorios</h2>";
    platosAleatorios.forEach(function(plato) {
        platosHTML += `<p>${plato.nombre}</p>`;
    });
    zonaCentral.innerHTML = platosHTML;
}

// Función para mostrar los platos de una categoría específica
function mostrarPlatosPorCategoria(categoria) {
    var zonaCentral = document.getElementById("zona-central");
    zonaCentral.innerHTML = ""; // Limpiamos el contenido existente
    if(categoria === "Inicio") {
        mostrarPlatosAleatorios();
        actualizarMigasDePan(categoria);
        mostrarMigasDePan();
        return;
    }
    datosPagina.categorias.forEach(function(cat) {
        if (cat.nombre === categoria) {
            var categoriaHTML = document.createElement("div");
            categoriaHTML.classList.add("col-md-6");
            categoriaHTML.innerHTML = `<h3>${categoria}</h3>`;
            cat.platos.forEach(function(plato) {
                var platoHTML = document.createElement("div");
                platoHTML.innerHTML = `<img class="img-fluid" src="${plato.imagen}">`;
                platoHTML.innerHTML += `<p>${plato.nombre}</p>`;
                platoHTML.onclick = function() {
                    mostrarFichaPlato(plato);
                };
                categoriaHTML.appendChild(platoHTML);
            });
            zonaCentral.appendChild(categoriaHTML);
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
    datosPagina.alergenos.forEach(function(alergeno) {
        alergenosHTML += `<p>${alergeno}</p>`;
    });
    zonaCentral.innerHTML = alergenosHTML;
}

// Función para inicializar la página
function inicializarPagina() {
    cargarDatosIniciales();
    mostrarCategorias();
    // mostrarPlatosAleatorios();
}

// Evento onLoad para inicializar la página cuando se cargue
window.onload = inicializarPagina;
