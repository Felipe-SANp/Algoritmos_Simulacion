// Función para obtener los D dígitos del centro de un número
function obtenerDigitosCentrales(numero, D) {
    let numStr = numero.toString();  // Asegurarse que tenga al menos 2*D dígitos
    let inicio = Math.floor((numStr.length - D) / 2);
    return parseInt(numStr.substring(inicio, inicio + D));

}

// Algoritmo de productos medios
function productosMedios(X0, X1, n) {
    let D = X0.toString().length;  // Número de dígitos de la semilla
    let XnMap = {}; // Mapa para rastrear los números generados
    let x0 = 0;
    let x1 = 0;
    let i = 0;
    while (true) {
        let Y = X0 * X1;  // Multiplicar las dos semillas

        if (D % 2 == 0 && Y.toString().length % 2 != 0 || (D % 2 == 1 && Y.toString().length % 2 != 1)) {
            Y = Y.toString().padStart(Y.toString().length + 1, '0');
        }

        let X2 = obtenerDigitosCentrales(Y, D);  // Obtener los D dígitos del centro

        let ri = X2 / Math.pow(10, D);  // Generar el número pseudoaleatorio

        // guardar valores de x0 y x1
        x0 = X0;
        x1 = X1;

        // Actualizar las semillas para la siguiente iteración
        X0 = X1;
        X1 = X2;

        if (XnMap.hasOwnProperty(X2)) {
            const fila = `
            <tr style="background-color: red; color: white ;">
                <td>X<sub>${i}</sub></td> <!-- posicion de x -->
                <td>${x0}</td> <!-- valor de primer x -->
                <td>${x1}</td> <!-- valor de segundo x -->
                <td>${Y}</td> <!-- valor de producto -->
                <td>${X2}</td> <!-- valor de x extraido los 4 digitos-->
                <td>${ri}</td> <!-- valor de r -->
            </tr> `;
            document.getElementById('result' + XnMap[X2]).style.color = "white";
            document.getElementById('result' + XnMap[X2]).style.background = "blue";
            document.getElementById('t01').innerHTML += fila;
            alert('Algoritmo terminado.\n * Se encontró un valor duplicado con X' + XnMap[X2] +
                ' y el último valor X' + i +
                '\n * se detiene la generación de números');
            break;
        }

        if (n != null && i >= n) {
            break;
        }

        const fila = `
        <tr id ="result${i}" style="background-color: white;">
            <td>X<sub>${i}</sub></td> <!-- posicion de x -->
            <td>${x0}</td> <!-- valor de primer x -->
            <td>${x1}</td> <!-- valor de segundo x -->
            <td>${Y}</td> <!-- valor de producto -->
            <td>${X2}</td> <!-- valor de x extraido los 4 digitos-->
            <td>${ri}</td> <!-- valor de r -->
        </tr> `;
        document.getElementById('t01').innerHTML += fila;

        XnMap[X2] = i;  // Almacenar el número generado
        i++;
    }
}
// TODO: Validar que las semillas sean de la misma longitud
document.getElementById('generarDatosBtn').addEventListener('click', function () {
    var semilla = document.getElementById('id-semilla').value;
    var semilla2 = document.getElementById('id-semilla2').value;
    var n = parseInt(document.getElementById('id-n').value);

    // validar semillas, con longitud > 3, y ambas de la misma longitud
    if (semilla == '' || semilla.length <= 3 || semilla2 == '' || semilla2.length <= 3 || semilla.length != semilla2.length) {
        alert('Ingrese la semilla.\n * Un número entero positivo de mas de 3 dígitos\n * Misma longitud entre las semillas.');
        return;
    }

    document.getElementById('t01').innerHTML =
        `<table id="t01" style="width: 860px; ">
        <tr>
            <th>X<sub>n</sub></th> <!-- posicion de x -->
            <th>X<sub>i</sub></th> <!-- valor de primer x -->
            <th>X<sub>i+1</sub></th> <!-- valor de segundo x -->
            <th>X<sub>i</sub> * X<sub>i+1</sub></th> <!-- valor de producto -->
            <th>X<sub>i+2</sub></th> <!-- valor de x extraido los 4 digitos-->
            <th>r<sub>i</sub></th> <!-- valor de r -->
        </tr>
    </table>`;

    productosMedios(semilla, semilla2, n);
});

function limpiarDatos() {
    document.getElementById('t01').innerHTML = '';
    document.getElementById('id-semilla').value = '';
    document.getElementById('id-semilla2').value = '';
    document.getElementById('id-n').value = '';
}

document.getElementById("limpiarBtn").addEventListener("click", limpiarDatos);