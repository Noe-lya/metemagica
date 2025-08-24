//TITULO
const titulo = document.querySelector("h1");
titulo.classList.add("titulo");
titulo.innerText = "✨ Matemágica ✨";

//VARIABLES
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
let temas = JSON.parse(localStorage.getItem("temas")) || [];
const inputTema = document.querySelector("#temas-select");
const temasLista = document.querySelector("#temas-lista");
const botonAgregar = document.querySelector("#agregar-tema");
const total = document.querySelector("#total");
total.classList.add("total");
const vistaPrevia = document.querySelector("#vista-previa");
let saltoDeLinea = document.createElement("br");
const nombre = document.querySelector(".nombre");
const telefono = document.querySelector(".telefono");
const curso = document.querySelector("#curso");
const modalidad = document.querySelector(".modalidad");
const enviar = document.querySelector("#enviar");
const inputCurso = document.getElementById("curso");
const inputModalidad = document.getElementById("modalidad");

//PREARGA DE DATOS EN LOCALSTORAGE
nombre.value = localStorage.getItem("nombre") || "";
telefono.value = localStorage.getItem("telefono") || "";
curso.value = localStorage.getItem("curso") || "";
modalidad.value = localStorage.getItem("modalidad") || "";
cantidadPersonas.value = localStorage.getItem("personas") || "";
cantidadHoras.value = localStorage.getItem("horas") || "";

//FUNCIONES
async function mostrarError(mensaje) {
    await Swal.fire({
        icon: 'error',
        title: 'Error',
        text: mensaje,
        confirmButtonText: 'Ok'
    });
}

async function calcularPrecio() {
    const personas = parseInt(cantidadPersonas.value);
    const horas = parseInt(cantidadHoras.value);

    // Validaciones
    if (isNaN(personas) || personas <= 0) {
        await mostrarError("Por favor, ingresá una cantidad de personas válida (número mayor a 0).");
        return;
    }
    if (isNaN(horas) || horas <= 0) {
        await mostrarError("Por favor, ingresá una cantidad de horas válida (número mayor a 0).");
        return;
    }

    localStorage.setItem("personas", personas);
    localStorage.setItem("horas", horas);

    if (personas > 1){
        suma = 7000 * personas * horas;
    } else {
        suma = 8000 * horas;
    }

    const resultadoAnterior = document.querySelector("#resultado-precio");
    if (resultadoAnterior) resultadoAnterior.remove();

    const resultado = document.createElement("p");
    resultado.id = "resultado-precio";
    total.append(resultado);

    localStorage.setItem("total", suma);

}

function mostrarDatos() {

    const nombreValido = nombre.value.trim();
    const telefonoValido = telefono.value.trim();
    const cursoValido = curso.value.trim();
    const modalidadValida = modalidad.value.trim();

    calcularPrecio();

    const total = localStorage.getItem("total") || 0;
    const personas = localStorage.getItem("personas") || "Cantidad de personas no ingresada";
    const horas = localStorage.getItem("horas") || "Cantidad de horas no ingresada";
    const temas = JSON.parse(localStorage.getItem("temas")) || [];

    const contenedor = document.getElementById("resultado");

    contenedor.innerHTML = `
        <h2>Datos Ingresados:</h2>
        <p><strong>Nombre:</strong> ${nombreValido || "No ingresado"}</p>
        <p><strong>Teléfono:</strong> ${telefonoValido || "No ingresado"}</p>
        <p><strong>Curso:</strong> ${cursoValido || "No ingresado"}</p>
        <p><strong>Modalidad:</strong> ${modalidadValida || "No ingresado"}</p>
        <p><strong>Total:</strong> $${total}</p>
        <p><strong>Personas:</strong> ${personas}</p>
        <p><strong>Horas:</strong> ${horas}</p>
        <p><strong>Temas:</strong> ${temas.length > 0 ? temas.join(", ") : "No se ingresaron temas"}</p>
    `;
}

async function agregarTema(e) {
    e.preventDefault();
    const temasGuardados = inputTema.value.trim();

    if (temasGuardados === "") {
        await mostrarError("Por favor, ingresa un tema.");
        return;
    }
    if(temas.includes(temasGuardados)) {
        await mostrarError("El tema ya fue agregado.");
        return;        
    }

    let item = document.createElement("li");
    item.innerText = temasGuardados;
    temasLista.append(item);

    temas.push(temasGuardados);
    localStorage.setItem("temas", JSON.stringify(temas));

    inputTema.value = "";
    botonAgregar.focus();

    Swal.fire({
        icon: "info",
        title: "Tema agregado",
        text: "Recordá actualizar los datos para ver el tema en el resumen.",
        confirmButtonText: "Ok"
    });
}

enviar.addEventListener("click", async (e) => {
    e.preventDefault();

    // Validar antes de guardar
    const nombreValido = nombre.value.trim();
    const telefonoValido = telefono.value.trim();

    const confirmacion = await Swal.fire({
        title: "¿Deseas enviar los datos?",
        text: "Podrás revisarlos en la sección de resumen.",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Enviar",
        cancelButtonText: "Cancelar"
    });

    if (!confirmacion.isConfirmed) {
        return; 
    }

    localStorage.setItem("telefono", telefono.value);
    localStorage.setItem("nombre", nombre.value);
    localStorage.setItem("curso", curso.value);
    localStorage.setItem("modalidad", modalidad.value);

    await calcularPrecio();
    mostrarDatos();
    Swal.fire({
        icon: "success",
        title: "Datos enviados",
        text: "Tus datos se guardaron correctamente."
    });
});
botonAgregar.addEventListener("click", agregarTema);

//BOTÓN CONFIRMAR
let confirmarForm = document.createElement("button");
confirmarForm.type = "button";
confirmarForm.innerText = "Mostrar Datos";
confirmarForm.id = "confirmar-form";
confirmarForm.disabled = true;

total.append(saltoDeLinea);
total.append(confirmarForm);

confirmarForm.classList.add("form-submit");
confirmarForm.addEventListener("click", () => {
    mostrarDatos();
    confirmarForm.innerText = "Actualizar Datos"; 
});

//DESHABILITAR CAMPOS
inputTema.disabled = true;
botonAgregar.disabled = true;
telefono.disabled = true;
curso.disabled = true;
modalidad.disabled = true;
cantidadPersonas.disabled = true;
cantidadHoras.disabled = true;
enviar.disabled = true;

//BOTÓN BORRAR
const botonBorrar = document.createElement("button");
botonBorrar.innerText = "Borrar Datos";
botonBorrar.classList.add("form-submit");
botonBorrar.id = "borrar";
botonBorrar.type = "reset";
botonBorrar.style.display = "none";

document.body.append(botonBorrar);

botonBorrar.addEventListener("click", () => {
    localStorage.clear();
    location.reload();
});

//VALIDACIONES CAMPOS

import { validarNombre, validarTelefono, validarNumero, validarCampoAsync, validarNombreMaxCaracteres, validarTelefonoMinCaracteres} from "./validaciones.js";

nombre.addEventListener("input", async () => {
    const valor = nombre.value.trim();

    if (validarNombreMaxCaracteres(valor)) {
        Swal.fire({
            icon: "error",
            title: "Nombre inválido",
            text: "El nombre no puede contener números.",
        });

        nombre.value = "";
        telefono.disabled = true;
        curso.disabled = true;
        modalidad.disabled = true;
        cantidadPersonas.disabled = true;
        cantidadHoras.disabled = true;
        enviar.disabled = true;
    } else  {
        telefono.disabled = false;
    }
});

telefono.addEventListener("input", async () => {
    const valor = telefono.value.trim();
    if (validarTelefonoMinCaracteres(valor)) {
        Swal.fire({
            icon: "error",
            title: "Teléfono inválido",
            text: "El teléfono no debe contener letras.",
        });

        telefono.value = "";
        curso.disabled = true;
        modalidad.disabled = true;
        cantidadPersonas.disabled = true;
        cantidadHoras.disabled = true;
        enviar.disabled = true;
        
    } else {
        curso.disabled = false;
    }
});

curso.addEventListener("change", async () => {
    const valor = curso.value.trim();
    if (valor !== "") {
        modalidad.disabled = false;
    } else {
        modalidad.disabled = true;
        cantidadPersonas.disabled = true;
        cantidadHoras.disabled = true;
        enviar.disabled = true;
    }
});

modalidad.addEventListener("change", async () => {
    const valido = await validarCampoAsync(modalidad.value.trim(), v => v !== "");
    if (valido) {
        cantidadPersonas.disabled = false;
    } else {
        cantidadPersonas.disabled = true;
        cantidadHoras.disabled = true;
        enviar.disabled = true;
    }
});

cantidadPersonas.addEventListener("input", async () => {
    const valido = await validarCampoAsync(cantidadPersonas.value.trim(), v => !isNaN(v) && v > 0);
    if (valido) {
        cantidadHoras.disabled = false;
    } else {
        cantidadHoras.disabled = true;
        enviar.disabled = true;
    }
});

cantidadHoras.addEventListener("input", async () => {
    const val = cantidadHoras.value.trim();
    const valido = await validarCampoAsync(val, v => !isNaN(v) && Number(v) > 0);
    
    enviar.disabled = !valido;
    inputTema.disabled = !valido;
    botonAgregar.disabled = !valido;
    confirmarForm.disabled = !valido;
    
    if(valido) {
        inputTema.focus();
    }
});

//FETCH Y ASINCRONÍA
fetch("data/curso.json")
  .then((res) => res.json())
  .then((data) => {
    let placeholder = document.createElement("option");
        placeholder.value = "";
        placeholder.innerText = "Seleccione un curso";
        placeholder.disabled = true;
        placeholder.selected = true;
        inputCurso.appendChild(placeholder);
    data.forEach((cursoObj) => {
      let option = document.createElement("option");
      option.value = cursoObj.curso;       
      option.innerText = cursoObj.curso;   
      inputCurso.appendChild(option);
    });
  })
  .catch((error) => console.error("Error cargando cursos:", error));

fetch("data/modalidad.json")
  .then((res) => res.json())
  .then((data) => {
    let placeholder = document.createElement("option");
    placeholder.value = "";
    placeholder.innerText = "Seleccione una modalidad";
    placeholder.disabled = true;
    placeholder.selected = true;
    inputModalidad.appendChild(placeholder);
    data.forEach((modalidadObj) => {
      let option = document.createElement("option");
      option.value = modalidadObj.modalidad;
      option.innerText = modalidadObj.modalidad;
      inputModalidad.appendChild(option);
    });
  })
  .catch((error) => console.error("Error cargando modalidades:", error));

  fetch("data/temas.json")
  .then((res) => res.json())
  .then((data) => {
    let placeholder = document.createElement("option");
    placeholder.value = "";
    placeholder.innerText = "Seleccione un tema";
    placeholder.disabled = true;
    placeholder.selected = true;
    inputTema.appendChild(placeholder);

    data.forEach((tema) => {
        let option = document.createElement("option");
        option.value = tema.nombre;
        option.innerText = tema.nombre;
        inputTema.appendChild(option);
    });

  })
  
  .catch((error) => console.error("Error cargando temas:", error));
  
let ultimoBoton = setInterval(() => {
    if (cantidadHoras.value.trim() !== "" && !isNaN(cantidadHoras.value) && Number(cantidadHoras.value) > 0) {
        botonBorrar.style.display = "inline-block";
    }
}, 100);