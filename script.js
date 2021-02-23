var preciosTienda = [[0.00, 226.90, 319.90, 458.73, 195.90, 309.91, 414.90], // CPU
                     [0.00, 149.89, 97.99, 114.90, 244.89, 139.90], // Placa_base
                     [0.00, 69.99, 109.99, 34.98, 129.99, 152.99, 181.14], // Ventilador
                     [0.00, 89.99, 90.00, 38.00, 73.00], // RAM
                     [0.00, 79.98, 69.99, 59.98, 123.99], // Caja
                     [0.00, 739.90, 1579.90, 789.90, 1629.89, 544.07, 789.90, 1649.90, 419.89], // GPU
                     [0.00, 114.99, 104.89, 97.92, 84.39, 64.99], // PSU
                     [0.00, 74.98, 138.25, 137.95, 31.78, 35.95]]; // HD

function getIndiceCategoria(id) {
    switch (id) {
        case "cpu":
            return 0;
        case "placa_base":
            return 1;
        case "ventilador":
            return 2;
        case "ram":
            return 3;
        case "caja":
            return 4;
        case "gpu":
            return 5;
        case "psu":
            return 6;
        case "hd1":
        case "hd2":
            return 7;
        default:
            return 0;
    }
}

function actualizarTotal(idTotal) {
    var precios = document.getElementsByClassName("precio");
    var total = 0;

    for (elemento of precios) {
        var precio = parseFloat(elemento.innerHTML.slice(0,-1).replace(",", "."));
        total += precio;
    }

    total = total.toFixed(2);
    document.getElementById(idTotal).innerHTML = "TOTAL: " + total.replace(".", ",") + "€";
}

function actualizarTotalCarrito(idTotal) {
    var precios = document.getElementsByClassName("precio");
    var cantidades = document.getElementsByName("num");
    var total = 0;
    var cont = 0; 

    for (elemento of precios) {
        var precio = parseFloat(elemento.innerHTML.slice(0,-1).replace(",", "."));
        if(cantidades[cont].value > 1) {
            precio += precio * (cantidades[cont].value - 1);
        }
        total += precio;
        cont ++;
    }

    total = total.toFixed(2)
    document.getElementById(idTotal).innerHTML = "TOTAL: " + total.replace(".", ",") + "€";
}

function limpiarCarrito(idTotal) {
    var filas = document.getElementsByClassName("fila");

    if(filas.length >1) {
        for (var i = 0; i < filas.length; i++) {
            filas[0].remove();
        }
    }

    document.getElementById(idTotal).innerHTML = "TOTAL: 0,00€";
}

function actualizarPlataforma(idConf, idCPU, idPlaca, idTotal) {
    seleccion = getValorSelect(idConf);

    if(seleccion == "am4"){
        setSelect(idCPU, 1);
        setSelect(idPlaca, 1);
        actualizarComponente(idCPU, "img_" + idCPU, "precio_" + idCPU, idTotal);
        actualizarComponente(idPlaca, "img_" + idPlaca, "precio_" + idPlaca, idTotal);
    }
    else if(seleccion == "1151"){
        setSelect(idCPU, 4);
        setSelect(idPlaca, 4);
        actualizarComponente(idCPU, "img_" + idCPU, "precio_" + idCPU, idTotal);
        actualizarComponente(idPlaca, "img_" + idPlaca, "precio_" + idPlaca, idTotal);
    }
    else {
        resetSelect(idCPU);
        resetSelect(idPlaca);
        resetComponente("img_" + idCPU, "precio_" + idCPU);
        resetComponente("img_" + idPlaca, "precio_" + idPlaca);
    }

    actualizarTotal(idTotal);
}

function actualizarComponente(id, idImg, idPrecio) {
    indice = getIndexSelect(id);
    seleccion = getValorSelect(id);
    document.getElementById(idImg).src = "resources/" + seleccion + ".jpg";
    precio = (preciosTienda[getIndiceCategoria(id)][indice]).toFixed(2)
    document.getElementById(idPrecio).innerHTML = precio.replace(".",",") + "€";
}

function resetConfigurador(idTotal) {
    var desplegables = document.getElementsByClassName("select");
    var select;
    for (select of desplegables) {
        resetSelect(select[0]); // id de cada select
        resetComponente("img_" + select[0], "precio_" + select[0]);
    }
    actualizarTotal(idTotal);
}

function resetComponente(idImg, idPrecio) {
    document.getElementById(idImg).src = "resources/blanco.jpg";
    document.getElementById(idPrecio).innerHTML = "0,00€";
}

// Manejo de input[type="select"]

function resetSelect(id) {
    document.getElementById(id).options[0].selected = 'selected';
}

function setSelect(id, indice) {
    document.getElementById(id).options[indice].selected = 'selected';
}

function setSelectPorValor(id, valor) {
    document.getElementById(id).value = valor;
}

function getValorSelect(id) {
    return document.getElementById(id).options[getIndexSelect(id)].value;
}

function getIndexSelect(id) {
    return document.getElementById(id).selectedIndex;
}

function validarDatos(userId, pwdId) {
    var userInput = document.getElementById(userId);    
    var pwdInput = document.getElementById(pwdId);
    var usuario = userInput.value;
    userInput.value = ""; 
    pwdInput.value = ""; 
    alert("Entrando en su cuenta, " + usuario);
}