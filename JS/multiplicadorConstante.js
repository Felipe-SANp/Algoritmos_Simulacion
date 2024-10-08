// Función para obtener los D dígitos del centro de un número
function obtenerDigitosCentrales(numero, D) {
    let numStr = numero.toString().padStart(2 * D, '0');  // Asegurarse de tener al menos 2*D dígitos
    let inicio = Math.floor((numStr.length - D) / 2);
    return parseInt(numStr.substring(inicio, inicio + D));
}

// Algoritmo de multiplicador constante
function multiplicadorConstante(X0, a, n) {
    let D = X0.toString().length;  // Número de dígitos de la semilla
    let numerosPseudoaleatorios = [];
    let x_a = 0;

    for (let i = 0; i < n; i++) {
        let Y = X0 * a;  // Multiplicar la semilla por la constante
        let X1 = obtenerDigitosCentrales(Y, D);  // Obtener los D dígitos del centro
        let ri = X1 / Math.pow(10, D);  // Generar el número pseudoaleatorio

        numerosPseudoaleatorios.push(ri);  // Almacenar el número generado

        // almacenar el valor de la semilla actual
        x_a = X0;

        // Actualizar la semilla para la siguiente iteración
        X0 = X1;

        const fila = `
        <tr style="background-color: white;">
            <td>X<sub>${i}</sub></td> <!-- posicion de x -->
            <td>${a} * ${x_a}</td> <!-- representacion de mulpicacion -->
            <td>${Y}</td> <!-- valor de mulpicacion -->
            <td>${X0}</sub></sub></td> <!-- valor de xi+1 -->
            <td>${ri}</td> <!-- valor de r -->
        </tr> `;
            document.getElementById('t01').innerHTML += fila;
    }

    return numerosPseudoaleatorios;
}
document.getElementById('generarDatosBtn').addEventListener('click', function() {
    var semilla = document.getElementById('id-semilla').value;
    var constante = document.getElementById('id-constante').value;
    var n = document.getElementById('id-n').value;

    document.getElementById('t01').innerHTML =
    `<table id="t01" style="width: 860px; ">
        <tr>
            <th>X<sub>n</sub></th> <!-- posicion de x -->
            <th>a * X<sub>i</sub></th> <!-- representacion de mulpicacion -->
            <th>x<sub>i+1</th> <!-- valor de mulpicacion -->
            <th>producto</th> <!-- valor de xi+1 -->
            <th>r<sub>i</sub></th> <!-- valor de r -->
        </tr>
    </table>`;

    multiplicadorConstante(semilla, constante, n);
});

function limpiarDatos() {
    document.getElementById('id-semilla').value = '';
    document.getElementById('id-constante').value = '';
    document.getElementById('id-n').value = '';
    document.getElementById('t01').innerHTML = '';
}

document.getElementById("limpiarBtn").addEventListener("click", limpiarDatos);