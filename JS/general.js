// Módulo para manejar el menú y las acciones principales
var Menu = (function () {
    function exportarDatos() {
        html2canvas(document.getElementById('t02'), {
            onrendered: function (canvas) {
                var link = document.createElement('a');
                link.href = canvas.toDataURL();
                link.download = 'semillas.png';
                link.click();
            }
        });
    }

    function limpiarDatos() {
        document.getElementById('t01').innerHTML = "";
        document.getElementById('t02').innerHTML = "";
        document.getElementById("id-semilla").value = "";
        document.getElementById("id-m").value = "";
        document.getElementById("id-n").value = "";
        document.getElementById("id-row-est").style.display = "none";
        document.getElementById("tabla-1").style.display = "none";
        document.getElementById("tabla-2").style.display = "none";
    }

    return {
        exportarDatos: exportarDatos,
        limpiarDatos: limpiarDatos
    };

})();

// Módulo para validación de datos
var Validacion = (function () {

    function validarSemilla(semilla) {
        if (semilla == "" || parseInt(semilla) <= 0) {
            return false;
        }
        return true;
    }

    function validarParametros(m) {
        if (isNaN(m) || m <= 0) {
            alert("Ingrese un valor válido para 'm'.");
            return false;
        }
        return true;
    }

    return {
        validarSemilla: validarSemilla,
        validarParametros: validarParametros
    };

})();

// Módulo para manejar la generación de columnas
var GeneradorColumnas = (function () {

    function generarColumnas() {
        document.getElementById('t01').innerHTML =
            `<table id="t01" style="width: 520px; ">
                <tr>
                    <th id="tf-1" value="0">X<sub>i</sub></th>
                    <th>Valor</th>
                </tr>
            </table>`;
        var semilla = document.getElementById("id-semilla").value;

        // Validación de la semilla
        if (!Validacion.validarSemilla(semilla)) {
            alert("Por favor llene todos los campos de forma correcta.");
            return;
        }

        crearSemillas(parseInt(semilla));
        document.getElementById("id-row-est").style.display = "block";
        document.getElementById("tabla-1").style.display = "block";
        document.getElementById("tabla-2").style.display = "block";
    }

    function crearSemillas(seed) {
        for (var k = 1; k < seed + 1; k++) {
            var fila = `
            <tr style="background-color: white;">
                <td>X<sub>${k}</sub></td>
                <td><input type="number" id="id-semilla${k}" placeholder=" semilla ${k}"></td>
            </tr>`;
            document.getElementById('t01').innerHTML += fila;
        }
    }

    return {
        generarColumnas: generarColumnas
    };

})();

// Módulo para la generación de datos y aplicación del algoritmo
var GeneradorDatos = (function () {

    function generarDatos() {
        var m = parseInt(document.getElementById("id-m").value);
        var n = parseInt(document.getElementById("id-n").value);

        if (!Validacion.validarParametros(m)) {
            return;
        }

        document.getElementById('t02').innerHTML =
            `<table id="t02" style="width: 580px; ">
                <tr>
                    <th>X<sub>i</sub></th>
                    <th>X<sub>i+1</sub> + X<sub>i-n</sub></th>
                    <th>(X<sub>i+1</sub> + X<sub>i-n</sub>) MOD m</th>
                    <th>r<sub>i</sub> = X<sub>i</sub>/m-1</th>
                </tr>
            </table>`;

        var s = document.getElementById("id-semilla").value;
        var length = parseInt(s);
        const semillasInic = [];

        for (var k = 0; k < length; k++) {
            var id = document.getElementById("id-semilla" + (k + 1)).value;
            semillasInic[k] = parseInt(id);
        }

        ejecutarAlgoritmo(semillasInic, m, n);
    }

    function ejecutarAlgoritmo(semillas, m, n) {
        const buffer = new Array(semillas.length);
        const conjunto = new Set();
        const mapValores = new Map(); 

        for (let i = 0; i < semillas.length; i++) {
            buffer[i] = Number(semillas[i]);
            conjunto.add(buffer[i]);
        }

        let i = semillas.length;
        let a = 0; 
        while (true) {
            const x_i_n = buffer[i - 1] + buffer[i - semillas.length];
            const nuevoValor = x_i_n % m;
            const result = nuevoValor / (m - 1);

            if (conjunto.has(result)) {
                const index = parseInt(mapValores.get(result));
                const fila = `
                    <tr style="background-color: white; color:red;">
                        <td>X<sub>${i + 1}</sub></td>
                        <td>${buffer[i - 1]} + ${buffer[i - semillas.length]}</td>
                        <td>${x_i_n} mod ${m}</td>
                        <td>${result}</td>
                    </tr>`;
                document.getElementById('result'+index).style.color = "blue";
                document.getElementById('t02').innerHTML += fila;
                break;
            }

            if(n != null && i >= semillas.length + n){
                break;
            }

            buffer.push(nuevoValor);
            conjunto.add(result);
            mapValores.set(result, a); 

            const fila = `
            <tr id="result${a}" style="background-color: white;">
                <td>X<sub>${i + 1}</sub></td>
                <td>${buffer[i - 1]} + ${buffer[i - semillas.length]}</td>
                <td>${x_i_n} mod ${m}</td>
                <td>${result}</td>
            </tr>`;
            document.getElementById('t02').innerHTML += fila;

            i++;
            a++;
        }
    }

    return {
        generarDatos: generarDatos
    };

})();

// Eventos de botones
document.getElementById("exportarBtn").addEventListener("click", Menu.exportarDatos);
document.getElementById("limpiarBtn").addEventListener("click", Menu.limpiarDatos);
document.getElementById("generarColumnasBtn").addEventListener("click", GeneradorColumnas.generarColumnas);
document.getElementById("generarDatosBtn").addEventListener("click", GeneradorDatos.generarDatos);