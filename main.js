const html = document.querySelector('html')
const botonCorto = document.querySelector('.app__card-button--corto')
const botonEnfoque = document.querySelector('.app__card-button--enfoque')
const botonLargo = document.querySelector('.app__card-button--largo')
const banner = document.querySelector('.app__image')
const titulo = document.querySelector ('.app__title')
const botones = document.querySelectorAll ('.app__card-button')
const inputEnfoqueMusica = document.querySelector('#alternar-musica');

const botonIniciarPausar = document.querySelector('#start-pause');
const textoIniciarPausar = document.querySelector('#start-pause');
const playPauseIcon = botonIniciarPausar.querySelector('img');

const musica = new Audio('./sonidos/luna-rise-part-one.mp3');
const audioPlay = new Audio ('./sonidos/play.wav');
const audioPausa = new Audio ('./sonidos/pause.mp3');
const audioTiempoFinalizado = new Audio ('./sonidos/beep.mp3');

const tiempoEnPantalla = document.querySelector('#timer')

let TiempoTranscurridoEnSegundos = 1500;
let idIntervalo = null;

musica.loop = true;

inputEnfoqueMusica.addEventListener('change', () => {
    if (musica.paused) {
        musica.play().catch(error => {
            console.error('Error al reproducir el audio:', error);
        });
    } else {
        musica.pause();
    }
});


botonCorto.addEventListener('click', () => {
    TiempoTranscurridoEnSegundos = 300
    cambiarContexto('descanso-corto')
    botonCorto.classList.add('active')
})
botonEnfoque.addEventListener('click', () => {
    TiempoTranscurridoEnSegundos = 1500
    cambiarContexto('enfoque')
    botonEnfoque.classList.add('active')

})

botonLargo.addEventListener('click', () => {
    TiempoTranscurridoEnSegundos = 900
    cambiarContexto('descanso-largo')
    botonLargo.classList.add('active')

})

function cambiarContexto (contexto){
    mostrarTiempo()
    botones.forEach(function(contexto){
        contexto.classList.remove('active')
    })

    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `./imagenes/${contexto}.png`)

    switch (contexto) {
        case "enfoque":
            titulo.innerHTML = ` Optimiza tu productividad,<br>
                <strong class="app__title-strong">sumérgete en lo que importa.</strong>`
        break;

        case "descanso-corto":
            titulo.innerHTML = `¿Qué tal tomar un respiro? <strong class="app__title-strong">¡Haz una pausa corta!</strong>`
        break;

        case "descanso-largo":
            titulo.innerHTML = `Hora de volver a la superficie <strong class="app__title-strong">Haz una pausa larga.</strong>`
        break;
    }
};


const cuentaRegresiva = () => {
    if (TiempoTranscurridoEnSegundos <= 0) {
        alert('Tiempo final');
        reiniciar();
        return;
    }
    TiempoTranscurridoEnSegundos -= 1;
    console.log("Temporizador: " + TiempoTranscurridoEnSegundos);
    mostrarTiempo()
};

botonIniciarPausar.addEventListener('click', iniciarPausar);

function iniciarPausar() {
    if (idIntervalo) {
        reiniciar();
        return;
    }
    idIntervalo = setInterval(cuentaRegresiva, 1000);
    actualizarBoton('Pausar', '/imagenes/pause.png');
}

function reiniciar() {
    clearInterval(idIntervalo);
    idIntervalo = null;
    actualizarBoton('Comenzar', '/imagenes/play_arrow.png');
}

function actualizarBoton(texto, iconoSrc) {
    botonIniciarPausar.innerHTML = `<img class="app__card-primary-button-icon" src="${iconoSrc}" alt=""> ${texto}`;
}

function mostrarTiempo(){
    const tiempo = new Date (TiempoTranscurridoEnSegundos * 1000) 
    const tiempoFormateado = tiempo.toLocaleTimeString('es-MX', {minute: '2-digit', second:'2-digit'})
    tiempoEnPantalla.innerHTML = `${tiempoFormateado}`
}