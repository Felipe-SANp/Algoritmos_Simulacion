// Función para verificar si un número es impar
function esImpar(numero) {
    return numero % 2 !== 0;
}

// Función para verificar si un número es par
function esPar(numero) {
    return numero % 2 === 0;
}

// Función para verficar si m = 2^k
function esPotenciaDeDos(m) {
    return (m & (m - 1)) === 0;
}

// Funcion para validar b, (b-1) mod 4 = 1
function validarB(b) {
    return (b - 1) % 4 === 1;
}

// Algoritmo congruencial cuadrático
function congruencialCuadratico(X0, m, a, b, c) {
    let n = m;
    // Verificar que 'a' sea par y 'c' sea impar
    if (!esPar(a)) {
        console.error("El valor de 'a' debe ser un número par.");
        return;
    }
    if (!esImpar(c)) {
        console.error("El valor de 'c' debe ser un número impar.");
        return;
    }
    // Verificar que 'm' sea una potencia de dos
    if (!esPotenciaDeDos(m)) {
        console.error("El valor de 'm' debe ser una potencia de dos.");
        return;
    }
    // Verificar que '(b-1) mod 4 = 1'
    if (!validarB(b)) {
        console.error("El valor de 'b' debe cumplir con la condición (b-1) mod 4 = 1.");
        return;
    }

    let numerosPseudoaleatorios = [];
    let Xi = X0;  // Semilla inicial

    for (let i = 0; i < n; i++) {
        Xi = (a * Xi ** 2 + b * Xi + c) % m;  // Fórmula del algoritmo congruencial cuadrático
        let ri = Xi / (m - 1);  // Normalizar el valor entre 0 y 1
        numerosPseudoaleatorios.push(ri);  // Almacenar el número generado
    }

    return numerosPseudoaleatorios;
}
