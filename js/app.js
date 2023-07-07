const $ = (nodo, documento = document.body) => documento.querySelector(nodo);

let listSrc = ['./img/piedra.png', './img/papel.png', './img/tijera.png'];
let listAlts = ['piedra', 'papel', 'tijera'];

let contadorPartidas = 0;
let contadorVictorias = 0;
let contadorDerrotas = 0;

function lanzarCartaMaquina() {

    const numAleatorio = Math.floor(Math.random() * 3);
    const alt = listAlts[numAleatorio];
    const src = listSrc[numAleatorio];

    cartaElegidaMaquina.src = src;
    cartaElegidaMaquina.alt = alt;
    return alt;
}

function lanzarCarta(carta) {

    const altMaquina = lanzarCartaMaquina();

    contenedorCartas.classList.remove('opacity-0');
    contenedorCartas.classList.add('opacity-10');

    cartaElegidaUsuario.src = carta.src;
    cartaElegidaUsuario.alt = carta.alt;

    verificarReultados(altMaquina, carta.alt);
    contadorPartidas++;
    partidas.innerText = contadorPartidas;

    contenedor.style.background = generaColorHexadecimalAleatorio();
}

function verificarReultados(maquina, usuario) {
    if (usuario == maquina) {
        setTimeout(() => agregaQuitaModal(true, '¡ Fue un empate !'), 1500);
        return;
    }
    if (usuario == 'piedra' && maquina == 'tijera' || usuario == 'tijera' && maquina == 'papel' || usuario == 'papel' && maquina == 'piedra') {
        setTimeout(() => agregaQuitaModal(true, '¡ Ganaste !'), 1500);
        contadorVictorias++;
        victorias.innerText = contadorVictorias;
    } else {
        setTimeout(() => agregaQuitaModal(true, '¡ Perdiste !'), 1500);
        contadorDerrotas++;
        derrotas.innerText = contadorDerrotas;
    }
}

function agregaQuitaModal(boolean, texto) {
    if (boolean) {
        modalResultado.classList.remove('opacity-0');
        modalResultado.classList.add('opacity-10');
        modalResultado.classList.add('z-index-10');
        modalTitle.innerText = texto;
    } else {
        modalResultado.classList.add('opacity-0');
        modalResultado.classList.remove('opacity-10');
        modalResultado.classList.remove('z-index-10');
        contenedorCartas.classList.add('opacity-0');
        contenedorCartas.classList.remove('opacity-10');
        cartaElegidaUsuario.src = '';
        cartaElegidaMaquina.src = '';
    }
}

function generaColorHexadecimalAleatorio() {
    var caracteres = '0123456789ABCDEF';
    var color = '#';

    for (var i = 0; i < 6; i++) {
        color += caracteres[Math.floor(Math.random() * 16)];
    }

    return color;
}

function debaunce(funcion) {
    let timeoutId;

    return function () {
        if(timeoutId){
            clearTimeout(timeoutId);
        }
        const contexto = this;
        const args = arguments;
        timeoutId = setTimeout(()=>{
            funcion.apply(contexto, args);
        }, 100);
    }
}

const lanzarCartaDebaunce = debaunce(lanzarCarta);

// DOM ELEMENTS
const contenedor = $('.content');
// CONTENEDOR DE LAS CARTAS FINALES
const contenedorCartas = $('#cartasFinales');
// Propiedades del modal
const modalResultado = $('#modalResult');
const modalTitle = $('#modalText');
const modalBtn = $('#modalBtn');
// CARTAS
const cartas = document.body.querySelectorAll('.carta__elegir');
const cartaElegidaUsuario = $('#cartaFinalUsuario');
const cartaElegidaMaquina = $('#cartaFinalMaquina');
// CONTADORES EN EL DOM
let partidas = $('#partidas');
let victorias = $('#victorias');
let derrotas = $('#derrotas');

// EJECUCIONES
modalBtn.addEventListener('click', () => agregaQuitaModal(false));
cartas.forEach(carta => carta.addEventListener('click', (e) => lanzarCartaDebaunce(e.target)));
