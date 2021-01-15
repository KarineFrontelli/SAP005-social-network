import { renderPage } from '../../router.js';

export const ValidacaoIdade = () => {
  const confirmacao = `
    <section class="confirmacao">
      <div class="logo">
        <img class="img-logo"  src="../img/Logo.jpeg" alt="logo da  página">
      </div>
      <div class="confirmacao__opcoes">
        <h1 class="idade">Você tem mais de 18 anos?</h1>
        <div class="botoes">
          <button id="maiorDeIdade" class="btn-maior-de-idade">Sim</button>
          <button id="menorDeIdade" class="btn-menor-de-idade" >Não</button>
        </div>
        <h2 class="aviso">Você está quase lá, aguarde até os 18 e junte-se a nós! :)</h2>
      </div>
    </section>
    <footer>Developed by @<a href="https://github.com/biacostadev" target="_blank">Bia</a>, @<a href="https://github.com/julianaads" target="_blank">Juliana</a> e @<a href="https://github.com/KarineFrontelli" target="_blank">Karine</a></footer>
  `;

  const rootElement = document.createElement('div');
  rootElement.innerHTML = confirmacao;

  const maiorDeIdade = rootElement.querySelector('#maiorDeIdade');

  maiorDeIdade.addEventListener('click', (event) => {
    event.preventDefault();
    window.history.pushState(null, null, '/login');
    renderPage();

  });

  const menorDeIdade = rootElement.querySelector('#menorDeIdade');
  const aviso = rootElement.querySelector('.aviso');
  const idade = rootElement.querySelector('.idade');

  menorDeIdade.addEventListener('click', () => {
    console.log('botão ok')
    aviso.style.visibility = "visible"
    idade.style.visibility = "hidden"
    maiorDeIdade.style.visibility = "hidden"
    menorDeIdade.style.visibility = "hidden"
  });

  return rootElement;
};