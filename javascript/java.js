const titulo = document.querySelector("h1");
titulo.classList.add("titulo");
titulo.innerText = "✨ Matemágica ✨";

const parrafos = document.querySelectorAll("p");
parrafos.forEach((p) => {
    p.classList.add("parrafo");
});


const botones = document.querySelectorAll("button");
botones.forEach((boton) => {
    boton.classList.add("boton");
});


let cantidadPersonas = document.querySelector("input[name='personas']");
let cantidadHoras = document.querySelector("input[name='horas']");
let suma = 0;

function calcularPrecio() {
    const personas = parseInt(cantidadPersonas.value);
    const horas = parseInt(cantidadHoras.value);

    localStorage.setItem("personas", personas);
    localStorage.setItem("horas", horas);

    if (personas > 1){
        suma= 7000 * cantidadPersonas.value * cantidadHoras.value;
    } else{
        suma = 8000 * cantidadHoras.value;
    }
    
    const resultadoAnterior = document.querySelector("#resultado-precio");
    if (resultadoAnterior) resultadoAnterior.remove();

    const resultado = document.createElement("p");
    resultado.id = "resultado-precio";
    resultado.innerText = `Total: $${suma}`;
    total.append(resultado);

    localStorage.setItem("total", suma);
}

const total = document.querySelector("#total");

let saltoDeLinea = document.createElement("br");
total.append(saltoDeLinea);

let calcularTotal = document.createElement("button");
calcularTotal.innerText = "Calcular Total";
total.append(calcularTotal);

calcularTotal.classList.add("form-submit");
calcularTotal.addEventListener("click", calcularPrecio);

const inputTema = document.querySelector("#tema");
const botonAgregar = document.querySelector("#agregar");
const temasLista = document.querySelector("#lista");

botonAgregar.addEventListener("click", agregarTema);

let temas = [];

function agregarTema(e) {
    e.preventDefault();
    if (inputTema.value != "") {

        let item = document.createElement("li");
        item.innerText = inputTema.value;
        temasLista.append(item);

        temas.push(inputTema.value);
        localStorage.setItem("temas", JSON.stringify(temas));

        inputTema.value = "";
        inputTema.focus();
   
    } else {
        const vacio = document.createElement("p");
        vacio.innerText = "Entrada vacía!";
        temasLista.append(vacio);
    }

    botonAgregar.focus();
    
}

const nombre = document.querySelector(".nombre");
const telefono = document.querySelector(".telefono");
const curso = document.querySelector("#curso");
const modalidad = document.querySelector(".modalidad");
const enviar = document.querySelector("#enviar");

function guardarDatosUsuario() {
    localStorage.setItem("telefono", telefono.value);
    localStorage.setItem("nombre", nombre.value);
    localStorage.setItem("curso", curso.value);
    localStorage.setItem("modalidad", modalidad.value);
}

enviar.addEventListener("click", guardarDatosUsuario);

const botonPrimaria = document.getElementById("botonPrimaria");
const botonSecundaria = document.getElementById("botonSecundaria");

botonPrimaria.addEventListener("click", () => {
    localStorage.setItem("nivel", "Primaria");
});

botonSecundaria.addEventListener("click", () => {
    localStorage.setItem("nivel", "Secundaria");
});

const botonBorrar = document.querySelector("#borrar");
botonBorrar.addEventListener("click", () => {
    localStorage.clear();
    location.reload();
});
