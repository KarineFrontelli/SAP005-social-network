import { Google, Facebook, Email } from '../../services/index.js';

import { renderPage } from '../../router.js';

export const Login = () => {
  const btnGoogle = `
    <section class="login">
      <div class="logo">
        <img class="img-logo"  src="../img/Logo.jpeg" alt="logo da  página">
      </div>
      <div class="login-opcoes">
        <form class="order-login">
          <div>
            <input class="input-login" type="email" id="inputEmail" placeholder="Email *"/>
          </div>
          <div>
            <input class="input-login" type="password" id="inputSenha"  placeholder="Senha *"/>
          </div>
            <button id="btnEmail" class="btn-Login">Login</button>
            <p class="login-com"> Ou faça login com...</p>
        </form>
        <div class="outros-logins">
          <button id="btnGoogle" class="btn-Google">Google</button>
          <button id="btnFacebook" class="btn-Facebook" >Facebook</button>
        </div>
        <div class="criar-conta">
          <button class="link criar-Cadastro" id="criarCadastro">Não é membro? Criar conta</button>
        </div>
      </div>
    </section>
    <footer>Developed by @<a href="https://github.com/biacostadev" target="_blank">Bia</a>, @<a href="https://github.com/julianaads" target="_blank">Juliana</a> e @<a href="https://github.com/KarineFrontelli" target="_blank">Karine</a></footer>
  `;

  const rootElement = document.createElement('div');
  rootElement.innerHTML = btnGoogle;

  const loginGoogle = rootElement.querySelector('#btnGoogle');

  loginGoogle.addEventListener('click', (event) => {
    event.preventDefault();
    Google().then(() => {
      window.history.pushState(null, null, '/home');
      renderPage();
    }).catch(() => {
    });
  });

  const loginFacebook = rootElement.querySelector('#btnFacebook');

  loginFacebook.addEventListener('click', (event) => {
    event.preventDefault();
    Facebook().then(() => {
      window.history.pushState(null, null, '/home');
      renderPage();
    }).catch(() => {
    });
  });

  const loginEmail = rootElement.querySelector('#btnEmail');

  loginEmail.addEventListener('click', (event) => {
    event.preventDefault();
    const email = document.getElementById('inputEmail').value;
    const senha = document.getElementById('inputSenha').value;
    Email(email, senha).then(() => {
      window.history.pushState(null, null, '/home');
      renderPage();
    }).catch(() => {
    });
  });

  const irParaPaginaCadastro = rootElement.querySelector('#criarCadastro');

  irParaPaginaCadastro.addEventListener('click', (event) => {
    event.preventDefault();

    window.history.pushState(null, null, '/cadastro');
    renderPage();
  });

  return rootElement;
};
