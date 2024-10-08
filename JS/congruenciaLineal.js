// Función para calcular el máximo común divisor (MCD)
function gcd(a, b) {
    while (b !== 0) {
        [a, b] = [b, a % b];
    }
    return a;
}

function esPrimo(n) {
    for(let i = 2; i < n; i++)
        if(n % i === 0) return false;
    return n > 1;
}

// Función para encontrar el número primo a la izquierda/derecha más cercano a m
function primoMasCercano(m) {
    let num = m;
    while (!esPrimo(num) && num > 2) {
      num--;
    }
    return num;
}

// Función para generar números pseudoaleatorios usando el algoritmo de congruencia lineal
function congruenciaLineal(X0, k, g) {
    let x_a = 0;
    let m = Math.pow(2, g);  // m = 2^g
    let n = m;             // N = m = 2^g
    let a = 1 + 4 * k;       // a = 1 + 4k
    let c = primoMasCercano(m); // Seleccionamos primo mas cercano a m
    let numerosPseudoaleatorios = [];
    let Xi = X0;  // Semilla inicial

    // Verificar que c es relativamente primo con m o que ambos son 2
    if ((gcd(c, m) !== 1) && !(c == 2 && m == 2)) {
        console.error("Error: 'c' no es relativamente primo con 'm'.");
        return;
    }
    
    for (let i = 0; i < n; i++) {
        let oper = a * Xi + c;  // Operación a * Xi + c
        
        // almacenar xi antes de que se modifique
        x_a = Xi;
        Xi = oper % m;  // Fórmula de congruencia lineal
        let ri = Xi / (m - 1);  // Normalizar el valor entre 0 y 1
        numerosPseudoaleatorios.push(ri);  // Almacenar el número generado

        const fila = `
        <tr style="background-color: white;">
            <td>X<sub>${i}</sub></td> <!-- posicion de x -->
            <td>${a} * ${x_a}</sub> + ${c}</td> <!-- valor de a * xn + c -->
            <td>${oper} MOD ${m}</td> <!-- valor a * xn + c MOD M -->
            <td>${Xi}</td> <!-- valor de xn+1-->
            <td>${ri}</td> <!-- valor de ri = xn+1 / M-1-->
        </tr> `;
            document.getElementById('t01').innerHTML += fila;
    }

    return numerosPseudoaleatorios;
}

document.getElementById('generarDatosBtn').addEventListener('click', function() {
    var semilla = document.getElementById('id-semilla').value;
    var k = document.getElementById('id-k').value;
    var g = document.getElementById('id-g').value;
    
    document.getElementById('t01').innerHTML =
    `<table id="t01" style="width: 860px; ">
        <tr>
            <th>X<sub>n</sub></th> <!-- posicion de x -->
            <th>a * X<sub>i</sub> + C</th> <!-- valor de a * xn + c -->
            <th>a * X<sub>i</sub> + C MOD M</th> <!-- valor a * xn + c MOD M -->
            <th>X<sub>i+1</sub></th> <!-- valor de xn+1 -->
            <th>r<sub>i</sub> = X<sub>i+1</sub> / M-1</th> <!-- valor de ri = xn+1 / M-1-->
        </tr>
    </table>`;

    congruenciaLineal(semilla, k, g);
});

function limpiarDatos() {
    document.getElementById('id-semilla').value = '';
    document.getElementById('id-k').value = '';
    document.getElementById('id-g').value = '';
    document.getElementById('t01').innerHTML = '';
}
document.getElementById("limpiarBtn").addEventListener("click", limpiarDatos);