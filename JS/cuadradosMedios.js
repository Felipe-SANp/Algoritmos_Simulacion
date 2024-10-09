// Función para generar números pseudoaleatorios usando el método de cuadrados medios
function cuadradosMedios(semilla, n) {
    let D = semilla.toString().length; // Número de dígitos de la semilla
    let X = semilla;
    let X_a = semilla;
    let XnMap = {}; // Mapa para rastrear los números generados

    let i = 0;
    while (true) {
        let Y = X * X; // Elevar la semilla al cuadrado
        let YStr = Y.toString();
        X_a = X;
        
        // Asegurarse de tener 2*D dígitos (rellenar con ceros)
        if(D % 2 == 0 && YStr.length % 2 != 0){
            YStr = YStr.padStart(YStr.length + 1, '0');
        }
        if(D % 2 == 1 && YStr.length % 2 != 1){
            YStr = YStr.padStart(YStr.length + 1, '0');
        }
        
        // Extraer los D dígitos del centro
        let centro = Math.floor(YStr.length / 2);
        let inicio = Math.max(0, centro - Math.floor(D / 2));
        let Xn = YStr.substring(inicio, inicio + D);
        
        // Generar el número pseudoaleatorio entre 0 y 1
        let rn = `0.${Xn}`;

        // Actualizar la semilla
        X = parseInt(Xn);

        if(XnMap[Xn] || (n != null && i >= n)){
            break;
        }

        const fila = `
        <tr style="background-color: white;">
            <td>X<sub>${i}</sub></td> <!-- posicion de x -->
            <td>${X_a}</td> <!-- valor de x -->
            <td>${Y}</td> <!-- valor de x^2 -->
            <td>${Xn}</td> <!-- valor de x extraido los 4 digitos-->
            <td>${rn}</td> <!-- valor de r -->
        </tr> `;
        document.getElementById('t01').innerHTML += fila;
        
        // Agregar Xn al mapa
        XnMap[Xn] = true;

        i++;
    }
}

document.getElementById('generarDatosBtn').addEventListener('click', function() {
    var semilla = document.getElementById('id-semilla').value;
    var n = parseInt(document.getElementById('id-n').value);

    document.getElementById('t01').innerHTML =
    `<table id="t01" style="width: 860px; ">
        <tr>
            <th>X<sub>n</sub></th> <!-- posicion de x -->
            <th>X<sub>i</sub></th> <!-- valor de x -->
            <th>X<sub>i</sub><sup>2</sup></th> <!-- valor de x^2 -->
            <th>X<sub>i</sub></th> <!-- valor de x extraido los 4 digitos-->
            <th>r<sub>i</sub></th> <!-- valor de r -->
        </tr>
    </table>`;

    cuadradosMedios(semilla, n);
});

function limpiarDatos() {
    document.getElementById('id-semilla').value = '';
    document.getElementById('id-n').value = '';
    document.getElementById('t01').innerHTML = '';
}
document.getElementById("limpiarBtn").addEventListener("click", limpiarDatos);