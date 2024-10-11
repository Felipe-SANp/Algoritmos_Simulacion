function cambiarAlgoritmo() {
    var algoritmo = document.getElementById("algoritmo-selector").value;
    
    switch(algoritmo) {
        case "2":
            window.location.href = "index2.html";
            break;
        case "3":
            window.location.href = "index3.html";
            break;
        case "4":
            window.location.href = "index4.html";
            break;
        case "5":
            window.location.href = "index5.html";
            break;
        case "6":
            window.location.href = "index6.html";
            break;
        case "1":
            window.location.href = "index.html";
            break;
        case "7":
            window.location.href = "index7.html";
            break;
    }
}
// funcion para poder exportar la tabla en una imagen png 
function exportarDatos() {
    html2canvas(document.getElementById('t01'), {
        onrendered: function (canvas) {
            var link = document.createElement('a');
            link.href = canvas.toDataURL();
            link.download = 'semillas.png';
            link.click();
        }
    });
}
function exportarDatos2() {
    html2canvas(document.getElementById('t02'), {
        onrendered: function (canvas) {
            var link = document.createElement('a');
            link.href = canvas.toDataURL();
            link.download = 'semillas.png';
            link.click();
        }
    });
}
// funcion dar otro estilo a una fila por id 
function styleID(id) {
    document.getElementById(id).style.color = "white";
    document.getElementById(id).style.background = "gray";
}

function alertBlucle(index, index_2){
    alert('Algoritmo terminado.\n * Se encontró un bucle entre X' + index +' y X' + index_2 +'\n * se detiene la generación de números');
}

document.getElementById("exportarBtn").addEventListener("click", exportarDatos);
// document.getElementById("exportarBtn_").addEventListener("click", exportarDatos2);