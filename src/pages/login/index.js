// import { } from './data.js';
import { Google, Facebook, Email } from '../../services/index.js';
// import { renderPage } from '../../router.js';

import { renderPage } from '../../router.js';

export const Login = () => {
  // Coloque sua página
  const btnGoogle = `
    <section class="login">
      <img class="img-logo"  src="../img/Logo.jpeg" alt="logo da  página">
      <form class="order-login">
        <div>
          <input class="input-login" type="email" id="inputEmail" placeholder="Email"/>
        </div>
        <div>
          <input class="input-login" type="password" id="inputSenha"  placeholder="Senha"/>
        </div>
          <button id="btnEmail" class="btn-Login">Login</button>
          <p class="login-com"> Ou faça login com...</p>
      </form>
      <div class="outros-logins">
        <button id="btnGoogle" class="btn-Google">Google</button>
        <button id="btnFacebook" class="btn-Facebook" >Facebook</button>
      </div>
      <button class= "link criar-Cadastro" id="criarCadastro">Não é membro? Criar conta</button>
    </section>
  `;

  const rootElement = document.createElement('div');
  rootElement.innerHTML = btnGoogle;

  const loginGoogle = rootElement.querySelector('#btnGoogle');

  loginGoogle.addEventListener('click', (event) => {
    event.preventDefault();
    Google().then(() => {
      // const token = result.credential.accessToken;
      // const user = result.user;
      window.history.pushState(null, null, '/home');
      renderPage();
    }).catch(() => {
      // const errorCode = error.code;
      // const errorMessage = error.message;
      // const email = error.email;
      // const credential = error.credential;
    });
  });

  const loginFacebook = rootElement.querySelector('#btnFacebook');

  loginFacebook.addEventListener('click', (event) => {
    event.preventDefault();
    Facebook().then(() => {
      // const token = result.credential.accessToken;
      // const user = result.user;
      window.history.pushState(null, null, '/home');
      renderPage();
    }).catch(() => {
      // const errorCode = error.code;
      // const errorMessage = error.message;
      // const email = error.email;
      // const credential = error.credential;
    });
  });

  const loginEmail = rootElement.querySelector('#btnEmail');

  loginEmail.addEventListener('click', (event) => {
    event.preventDefault();
    const email = document.getElementById('inputEmail').value;
    const senha = document.getElementById('inputSenha').value;
    Email(email, senha).then(() => {
      // const token = result.credential.accessToken;
      // const user = result.user;
      window.history.pushState(null, null, '/home');
      renderPage();
    }).catch(() => {
      // const errorCode = error.code;
      // const errorMessage = error.message;
      // const email = error.email;
      // const credential = error.credential;
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
