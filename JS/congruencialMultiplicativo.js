// Función para verificar si un número es impar
function esImpar(numero) {
    return numero % 2 !== 0;
}

// Función para generar números pseudoaleatorios usando el algoritmo congruencial multiplicativo
function congruencialMultiplicativo(X0, k, g) {
    // Verificar que la semilla sea impar
    if (!esImpar(X0)) {
        console.error("La semilla X0 debe ser impar.");
        return;
    }
    let x_a = 0;
    // Calcular los valores de acuerdo a las reglas
    let m = Math.pow(2, g);  // m = 2^g
    let a = 5 + 8 * k;       // a = 5 + 8k (puedes elegir entre esta fórmula o 5 + 8k)
    let n = m / 4;           // Máximo periodo de vida N = m/4
    let numerosPseudoaleatorios = [];
    
    let Xi = X0;  // Iniciar con la semilla

    // Generar los números pseudoaleatorios
    for (let i = 0; i < n; i++) {
        // guardar el valor de xi antes de que se modifique
        x_a = Xi;
        let oper = a * Xi;  // Operación a * Xi
        Xi = oper % m;  // Fórmula del algoritmo congruencial multiplicativo
        let ri = Xi / (m - 1);  // Normalizar el valor entre 0 y 1
        numerosPseudoaleatorios.push(ri);  // Almacenar el número generado

        const fila = `
        <tr style="background-color: white;">
            <td>X<sub>${i+1}</sub></td> <!-- posicion de x -->
            <td>${a} * ${x_a}</td> <!-- valor de a * xi -->
            <td>${oper} MOD ${m}</td> <!-- valor (a * xi) MOD M -->
            <td>${Xi}</td> <!-- valor de xi -->
            <td>${Xi} / ${m-1}</td> <!-- valor de xi+1/M-1 -->
            <td>${ri}<!-- valor de ri = xn+1 / M-1-->
        </tr> `;
            document.getElementById('t01').innerHTML += fila;
    }

    return {
        numeros: numerosPseudoaleatorios,
        periodo: n
    };
}

document.getElementById('generarDatosBtn').addEventListener('click', function() {
    var semilla = document.getElementById('id-semilla').value;
    var k = document.getElementById('id-k').value;
    var g = document.getElementById('id-g').value;
    
    document.getElementById('t01').innerHTML =
    `<table id="t01" style="width: 860px; ">
        <tr>
            <th>X<sub>i</sub></th> <!-- posicion de x -->
            <th>a * X<sub>i-1</sub></th> <!-- valor de a * xi -->
            <th>a * X<sub>i-1</sub> MOD M</th> <!-- valor (a * xi) MOD M -->
            <th>X<sub>i</sub></th> <!-- valor de xi -->
            <th>X<sub>i</sub> / M-1</th> <!-- valor de xi+1/M-1 -->
            <th>r<sub>i</sub> = X<sub>i</sub> / M-1</th> <!-- valor de ri = xn+1 / M-1-->
        </tr>
    </table>`;

    // TODO: k y g deben ser números enteros, la semilla debe ser un numero entero impar
    congruencialMultiplicativo(semilla, k, g);
});

function limpiarDatos() {
    document.getElementById('t01').innerHTML = '';
    document.getElementById('id-semilla').value = '';
    document.getElementById('id-k').value = '';
    document.getElementById('id-g').value = '';
}
document.getElementById('limpiarBtn').addEventListener('click', limpiarDatos); 