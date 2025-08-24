export function validarNombre(valor) {
  return valor.trim() !== "" && !/\d/.test(valor);
}

export function validarTelefono(valor) {
  return valor.trim() !== "" && !isNaN(valor) && valor.length >= 6;
}

export function validarNumero(valor) {
  return !isNaN(valor) && Number(valor) > 0;
}

export function validarCampoAsync(valor, validacion) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(validacion(valor));
        }, 300);
    });
}

export function validarNombreMaxCaracteres(valor) {
  return valor.length >= 1 && /\d/.test(valor); 
}

export function validarTelefonoMinCaracteres(valor) {
  return /[a-zA-Z]/.test(valor);
}
