
var validador = (function () {
    // Función para verificar si un número es impar
    function esImpar(numero) {
        if (numero % 2 === 0) {
            console.error("El valor de 'c' debe ser un número impar.");
            return;
        }
    }

    // Función para verificar si un número es par
    function esPar(numero) {
        if (numero % 2 !== 0) {
            console.error("El valor de 'a' debe ser un número par.");
            return;
        }
    }

    // Función para verficar si m = 2^k
    function esPotenciaDeDos(m) {
        if ((m & (m - 1)) !== 0) {
            console.error("El valor de 'm' debe ser una potencia de dos.");
            return;
        }
    }

    // Funcion para validar b, (b-1) mod 4 = 1
    function validarB(b) {
        if ((b - 1) % 4 !== 1) {
            console.error("El valor de 'b' debe cumplir con la condición (b-1) mod 4 = 1.");
            return;
        }
    }

    return {
        esImpar: esImpar,
        esPar: esPar,
        esPotenciaDeDos: esPotenciaDeDos,
        validarB: validarB
    };

})();

// Algoritmo congruencial cuadrático
function congruencialCuadratico(X0, m, a, b, c) {
    validador.esPar(a);
    validador.esImpar(c);
    validador.validarB(b);
    validador.esPotenciaDeDos(m);
    let n = m + 1;
    let numerosPseudoaleatorios = [];
    let Xi = X0;  // Semilla inicial
    let x_i = 0;
    let x_c = 0;
    let x_a = 0;
    let x_b = 0;

    for (let i = 0; i < n; i++) {
        // Fórmula del algoritmo congruencial cuadrático
        x_i = Xi;
        x_c = Xi ** 2;
        x_a = a * x_c;
        x_b = x_a + b * Xi + c;
        Xi = x_b % m;  
        let ri = Xi / (m - 1);  // Normalizar el valor entre 0 y 1
        numerosPseudoaleatorios.push(ri);  // Almacenar el número generado

        const fila = `
        <tr style="background-color: white;">
            <td>X<sub>${i}</sub></td> <!-- posicion de x -->
            <td>${a} * ${x_c}</td> <!-- representacion a * xi^2 -->
            <td>${x_a} + ${b} * ${x_i} + ${c}</td> <!-- representacion de a * xi^2 + b * xi + c -->
            <td>${x_b} MOD ${m}</td> <!-- representacion de resultado MOD M -->
            <td>${Xi}</td> <!-- resultado de lo anterior -->
            <td>${Xi} / ${m-1}</td> <!-- ri = Xi+1/M-1 -->
            <td>${ri}</td> <!-- ri -->
        </tr> `;
            document.getElementById('t01').innerHTML += fila;
    }

    return numerosPseudoaleatorios;
}

document.getElementById('generarDatosBtn').addEventListener('click', function() {
    var semilla = document.getElementById('id-semilla').value;
    var m = document.getElementById('id-m').value;
    var a = document.getElementById('id-a').value;
    var b = document.getElementById('id-b').value;
    var c = document.getElementById('id-c').value;

    document.getElementById('t01').innerHTML =
    `<table id="t01" style="width: 860px; ">
        <tr>
            <th>X<sub>i</sub></th> <!-- posicion de x -->
            <th>a * X<sub>i</sub><sup>2</sup></th> <!-- representacion a * xi^2 -->
            <th>a * X<sub>i</sub><sup>2</sup> + b + c</th> <!-- representacion de a * xi^2 + b * xi + c -->
            <th>a * X<sub>i</sub><sup>2</sup> + b + c MOD m</th> <!-- representacion de resultado MOD M -->
            <th>X<sub>i+1</sub></th> <!-- resultado de lo anterior -->
            <th>r<sub>i</sub> = X<sub>i+1</sub> / M-1</th> <!-- ri = Xi+1/M-1 -->
            <th>r<sub>i</sub></th> <!-- ri -->
        </tr>
    </table>`;
    congruencialCuadratico(parseInt(semilla), parseInt(m), parseInt(a), parseInt(b), parseInt(c));
});

function limpiarDatos() {
    document.getElementById('id-semilla').value = '';
    document.getElementById('id-m').value = '';
    document.getElementById('id-a').value = '';
    document.getElementById('id-b').value = '';
    document.getElementById('id-c').value = '';
    document.getElementById('t01').innerHTML = '';
}
document.getElementById('limpiarBtn').addEventListener('click', limpiarDatos);