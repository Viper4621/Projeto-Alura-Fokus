const html = document.querySelector("html");
const focoBt = document.querySelector(".app__card-button--foco");
const curtoBt = document.querySelector(".app__card-button--curto");
const longoBt = document.querySelector(".app__card-button--longo");
const banner = document.querySelector(".app__image");
const titulo = document.querySelector(".app__title");
const botoes = document.querySelectorAll(".app__card-button");
let tempoDecorridoEmSegundos = 1500;
let intervaloId = null;
const iniciarOuPausarBt = document.querySelector('#start-pause span');
const iniciarOuPausarBtIcone = document.querySelector('.app__card-primary-butto-icon');
const tempoNaTela = document.querySelector('#timer');


const startPauseBt = document.querySelector("#start-pause");
//id usa #nome / class usa .nome

//parte de sons
const musicaFocoInput = document.querySelector("#alternar-musica");
const musica = new Audio("/sons/luna-rise-part-one.mp3");
const beep = new Audio("/sons/beep.mp3");
const pause = new Audio("/sons/pause.mp3");
const comecar = new Audio("/sons/play.wav");

musica.loop = true;

musicaFocoInput.addEventListener("change", () => {
  if (musica.paused) {
    musica.play();
  } else {
    musica.pause();
  }
});

focoBt.addEventListener("click", () => {
//   html.setAttribute("data-contexto", "foco");
  // banner.setAttribute('src','/imagens/foco.png')
  tempoDecorridoEmSegundos = 1500;
  alterarContexto("foco");
  focoBt.classList.add("active");
});

curtoBt.addEventListener("click", () => {
//   html.setAttribute("data-contexto", "descanso-curto");
  // banner.setAttribute('src', '/imagens/descanso-curto.png')
  tempoDecorridoEmSegundos = 300;
  alterarContexto("descanso-curto");
  curtoBt.classList.add("active");
});

longoBt.addEventListener("click", () => {
//   html.setAttribute("data-contexto", "descanso-longo");
  // banner.setAttribute('src','/imagens/descanso-longo.png')
  tempoDecorridoEmSegundos = 900;
  alterarContexto("descanso-longo");
  longoBt.classList.add("active");
});

//para pegar o valor de parametro para dentro de uma função colocamos na função o parametro que desejamos
//neste caso contexto
//e nos eventlistener já colocamos para add classlist active quando clicado
//criamos a variavel de selecionar todos botoes e aproveitamos o contexto para dar remove no classlist active
function alterarContexto(contexto) {
    mostrarTempo();
  botoes.forEach(function (contexto) {
    contexto.classList.remove("active");
  });

  //função estamos pegando o data contexto igual acima e criando um contexto
  //que iramos fazer o mesmo caminho porem dentro de uma template string chamar o contexto para puxar a imagem
  html.setAttribute("data-contexto", contexto);
  banner.setAttribute("src", `/imagens/${contexto}.png`);
  switch (contexto) {
    case "foco":
      titulo.innerHTML = `Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>`;
      break;
    case "descanso-curto":
      titulo.innerHTML = `Que tal dar uma respirada?<br>
                 <strong class="app__title-strong">Faça uma pausa curta!</strong>`;
      break;
    case "descanso-longo":
      titulo.innerHTML = `Hora de voltar à superfície.<br>
        <strong class="app__title-strong">Faça uma pausa longa.</strong>`;
    default:
      break;
  }
}
//abaixo criamos a função em cima do tempo decorrido pra ir até  <= zero
//criamos um alert para quando acabar tempo
//criamos a função iniciar com intervalo de 1000 = 1 seg ir atualizando oq pedimos
//criamos uma evento de click para iniciar
//criamos a função zerar para pegar a variavel intervaloId quando chegar em null zerar
//criamos uma condição para pausar o tempo em caso de apertar novamente o botão chamando zerar detro do iniciar
//sempre damos return no final de condições para não dar loops
const contagemRegressive = () => {
  if (tempoDecorridoEmSegundos <= 0) {
    //usamos o audio de acabou dentro da função de contagem regressiva para o 0
    beep.play();
    alert("Tempo Finalizado");
    zerar();
    return;
  }
  tempoDecorridoEmSegundos -= 1;
  mostrarTempo();
};

startPauseBt.addEventListener("click", iniciarOuPausar);

function iniciarOuPausar() {
  if (intervaloId) {
    //usamos aqui o audio de pausar
    pause.play();
    zerar();
    return;
  }
  //usamos fora da condição o audio de começar
  comecar.play()
  intervaloId = setInterval(contagemRegressive, 1000);
  iniciarOuPausarBt.textContent = "Pausar"
  iniciarOuPausarBtIcone.setAttribute('src',`/imagens/pause.png`);

}

function zerar() {
  clearInterval(intervaloId);
  iniciarOuPausarBt.textContent = "Começar"
  iniciarOuPausarBtIcone.setAttribute('src',`/imagens/play_arrow.png`);
  intervaloId = null;
}

function mostrarTempo(){
    const tempo = new Date(tempoDecorridoEmSegundos * 1000);
    const tempoFormatado = tempo.toLocaleString('pt-BR',{minute: '2-digit', second: '2-digit'})
    tempoNaTela.innerHTML = `${tempoFormatado}`
}

mostrarTempo();
