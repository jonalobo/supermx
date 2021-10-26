const btnAgregar = document.querySelector(".agregar");
const listaProducto = document.querySelector(".lista-productos");
const mostrarProduct = document.querySelector(".contenedor")
const inputs = document.querySelectorAll("input");
const total = document.querySelector('.total-cantidad');
const btnDetalles = document.querySelector('.detalles');
const formulario = document.querySelector('.formulario')
const error = document.querySelector('.error2')

const key = 'productos'
let productos = []
let acumuladorPrecio = 0;


 document.addEventListener('DOMContentLoaded', ()=>{
   productos = productosEnMemoria()
   renderizaLocalStorage()
 })
//Evento click del boton agregar
btnAgregar.addEventListener("click", (e) => {
  e.preventDefault();
  const nombre = inputs[0].value;
  const precio = inputs[1].value;
  const descripcion = inputs[2].value;
  const serie = inputs[3].value;
  //Llamado a función de validación
  if (validacion(nombre, precio, descripcion, serie)) {
    //Siendo true se crea un objeto
    const producto = {
      nombre,
      precio,
      descripcion,
      serie,
      id: Date.now()
    };
    //El objeto se inserta en el arreglo productos
    productos.push(producto);
    agregarLista(producto);
    agregarAMemoria(productos)
    acumuladorPrecio += Number(precio); 
    total.textContent = acumuladorPrecio;
  } else {
    //Al ser false la validación envía el error llamando a la clase error
    let error1 = `<p  class="error">Error</p>`
    error.innerHTML = error1
    setTimeout(()=>{
        error.remove()
    } ,3000)
  }  
  formulario.reset()
})

//Validación de datos en los inputs
function validacion(nombre, precio, descripcion, serie) {
  if (!(nombre === "" || precio === "" || descripcion === "" || serie === "")) {
    return true
  }
}


btnDetalles.addEventListener('click',mostrar);

function mostrar(){
  mostrarProduct.innerHTML = ''
    productos.forEach(producto=>{
        const {nombre, precio, descripcion,serie, id} = producto
       let muestraDeProductos = `<article class="producto-detalle">
        <div class="contenedor-producto">
            <p>Producto: <span  class="producto">${nombre}</span></p>
            <p>Precio: <span  class="precio">${precio}</span></p>
            <p>Descripción: <span  class="descripcion">${descripcion}</span></p>
            <p>No serie: <span  class="serie">${serie}</span></p>
            <p>ID: <span  class="id">${id}</span></p>
        </div>
        <button class="btn_actualizar">Actualizar</button>
    </article>`
    mostrarProduct.innerHTML += muestraDeProductos
    })
}


function agregarLista(elemento) {
    const {nombre, precio, descripcion, serie, id} = elemento;
    let listaHTML = `<li>
                <p>${nombre}</p>
                <p style="display: none;">${descripcion}</p>
                <p style="display: none;">${id}</p>
                <p>$ <span id="precio-producto">${precio}</span><a href="#" class="enlace-borrar">x</a></p>
                </li>`
    listaProducto.innerHTML += listaHTML;
}

listaProducto.addEventListener('click', (evento)=>{
  const resultadoClick = evento.target.classList.contains('enlace-borrar')
  if (resultadoClick) {
    /* const eventoTarget = evento.target */
    let producto = evento.target.parentElement.parentElement/* .remove() */
    const numId = producto.children[2].textContent
    eliminarDeLocalStorage(numId)
    producto.remove()
  }
})

function productosEnMemoria (){
  const comprobar = JSON.parse(localStorage.getItem(key))
  if (comprobar) {
    return comprobar
  }else {
    return []
  }
}


function agregarAMemoria(arreglo) {
  localStorage.setItem(key, JSON.stringify(arreglo))
}

function renderizaLocalStorage (){
  productos.forEach(elemento => {
    agregarLista(elemento)
  });
}

function eliminarDeLocalStorage(numeroId){// recibe la serie que va a corroborar
  let nuevoArray = []
  productos.forEach(objeto => {//itera por cada elemento y desestructura el atributo serie.
    const { id } = objeto
    if (id != numeroId) {
      /* console.log(objeto) */
      nuevoArray.push(objeto)
    }
  });
  productos = nuevoArray
  agregarAMemoria(productos)
}

mostrarProduct.addEventListener('click', (evento)=>{
  
  const actualizar = evento.target.classList.contains('btn_actualizar')
  if (actualizar) {
    const html = `<button class="btn actualizar">Actualizar</button>`
    btnAgregar.style.display = 'none'

  
    formulario.innerHTML += html  
    const detalle = evento.target.classList.contains('')
    console.log(detalle)
  }
})

