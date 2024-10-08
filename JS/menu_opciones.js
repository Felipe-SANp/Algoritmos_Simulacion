function cambiarAlgoritmo() {
    var algoritmo = document.getElementById("algoritmo-selector").value;
    var titulo = document.getElementById("titulo");
    
    switch(algoritmo) {
        case "cuadrados-medios":
            window.location.href = "index2.html";
            break;
        case "productos-medios":
            window.location.href = "index3.html";
            break;
        case "multiplicador-constante":
            window.location.href = "index4.html";
            break;
        case "lineal":
            window.location.href = "index5.html";
            break;
        case "congruencial-multiplicativo":
            window.location.href = "index6.html";
            break;
        case "congruencial-aditivo":
            window.location.href = "index1.html";
            break;
        default:
            titulo.textContent = "Seleccione un método";
    }
}