//FUNCION CONSTRUCTORA

function Polo(id,nombre, precio, imagen) {
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
    this.imagen = imagen
}

//AGREGO MIS PRODUCTOS EN UNA LISTA
let polos = [
    new Polo(1,"Manga corta - Azucena", 20, "./img/azucena negro.jpg"),
    new Polo(2,"Manga larga - Cuello Medio", 30, "./img/cuellomediohabano.jpg"),
    new Polo(3,"Manga corta - Off Shoulder", 18, "./img/offnegro.jpg"),
    new Polo(4,"Manga corta - Jazmin", 22,"./img/jazmin.jpg"),
    new Polo(5,"Manga corta - Maffer", 18, "./img/maffer.jpg"),
    new Polo(6,"Manga corta - Tiziana", 20, "./img/tiziana.jpg")
];

// fetch("./productos.json")
//     .then(response => response.json())
//     .then(data => {
//         polos = data;
//         mostrarPolos(polos);
//     }
// )

function buscarPolo(){
    const body = document.querySelector('body');

    const input = document.getElementById('filtrarPolo').value ;
    const ingresa = input.trim().toLowerCase();
    const resultado = polos.filter((polo) => polo.nombre.toLowerCase().includes(ingresa));

    if(resultado.length > 0){
        const container = document.createElement('div');
        container.classList.add('card-container');// para poner estilos

        resultado.forEach((polo) => {
            const card = document.createElement('div');
            card.classList.add('card');

            const nombre = document.createElement('h2');
            nombre.textContent = polo.nombre;
            card.appendChild(nombre);

            const precio = document.createElement('p');
            precio.textContent = `Precio: ${polo.precio}`;
            card.appendChild(precio);
            container.appendChild(card);
        });
        body.appendChild(container);
    }
}
// buscarPolo();


//Mostrar productos
function mostrarPolos(){
    const seccionPolos = document.querySelector("#seccion-polos");
    polos.forEach(polo => {
        const div = document.createElement("div");
        div.classList.add("tarjeta-polo");
        div.id=`${polo.id}`
        div.innerHTML = `
        <div class="card" style="width: 18rem;">
            <img class="imagen-polo" src="${polo.imagen}">
            <div class="tarjeta-especificacion">
                <h3 class="producto-modelo">${polo.nombre}</h3>
                <p class="producto-precio">S/.${polo.precio}</p>
                <button class="polo-agregar" id="${polo.id}">Agregar al carrito</button>
            </div>
        </div>`;
    seccionPolos.append(div);
    })

    const listaPolos = document.querySelectorAll(".tarjeta-polo");
    listaPolos.forEach(polo => polo.addEventListener('click', (e) => agregarProducto(e.currentTarget)));
}
mostrarPolos(polos);

// funcion para agregar productos
let polosAgregados = [];
const polosAgregadosLocalStorage = JSON.parse(localStorage.getItem("polosAgregados"));
if (polosAgregadosLocalStorage) {
    polosAgregadosLocalStorage.map(objeto => polosAgregados.push((objeto)));
    localStorage.setItem("polosAgregados", JSON.stringify(polosAgregados));
}


let total = 0;
const totalLocalStorage = JSON.parse(localStorage.getItem("total"));
if (totalLocalStorage) {
    localStorage.setItem("total", JSON.stringify(total));
}


function verificarPolo(poloCarrito) {

    const productoBusqueda = polosAgregados.find(i => i.id == poloCarrito);

    if (productoBusqueda == undefined) {
        const polo = polos.find(i => i.id == poloCarrito);
        polosAgregados.push(polo);
        localStorage.setItem("polosAgregados", JSON.stringify(polosAgregados));
        console.log("Producto Nuevo agregado");
    }
    //libreria sweet alert//
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Producto agregado al carrito',
        showConfirmButton: true,
        timer: 1000
    })
};

function agregarProducto(contPolo) {
    const poloId = parseInt(contPolo.id);
    
    verificarPolo(poloId);
    precioTotal();
    mostrarTotal();
}

function precioTotal() {
    total = 0;
    console.log(polosAgregados);
    for (let i = 0; i < polosAgregados.length; i++) {
        if (polosAgregados[i]) {
            const precioFinal = polosAgregados[i].precio;
            console.log("precioFinal", precioFinal);
            total += precioFinal;
            }
    }
    console.log("total", total);
    localStorage.setItem("total", JSON.stringify(total));
    
    return total;
}

function mostrarTotal() {
    const carroTotal = document.querySelector(".total-carro");
    carroTotal.innerHTML = `${total}`;
}

const botonEliminar = document.getElementById("botonEliminar");
botonEliminar.addEventListener("click", vaciarLista);

function vaciarLista() {
    polosAgregados = [];
    localStorage.clear();
    precioTotal();
    mostrarTotal();
}