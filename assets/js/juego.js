/*

2C = TWO OF CLUBS
2D = TWO OF DIAMONDS
2H = TWO OF HEARTS
2S = TWO OF SPADES



*/

let deck = [];
const tipos = ["C", "D", "H", "S"];
const especiales = ["A", "J", "Q", "K"];

let puntosJugador = 0,
  puntosComputadora = 0;

// 
// REFERENCIA DEL HTML
// 

const btnPedir = document.querySelector("#btn-pedir");
const btnDetener = document.querySelector("#btn-detener");
const btnNuevo = document.querySelector("#btn-new");

const divCartasjugador = document.querySelector('#jugador-cartas');
const divCartasComputadora = document.querySelector('#computadora-cartas');

const puntosHTML = document.querySelectorAll('small')

const crearDeck = () => {
  for (let i = 2; i <= 10; i++) {
    for (let tipo of tipos) {
      deck.push(i + tipo);
    }
  }

  for (let tipo of tipos) {
    for (let esp of especiales) {
      deck.push(esp + tipo);
    }
  }
  // console.log(deck);

  deck = _.shuffle(deck);
  console.log(deck);
  return deck;
};

crearDeck();

// esta funcion me permite tomar una carta

const pedirCarta = () => {
  if (deck.length === 0) {
    throw "No hay cartas en el codigo";
  }

  const carta = deck.pop();

  return carta;
};

// pedirCarta();
const valorCarta = (carta) => {
  const valor = carta.substring(0, carta.length - 1);

  // SOLUCION DEL PROFESOR
  return isNaN(valor) ? (valor === "A" ? 11 : 10) : valor * 1;
  // let puntos = 0;

  //   if (isNaN(valor)) {
  //     puntos = valor === "A" ? 11 : 10;
  //   } else {
  //     puntos = valor * 1;
  //   }
  //   console.log(puntos);
  // };

  // MI SOLUCUON
  //   puntos = isNan(valor) ===  ((valor === "A" ) ? 11 : 10) ? : valor * 1;

  // console.log(puntos);
};

// 
// TURNO DE LA COMPUTADORA
// 

const turnocomputadora = ( puntosMinimos ) => {


  
  do{
    const carta = pedirCarta();

  puntosComputadora = puntosComputadora + valorCarta(carta);
  puntosHTML[1].innerText = puntosComputadora;

    // <img class="carta" src="assets/cartas/10S.png" />
  const imgCarta = document.createElement('img');
  imgCarta.src = `assets/cartas/${ carta }.png`;
  imgCarta.classList.add('carta');

  // 
  divCartasComputadora.append(imgCarta);
  if (puntosMinimos > 21){
    // alert('GANO LA COMPUTADORA');
    break;
  }

  } while( (puntosComputadora < puntosMinimos ) && (puntosMinimos <= 21)   );
  
  setTimeout(()=>{

    if (puntosComputadora === puntosMinimos ){
      alert('NADIE GANA');
    } else if (puntosMinimos > 21){
      alert('COMPUTADORA GANA!');
    }else if ( puntosComputadora > 21){
      alert('JUGADOR GANA!');
      
    }
    else{
      alert('COMPUTADORA GANA!');
    }
  }, 10);

}

// 
// eventos
// 

// btn-pedir
// la funcion especial añadida es conocida como un callback
btnPedir.addEventListener("click", () => {
  const carta = pedirCarta();

  puntosJugador = puntosJugador + valorCarta(carta);
  puntosHTML[0].innerText = puntosJugador;

  // <img class="carta" src="assets/cartas/10S.png" />
  const imgCarta = document.createElement('img');
  imgCarta.src = `assets/cartas/${ carta }.png`;
  imgCarta.classList.add('carta');


  divCartasjugador.append(imgCarta);

  if (puntosJugador > 21){
    console.warn('Has pasado de 21, perdiste.');
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnocomputadora(puntosJugador);
    
  } else if ( puntosJugador ===  21){
    console.warn('tienes 21!')
    // alert('GANASTE!');
    btnPedir.disabled = true;
    btnDetener.disabled = true;
  } 
  // else{
  //   btnDetener.active = true;
  // }


});

  btnDetener.addEventListener('click', () => {
    btnPedir.disabled = true;
    btnDetener.disabled = true;

    turnocomputadora(puntosJugador);
  })


  btnNuevo.addEventListener('click',() => {
    
    console.clear();
    deck = [];


    deck = crearDeck();
    puntosJugador = 0;
    puntosComputadora = 0;
    puntosHTML[0].innerText = 0;
    puntosHTML[1].innerText = 0;

    divCartasComputadora.innerHTML = '';
    divCartasjugador.innerHTML = '';

    btnPedir.disabled = false;
    btnDetener.disabled = false;

  })